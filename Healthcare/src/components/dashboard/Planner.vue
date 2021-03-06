<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth">

      <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div>
      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <!-- body display date day and events -->
    <div class="full-calendar-body">
      <div class="weeks">
        <strong class="week" v-for="dayIndex in 7">{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
      <div class="dates" ref="dates">
        <div class="dates-bg">
          <div class="week-row" v-for="week in currentDates">
            <div class="day-cell" v-for="day in week"
                 :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}">
              <p class="day-number">{{ day.monthDay }}</p>
            </div>
          </div>
        </div>

        <!-- absolute so we can make dynamic td -->
        <div class="dates-events" >
          <div class="events-week" v-for="week in currentDates">
            <div class="events-day" v-for="day in week" track-by="$index"
                 :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}" @click.stop="dayClick(day.date, $event)">
              <p class="day-number">{{day.monthDay}}</p>
              <div class="event-box"  v-for="day2 in takeDaysFromAppointments(events)" >
                <p v-if="CompareDates(day2, day)">	&nbsp;	&nbsp;Ingepland</p>
              </div>
            </div>
          </div>
        </div>

        <br>
        <div v-if="user.type === 'doctor'">
          <b-button size="sm" v-on:click="changeComponent('artsswitch')" variant="primary">
            <i></i> Afwezig melden
          </b-button>
          <slot name="body-card">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import moment from 'moment';
  import EventCard from '../dashboard/PlannerAssets/eventCard.vue';
  import Header from '../dashboard/PlannerAssets/header.vue'

  export default {
    props : {
      day : ['day'],
      locale : {
        type : String,
        default : 'en',
      },
      firstDay : {
        type : Number | String,
        validator (val) {
          let res = parseInt(val);
          return res >= 0 && res <= 6
        },
        default : 0
      },
    },
    components : {
      'eventc': EventCard,
      'fc-header' : Header,

    },
    mounted () {
      this.emitChangeMonth(this.currentMonth);
    },
    data () {
      return {
        currentMonth : moment().startOf('month'),
        isLismit : true,
        eventLimit : 3,
        user_id: this.$store.getters.user.user_id,
        user: this.$store.getters.user,
        showMore : false,
        morePos : {
          top: 0,
          left : 0
        },
        selectDay : {},
        events: [],
        appointments:[],
        fields: {
          title: {label:'afspraak'},
          startTime: {label: 'Dag', sortable: true},
          id: {label: 'Id', sortable: true},
          available: {label: 'Beschikbaar', sortable: true},
          endTime: {label: 'Eindtijd', sortable: true}
        },

      }
    },
    computed: {
      currentDates () {
        return this.getCalendar()
      }
    },
    created () {
      if(this.$store.getters.user.type === 'doctor') {
        this.$store.dispatch("getRequest", 'timeslots/approved?approval=2&doctor_id0').then((response) => {
          this.isBusy = false;
          this.appointments = response;
          let result = [];
          this.appointments.forEach((x) => {
              result.push(x);
          });
          this.events = this.ConvertToDatetime(result)
        });
      }
      else if(this.$store.getters.user.type === 'doctorEmployee') {
        this.$store.dispatch("getRequest", 'timeslots/approved?approval=2&doctor_id0').then((response) => {
          this.isBusy = false;
          this.appointments = response;
          let result = [];
          this.appointments.forEach((x) => {
              result.push(x);
          });

          this.events = this.ConvertToDatetime(result)
        });
      }
    },

    methods : {
      emitChangeMonth (firstDayOfMonth) {
        this.currentMonth = firstDayOfMonth;

        let start = this.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
        let end = this.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

        this.$emit('changeMonth', start, end, firstDayOfMonth)
      },
      moreTitle (date) {
        if (!date) return '';
        return moment(date).format('ll');
      },
      getCalendar () {
        // calculate 2d-array of each month
        let monthViewStartDate = this.getMonthViewStartDate(this.currentMonth, this.firstDay);
        let calendar = [];

        for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {
          let week = [];

          for(let perDay = 0 ; perDay < 7 ; perDay++) {
            week.push({
              monthDay : monthViewStartDate.date(),
              isToday : monthViewStartDate.isSame(moment(), 'day'),
              isCurMonth : monthViewStartDate.isSame(this.currentMonth, 'month'),
              weekDay : perDay,
              date : moment(monthViewStartDate),
              events : this.slotEvents(monthViewStartDate)
            });
            monthViewStartDate.add(1, 'day');
          }

          calendar.push(week);
        }

        return calendar
      },
      slotEvents (date) {
        // find all events start from this date
        let thisDayEvents = this.events.filter(day => {
          let st = moment(day.start);
          let ed = moment(day.end ? day.end : st);

          return date.isBetween(st, ed, null, '[]');
        });

        // sort by duration
        thisDayEvents.sort((a,b)=>{
          if(!a.cellIndex) return 1;
          if (!b.cellIndex) return -1;
          return a.cellIndex - b.cellIndex
        });

        // mark cellIndex and place holder
        for (let i = 0;i < thisDayEvents.length;i++) {
          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1);
          thisDayEvents[i].isShow = true;
          if (thisDayEvents[i].cellIndex === i+1 || i>2) continue;
          thisDayEvents.splice(i,0,{
            title : 'holder',
            cellIndex : i+1,
            start : date.format(),
            end : date.format(),
            isShow : false
          })
        }

        return thisDayEvents
      },
      selectThisDay (day, jsEvent) {
        this.selectDay = day;
        this.showMore = true;
        this.morePos = this.computePos(event.target);
        this.morePos.top -= 100;
        let events = day.events.filter(item =>{
          return item.isShow === true
        });
        this.$emit('moreClick', day.date, events, jsEvent)
      },
      computePos (target) {
        let eventRect = target.getBoundingClientRect();
        let pageRect = this.$refs.dates.getBoundingClientRect();
        return {
          left : eventRect.left - pageRect.left,
          top  : eventRect.top + eventRect.height - pageRect.top
        }
      },
      dayClick(day, jsEvent) {
        this.$emit('dayClick', day, jsEvent)
      },
      eventClick(event, jsEvent) {
        if (!event.isShow) return;

        jsEvent.stopPropagation();
        let pos = this.computePos(jsEvent.target);
        this.$emit('eventClick', event, jsEvent, pos);
      },
      getMonthViewStartDate(date, firstDay) {
        firstDay = parseInt(firstDay);
        let start = moment(date);
        let startOfMonth = moment(start.startOf('month'));

        start.subtract(startOfMonth.day(), 'days');

        if (startOfMonth.day() < firstDay) {
          start.subtract(7, 'days');
        }

        start.add(firstDay, 'days');

        return start;
      },

      takeAppointmentsForDay(day) {
        let index = this.events(function(x) {return x.id; }).indexOf(day.id);
        let dailyAppointments = [];
        for (let i = index; i < index + dailyAppointments.length; i++) {
          dailyAppointments.push(this.events[i]);
        }
        return dailyAppointments;
      },
      takeDaysFromAppointments(dataValues) {
        let days = [];
        let currentTimeSlot = "";
        let newTimeSlot = "";
        for (let i = 0; i < dataValues.length; i++){
          newTimeSlot = dataValues[i].startTime.toString().substring(5,7);
          if(currentTimeSlot !== newTimeSlot){
            days.push(dataValues[i]);
            currentTimeSlot = newTimeSlot;
          }
        }
        return days;
      },
      CompareDates(day,calendarDay){
        let comparer = day.startTime.toString().substring(5,7);
        let comparerm = day.startTime.toString().substring(8,11);
        let calenderm = calendarDay.date.toString().substring(4,7);
        if(calendarDay.monthDay.toString() === comparer && comparerm === calenderm){
          return true;
        }else{
          return false;
        }

      },
      ConvertToDatetime(dateValues) {
        let entryAppointments = dateValues;
        for (let index = 0; index < entryAppointments.length; ++index) {
          entryAppointments[index].startTime = new Date( parseFloat( entryAppointments[index].startTime)).toUTCString();
          entryAppointments[index].endTime = new Date( parseFloat( entryAppointments[index].endTime)).toUTCString();
        }
        entryAppointments.sort(function(a,b){
          let dateA = new Date(a.startTime), dateB = new Date(b.startTime);
          return dateA - dateB;
        });
        return entryAppointments;
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
    },

    filters: {
      localeWeekDay (weekday, firstDay, locale) {
        firstDay = parseInt(firstDay);
        const localMoment = moment().locale(locale);
        return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
      }
    }
  }
