<template>
  <div>
    <p v-for="sponsor in sponsors" :key="sponsor.id">
      <strong>{{ sponsor.name }}</strong> — {{ sponsor.site }}<br />
      <button @click="deleteSponsor(sponsor.id)">Delete</button>
    </p>
    <input type="text" v-model="name" placeholder="Name"><br />
    <input type="text" v-model="site" placeholder="Site"><br />
    <button @click="addSponsor">Add</button>
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
    addSponsor: function() {
      this.$store.dispatch('addSponsor', {
        id: this.$uuid.v1(),
        carId: this.carId,
        name: this.name,
        site: this.site
      }).then(() => {
        this.name = '';
        this.site = '';
      }, () => {
        // error
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