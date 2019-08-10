<template>
  <v-container>
    <v-layout wrap>
        <v-flex xs12>
          <v-card>
            <v-form v-model="valid" ref="form">
              <v-card-title class="headline grey lighten-3">
                Settings
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-text-field
                        v-model.number="settings.sponsorship"
                        label="Sponsorship"
                        type="number"
                        prefix="$"
                        min="0"
                        :rules="sponsorshipRules"
                        required
                      />
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        v-model.number="settings.minimumBid"
                        label="Minimum Bid"
                        type="number"
                        prefix="$"
                        min="0"
                        :rules="ownerRules"
                        required
                      />
                    </v-flex>

                    <v-flex xs4>
                      <v-text-field
                        v-model.number="settings.cuts.sponsor"
                        label="Sponsor Cut"
                        type="number"
                        suffix="%"
                        :rules="cutsRules"
                        min="0"
                        max="100"
                        @input="validate"
                        required
                      />
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        v-model.number="settings.cuts.owner"
                        label="Owner Cut"
                        type="number"
                        suffix="%"
                        min="0"
                        max="100"
                        :rules="cutsRules"
                        @input="validate"
                        required
                      />
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        v-model.number="settings.cuts.charity"
                        label="Shriners Cut"
                        type="number"
                        suffix="%"
                        min="0"
                        max="100"
                        :rules="cutsRules"
                        @input="validate"
                        required
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :disabled="!valid" color="success" @click="saveSettings">
                  Save Settings
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex>
          <v-dialog v-model="resetDialog" persistent max-width="600">
            <template v-slot:activator="{ on }">
              <v-btn block color="red darken-2" dark v-on="on">Reset App</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Reset?</v-card-title>
              <v-card-text>Are you sure you would like to remove all the bids and reset the app to its initial state?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="resetDialog = false">Cancel</v-btn>
                <v-btn color="red darken-1" text @click="resetApp">Reset</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      top
      color="success"
      timeout="3000"
    >
      {{ snackbarMessage }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  data: function() {
    return {
      resetDialog: false,
      valid: false,
      snackbar: false,
      snackbarMessage: '',
      sponsorshipRules: [
        v => !!v || 'Please enter the cost of a sponsorship'
      ],
      ownerRules: [
        v => !!v || 'Please enter the minimum bid for ownership'
      ],
      cutsRules: [
        () => (this.settings.cuts.sponsor + this.settings.cuts.owner + this.settings.cuts.charity) === 100 || 'Cuts must add up to 100%'
      ],
    }
  },
  computed: {
    ...mapState([
      'settings'
    ])
  },
  methods: {
    saveSettings: function() {
      this.$store.dispatch('saveSettings', this.settings).then(() => {
        this.snackbarMessage = 'Settings saved.';
        this.snackbar = true;
      });
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetApp() {
      this.$store.dispatch('resetApp')
        .then(() => {
          this.resetDialog = false;
        })
        .then(() => {
          this.snackbarMessage = 'Reset successfully.';
          this.snackbar = true;
        });
    },
  },
}
</script>

<style scoped>
  
</style>