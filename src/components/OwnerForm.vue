<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn text color="green" dark small v-on="on">
        <v-icon left>add</v-icon> Owner
      </v-btn>
    </template>

    <v-card>
      <v-form v-model="valid" ref="form">
        <v-card-title class="headline indigo darken-1 white--text">Add Owner: {{ car.name }}</v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name"
                  :rules="nameRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="site"
                  label="Site"
                  :rules="siteRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  type="number"
                  v-model.number="bid"
                  label="Bid"
                  prefix="$"
                  :min="minimumBid"
                  :rules="bidRules"
                  required
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="!valid" color="success" @click="addOwner">
            Add Owner
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    car: Object,
    carId: String,
    owner: Object,
  },
  data: function() {
    return {
      dialog: false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      site: '',
      siteRules: [
        v => !!v || 'Site is required'
      ],
      bid: this.owner ? this.owner.bid + 1 : this.$store.state.settings.minimumBid,
      bidRules: [
        v => {
          const min = this.owner ? this.owner.bid : this.$store.state.settings.minimumBid;
          return v >= min || 'Bid must be higher'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setSnack']),
    addOwner: function() {
      if( this.bid < this.minimumBid ) {
        alert('Bid must be higher');
        return;
      }
      this.$store.dispatch('addOwner', {
        carId: this.car.id,
        name: this.name,
        site: this.site,
        bid: this.bid,
      }).then(() => {
        this.$refs.form.reset();
        this.bid = this.owner.bid + 1;
        this.dialog = false;
      }).then(() => {
        this.setSnack(`Owner bid added for ${this.car.name}`);
      });
    },
    reset() {
      this.$refs.form.reset();
    }
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