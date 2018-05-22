<template>
  <div class="chat" v-if="chat != undefined">
    <div class="bar">
      <div class="status">
        <div v-if="chat.patient.status=='online'" id="online"> </div>
        <div v-else id="offline"> </div>
      </div>
      <div class="name">
        {{ chat.patient.firstname }} {{ chat.patient.lastname }} 
      </div>
      <br>
<!--       <div id="fileButton">
        <input type="file" id="inputFile" value>
        <i id="input_img" class="ion-images"></i>
      </div> -->
    </div>

    <div class="messagesWrapper">
      <div class="messages" ref="mess">
        <div v-for="message in chat.messages">
          <div class="bubbleme" v-if="message.sender.user_id==user.user_id"> {{ message.message }} <div class="timeStamp">{{ message.date.toTimeString().split(':')[0]}}:{{message.date.toTimeString().split(':')[1] }}</div></div>
          <div class="bubbleyou" v-else> {{ message.message }} <div class="timeStamp">{{ message.date.toTimeString().split(':')[0]}}:{{message.date.toTimeString().split(':')[1] }}</div></div>
        </div>
      </div>
    </div>
    <div class="messageBox">
      <b-form-input class="message" v-model="message"
        type="text"
        placeholder="Stuur een bericht"
        @keydown.native="sendMessage"></b-form-input>
    </div>
  </div>
</template>

<script>
import jQuery from 'jQuery'

export default {
  props: ['pChatId'],
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
      prevChatId: 0
    }
  },

  computed: {
    chatSession: function () {
      return this.$store.getters.chatSession;
    },
    chat: function () {
      return this.$store.getters.chatSession.chats.find(x => x.id == this.pChatId);
    },
  },

  methods: {
    // Methods
    sendMessage(event){
      if(event.keyCode == 13 && (!this.message.length === 0 || this.message.trim())){
        this.chatSession.socket.emit('sent_message', {
          sender: this.user,
          chatId: this.chat.id,
          message: this.message
        })
        this.message = ''
        setTimeout(() => { 
          var elem = this.$refs.mess;
          elem.scrollTop = elem.scrollHeight; 
        }, 200);
      }
    },
  },

  created(){
    this.prevChatId = this.pChatId;
    setTimeout(() => { 
      var elem = this.$refs.mess;
      elem.scrollTop = elem.scrollHeight; 
    }, 0);    

    var intervalID = window.setInterval(() => {
      var elem = this.$refs.mess;
      if(elem.scrollTop + 330 > elem.scrollHeight || this.pChatId != this.prevChatId){
        this.prevChatId = this.pChatId;
        elem.scrollTop = elem.scrollHeight; 
      }
    }, 200);
  },

  beforeCreate(){

  }
}
</script>