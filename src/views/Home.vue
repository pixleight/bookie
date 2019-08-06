<template>
  <v-layout wrap justify-space-around>
    <v-flex xs12>
      <v-card>
        <p>
          Total: {{ getTotalPot | money }}
        </p>
        <p>
          Owner cut: {{ getCut('owner') | money }}
        </p>
        <p>
          Charity cut: {{ getCut('charity') | money }}
        </p>
        <form @submit.prevent="addCar">
          <input required type="text" v-model="carName" placeholder="Car name"><br>
          <button type="submit">Add Car</button>
        </form>
      </v-card>
    </v-flex>
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
