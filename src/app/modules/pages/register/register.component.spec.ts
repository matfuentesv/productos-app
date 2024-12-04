import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {of, throwError} from 'rxjs';
import {RegisterComponent} from './register.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {DataService} from '../../../core/services/data/data.service';
import {User} from '../../../shared/models/user';
import {LoginModalComponent} from '../../../shared/components/login-modal/login-modal.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUser', 'loadUsers', 'isLoggedIn', 'userNameSubject', 'userRoleSubject']);
    mockDataService = jasmine.createSpyObj('DataService', ['addUser', 'getUsers']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgIf,
        NgClass,
        RegisterComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: DataService, useValue: mockDataService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls['firstName']).toBeDefined();
    expect(component.registerForm.controls['lastName']).toBeDefined();
    expect(component.registerForm.controls['rut']).toBeDefined();
    expect(component.registerForm.controls['email']).toBeDefined();
    expect(component.registerForm.controls['phone']).toBeDefined();
    expect(component.registerForm.controls['address']).toBeDefined();
    expect(component.registerForm.controls['password']).toBeDefined();
    expect(component.registerForm.controls['promo']).toBeDefined();
  });

  it('should open login modal', () => {
    component.openModal();
    expect(mockDialog.open).toHaveBeenCalledWith(LoginModalComponent, {});
  });

  it('should not submit form if invalid', fakeAsync(() => {
    component.registerForm.setValue({
      firstName: '',
      lastName: '',
      rut: '',
      phone: '',
      address: '',
      email: '',
      password: '',
      promo: false
    });

    component.onSubmit();
    tick();

    expect(mockDataService.addUser).not.toHaveBeenCalled();
    expect(mockSnackBar.open).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));

  it('should submit form if valid', fakeAsync(() => {
    const user: User = {
      id: 10,
      firstName: 'Jane',
      lastName: 'Doe',
      rut: '19.033.397-3',
      email: 'jane.doe@example.com',
      phone: '0987654321',
      address: '456 Main St',
      password: 'Password2',
      roles: ['admin']
    };
    mockAuthService.loadUsers.and.returnValue([user]);
    mockAuthService.getUser.and.returnValue(user);
    mockDataService.addUser.and.returnValue(of({}));
    mockDataService.getUsers.and.returnValue(of([user]));

    component.ngOnInit();
    component.registerForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      rut: '98765432-1',
      phone: '0987654321',
      address: '456 Main St',
      email: 'jane.doe@example.com',
      password: 'Password2',
      promo: true
    });

    component.onSubmit();
    tick();

    expect(mockDataService.addUser).toHaveBeenCalled();

  }));

  it('should handle error on form submission', fakeAsync(() => {
    const user: User = {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      rut: '98765432-1',
      email: 'jane.doe@example.com',
      phone: '0987654321',
      address: '456 Main St',
      password: 'Password2',
      roles: ['admin']
    };
    mockAuthService.loadUsers.and.returnValue([user]);
    mockAuthService.getUser.and.returnValue(user);
    mockDataService.addUser.and.returnValue(throwError('Service error'));

    component.ngOnInit();
    component.registerForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      rut: '98765432-1',
      phone: '0987654321',
      address: '456 Main St',
      email: 'jane.doe@example.com',
      password: 'Password2',
      promo: true
    });

    component.onSubmit();
    tick();

    expect(mockDataService.addUser).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Error en el registro o login', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));
});
