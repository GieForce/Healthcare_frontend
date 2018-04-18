<template>
  <b-card style="height: 90vh" title="Live chat">
    <b-tabs pills card vertical nav-wrapper-class="w-25">
      <b-tab active v-for="chat in chatSession.chats" 
             v-bind:data="chat"
             v-bind:key="chat.id">
       <template slot="title">
          <b-img slot="aside" blank-color="#ccc" width="25px" height="25px" alt="placeholder" class="rounded-circle" src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg"></b-img> {{ chat.patient.firstname + ' ' + chat.patient.lastname }}
       </template>
       <chatwindow :pChatId="chat.id"></chatwindow>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>

import ChatWindow from './ChatWindow.vue'

export default {

  components: {
    'chatwindow': ChatWindow,
  },

  data() {
    return {
      user: this.$store.getters.user,
      partner: '',
      status: 'connecting',
      message: '',
      messages: [],
    }
  },

  computed: {
    chatSession: function () {
      return this.$store.getters.chatSession
    }
  },

  methods: {
    registerListeners() {
      // socket.on('connect', this.connected)
      // socket.on('disconnect', this.disconnected)
      // socket.on('joined_patient', (patient) => { this.connectedToPatient(patient) })
      // socket.on('patients_unavailable', this.waitForPatients)
      // socket.on('partner_left', this.partnerLeft)
      // socket.on('received_message', (data) => { this.receivedMessage(data) })
      
    },

    // Callbacks
    connected() {
      this.status = 'authenticating'
      socket.emit('authenticate', this.user)
    },

    disconnected() {
      this.status = 'disconnected'
    },

    connectedToPatient(patient){
      this.status = 'Chatting with ' + patient.firstname + ' ' + patient.lastname
      this.partner = patient;
    },

    waitForPatients(){
      this.status = 'waiting_for_patients'
    },

    partnerLeft(){
      this.status = 'partner_left'
    },

    receivedMessage(data){
      this.messages.push(data)
    },

    // Methods
    sendMessage(event){
      if(event.keyCode == 13){
        socket.emit('sent_message', {
          sender: this.user,
          channelId: this.partner.user_id,
          message: this.message
        })
        this.message = ''
      }
    },
  },

  created() {
    console.log('chats')
    console.log(this.chatSession.chats)
  },
}
</script>