import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash';
import { uuid } from 'vue-uuid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sponsorsPot: 0,
    cars: [
      {
        id: 'c1',
        name: 'Car 1',
        topBid: 47,
      },
    ],
    sponsors: [
      {
        id: 's1',
        carId: 'c1',
        name: 'Z Sponsor',
        site: '56',
      },
      {
        id: 's2',
        carId: 'c1',
        name: 'A Sponsor',
        site: '44',
      }
    ],
    owners: [
      {
        id: 'o1',
        carId: 'c1',
        name: 'Owner 1',
        site: '56',
        bid: 20,
      },
      {
        id: 'o2',
        carId: 'c1',
        name: 'Owner 1',
        site: '56',
        bid: 47,
      }
    ],
    settings: {
      sponsorship: 5,
      minimumBid: 5,
      cuts: {
        sponsor: 50,
        owner: 25,
        charity: 25,
      }
    }
  },
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
    }
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
    }
  }
})
