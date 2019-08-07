<template>
  <v-card class="mb-4" elevation="1">
    <v-card-title class="subtitle-1 grey lighten-4 mb-2">Top Bid</v-card-title>
    <v-card-text>
      <v-list two-line>
        <v-list-item v-if="owner">
          <v-list-item-content>
            <v-list-item-title>
              {{ owner.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class='text--primary'>Bid:</span> {{ owner.bid | money }}<br />
              <span class='text--primary'>Site:</span> {{ owner.site }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn small icon color="red" @click="deleteOwner(owner.id)">
              <v-icon>remove_circle</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-subtitle>
              <em>No Owner</em>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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