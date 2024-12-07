export const endpoints = {
  findAllUsers: {
    name: 'Users',
    description: 'Obtiene Lista de usuarios',
    path: 'http://localhost:8081/api/findAllUsers'
  },
  findAllProduct: {
    name: 'Products',
    description: 'Obtiene lista de productos',
    path: 'http://localhost:8080/api/findAllProduct'
  },
  login: {
    name: 'Login User',
    description: 'Realiza login',
    path: 'http://localhost:8081/api/login'
  },
  findUserByEmail: {
    name: 'Find user by email',
    description: 'Obtiene usuario po email',
    path: 'http://localhost:8081/api/findUser/'
  }

}
