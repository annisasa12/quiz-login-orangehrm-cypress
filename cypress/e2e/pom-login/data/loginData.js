const loginData = {
  validUser: {
    username: 'Admin',
    password: 'admin123',
  },

  wrongUsername: {
    username: 'adminSalah',
    password: 'admin123',
  },

  wrongPassword: {
    username: 'Admin',
    password: 'passwordSalah',
  },

  invalidUser: {
    username: 'userSalah',
    password: 'passwordSalah',
  },
}

export default loginData
