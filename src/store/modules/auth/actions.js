let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7YMVPl7j4oeUvdmKxazGygMULO6Rbg40';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7YMVPl7j4oeUvdmKxazGygMULO6Rbg40';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'failed to authenticate. check your login data.'
      );
      throw error;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    //setting the expiration date
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem('tokenExpiration', expirationDate);

    //set the timer after login to automatically logout after expiry time
    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    // check how much expiration time is left and then set the timer for it
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  }
};
