<template>
  <v-flex xs12 sm6 md4>
    <v-card>
      <v-card-title class="headline indigo white--text">
        <div>{{ car.name }}</div>
        <v-list-item-subtitle>Sponsor Cut: {{ sponsorCut | money }}</v-list-item-subtitle>
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <sponsors-form :car="car" />
        <owner-form :car="car" :owner="owner" />
      </v-card-actions>
      <v-card-text>
        <owner-component v-bind:owner="owner" v-bind:car-id="car.id" v-bind:car-name="car.name"/>
        <sponsors-list v-bind:sponsors="sponsors" v-bind:car-id="car.id" v-bind:car-name="car.name"/>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SponsorsList from '@/components/SponsorsList';
import SponsorsForm from '@/components/SponsorsForm';
import OwnerComponent from '@/components/OwnerComponent';
import OwnerForm from '@/components/OwnerForm';

export default {
  props: {
    car: Object,
  },
  methods: {
    ...mapActions([
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
    SponsorsList,
    SponsorsForm,
    OwnerComponent,
    OwnerForm,
  }
}
</script>

<style scoped>
  
</style>