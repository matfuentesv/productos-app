import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AuthService} from './auth.service';
import {DataService} from '../data/data.service';
import {User} from '../../../shared/models/user';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    // Mock DataService with a default return value for getUsers
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getUsers']);
    dataServiceSpy.getUsers.and.returnValue(of([])); // Default empty array as observable

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: DataService, useValue: dataServiceSpy },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load users', () => {
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
        roles: ['customer'],
      },
    ];

    dataServiceSpy.getUsers.and.returnValue(of(mockUsers));

    const users = service.loadUsers();

    expect(dataServiceSpy.getUsers).toHaveBeenCalled();
    expect(users).toEqual(mockUsers);
  });

  it('should login successfully with correct credentials', () => {
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
        roles: ['customer'],
      },
    ];
    dataServiceSpy.getUsers.and.returnValue(of(mockUsers));

    const loginResult = service.login('user1@example.com', 'password1');

    expect(dataServiceSpy.getUsers).toHaveBeenCalled();
    expect(loginResult).toBeTrue();
    expect(service.isLoggedIn.value).toBeTrue();
    expect(service.getUserName()).toEqual('User1');
    expect(service.getUserRole()).toEqual('customer');
  });

  it('should fail login with incorrect credentials', () => {
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
        roles: ['customer'],
      },
    ];
    dataServiceSpy.getUsers.and.returnValue(of(mockUsers));

    const loginResult = service.login('user1@example.com', 'wrongpassword');

    expect(dataServiceSpy.getUsers).toHaveBeenCalled();
    expect(loginResult).toBeFalse();
    expect(service.isLoggedIn.value).toBeFalse();
  });

  it('should logout the user', () => {
    service.logout();

    expect(service.isLoggedIn.value).toBeFalse();
    expect(service.getUserName()).toBeNull();
    expect(service.getUserRole()).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return authentication status', () => {
    service.isLoggedIn.next(true);
    expect(service.isAuthenticated()).toBeTrue();

    service.isLoggedIn.next(false);
    expect(service.isAuthenticated()).toBeFalse();
  });



});
