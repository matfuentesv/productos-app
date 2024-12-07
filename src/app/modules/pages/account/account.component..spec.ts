import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgClass, NgIf} from '@angular/common';
import Swal from 'sweetalert2';
import {AccountComponent} from './account.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {User} from '../../../shared/models/user';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUser', 'loadUsers', 'isLoggedIn', 'userNameSubject', 'userRoleSubject']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgIf,
        NgClass,
        AccountComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.accountForm).toBeDefined();
    expect(component.accountForm.controls['firstName']).toBeDefined();
    expect(component.accountForm.controls['lastName']).toBeDefined();
    expect(component.accountForm.controls['rut']).toBeDefined();
    expect(component.accountForm.controls['email']).toBeDefined();
    expect(component.accountForm.controls['phone']).toBeDefined();
    expect(component.accountForm.controls['address']).toBeDefined();
    expect(component.accountForm.controls['password']).toBeDefined();
  });

  it('should patch the form with user data on init', () => {
    const user: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      rut: '12345678-9',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'Password1',
      rol: {
        id: 2,
        name: "Customer",
        description: "Rol Customer"
      }
    };
    mockAuthService.getUser.and.returnValue(user);
    mockAuthService.loadUsers.and.returnValue([user]);

    component.ngOnInit();

    expect(component.accountForm.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      rut: '12345678-9',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      password: 'Password1'
    });
  });

  it('should validate numbers correctly', () => {
    const event = { charCode: 49 }; // '1'
    expect(component.validateNumbers(event)).toBeTrue();

    const invalidEvent = { charCode: 65 }; // 'A'
    expect(component.validateNumbers(invalidEvent)).toBeFalse();
  });

  it('should not update user if form is invalid', () => {
    component.accountForm.setValue({
      firstName: '',
      lastName: '',
      rut: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    });

    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false }));

    component.onSubmit();

    expect(mockSnackBar.open).not.toHaveBeenCalled();
  });

  it('should validate password as invalid if it does not meet requirements', () => {
    const passwordControl = component.accountForm.controls['password'];

    // Validación de longitud mínima
    passwordControl.setValue('short');
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['minlength']).toBeDefined();
    expect(passwordControl.errors?.['minlength']?.requiredLength).toBe(6);
    expect(passwordControl.errors?.['minlength']?.actualLength).toBe(5);

    // Validación de patrón (sin mayúsculas)
    passwordControl.setValue('nouppercase1');
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['pattern']).toBeDefined();
    expect(passwordControl.errors?.['pattern']?.requiredPattern).toBe('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$');
    expect(passwordControl.errors?.['pattern']?.actualValue).toBe('nouppercase1');

    // Contraseña válida
    passwordControl.setValue('ValidPassword1');
    expect(passwordControl.valid).toBeTrue();
    expect(passwordControl.errors).toBeNull();
  });


  it('should validate email as invalid if incorrect format', () => {
    const emailControl = component.accountForm.controls['email'];

    emailControl.setValue('invalidemail');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['email']).toBeTrue();

    emailControl.setValue('valid.email@example.com');
    expect(emailControl.valid).toBeTrue();
  });
});
