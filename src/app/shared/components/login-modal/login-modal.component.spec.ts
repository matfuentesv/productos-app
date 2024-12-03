import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './login-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { By } from '@angular/platform-browser';
import {AuthService} from '../../../core/services/auth/auth.service';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginModalComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form with email and password fields', () => {
    const emailInput = fixture.debugElement.query(By.css('#email'));
    const passwordInput = fixture.debugElement.query(By.css('#password'));

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitButton.disabled).toBeTrue();

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });

  it('should call onSubmit when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call close when the close button is clicked', () => {
    spyOn(component, 'close');
    const closeButton = fixture.debugElement.query(By.css('.btn-close'));
    closeButton.triggerEventHandler('click', null);

    expect(component.close).toHaveBeenCalled();
  });

  it('should display email error message if email is invalid', () => {
    const emailInput = component.loginForm.controls['email'];
    emailInput.setValue('');
    emailInput.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error')).nativeElement.textContent;
    expect(errorMessage).toContain('El correo es obligatorio');
  });

  it('should show authentication error if isValidUser is false', () => {
    component.isValidUser = false;
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error')).nativeElement.textContent;
    expect(errorMessage).toContain('Email y/o clave incorrectos');
  });
});
