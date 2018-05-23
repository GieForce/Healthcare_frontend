<template>
    <p class="event-item" :class="cssClasses"
       @click="$emit('click', event, $event)">
        <slot :event="event" v-if="showTitle">
            Def: {{ event.title }}
        </slot>
    </p>
</template>

<script>
    import moment from 'moment'

    export default {
        name:'eventc',
        props: ['event','date', 'start-time','end-time', 'firstDay'],
        computed: {
          cssClasses() {
            let cssClasses = this.event.cssClass;

            if (!Array.isArray(cssClasses)) {
              cssClasses = [cssClasses];
            } else {
              cssClasses = Array.from(cssClasses);
            }

            if (this.start.isSame(this.date, 'day')) {
              cssClasses.push('is-start');
            }

            if (this.end.isSame(this.date, 'day')) {
              cssClasses.push('is-end');
            }

            if (!this.event.isShow) {
              cssClasses.push('is-opacity');
            }

            return cssClasses.join(' ');
          },
          showTitle() {
            return (this.date.day() == this.firstDay || this.start.isSame(this.date, 'day'));
          },
          start() {
            return moment(this.event.start);
          },
          end() {
            return moment(this.event.end);
          },
          mounted: function () {

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
            getMonthViewEndDate(date) {return this.getMonthViewStartDate().add(6, 'weeks');
            }
          },
    }
</script>
