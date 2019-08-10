<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list shaped>
        <v-list-item-group v-model="nav.item" color="indigo">

          <v-list-item v-for="(item, i) in nav.items" :key="i" :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-html="item.title" />
            </v-list-item-content>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="indigo darken-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Katahdin 500</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        grid-list-xl
      >
        <router-view/>
      </v-container>
    </v-content>
    <v-footer
      color="indigo darken-4"
      dark
      app
      paddless
    >
      <v-container fluid grid-list-lg>
        <v-layout justify-space-around>
          <v-flex shrink>
            <span><strong>Shriners:</strong> {{ getCut('charity') | money }}</span>
          </v-flex>
          <v-flex shrink>
            <span><strong>Winning Owner:</strong> {{ getCut('owner') | money }}</span>
          </v-flex>
          <v-flex shrink>
            <span><strong>Total:</strong> {{ getTotalPot | money }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
    <snack-bar />
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    SnackBar,
  },
  data: () => ({
    drawer: null,
    nav: {
      item: 0,
      items: [
        {
          title: 'Home',
          icon: 'home',
          link: '/',
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: 'settings',
        }
      ]
    }
  }),
  computed: {
    ...mapGetters([
      'getTotalPot',
      'getCut',
    ]),
  }
};
</script>
