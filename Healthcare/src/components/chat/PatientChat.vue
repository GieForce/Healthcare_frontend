<template>
   <div v-on:click="this.$parent.toggleChat" class="chatbar">
    Livechat
   </div>
</template>

<script>

export default {
  data() {
    return {
      user: this.$store.getters.user,
      status: 'connecting',
    }
  },

  computed: {
    getStatus: function () {
      return this.status
    }
  },

  methods: {
   
  },

  created() {

  },
}
</script>