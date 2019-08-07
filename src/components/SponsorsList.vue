<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header ripple>Sponsors</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list two-line>
          <template v-for="(sponsor, index) in sponsors">
            <v-list-item :key="sponsor.id">
              <v-list-item-content>
                <v-list-item-title v-html="sponsor.name" />
                <v-list-item-subtitle>
                  Site: {{ sponsor.site }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn small icon color="red" @click.stop="deleteSponsor(sponsor.id)">
                  <v-icon>remove_circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider
              v-if="index + 1 < sponsors.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    carId: String,
    sponsors: Array,
  },
  data: function() {
    return {
    }
  },
  methods: {
    ...mapActions([
      'deleteSponsor',
    ]),
  }
}
</script>

<style scoped>
  
</style>