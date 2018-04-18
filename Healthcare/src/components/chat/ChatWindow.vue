<template>
  <b-card style="height: 100%">
    <ul id="example-1">
      <div v-if="chat != undefined">
        <div v-for="message in chat.messages">
          {{ message.sender.firstname + ': ' + message.message }}
        </div>
      </div>
    </ul>
    <b-form-input style="margin-top: 100%; postion: sticky" v-model="message"
                  type="text"
                  placeholder="Stuur een bericht"
                  @keydown.native="sendMessage"></b-form-input>
  </b-card>
</template>

<script>

export default {
  props: ['pChatId'],
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
      socket: null,
      chatId: this.pChatId
    }
  },

  computed: {
    chat: function () {
      return this.$store.getters.chatSession.chats.find(x => x.id === this.chatId)
    }
  },

  methods: {
    // Methods
    sendMessage(event){
      if(event.keyCode == 13 && (!this.message.length === 0 || this.message.trim())){
        console.log(this.chatId);
        this.socket.emit('sent_message', {
          sender: this.user,
          chatId: this.chatId,
          message: this.message
        })
        this.message = ''
      }
    },
  },

  created() {
    if(this.user.type === 'patient'){
      console.log(this.$store.getters.chatSession)
      if(this.$store.getters.chatSession == undefined){
        this.$store.dispatch('setupSockets', this.user)
      }
      this.chatId = this.user.user_id
    }

    this.socket = this.$store.getters.chatSession.socket

    if(this.chat != undefined && this.chat.messages.length != 0){
      this.chat.messages.foreach(message => {
        message.read = true
      });
    }
  },

  beforeCreate(){

  }
}
</script>