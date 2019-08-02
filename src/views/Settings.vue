<template>
  <div class="setting">
    <h1>
      Settings
    </h1>
    <form @submit.prevent="saveSettings">
      <p>
        <strong>sponsorship:</strong> <input type="number" v-model.number="settings.sponsorship" placeholder="sponsorship">
      </p>
      <p>
        <strong>minimumBid:</strong> <input type="number" v-model.number="settings.minimumBid" placeholder="minimumBid">
      </p>
      <p>
        <strong>sponsor:</strong> <input type="number" v-model.number="settings.cuts.sponsor" placeholder="sponsors"><br>
        <strong>owner:</strong> <input type="number" v-model.number="settings.cuts.owner" placeholder="owner"><br>
        <strong>charity:</strong> <input type="number" v-model.number="settings.cuts.charity" placeholder="charity">
      </p>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  data: function() {
    return {
      localSettings: this.$store.state.settings,
    }
  },
  computed: {
    ...mapState([
      'settings'
    ]),
  },
  methods: {
    saveSettings: function() {
      this.$store.dispatch('saveSettings', this.localSettings).then(() => {
        // promise
      });
      return;
    }
  }
}
</script>

<style scoped>
  
</style>