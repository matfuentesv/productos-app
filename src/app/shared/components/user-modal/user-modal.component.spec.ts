import {TestBed} from '@angular/core/testing';
import {UserModalComponent} from './user-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../core/services/data/data.service';
import {HttpClientModule} from '@angular/common/http';
import {Rol, User} from '../../../shared/models/user';

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

  // it('should add a new user and show a success snackbar', () => {
  //   dataService.addUser.and.returnValue(of({}));
  //
  //   component.ngOnInit();
  //
  //   component.userForm.setValue({
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     rut: '19.033.397-3',
  //     email: 'john@example.com',
  //     phone: '123456789',
  //     address: '123 Street',
  //     password: 'Password1',
  //     rol: { id: 2, name: 'Admin', description: 'Administrator role' } as Rol,
  //   });
  //
  //   component.onSubmit();
  //
  //   expect(dataService.addUser).toHaveBeenCalledWith([
  //     ...mockUsers,
  //     {
  //       id: jasmine.any(Number),
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       rut: '19.033.397-3',
  //       email: 'john@example.com',
  //       phone: '123456789',
  //       address: '123 Street',
  //       password: 'Password1',
  //       rol: { id: 2, name: 'Admin', description: 'Administrator role' } as Rol,
  //     },
  //   ]);
  //
  //   expect(snackBar.open).toHaveBeenCalledWith(
  //     'Usuario creado correctamente!',
  //     '',
  //     { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom', panelClass: ['custom-snackbar'] }
  //   );
  //   expect(dialogRef.close).toHaveBeenCalledWith(1);
  // });

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

    expect(dataService.addUser).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should return true for valid numeric input', () => {
    const validEvent = { charCode: 50 } as KeyboardEvent; // Char code for '2'
    const result = component.validateNumbers(validEvent);
    expect(result).toBeTrue();
  });

  it('should return true for "+" character input', () => {
    const plusEvent = { charCode: 43 } as KeyboardEvent; // Char code for '+'
    const result = component.validateNumbers(plusEvent);
    expect(result).toBeTrue();
  });

  it('should return false for non-numeric input', () => {
    const invalidEvent = { charCode: 65 } as KeyboardEvent; // Char code for 'A'
    const result = component.validateNumbers(invalidEvent);
    expect(result).toBeFalse();
  });
});
