import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    selectedPost: null,
    message: null,
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setSelectedPost(state, post) {
      state.selectedPost = post;
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    setSelectedPost({ commit }, post) {
      commit("setSelectedPost", post);
    },
    setPosts({ commit }, posts) {
      commit("setPosts", posts);
    },
    setMessage({ commit }, message) {
      commit("setMessage", message);
    },
  },
  modules: {},
});
