export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    // returns true if we have coaches
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_state, getters, _rootState, rootGetters) {
    // to check if the current user is already registered or not
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  }
};
