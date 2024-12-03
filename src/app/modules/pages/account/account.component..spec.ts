import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AccountComponent} from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as valid if all fields are correctly filled', () => {
    component.accountForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      rut: '19.033.397-3|',
      email: 'jane.doe@example.com',
      phone: '987654321',
      address: '123 Example Street',
      password: 'StrongPass1',
    });

    expect(component.accountForm.valid).toBeTrue();
  });

  it('should mark the form as invalid if email is incorrect', () => {
    component.accountForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      rut: '19.033.397-3',
      email: 'invalid-email',
      phone: '987654321',
      address: '123 Example Street',
      password: 'StrongPass1',
    });
    expect(component.accountForm.valid).toBeFalse();
    expect(component.accountForm.controls['email'].errors).toBeTruthy();
  });

  it('should mark the form as invalid if RUT is incorrect', () => {
    component.accountForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      rut: 'invalid-rut',
      email: 'jane.doe@example.com',
      phone: '987654321',
      address: '123 Example Street',
      password: 'StrongPass1',
    });
    expect(component.accountForm.valid).toBeFalse();
    expect(component.accountForm.controls['rut'].errors).toBeTruthy();
  });

  it('should not submit the form if invalid', () => {
    spyOn(console, 'log');
    component.accountForm.setValue({
      firstName: 'Jane',
      lastName: '',
      rut: '19.033.397-3',
      email: 'jane.doe@example.com',
      phone: '987654321',
      address: '123 Example Street',
      password: 'StrongPass1',
    });
    component.onSubmit();
    expect(component.accountForm.valid).toBeFalse();
    expect(console.log).not.toHaveBeenCalledWith('Form Submitted');
  });

});
