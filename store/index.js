export const state = () => ({
  reload: false
});

export const mutations = {
  reload(state) {
    debugger;
    state.reload = !state.reload;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // if (req?.session.user) {
    //   console.log("server init:", req);
    //   commit("user", req.session.user);
    // }
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  }
};
