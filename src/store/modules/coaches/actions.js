export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.userId;

    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    const response = await fetch(
      `https://find-coach-app-48d60.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // eslint-disable-next-line no-unused-vars
    const responseData = await response.json();

    if (!response.ok) {
      // error handling
    }
    context.commit('addCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      `https://find-coach-app-48d60.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };

      coaches.push(coach);

      context.commit('setCoaches', coaches);
    }
  }
};
