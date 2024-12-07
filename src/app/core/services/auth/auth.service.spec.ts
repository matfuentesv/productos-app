import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Rol, User} from '../../../shared/models/user';
import {DataService} from '../data/data.service';

const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'Original Name',
    lastName: 'Last Name',
    rut: '19.033.397-3',
    email: 'original@example.com',
    phone: '123456789',
    address: '123 Street',
    password: 'Password1',
    rol: { id: 1, name: 'customer', description: 'Customer role' } as Rol,
  },
];

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // it('should add a new user with role and return the updated list', () => {
  //   const newUser: User = {
  //     id: 2,
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     rut: '19.033.397-3',
  //     email: 'john@example.com',
  //     phone: '123456789',
  //     address: '123 Street',
  //     password: 'Password1',
  //     rol: { id: 2, name: 'Admin', description: 'Administrator role' } as Rol,
  //   };
  //
  //   const updatedUsers = [...mockUsers, newUser];
  //
  //   service.addUser(updatedUsers).subscribe((users) => {
  //     expect(users).toEqual(updatedUsers);
  //   });
  //
  //   const req = httpMock.expectOne('http://localhost:8081/api/createUser'); // Replace with your actual API endpoint
  //   expect(req.request.method).toBe('POST');
  //   req.flush(updatedUsers);
  // });

  it('should retrieve all users', () => {
    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/findAllUsers'); // Replace with your actual API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  // it('should handle error when adding a user', () => {
  //   const newUser: User = {
  //     id: 2,
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     rut: '19.033.397-3',
  //     email: 'john@example.com',
  //     phone: '123456789',
  //     address: '123 Street',
  //     password: 'Password1',
  //     rol: { id: 2, name: 'Admin', description: 'Administrator role' } as Rol,
  //   };
  //
  //
  //
  //   service.createUser(newUser).subscribe({
  //     next: () => fail('Expected error, but got success response'),
  //     error: (error) => {
  //       expect(error.status).toBe(400);
  //     },
  //   });
  //
  //   const req = httpMock.expectOne('http://localhost:8081/api/createUser'); // Replace with your actual API endpoint
  //   expect(req.request.method).toBe('PUT');
  //   req.flush({ status: 400, statusText: 'Bad Request' });
  // });
});
