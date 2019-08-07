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
                        v-model.number="localSettings.sponsorship"
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
                        v-model.number="localSettings.minimumBid"
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
                        v-model.number="localSettings.cuts.sponsor"
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
                        v-model.number="localSettings.cuts.owner"
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
                        v-model.number="localSettings.cuts.charity"
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
                <v-btn :disabled="!valid" color="success" @click="addOwner">
                  Save Settings
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  data: function() {
    return {
      localSettings: this.$store.state.settings,
      valid: false,
      sponsorshipRules: [
        v => !!v || 'Please enter the cost of a sponsorship'
      ],
      ownerRules: [
        v => !!v || 'Please enter the minimum bid for ownership'
      ],
      cutsRules: [
        v => (this.localSettings.cuts.sponsor + this.localSettings.cuts.owner + this.localSettings.cuts.charity) === 100 || 'Cuts must add up to 100%'
      ],
    }
  },
  computed: {
    ...mapState([
      'settings'
    ]),
  },
  methods: {
    saveSettings: function() {
      this.$store.dispatch('saveSettings', this.localSettings).then(() => {
        this.$refs.form.reset();
      });
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  
</style>