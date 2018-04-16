<template>
  <div>
    <ul id="example-1">
      <div v-if="chat != undefined">
        <div v-for="message in chat.messages">
          {{ message.sender.firstname + ': ' + message.message }}
        </div>
      </div>
    </ul>
    <b-form-input v-model="message"
                  type="text"
                  placeholder="Stuur een bericht"
                  @keydown.native="sendMessage"></b-form-input>
  </div>
</template>

<script>

export default {
  props: ['chatId'],
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
      socket: null,
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
      if(event.keyCode == 13){
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
      this.$store.dispatch('setupSockets', this.user)
      this.chatId = this.user.userId
    }

    this.socket = this.$store.getters.chatSession.socket

    if(this.chat != undefined){
      this.chat.messages.foreach(message => {
        message.read = true
      });
    }
  }
}
</script>