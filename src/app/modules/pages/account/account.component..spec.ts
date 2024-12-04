import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AccountComponent} from './account.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of, throwError} from 'rxjs';
import {DataService} from '../../../core/services/data/data.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import {User} from '../../../shared/models/user';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const dataSpy = jasmine.createSpyObj('DataService', ['getUsers', 'addUser']);
    const authSpy = jasmine.createSpyObj('AuthService', [
      'getUser',
      'loadUsers',
      'isLoggedIn',
      'userNameSubject',
      'userRoleSubject',
    ]);

    // Mock para el método getUser
    authSpy.getUser.and.returnValue(of({ id: 1, firstName: 'Test', roles: ['admin'] }));

    authSpy.loadUsers.and.returnValue(of([])); // Simula el método loadUsers
    authSpy.isLoggedIn = { next: jasmine.createSpy('next') } as any; // Simula el comportamiento de isLoggedIn
    authSpy.userNameSubject = { next: jasmine.createSpy('next') } as any; // Simula el comportamiento de userNameSubject
    authSpy.userRoleSubject = { next: jasmine.createSpy('next') } as any; // Simula el comportamiento de userRoleSubject

    await TestBed.configureTestingModule({
      imports: [AccountComponent, ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: DataService, useValue: dataSpy },
        { provide: AuthService, useValue: authSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('loadUsers should call getUsers and handle success', async () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        rut: '12345678-9',
        email: 'john@example.com',
        phone: '987654321',
        address: '123 Street',
        password: 'Password1',
        roles: ['user'],
      },
    ];
    dataServiceSpy.getUsers.and.returnValue(of(mockUsers));
    spyOn(console, 'error');

    await component.loadUsers();

    expect(dataServiceSpy.getUsers).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('loadUsers should handle errors gracefully', async () => {
    dataServiceSpy.getUsers.and.returnValue(throwError(() => new Error('Error loading users')));
    spyOn(console, 'error');

    await component.loadUsers();

    expect(console.error).toHaveBeenCalledWith('Error loading users:', jasmine.any(Error));
  });



});
