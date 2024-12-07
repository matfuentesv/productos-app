export interface User {
  id:number;
  rut: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  rol:Rol;
}

export interface Rol{
  id: number;
  name: string;
  description: string;
}
