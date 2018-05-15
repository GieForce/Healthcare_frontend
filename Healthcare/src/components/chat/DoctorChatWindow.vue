<template>
  <div>
    {{ chatSession.status }}
    <div v-if="chat != undefined">
      {{ chat.patient.status }}
      <ul>
        <li v-for="message in chat.messages">{{ message.sender.firstname }}: {{ message.message }}</li>
      </ul>
      <b-form-input v-model="message" style="position: absolute; bottom: 15px; width: 96%;"
                    type="text"
                    placeholder="Stuur een bericht"
                    @keydown.native="sendMessage"></b-form-input>
      </b-card-body>
    </div>
  </div>
</template>

<script>

export default {
  props: ['pChatId'],
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
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
        console.log(this.chatId);
        this.chatSession.socket.emit('sent_message', {
          sender: this.user,
          chatId: this.chat.id,
          message: this.message
        })
        this.message = ''
      }
    },
  },

  created() {

    // if(this.chat != undefined && this.chat.messages.length != 0){
    //   this.chat.messages.foreach(message => {
    //     message.read = true
    //   });
    // }
  },

  beforeCreate(){

  }
}
</script>