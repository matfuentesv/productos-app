import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {RegisterComponent} from './register.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {DataService} from '../../../core/services/data/data.service';
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
    mockAuthService = jasmine.createSpyObj('AuthService', ['loadUsers', 'getUser']);
    mockAuthService.isLoggedIn = jasmine.createSpyObj('BehaviorSubject<boolean>', ['next']);
    mockAuthService.userNameSubject = jasmine.createSpyObj('BehaviorSubject<string | null>', ['next']);
    mockAuthService.userRoleSubject = jasmine.createSpyObj('BehaviorSubject<string | null>', ['next']);

    mockAuthService.isLoggedIn = new BehaviorSubject<boolean>(false);
    mockAuthService.userNameSubject = new BehaviorSubject<string | null>(null);
    mockAuthService.userRoleSubject = new BehaviorSubject<string | null>(null);

    spyOn(mockAuthService.isLoggedIn, 'next').and.callThrough();
    spyOn(mockAuthService.userNameSubject, 'next').and.callThrough();
    spyOn(mockAuthService.userRoleSubject, 'next').and.callThrough();

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

  // it('should submit form if valid', fakeAsync(() => {
  //   const user: User = {
  //     id: 10,
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     rut: '19.033.397-3',
  //     email: 'jane.doe@example.com',
  //     phone: '0987654321',
  //     address: '456 Main St',
  //     password: 'Password2',
  //     rol: {
  //       id: 1,
  //       name: "Admin",
  //       description: "Rol Admin"
  //     }
  //   };
  //   mockAuthService.loadUsers.and.returnValue([user]);
  //   mockAuthService.getUser.and.returnValue(user);
  //   mockDataService.addUser.and.returnValue(of({}));
  //   mockDataService.getUsers.and.returnValue(of([user]));
  //
  //   component.ngOnInit();
  //   component.registerForm.setValue({
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     rut: '98765432-1',
  //     phone: '0987654321',
  //     address: '456 Main St',
  //     email: 'jane.doe@example.com',
  //     password: 'Password2',
  //     promo: true
  //   });
  //
  //   component.onSubmit();
  //   tick();
  //
  //   expect(mockDataService.addUser).toHaveBeenCalled();
  //
  // }));

  // it('should handle error on form submission', fakeAsync(() => {
  //   const user: any = {
  //     id: 1,
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     rut: '19.033.397-3',
  //     email: 'jane.doe@example.com',
  //     phone: '0987654321',
  //     address: '456 Main St',
  //     password: 'Password2',
  //     promo:true,
  //     rol:{
  //       id: 2
  //     }
  //   };
  //   //mockAuthService.loadUsers.and.returnValue([user]);
  //   mockAuthService.getUser.and.returnValue(user);
  //   mockDataService.createUser.and.returnValue(throwError('Service error'));
  //
  //   component.ngOnInit();
  //   component.registerForm.setValue({
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     rut: '98765432-1',
  //     phone: '0987654321',
  //     address: '456 Main St',
  //     email: 'jane.doe@example.com',
  //     password: 'Password2',
  //     promo: true,
  //     //roles: ['admin']
  //   });
  //
  //   component.onSubmit();
  //   tick();
  //
  //   expect(mockDataService.addUser).toHaveBeenCalled();
  //   expect(mockSnackBar.open).toHaveBeenCalledWith('Error en el registro o login', 'Cerrar', {
  //     duration: 3000,
  //     horizontalPosition: 'start',
  //     verticalPosition: 'bottom'
  //   });
  //   expect(mockRouter.navigate).not.toHaveBeenCalled();
  // }));


  // it('should handle error and display a SnackBar message', fakeAsync(() => {
  //   const user: any = {
  //     id: 2,
  //     firstName: 'Updated Name',
  //     lastName: 'Updated LastName',
  //     rut: '19.033.397-3',
  //     email: 'updated.email@example.com',
  //     phone: '987654321',
  //     address: '456 Avenue',
  //     password: 'UpdatedPassword1',
  //     roles: ['admin']
  //   };
  //
  //   // Ajuste en el mock
  //   mockAuthService.loadUsers.and.returnValue([user]); // Retorna un array directamente
  //   mockAuthService.getUser.and.returnValue(user);
  //   mockDataService.addUser.and.returnValue(throwError(() => 'Service error')); // Error simulado
  //
  //   component.ngOnInit();
  //
  //   component.registerForm.setValue({
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     rut: user.rut,
  //     phone: user.phone,
  //     address: user.address,
  //     email: user.email,
  //     password: user.password,
  //     promo: true
  //   });
  //
  //   component.onSubmit();
  //   tick();
  //
  //   expect(mockDataService.addUser).toHaveBeenCalled();
  //   expect(mockSnackBar.open).toHaveBeenCalledWith('Error en el registro o login', 'Cerrar', {
  //     duration: 3000,
  //     horizontalPosition: 'start',
  //     verticalPosition: 'bottom'
  //   });
  //   expect(mockRouter.navigate).not.toHaveBeenCalled();
  // }));

  it('should return true for uppercase letters in validateCharacters', () => {
    const event = { charCode: 65 }; // 'A'
    expect(component.validateCharacters(event)).toBe(true);
  });

  it('should return true for lowercase letters in validateCharacters', () => {
    const event = { charCode: 97 }; // 'a'
    expect(component.validateCharacters(event)).toBe(true);
  });

  it('should return true for space in validateCharacters', () => {
    const event = { charCode: 32 }; // ' '
    expect(component.validateCharacters(event)).toBe(true);
  });

  it('should return false for numbers in validateCharacters', () => {
    const event = { charCode: 48 }; // '0'
    expect(component.validateCharacters(event)).toBe(false);
  });

  it('should return false for special characters in validateCharacters', () => {
    const event = { charCode: 64 }; // '@'
    expect(component.validateCharacters(event)).toBe(false);
  });

  it('should return true for valid numeric input in validateNumbers', () => {
    const event = { charCode: 50 }; // '2'
    expect(component.validateNumbers(event)).toBe(true);
  });

  it('should return true for "+" character in validateNumbers', () => {
    const event = { charCode: 107 }; // '+'
    expect(component.validateNumbers(event)).toBe(true);
  });

  it('should return false for non-numeric input in validateNumbers', () => {
    const event = { charCode: 65 }; // 'A'
    expect(component.validateNumbers(event)).toBe(false);
  });

});
