<template>
  <v-snackbar
    v-model="show"
    top
    color="success"
    :timeout="timeout"
  >
    {{ message }}
    <v-btn
      dark
      text
      @click.native="show = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      timeout: 3000,
    }
  },
  created() {
    this.$store.watch(state => state.snack, () => {
      const msg = this.$store.state.snack
      if (msg !== '') {
        this.show = true
        this.message = msg
        this.$store.commit('setSnack', '')
      }
    })
  }
}
</script>