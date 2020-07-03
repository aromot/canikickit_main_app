let authUser = null;

export default {
  init(user) {
    authUser = user;
  },
  user() {
    return authUser;
  }
};