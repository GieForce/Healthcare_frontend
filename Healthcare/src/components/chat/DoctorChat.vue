<template>
    <b-row>
      <b-col cols="12" md="3">
        <b-card style="height: 82vh" title="Live chat">
          <b-tabs pills vertical nav-wrapper-class="w-100">
            <b-tab v-for="chat in chatSession.chats" 
                   v-bind:data="chat"
                   v-bind:key="chat.id"
                   @click="changeChat(chat.id)">
             <template slot="title">
                <b-img slot="aside" blank-color="#ccc" width="25px" height="25px" alt="placeholder" class="rounded-circle" src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg"></b-img> {{ chat.patient.firstname }} {{ chat.patient.lastname }}
             </template>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>

      <b-col cols="12" md="9">
        <b-card style="height: 82vh;" id="chatCard">
          <doctorchatwindow v-if="chatId != 0" :pChatId="getChatId"></doctorchatwindow>
        </b-card>
      </b-col>
    </b-row>  
</template>

<script>

import DoctorChatWindow from './DoctorChatWindow.vue'

export default {

  components: {
    'doctorchatwindow': DoctorChatWindow,
  },

  data() {
    return {
      user: this.$store.getters.user,
      chatId: 0,
    }
  },

  computed: {
    chatSession() {
      return this.$store.getters.chatSession;
    },
    getChatId() {
      return this.chatId;
    }
  },

  methods: {
    changeChat(chatId) {
      this.chatId = chatId
    },
  },
  created() {
  },
}
</script>