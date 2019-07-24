<template>
  <div class="home">
    <form @submit="addCar">
      <input required type="text" v-model="carName" placeholder="Car name"><br>
      <button type="submit">Add Car</button>
    </form>
    <car-component v-for="car in cars" v-bind:car="car" v-bind:key="car.id"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarComponent from '@/components/CarComponent.vue'

import { mapState } from 'vuex';

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
  computed: mapState([
    'cars'
  ]),
  methods: {
    addCar: function(e) {
      e.preventDefault();
      this.$store.dispatch('addCar', {
        name: this.carName,
      }).then(() => {
        this.carName = '';
      });
    },
  },
}
</script>
