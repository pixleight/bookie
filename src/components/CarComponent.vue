<template>
  <div>
    <h1>{{ car.name }}</h1>
    <p><strong>Top Bid:</strong> {{ topBid | money }}</p>
    <p>
      <strong>Sponsor Cut:</strong> {{ sponsorCut | money }}
    </p>
    <h2>Sponsors</h2>
    <sponsors-component v-bind:sponsors="sponsors" v-bind:car-id="car.id"/>
    <h2>Owner</h2>
    <owner-component v-bind:owner="owner" v-bind:car-id="car.id"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SponsorsComponent from '@/components/SponsorsComponent';
import OwnerComponent from '@/components/OwnerComponent';

export default {
  name: 'CarComponent',
  props: {
    car: Object,
  },
  methods: {
    ...mapActions([
      'deleteSponsor',
      'deleteOwner',
    ]),
  },
  computed: {
    ...mapGetters([
      'getSponsorsByCarId',
      'getOwnersByCarId',
      'getTopBid',
      'getCut',
    ]),
    sponsors: function () {
      return this.getSponsorsByCarId(this.car.id)
    },
    owner: function () {
      return this.getOwnersByCarId(this.car.id)
    },
    topBid: function() {
      return this.getTopBid(this.car.id);
    },
    sponsorCut: function() {
      return this.getCut( 'sponsor', this.car.id );
    }
  },
  components: {
    SponsorsComponent,
    OwnerComponent,
  }
}
</script>

<style scoped>
  
</style>