<template>
  <div>
    <div v-if="owner">
      <p>
        <strong>{{ owner.name }}</strong> — {{ owner.site }} — ${{ owner.bid }}<br />
        <button @click="deleteOwner(owner.id)">Delete</button>
      </p>
    </div>
    <div v-else>
      <em>No Owner</em>
    </div>
    <form @submit.prevent="addOwner">
      <input required type="text" v-model="name" placeholder="Name"> 
      <input required type="text" v-model="site" placeholder="Site"> 
      <input required type="number" v-model.number="bid" placeholder="Bid" v-bind:min="minimumBid"><br />
      <button type="submit">Add Owner</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'OwnerComponent',
  props: {
    carId: String,
    owner: Object,
  },
  data: function() {
    return {
      name: '',
      site: '',
      bid: this.owner ? this.owner.bid + 1 : this.$store.state.settings.minimumBid,
    }
  },
  methods: {
    addOwner: function() {
      if( this.bid < this.minimumBid ) {
        alert('Bid must be higher');
        return;
      }
      this.$store.dispatch('addOwner', {
        carId: this.carId,
        name: this.name,
        site: this.site,
        bid: this.bid,
      }).then(() => {
        this.name = '';
        this.site = '';
        this.bid = this.owner.bid + 1;
      });
    },
    ...mapActions([
      'deleteOwner',
    ]),
  },
  computed: {
    minimumBid: function() {
      if( this.owner ) {
        return this.owner.bid + 1;
      }
      return this.$store.state.settings.minimumBid;
    }
  }
}
</script>

<style scoped>
  
</style>