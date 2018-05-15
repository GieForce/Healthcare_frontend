<template>
  <b-card style="width: 50vw; top: 5vh; height: 60vh; margin-right: 35px">
    {{ chatSession.status }}
    <div v-if="chat != undefined">
      <ul>
        <li v-for="message in chat.messages">{{ message.sender.firstname }}: {{ message.message }} | {{ message.date.toTimeString().split(':')[0]}}:{{message.date.toTimeString().split(':')[1]}}</li>
      </ul>
      <b-form-input v-model="message" style="position: absolute; bottom: 15px; width: 95%;"
                    type="text"bericht
                    placeholder="Stuur een "
                    @keydown.native="sendMessage"></b-form-input>
      </b-card-body>
    </div>
  </b-card>
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