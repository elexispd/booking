import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    bookings: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addBooking(state, booking) {
      state.bookings.push(booking);
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('setUser', null);
    },
  },
});

export default store;
