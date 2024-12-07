import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DataService} from './data.service';
import {ProductsResponse} from '../../../shared/models/products';
import {User} from '../../../shared/models/user';
import {endpoints} from '../../../enviroments/endpoints';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies no unmatched requests are pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const mockResponse: ProductsResponse = {
      notebooks: [
        {
          name: 'Notebook 1',
          price: 1000,
          discount: 5,
          description: 'High-performance notebook',
          image: 'notebook1.jpg',
          category: 'Electronics',
          originalPrice: 1050,
          rating: 4.8,
          reviews: 200,
          quantity: 5,
        },
      ],
      cellPhones: [
        {
          name: 'Cellphone 1',
          price: 700,
          discount: 10,
          description: 'Smartphone with latest features',
          image: 'cellphone1.jpg',
          category: 'Electronics',
          originalPrice: 770,
          rating: 4.5,
          reviews: 150,
          quantity: 10,
        },
      ],
      coffeeMakers: [],
      airConditioning: [],
      outstanding: [
        {
          name: 'Outstanding Product',
          price: 500,
          discount: 15,
          description: 'Top-rated product',
          image: 'outstanding1.jpg',
          category: 'Home Appliances',
          originalPrice: 588,
          rating: 4.9,
          reviews: 300,
          quantity: 7,
        },
      ],
    };

    service.getProducts().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(endpoints.findAllProduct.path);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        rut: '12345678-9',
        firstName: 'User1',
        lastName: 'Test1',
        email: 'user1@example.com',
        phone: '123456789',
        address: 'Address 1',
        password: 'password1',
        rol: {
          id: 2,
          name: "Customer",
          description: "Rol Customer"
        }
      },
      {
        id: 2,
        rut: '98765432-1',
        firstName: 'User2',
        lastName: 'Test2',
        email: 'user2@example.com',
        phone: '987654321',
        address: 'Address 2',
        password: 'password2',
        rol: {
          id: 2,
          name: "Customer",
          description: "Rol Customer"
        }
      },
    ];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(endpoints.findAllUsers.path);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should add a user', () => {
    const newUser: User = {
      id: 3,
      rut: '12312312-3',
      firstName: 'New',
      lastName: 'User',
      email: 'newuser@example.com',
      phone: '456123789',
      address: 'Address 3',
      password: 'newpassword',
      rol: {
        id: 2,
        name: "Customer",
        description: "Rol Customer"
      }
    };

    service.addUser([newUser]).subscribe((response) => {
      expect(response).toEqual(newUser);
    });

    const req = httpTestingController.expectOne(endpoints.findAllUsers.path);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('Bearer 2d4b8422-c7f4-4b1d-8b73-439bba7af688');
    req.flush(newUser);
  });
});
