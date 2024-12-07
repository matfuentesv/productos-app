import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Standalone components should be imported directly
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "productos-app"', () => {
    expect(component.title).toBe('productos-app');
  });

  // it('should render title in the template', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('productos-app');
  // });
});
