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
    const validEvent = { charCode: 50 } as KeyboardEvent;
    const result = component.validateNumbers(validEvent);
    expect(result).toBeTrue();
  });

  it('should return false for non-numeric input', () => {
    const invalidEvent = { charCode: 65 } as KeyboardEvent;
    const result = component.validateNumbers(invalidEvent);
    expect(result).toBeFalse();
  });


  it('should return true for valid character input (uppercase letters)', () => {
    const validEventUppercase = { charCode: 65 } as KeyboardEvent;
    const result = component.validateCharacters(validEventUppercase);
    expect(result).toBeTrue();
  });

  it('should return true for valid character input (lowercase letters)', () => {
    const validEventLowercase = { charCode: 97 } as KeyboardEvent;
    const result = component.validateCharacters(validEventLowercase);
    expect(result).toBeTrue();
  });

  it('should return true for space character input', () => {
    const spaceEvent = { charCode: 32 } as KeyboardEvent;
    const result = component.validateCharacters(spaceEvent);
    expect(result).toBeTrue();
  });

  it('should return false for numeric input', () => {
    const invalidNumericEvent = { charCode: 48 } as KeyboardEvent;
    const result = component.validateCharacters(invalidNumericEvent);
    expect(result).toBeFalse();
  });

  it('should return false for special character input', () => {
    const invalidSpecialCharEvent = { charCode: 33 } as KeyboardEvent;
    const result = component.validateCharacters(invalidSpecialCharEvent);
    expect(result).toBeFalse();
  });

  it('should throw an error for null input', () => {
    expect(() => component.validateCharacters(null as any)).toThrowError();
  });

  it('should throw an error for undefined input', () => {
    expect(() => component.validateCharacters(undefined as any)).toThrowError();
  });

  it('should close the dialog with the given value', () => {
    const closeValue = 1;
    component.close(closeValue);
    expect(dialogRef.close).toHaveBeenCalledWith(closeValue);
  });


});
