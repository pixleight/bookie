<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn text color="green" dark small v-on="on">
        <v-icon left>add</v-icon> Sponsor
      </v-btn>
    </template>

    <v-card>
      <v-form v-model="valid" ref="form">
        <v-card-title class="headline indigo darken-1 white--text">
          Add Sponsor: {{ car.name }}
        </v-card-title>
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
              <v-flex xs12>
                <v-text-field 
                  v-model="site"
                  label="Site"
                  :rules="nameRules"
                  required
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" color="success" @click="addSponsor">
            Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    car: Object,
  },
  data: function() {
    return {
      valid: false,
      dialog: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      site: '',
      siteRules: [
        v => !!v || 'Site is required',
      ],
    }
  },
  methods: {
    addSponsor: function() {
      this.$store.dispatch('addSponsor', {
        carId: this.car.id,
        name: this.name,
        site: this.site
      }).then(() => {
        this.$refs.form.reset();
        this.dialog = false;
      });
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  
</style>