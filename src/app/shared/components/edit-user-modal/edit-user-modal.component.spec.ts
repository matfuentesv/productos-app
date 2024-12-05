import {TestBed} from '@angular/core/testing';
import {EditUserModalComponent} from './edit-user-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';
import {AuthService} from '../../../core/services/auth/auth.service';
import {DataService} from '../../../core/services/data/data.service';

// Mock data
const mockData = {
  users: [
    {
      id: 1,
      firstName: 'Updated Name',
      lastName: 'Last Name',
      rut: '19.033.397-3',
      email: 'test@example.com',
      phone: '123456789',
      address: '123 Street',
      password: 'Password1',
      roles: ['admin'],
    },
  ],
  user: {
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
};

describe('EditUserModalComponent', () => {
  let component: EditUserModalComponent;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<EditUserModalComponent>>;
  let authService: jasmine.SpyObj<AuthService>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    // Create spies
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    authService = jasmine.createSpyObj('AuthService', ['getUser', 'isLoggedIn', 'userNameSubject', 'userRoleSubject'], {
      isLoggedIn: jasmine.createSpyObj('Subject', ['next']),
      userNameSubject: jasmine.createSpyObj('Subject', ['next']),
      userRoleSubject: jasmine.createSpyObj('Subject', ['next']),
    });
    dataService = jasmine.createSpyObj('DataService', ['addUser']);

    // Configure TestBed
    TestBed.configureTestingModule({
      imports: [EditUserModalComponent],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }, // Provide mock MAT_DIALOG_DATA
        { provide: AuthService, useValue: authService },
        { provide: DataService, useValue: dataService },
        FormBuilder,
      ],
    });

    // Create component
    component = TestBed.createComponent(EditUserModalComponent).componentInstance;
    component.data = mockData; // Pass mock data
  });

  it('should update user and call related services on valid form submission', () => {
    // Mock logged user
    authService.getUser.and.returnValue(mockData.user);

    // Mock addUser response
    dataService.addUser.and.returnValue(of({}));

    // Call ngOnInit to initialize userForm
    component.ngOnInit();

    // Set valid form data
    component.userForm.setValue({
      firstName: 'Updated Name',
      lastName: 'Updated LastName',
      rut: '19.033.397-3',
      email: 'updated.email@example.com',
      phone: '987654321',
      address: '456 Avenue',
      password: 'UpdatedPassword1',
      roles: 'admin',
    });

    // Call onSubmit
    component.onSubmit();

    // Expectations
    expect(dataService.addUser).toHaveBeenCalledWith(mockData.users);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Usuario actualizado correctamente!',
      '',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom', panelClass: ['custom-snackbar'] }
    );
    expect(authService.isLoggedIn.next).toHaveBeenCalledWith(true);
    expect(authService.userNameSubject.next).toHaveBeenCalledWith('Updated Name');
    expect(authService.userRoleSubject.next).toHaveBeenCalledWith('admin');
    expect(dialogRef.close).toHaveBeenCalledWith(1);
  });
});
