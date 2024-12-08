import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DataService} from './data.service';

import {endpoints} from '../../../enviroments/endpoints';
import {ProductsResponse} from '../../../shared/models/products';
import {User} from '../../../shared/models/user';
import {ApiResponse} from '../../../shared/models/api-response';

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

  it('should fetch products successfully', () => {
    const dummyProducts: ProductsResponse = {
      notebooks: [
        { name: 'Notebook 1', price: 1000, discount: 10, description: 'Description 1', image: 'image1.jpg', originalPrice: 1100, rating: 4.5, reviews: 10 },
        { name: 'Notebook 2', price: 1500, discount: 15, description: 'Description 2', image: 'image2.jpg', originalPrice: 1700, rating: 4.7, reviews: 20 }
      ],
      cellPhones: [],
      coffeeMakers: [],
      airConditioning: [],
      outstanding: []
    };

    service.getProducts().subscribe(products => {
      expect(products.notebooks.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(endpoints.findAllProduct.path);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should login successfully', () => {
    const dummyResponse = { token: '12345' };
    const email = 'test@example.com';
    const password = 'password';

    service.login(email, password).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(endpoints.login.path);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should create user successfully', () => {
    const dummyUser: User = {
      id: 1,
      rut: '12345678-9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'password',
      rol: { id: 1, name: 'Admin', description: 'Administrator' }
    };

    service.createUser(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(endpoints.createUser.path);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should update user successfully', () => {
    const dummyUser: User = {
      id: 1,
      rut: '12345678-9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'password',
      rol: { id: 1, name: 'Admin', description: 'Administrator' }
    };

    service.updateUser(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(endpoints.updateUser.path);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUser);
  });

  it('should delete user successfully', () => {
    const email = 'test@example.com';

    service.deleteUser(email).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${endpoints.deleteUser.path}${email}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should fetch users successfully', () => {
    const dummyUsers: User[] = [
      { id: 1, rut: '12345678-9', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890', address: '123 Main St', password: 'password', rol: { id: 1, name: 'Admin', description: 'Administrator' } },
      { id: 2, rut: '98765432-1', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phone: '0987654321', address: '456 Main St', password: 'password', rol: { id: 2, name: 'User', description: 'Regular User' } }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(endpoints.findAllUsers.path);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should add user successfully', () => {
    const dummyUser: User[] = [
      { id: 1, rut: '12345678-9', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890', address: '123 Main St', password: 'password', rol: { id: 1, name: 'Admin', description: 'Administrator' } }
    ];

    service.addUser(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(endpoints.findAllUsers.path);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should fetch orders successfully', () => {
    const dummyOrders: ({
      totalAmount: number;
      orderId: number;
      userName: string;
      products: {
        image: string;
        originalPrice: number;
        reviews: number;
        price: number;
        name: string;
        rating: number;
        discount: number;
        description: string
      }[]
    } | {
      totalAmount: number;
      orderId: number;
      userName: string;
      products: {
        image: string;
        originalPrice: number;
        reviews: number;
        price: number;
        name: string;
        rating: number;
        discount: number;
        description: string
      }[]
    })[] = [
      { orderId: 1, userName: 'John Doe', totalAmount: 300, products: [{ name: 'Product 1', price: 100, discount: 10, description: 'Description 1', image: 'image1.jpg', originalPrice: 110, rating: 4.5, reviews: 10 }] },
      { orderId: 2, userName: 'Jane Doe', totalAmount: 200, products: [{ name: 'Product 2', price: 200, discount: 20, description: 'Description 2', image: 'image2.jpg', originalPrice: 220, rating: 4.7, reviews: 20 }] }
    ];

    service.getOrders().subscribe(orders => {
      expect(orders.length).toBe(2);
      expect(orders).toEqual(dummyOrders);
    });

    const req = httpMock.expectOne(endpoints.findAllOrders.path);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });

  it('should create order successfully', () => {
    const dummyOrder = {
      userName: 'John Doe',
      products: [
        { productName: 'Product 1', price: 100, quantity: 2 },
        { productName: 'Product 2', price: 200, quantity: 1 }
      ]
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
