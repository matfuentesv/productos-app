import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PagesComponent} from './pages.component';
import {AuthService} from '../../core/services/auth/auth.service';
import {CartService} from '../../core/services/cart/cart.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, NavigationEnd} from '@angular/router';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {filter} from 'rxjs/operators';
import {LoginModalComponent} from '../../shared/components/login-modal/login-modal.component';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let authServiceMock: any;
  let cartServiceMock: any;
  let routerMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    authServiceMock = {
      userName$: of('testUser'),
      userRole$: of('admin'),
      getUserName: () => 'testUser',
      getUserRole: () => 'admin',
      logout: jasmine.createSpy('logout')
    };

    cartServiceMock = {
      getCartItemCount: () => of(5)
    };

    routerMock = {
      events: of(new NavigationEnd(0, '', ''))
    };

    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ PagesComponent,RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userName and userRole', () => {
    expect(component.userName).toBe('testUser');
    expect(component.userRole).toBe('admin');
  });

  it('should update cartItemCount', () => {
    expect(component.cartItemCount).toBe(5);
  });

  it('should call logout on authService', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });

  it('should open login modal', () => {
    component.openModal();
    expect(dialogMock.open).toHaveBeenCalledWith(LoginModalComponent, {});
  });

  it('should update userName and userRole on NavigationEnd event', () => {
    // Simulamos un evento de navegación
    const navigationEnd = new NavigationEnd(0, '', '');
    routerMock.events = of(navigationEnd).pipe(filter(event => event instanceof NavigationEnd));

    // Forzamos la detección de cambios
    fixture.detectChanges();

    // Verificamos que los valores se actualizan correctamente
    expect(component.userName).toBe('testUser');
    expect(component.userRole).toBe('admin');
  });
});
