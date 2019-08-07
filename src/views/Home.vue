<template>
  <v-layout wrap justify-space-around>
    <car-component v-for="car in cars" v-bind:car="car" v-bind:key="car.id"/>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import CarComponent from '@/components/CarComponent.vue'

import { mapState, mapGetters } from 'vuex';

export default {
  name: 'home',
  data: function() {
    return {
      carName: '',
    }
  },
  components: {
    CarComponent,
  },
  computed: {
    ...mapState([
      'cars'
    ]),
    ...mapGetters([
      'getTopBid',
      'getTotalPot',
      'getCut',
    ]),
    topBids: function () {
      return this.getTopBid();
    }
  },
  methods: {
    addCar: function() {
      this.$store.dispatch('addCar', {
        name: this.carName,
      }).then(() => {
        this.carName = '';
      });
    },
  },
}
</script>
