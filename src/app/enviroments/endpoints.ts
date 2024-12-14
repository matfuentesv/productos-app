export const endpoints = {
  findAllProduct: {
    name: 'Products',
    description: 'Obtiene lista de productos',
    path: 'http://localhost:8080/api/findAllProduct'
  },
  findAllUsers: {
    name: 'Users',
    description: 'Obtiene Lista de usuarios',
    path: 'http://localhost:8082/api/findAllUsers'
  },

  login: {
    name: 'Login User',
    description: 'Realiza login',
    path: 'http://localhost:8082/api/login'
  },
  findUserByEmail: {
    name: 'Find user by email',
    description: 'Obtiene usuario po email',
    path: 'http://localhost:8082/api/findUser/'
  },
  createUser: {
    name: 'Create User',
    description: 'Crea usuarios',
    path: 'http://localhost:8082/api/createUser'
  },
  updateUser: {
    name: 'UpdateUser',
    description: 'Actualiza información del usuario',
    path: 'http://localhost:8082/api/updateUser'
  },
  deleteUser: {
    name: 'Delete User',
    description: 'elimina usuario',
    path: 'http://localhost:8082/api/deleteUser/'
  },
  findAllOrders: {
    name: 'Find Orders',
    description: 'Listar ordenes de compra',
    path: 'http://localhost:8082/api/orders'
  },
  payOrder:{
    name: 'Pay Orders',
    description: 'Pagar ordenes de compra',
    path: 'http://localhost:8081/api/orders'
  }

}
