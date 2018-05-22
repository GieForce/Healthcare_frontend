<template>
  <div class="patientChat chat" v-if="chat != undefined">
    <div class="bar">
      <div class="status">
        <div v-if="chat.patient.status=='online'" id="online"> </div>
        <div v-else id="offline"> </div>
      </div>
      <div class="name">
        {{ chat.doctor.firstname }} {{ chat.doctor.lastname }} 
      </div>
      <br>
    </div>

    <div class="messagesWrapper">
      <div class="messages" ref="mess">
        <div v-for="message in chat.messages">
          <div class="bubbleme" v-if="message.sender.user_id==user.user_id"> {{ message.message }}</div>
          <div class="bubbleyou" v-else> {{ message.message }}</div>
        </div>
      </div>
    </div>

    <div class="messageBox">
      <b-form-input v-model="message" style="position: absolute; bottom: 15px; width: 96%;"
        type="text"
        placeholder="Stuur een bericht"
        @keydown.native="sendMessage"></b-form-input>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
      chatId: this.$store.getters.user.user_id,
    }
  },

  computed: {
    chatSession: function () {
    	return this.$store.getters.chatSession;
    },
    chat: function () {
      return this.$store.getters.chatSession.chats[0];
    },
  },

  methods: {
    // Methods
    sendMessage(event){
      if(event.keyCode == 13 && (!this.message.length === 0 || this.message.trim())){
        this.chatSession.socket.emit('sent_message', {
          sender: this.user,
          chatId: this.chatId,
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

  created() {

    if(this.$store.getters.chatSession == undefined){
      this.$store.dispatch('setupSockets', this.user)
    }

    // if(this.chat != undefined && this.chat.messages.length != 0){
    //   this.chat.messages.foreach(message => {
    //     message.read = true
    //   });
    // }
  },
}
</script>