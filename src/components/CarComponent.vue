<template>
  <div>
    <h1>{{ car.name }}</h1>
    <h2>Sponsors</h2>
    <sponsors-component v-bind:sponsors="sponsors" v-bind:car-id="car.id"/>
    <h2>Owner</h2>
    <div v-if="owner">
      <p>
        <strong>{{ owner.name }}</strong> — {{ owner.site }} — ${{ owner.bid }}<br />
        <button @click="deleteOwner(owner.id)">Delete</button>
      </p>
    </div>
    <div v-else>
      <em>No Owner</em>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SponsorsComponent from '@/components/SponsorsComponent';

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
    ]),
    sponsors: function () {
      return this.getSponsorsByCarId(this.car.id)
    },
    owner: function () {
      return this.getOwnersByCarId(this.car.id)
    }
  },
  components: {
    SponsorsComponent
  }
}
</script>

<style scoped>
  
</style>