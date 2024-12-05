import {TestBed} from '@angular/core/testing';
import {UserModalComponent} from './user-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';
import {DataService} from '../../../core/services/data/data.service';
import {HttpClientModule} from '@angular/common/http';

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
    roles: ['customer'],
  },
];

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<UserModalComponent>>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    dataService = jasmine.createSpyObj('DataService', ['addUser']);

    TestBed.configureTestingModule({
      imports: [UserModalComponent, HttpClientModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: DataService, useValue: dataService },
        { provide: MAT_DIALOG_DATA, useValue: { users: mockUsers } },
        FormBuilder,
      ],
    });

    component = TestBed.createComponent(UserModalComponent).componentInstance;
    component.user = [...mockUsers];
  });

  it('should add a new user and show a success snackbar', () => {
    // Mock del servicio de agregar usuario
    dataService.addUser.and.returnValue(of({}));

    // Inicializar el formulario
    component.ngOnInit();

    // Configurar datos válidos en el formulario
    component.userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      rut: '19.033.397-3',
      email: 'john@example.com',
      phone: '123456789',
      address: '123 Street',
      password: 'Password1',
      roles: 'admin',
    });

    // Llamar a onSubmit
    component.onSubmit();

    // Verificar las expectativas
    expect(dataService.addUser).toHaveBeenCalledWith([
      {
        id: 1,
        firstName: 'Original Name',
        lastName: 'Last Name',
        rut: '19.033.397-3',
        email: 'original@example.com',
        phone: '123456789',
        address: '123 Street',
        password: 'Password1',
        roles: ['customer'],
      },
      {
        id: jasmine.any(Number),
        firstName: 'John',
        lastName: 'Doe',
        rut: '19.033.397-3',
        email: 'john@example.com',
        phone: '123456789',
        address: '123 Street',
        password: 'Password1',
        roles: ['admin'],
      },
    ]);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Usuario creado correctamente!',
      '',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom', panelClass: ['custom-snackbar'] }
    );
    expect(dialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should not add user if form is invalid', () => {
    // Inicializar el formulario con datos inválidos
    component.ngOnInit();
    component.userForm.setValue({
      firstName: '',
      lastName: 'Smith',
      rut: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      roles: '',
    });

    // Llamar a onSubmit
    component.onSubmit();

    // Verificar que no se llamaron los métodos
    expect(dataService.addUser).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should return true for valid numeric input', () => {
    const validEvent = { charCode: 50 }; // Char code for '2'
    const result = component.validateNumbers(validEvent);
    expect(result).toBeTrue();
  });

  it('should return true for "+" character input', () => {
    const plusEvent = { charCode: 107 }; // Char code for '+'
    const result = component.validateNumbers(plusEvent);
    expect(result).toBeTrue();
  });

  it('should return false for non-numeric input', () => {
    const invalidEvent = { charCode: 65 }; // Char code for 'A'
    const result = component.validateNumbers(invalidEvent);
    expect(result).toBeFalse();
  });

});
