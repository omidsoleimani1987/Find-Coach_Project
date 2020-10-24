export default {
  requests(state, _getters, _rootState, rootGetters) {
    const userId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === userId);
  },
  hasRequests(_state, getters) {
    return getters.requests && getters.requests.length > 0;
  }
};
