<template>
  <div>
    <p v-for="sponsor in sponsors" :key="sponsor.id">
      <strong>{{ sponsor.name }}</strong> — {{ sponsor.site }}<br />
      <button @click="deleteSponsor(sponsor.id)">Delete</button>
    </p>
    <form @submit="addSponsor">
      <input required type="text" v-model="name" placeholder="Name"><br />
      <input required type="text" v-model="site" placeholder="Site"><br />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SponsorsComponent',
  props: {
    carId: String,
    sponsors: Array,
  },
  data: function() {
    return {
      name: '',
      site: '',
    }
  },
  methods: {
    addSponsor: function(e) {
      e.preventDefault();
      this.$store.dispatch('addSponsor', {
        carId: this.carId,
        name: this.name,
        site: this.site
      }).then(() => {
        this.name = '';
        this.site = '';
      });
    },
    ...mapActions([
      'deleteSponsor',
    ]),
  }
}
</script>

<style scoped>
  
</style>