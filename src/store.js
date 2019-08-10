import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import _ from 'lodash';
import { uuid } from 'vue-uuid';

Vue.use(Vuex)

const initialState = () => {
  return {
    snack: '',
    sponsorsPot: 0,
    cars: [
      {
        id: 'be289e3c',
        name: 'Car 1'
      },
      {
        id: 'be28a0e4',
        name: 'Car 2'
      },
      {
        id: 'be28a4fe',
        name: 'Car 3'
      },
      {
        id: 'be28a648',
        name: 'Car 4'
      },
      {
        id: 'be28a77e',
        name: 'Car 5'
      },
      {
        id: 'be28a8aa',
        name: 'Car 6'
      },
    ],
    sponsors: [],
    owners: [],
    settings: {
      sponsorship: 3,
      minimumBid: 10,
      cuts: {
        sponsor: 50,
        owner: 25,
        charity: 25,
      }
    }
  }
} 

export default new Vuex.Store({
  state: initialState,
  getters: {
    getSponsorsById: (state) => (id) => {
      return state.sponsors.find(sponsor => sponsor.id === id)
    },
    getSponsorsByCarId: (state) => (id) => {
      const sponsors = _.orderBy(state.sponsors, 'name', 'asc');
      return sponsors.filter(sponsor => sponsor.carId === id);
    },
    getOwnersById: (state) => (id) => {
      return state.owners.find(owner => owner.id === id)
    },
    getOwnersByCarId: (state) => (id) => {
      const owners = _.orderBy(state.owners, 'bid', 'desc');
      return owners.find(owner => owner.carId === id)
    },
    getTopBid: (state) => (id = null) => {
      const owners = _.orderBy(state.owners, 'bid', 'desc');
      if( id ) {
        const owner = owners.find(owner => owner.carId === id);
        return owner ? owner.bid : null;
      }
      
      return _.sum( state.cars.map(car => {
        const owner = owners.find(owner => owner.carId === car.id);
        return owner ? owner.bid : null;
      }) );
    },
    getTotalPot: (state, getters) => {
      const sponsorPot = state.sponsors.length * state.settings.sponsorship;
      const ownerPot = getters.getTopBid();

      return sponsorPot + ownerPot;
    },
    getCut: (state, getters) => (type, carId = null ) => {
      const pct = state.settings.cuts[type] / 100;

      if ( type == 'sponsor' && carId ) {
        const numSponsors = getters.getSponsorsByCarId( carId ).length;
        if( !numSponsors ) {
          return 0;
        }

        return getters.getTotalPot * pct / numSponsors;
      }

      return getters.getTotalPot * pct;
    }
  },
  mutations: {
    addCar (state, payload) {
      payload.id = uuid.v1();

      state.cars = [
        ...state.cars,
        payload,
      ];
    },
    addSponsor (state, payload) {
      payload.id = uuid.v1();

      state.sponsors = [
        ...state.sponsors,
        payload,
      ];
    },
    deleteSponsor (state, id) {
      state.sponsors = _.remove(state.sponsors, function(sponsor){
        return sponsor.id !== id;
      });
    },
    addOwner (state, payload) {
      payload.id = uuid.v1();
      
      state.owners = [
        ...state.owners,
        payload,
      ];
    },
    deleteOwner (state, id) {
      state.owners = _.remove(state.owners, function(owner){
        return owner.id !== id;
      });
    },
    saveSettings (state, payload) {
      state.settings = payload;
    },
    increaseSponsorsPot (state) {
      state.sponsorsPot += state.settings.sponsorship;
    },
    resetApp (state) {
      // acquire initial state
      const s = initialState();
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      });
    },
    setSnack (state, snack) {
      state.snack = snack
    },
  },
  actions: {
    async addCar ({ commit }, payload) {
      commit('addCar', payload);
      return Promise.resolve();
    },
    async addSponsor ({ commit }, payload) {
      commit('addSponsor', payload);
      commit('increaseSponsorsPot');
      return Promise.resolve();
    },
    async addOwner ({ commit }, payload) {
      commit('addOwner', payload);
      return Promise.resolve();
    },
    async deleteSponsor ({ commit }, id) {
      commit('deleteSponsor', id)
      return Promise.resolve();
    },
    async deleteOwner ({ commit }, id) {
      commit('deleteOwner', id)
      return Promise.resolve();
    },
    async saveSettings({ commit }, payload) {
      commit('saveSettings', payload);
      return Promise.resolve();
    },
    resetApp ({commit}) {
      return new Promise((resolve) => {
        commit('resetApp');
        resolve();
      })
    },
  },
  plugins: [new VuexPersistence({
    key: 'bookie',
  }).plugin]
})
