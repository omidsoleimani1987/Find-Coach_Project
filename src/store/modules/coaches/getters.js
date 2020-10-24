export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    // returns true if we have coaches
    return state.coaches && state.coaches.length > 0;
  }
};
