import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DataService} from './data.service';
import {endpoints} from '../../../enviroments/endpoints';

import {ApiResponse} from '../../../shared/models/api-response';
import {Rol, User} from '../../../shared/models/user';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should fetch products', () => {
  //   const dummyProducts: { products: any[] } = { products: [] };
  //
  //   service.getProducts().subscribe(products => {
  //     expect(products).toEqual(dummyProducts);
  //   });
  //
  //   const req = httpMock.expectOne(endpoints.findAllProduct.path);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyProducts);
  // });

  it('should login user', () => {
    const email = 'test@example.com';
    const password = 'password';
    const dummyResponse = { token: '12345' };

    service.login(email, password).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(endpoints.login.path);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('email')).toBe(email);
    expect(req.request.headers.get('password')).toBe(password);
    req.flush(dummyResponse);
  });

  it('should create a user', () => {
    const dummyRol: Rol = { id: 1, name: 'Admin', description: 'Administrator role' };
    const dummyUser: User = {
      id: 1,
      rut: '12345678-9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'password',
      rol: dummyRol
    };

    service.createUser(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(endpoints.createUser.path);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should update a user', () => {
    const dummyRol: Rol = { id: 1, name: 'Admin', description: 'Administrator role' };
    const dummyUser: User = {
      id: 1,
      rut: '12345678-9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'password',
      rol: dummyRol
    };

    service.updateUser(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(endpoints.updateUser.path);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUser);
  });

  it('should delete a user', () => {
    const email = 'john@example.com';

    service.deleteUser(email).subscribe(response => {
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne(`${endpoints.deleteUser.path}${email}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should fetch users', () => {
    const dummyRol: Rol = { id: 1, name: 'Admin', description: 'Administrator role' };
    const dummyUsers: User[] = [{
      id: 1,
      rut: '12345678-9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'password',
      rol: dummyRol
    }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(endpoints.findAllUsers.path);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should add a user', () => {
    const dummyRol: Rol = { id: 1, name: 'Admin', description: 'Administrator role' };
    const dummyUser: User[] = [{
      id: 1,
      rut: '12345678-9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'password',
      rol: dummyRol
    }];

    service.addUser(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(endpoints.findAllUsers.path);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  // it('should fetch orders', () => {
  //   const dummyOrders: Order[] = [{ id: 1, userName: 'John Doe', products: [] }];
  //
  //   service.getOrders().subscribe(orders => {
  //     expect(orders).toEqual(dummyOrders);
  //   });
  //
  //   const req = httpMock.expectOne(endpoints.findAllOrders.path);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyOrders);
  // });

  it('should create an order', () => {
    const dummyOrder = {
      userName: 'John Doe',
      products: [{ productName: 'Product 1', price: 100, quantity: 1 }]
    };
    const dummyResponse: ApiResponse = { success: true, message: 'Order created' };

    service.createOrder(dummyOrder).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(endpoints.payOrder.path);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
});
