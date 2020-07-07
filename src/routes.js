const routes = {
  main: {
    prefix: '',
    routes: {
      homepage: '/',
      userRegister: '/register',
      userLogin: '/login',
      userEdit: '/users/edit',
      userForgotPassword: '/forgot-password',
      userResetPassword: '/users/resetPassword/:key'
    }
  },
  admin: {
    prefix: 'admin',
    routes: {
      home: '/home'
    }
  }
};

export default routes