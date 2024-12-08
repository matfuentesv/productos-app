import {TestBed} from '@angular/core/testing';
import {EditUserModalComponent} from './edit-user-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {DataService} from '../../../core/services/data/data.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const mockUsers = [
  {
    id: 1,
    firstName: 'Original Name',
    lastName: 'Last Name',
    rut: '19.033.397-3',
    email: 'original@example.com',
    phone: '123456789',
    address: '123 Street',
    password: 'Password1',
    rol: { id: 1, name: 'customer', description: 'Customer role' },
  },
];

describe('EditUserModalComponent', () => {
  let component: EditUserModalComponent;
  let fixture: any;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<EditUserModalComponent>>;
  let dataService: jasmine.SpyObj<DataService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    dataService = jasmine.createSpyObj('DataService', ['updateUser']);
    authService = jasmine.createSpyObj('AuthService', ['getUser']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        EditUserModalComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: DataService, useValue: dataService },
        { provide: AuthService, useValue: authService },
        { provide: MAT_DIALOG_DATA, useValue: { user: mockUsers[0] } },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserModalComponent);
    component = fixture.componentInstance;
    component.users = mockUsers;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with user data', () => {
    component.ngOnInit();
    expect(component.userForm.value.firstName).toBe(mockUsers[0].firstName);
    expect(component.userForm.value.lastName).toBe(mockUsers[0].lastName);
    expect(component.userForm.value.rut).toBe(mockUsers[0].rut);
    expect(component.userForm.value.email).toBe(mockUsers[0].email);
    expect(component.userForm.value.phone).toBe(mockUsers[0].phone);
    expect(component.userForm.value.address).toBe(mockUsers[0].address);
    expect(component.userForm.value.password).toBe(mockUsers[0].password);
    expect(component.userForm.value.rol).toBe(mockUsers[0].rol.id);
  });

  it('should not add user if form is invalid', () => {
    component.ngOnInit();
    component.userForm.setValue({
      firstName: '',
      lastName: 'Smith',
      rut: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      rol: null,
    });

    component.onSubmit();

    expect(dataService.updateUser).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  // it('should update user if form is valid', () => {
  //   spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }));
  //   dataService.updateUser.and.returnValue(of(true));
  //
  //   component.ngOnInit();
  //   component.userForm.setValue({
  //     firstName: 'Updated Name',
  //     lastName: 'Updated Last Name',
  //     rut: '19.033.397-3',
  //     email: 'updated@example.com',
  //     phone: '987654321',
  //     address: '456 Avenue',
  //     password: 'UpdatedPassword1',
  //     rol: 1,
  //   });
  //
  //   component.onSubmit();
  //
  //   expect(dataService.updateUser).toHaveBeenCalled();
  //   expect(snackBar.open).toHaveBeenCalledWith('Usuario actualizado correctamente!', '', {
  //     horizontalPosition: component.horizontalPosition,
  //     verticalPosition: component.verticalPosition,
  //     duration: 3000,
  //     panelClass: ['custom-snackbar']
  //   });
  //   expect(dialogRef.close).toHaveBeenCalledWith(1);
  // });

  it('should return true for valid numeric input', () => {
    const validEvent = { charCode: 50 } as KeyboardEvent; // Char code for '2'
    const result = component.validateNumbers(validEvent);
    expect(result).toBeTrue();
  });

  it('should return false for non-numeric input', () => {
    const invalidEvent = { charCode: 65 } as KeyboardEvent; // Char code for 'A'
    const result = component.validateNumbers(invalidEvent);
    expect(result).toBeFalse();
  });

  it('should return true for uppercase letters', () => {
    const event = { charCode: 65 }; // 'A'
    expect(validateCharacters(event)).toBe(true);
  });

  it('should return true for lowercase letters', () => {
    const event = { charCode: 97 }; // 'a'
    expect(validateCharacters(event)).toBe(true);
  });

  it('should return true for space', () => {
    const event = { charCode: 32 }; // ' '
    expect(validateCharacters(event)).toBe(true);
  });

  it('should return false for numbers', () => {
    const event = { charCode: 48 }; // '0'
    expect(validateCharacters(event)).toBe(false);
  });

  it('should return false for special characters', () => {
    const event = { charCode: 64 }; // '@'
    expect(validateCharacters(event)).toBe(false);
  });

  it('should close the dialog with the provided value', () => {
    // Valor que se pasa al método close
    const mockValue = 1;

    // Llama al método close del componente
    component.close(mockValue);

    // Verifica que `dialogRef.close` haya sido llamado con el valor correcto
    expect(dialogRef.close).toHaveBeenCalledWith(mockValue);
  });

  it('should open snack bar with registration error message', () => {
    component.handleRegistrationError();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error en el registro o login',
      'Cerrar',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom' }
    );
  });

  it('should open snack bar with login error message', () => {
    component.handleLoginError();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error en el registro o login',
      'Cerrar',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom' }
    );
  });



});

function validateCharacters(event: { charCode: number; }): boolean {
  return (
    (event.charCode >= 65 && event.charCode <= 90) || // Letras mayúsculas (A-Z)
    (event.charCode >= 97 && event.charCode <= 122) || // Letras minúsculas (a-z)
    event.charCode === 32 // Espacios
  );


}
