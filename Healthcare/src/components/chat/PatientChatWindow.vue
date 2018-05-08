<template>
  <b-card style="width: 50vw; top: 5vh; height: 60vh; margin-right: 35px">
    <ul>
      {{ doctor.status }}
    </ul>
    <b-form-input v-model="message" style="position: absolute; bottom: 15px; width: 95%;"
                  type="text"
                  placeholder="Stuur een bericht"
                  @keydown.native="sendMessage"></b-form-input>
    </b-card-body>
  </b-card>
</template>

<script>

export default {
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
      socket: null,
      chatId: 0,
    }
  },

  computed: {
    doctor: function () {
    	var doctor = this.$store.getters.chatSession.users.find(x => x.user_id === this.user.user_id);
      if(doctor != undefined) { return doctor; }
      return { status: 'offline' }
    },
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

    if(this.$store.getters.chatSession == undefined){
      this.$store.dispatch('setupSockets', this.user)
    }

    this.chatId = this.user.user_id
    this.socket = this.$store.getters.chatSession.socket

    // if(this.chat != undefined && this.chat.messages.length != 0){
    //   this.chat.messages.foreach(message => {
    //     message.read = true
    //   });
    // }
  },
}
</script>