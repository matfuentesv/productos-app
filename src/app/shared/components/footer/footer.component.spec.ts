import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyrightElement = compiled.querySelector('p.mt-4');
    expect(copyrightElement?.textContent).toContain('© 2024 Product Market. Todos los derechos reservados.');
  });

  it('should contain a subscription form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subscriptionInput = compiled.querySelector('input[type="email"]');
    const subscriptionButton = compiled.querySelector('button[type="submit"]');
    expect(subscriptionInput).toBeTruthy();
    expect(subscriptionButton).toBeTruthy();
    expect(subscriptionButton?.textContent).toContain('Suscribirse');
  });

  it('should render the links section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.list-unstyled li a');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]?.textContent).toContain('Política de privacidad');
  });

  it('should render social media icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialIcons = compiled.querySelectorAll('.fa-facebook, .fa-twitter, .fa-instagram');
    expect(socialIcons.length).toBe(3);
  });
});
