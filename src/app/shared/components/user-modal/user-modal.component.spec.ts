import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataService} from '../../../core/services/data/data.service';
import {UserModalComponent} from './user-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<UserModalComponent>>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDataService = jasmine.createSpyObj('DataService', ['addUser']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        UserModalComponent
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: DataService, useValue: mockDataService },
        { provide: MAT_DIALOG_DATA, useValue: { users: [] } },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.controls['firstName']).toBeDefined();
    expect(component.userForm.controls['lastName']).toBeDefined();
    expect(component.userForm.controls['rut']).toBeDefined();
    expect(component.userForm.controls['email']).toBeDefined();
    expect(component.userForm.controls['phone']).toBeDefined();
    expect(component.userForm.controls['address']).toBeDefined();
    expect(component.userForm.controls['password']).toBeDefined();
    expect(component.userForm.controls['roles']).toBeDefined();
  });

  it('should close the dialog with a value', () => {
    component.close(1);
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });



  it('should not add a new user if form is invalid', () => {
    component.userForm.setValue({
      firstName: '',
      lastName: '',
      rut: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      roles: ''
    });

    component.onSubmit();

    expect(mockDataService.addUser).not.toHaveBeenCalled();
    expect(mockSnackBar.open).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should validate numbers correctly', () => {
    const event = { charCode: 49 }; // '1'
    expect(component.validateNumbers(event)).toBeTrue();

    const invalidEvent = { charCode: 65 }; // 'A'
    expect(component.validateNumbers(invalidEvent)).toBeFalse();
  });
});
