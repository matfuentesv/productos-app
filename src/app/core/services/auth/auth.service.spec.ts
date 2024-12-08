import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {DataService} from '../data/data.service';
import {of} from 'rxjs';
import {User} from '../../../shared/models/user';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;
  let dataService: jasmine.SpyObj<DataService>;

  const mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      rut: '12345678-9',
      email: 'john.doe@example.com',
      phone: '123456789',
      address: '123 Street',
      password: 'Password1',
      rol: { id: 1, name: 'customer', description: 'Customer role' }
    },
    {
      id: 2,
      firstName: 'Admin',
      lastName: 'User',
      rut: '98765432-1',
      email: 'admin@example.com',
      phone: '987654321',
      address: '456 Avenue',
      password: 'AdminPass1',
      rol: { id: 2, name: 'Admin', description: 'Admin role' }
    }
  ];

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    dataService = jasmine.createSpyObj('DataService', ['getUsers']);

    dataService.getUsers.and.returnValue(of(mockUsers)); // Configurar el espía antes de instanciar el servicio

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: router },
        { provide: DataService, useValue: dataService }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load users on initialization', () => {
    service.loadUsers();
    expect(service['users']).toEqual(mockUsers);
  });

  it('should login a user with correct credentials', () => {
    service.loadUsers();
    const result = service.login('john.doe@example.com', 'Password1');
    expect(result).toBeTrue();
    expect(service.isLoggedIn.value).toBeTrue();
    expect(service.userNameSubject.value).toBe('John');
    expect(service.userRoleSubject.value).toBe('customer');
    expect(service.currentUser).toEqual(mockUsers[0]);
  });

  it('should not login a user with incorrect credentials', () => {
    service.loadUsers();
    const result = service.login('john.doe@example.com', 'WrongPassword');
    expect(result).toBeFalse();
    expect(service.isLoggedIn.value).toBeFalse();
    expect(service.userNameSubject.value).toBeNull();
    expect(service.userRoleSubject.value).toBeNull();
    expect(service.currentUser).toBeNull();
  });

  it('should logout a user', () => {
    service.loadUsers();
    service.login('john.doe@example.com', 'Password1');
    service.logout();
    expect(service.isLoggedIn.value).toBeFalse();
    expect(service.userNameSubject.value).toBeNull();
    expect(service.userRoleSubject.value).toBeNull();
    expect(service.currentUser).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return authentication status', () => {
    expect(service.isAuthenticated()).toBeFalse();
    service.login('john.doe@example.com', 'Password1');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return the current user name', () => {
    service.loadUsers();
    service.login('john.doe@example.com', 'Password1');
    expect(service.getUserName()).toBe('John');
  });

  it('should return the current user role', () => {
    service.loadUsers();
    service.login('admin@example.com', 'AdminPass1');
    expect(service.getUserRole()).toBe('admin');
  });

  it('should return the current user', () => {
    service.loadUsers();
    service.login('john.doe@example.com', 'Password1');
    expect(service.getUser()).toEqual(mockUsers[0]);
  });

  it('should add a new user', () => {
    const newUser: User = {
      id: 3,
      firstName: 'New',
      lastName: 'User',
      rut: '11223344-5',
      email: 'new.user@example.com',
      phone: '1122334455',
      address: '789 Boulevard',
      password: 'NewUserPass1',
      rol: { id: 1, name: 'customer', description: 'Customer role' }
    };
    service.setUser(newUser);
    expect(service['users']).toContain(newUser);
  });
});