</script>
<style lang="scss">
  .comp-full-calendar{
    // font-family: "elvetica neue", tahoma, "hiragino sans gb";
    padding:20px;
    background: #fff;
    max-width: 100%;
    max-height: 100%;
    margin:0 auto;
    ul,p{
      margin:0;
      padding:0;
    }
  }

  .full-calendar-body{
    margin-top: 20px;
    .weeks{
      display: flex;
      border-top:1px solid #e0e0e0;
      border-bottom:1px solid #e0e0e0;
      border-left:1px solid #e0e0e0;
      .week{
        flex:1;
        text-align: center;
        border-right:1px solid #e0e0e0;
      }
    }
    .dates {
      position:relative;
      .week-row{
        // width: 100%;
        // position:absolute;
        border-left:1px solid #e0e0e0;
        display: flex;
        .day-cell{
          flex:1;
          min-height: 112px;
          padding:4px;
          border-right:1px solid #e0e0e0;
          border-bottom:1px solid #e0e0e0;
          .day-number{
            text-align: right;
          }
          &.today{
            background-color:#fcf8e3;
          }
          &.not-cur-month{
            .day-number{
              color:rgba(0,0,0,.24);
            }
          }
        }
      }
      .dates-events{
        position:absolute;
        top:0;
        left:0;
        z-index:1;
        width: 100%;
        .events-week{
          display: flex;
          .events-day{
            cursor: pointer;
            flex:1;
            min-height: 112px;
            overflow: hidden;
            text-overflow: ellipsis;
            .day-number{
              text-align: right;
              padding:4px 5px 4px 4px;
              opacity: 0;
            }
            &.not-cur-month{
              .day-number{
                color:rgba(0,0,0,.24);
              }
            }
            .event-box{

              .event-item{
                cursor: pointer;
                font-size:12px;
                background-color:#C7E6FD;
                margin-bottom:2px;
                color: rgba(0,0,0,.87);
                padding:0 0 0 4px;
                height: 18px;
                line-height: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &.is-start{
                  margin-left: 4px;
                  // border-top-left-radius:4px;
                  // border-bottom-left-radius:4px;
                }
                &.is-end{
                  margin-right: 4px;
                  // border-top-right-radius:4px;
                  // border-bottom-right-radius:4px;
                }
                &.is-opacity{
                  opacity: 0;
                }
              }
              .more-link{
                cursor: pointer;
                // text-align: right;
                padding-left: 8px;
                padding-right: 2px;
                color: rgba(0,0,0,.38);
                font-size: 14px;
              }
            }
          }
        }
      }
      .more-events{
        position:absolute;
        width: 150px;
        z-index: 2;
        border:1px solid #eee;
        box-shadow: 0 2px 6px rgba(0,0,0,.15);
        .more-header{
          background-color:#eee;
          padding:5px;
          display: flex;
          align-items : center;
          font-size: 14px;
          .title{
            flex:1;
          }
          .close{
            margin-right: 2px;
            cursor: pointer;
            font-size: 16px;
          }
        }
        .more-body{
          height: 146px;
          overflow: hidden;
          .body-list{
            height: 144px;
            padding:5px;
            overflow: auto;
            background-color:#fff;
            .body-item{
              cursor: pointer;
              font-size:12px;
              background-color:#C7E6FD;
              margin-bottom:2px;
              color: rgba(0,0,0,.87);
              padding:0 0 0 4px;
              height: 18px;
              line-height: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>

