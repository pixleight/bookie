<template>
  <v-card class="mb-4" elevation="1">
    <v-card-title class="subtitle-1 grey lighten-4 mb-2">Top Bid</v-card-title>
    <v-card-text>
      <div v-if="owner">
        <v-container>
          <v-layout align-center>
            <v-flex shrink>
              <v-btn small icon color="red" @click="deleteOwner(owner.id)">
                <v-icon>remove_circle</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>
              <p class="subtitle-1 mb-1">
                {{ owner.name }}
              </p>
              <div class="d-flex">
                <span><span class='text--primary'>Bid:</span> {{ owner.bid | money }}</span>
                <v-spacer />
                <span><span class='text--primary'>Site:</span> {{ owner.site }}</span>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <div v-else>
        <p>
          <em>No Owner</em>
        </p>
      </div>
    </v-card-text>
  </v-card>
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