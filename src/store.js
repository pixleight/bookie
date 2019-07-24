import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash';
import { uuid } from 'vue-uuid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cars: [
      {
        id: 'c1',
        name: 'Car 1',
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
    ]
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
      return true;
    },
    deleteOwner (state, id) {
      state.owners = _.remove(state.owners, function(owner){
        return owner.id !== id;
      });
    }
  },
  actions: {
    addCar ({ commit }, payload) {
      return new Promise((resolve) => {
        commit('addCar', payload)
        resolve();
      })
    },
    addSponsor ({ commit }, payload) {
      return new Promise((resolve) => {
        commit('addSponsor', payload);
        resolve();
      })
    },
    addOwner ({ commit }, payload) {
      return new Promise((resolve) => {
        commit('addOwner', payload);
        resolve();
      })
    },
    deleteSponsor ({ commit }, id) {
      commit('deleteSponsor', id)
    },
    deleteOwner ({ commit }, id) {
      commit('deleteOwner', id)
    }
  }
})
