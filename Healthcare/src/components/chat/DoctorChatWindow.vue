<template>
  <div>
    <ul style="">
      {{ partner.status }}
    </ul>
    <b-form-input v-model="message" style="position: absolute; bottom: 15px; width: 96%;"
                  type="text"
                  placeholder="Stuur een bericht"
                  @keydown.native="sendMessage"></b-form-input>
    </b-card-body>
  </div>
</template>

<script>

export default {
  props: ['pChatId'],
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
      socket: null,
    }
  },

  computed: {
    partner: function () {
      return this.$store.getters.chatSession.users.find(x => x.user_id === this.chatId);
    },

    chatId: function() {
      return this.pChatId;
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
      if(this.$store.getters.chatSession == undefined){
        this.$store.dispatch('setupSockets', this.user)
      }
      this.pChatId = this.user.user_id
    }

    this.socket = this.$store.getters.chatSession.socket

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