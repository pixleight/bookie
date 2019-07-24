<template>
  <div class="home">
    <car-component v-for="car in cars" v-bind:car="car" v-bind:key="car.id"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarComponent from '@/components/CarComponent.vue'

import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    CarComponent,
  },
  computed: mapState([
    'cars'
  ]),
}
</script>
