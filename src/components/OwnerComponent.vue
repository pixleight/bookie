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
    <form @submit="addOwner">
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
      bid: null,
    }
  },
  methods: {
    addOwner: function(e) {
      e.preventDefault();
      if( this.bid <= this.owner.bid ) {
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
        this.bid = null;
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
      return 1;
    }
  }
}
</script>

<style scoped>
  
</style>