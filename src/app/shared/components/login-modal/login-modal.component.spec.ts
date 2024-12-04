import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth/auth.service';
import {LoginModalComponent} from './login-modal.component';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginModalComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should close the dialog', () => {
    component.close();
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });

  it('should navigate to home on successful login', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    mockAuthService.login.and.returnValue(true);

    component.onSubmit();

    expect(mockDialog.closeAll).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set isValidUser to false on failed login', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    mockAuthService.login.and.returnValue(false);

    component.onSubmit();

    expect(component.isValidUser).toBeFalse();
  });

  it('should navigate to recover-password on recoverPassword', () => {
    component.recoverPassword();
    expect(mockDialog.closeAll).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recover-password']);
  });

  it('should navigate to register on register', () => {
    component.register();
    expect(mockDialog.closeAll).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register']);
  });
});


