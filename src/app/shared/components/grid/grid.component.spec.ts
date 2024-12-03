import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent, MatProgressSpinnerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    component.title = 'Productos Destacados';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(titleElement.textContent).toContain('Productos Destacados');
  });

  it('should display the loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should not display the loading spinner when loading is false', () => {
    component.loading = false;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeNull();
  });

  it('should render products correctly', () => {
    component.chunkedProducts = [
      [
        {
          name: 'Producto 1',
          description: 'Descripción del producto 1',
          price: 100,
          discount: 10,
          originalPrice: 110,
          image: 'image1.png',
          rating: 4,
          reviews: 20,
        },
      ],
    ];
    fixture.detectChanges();

    const productTitle = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(productTitle.textContent).toContain('Producto 1');
  });

  it('should call addToCart when the button is clicked', () => {
    spyOn(component, 'addToCart');

    component.chunkedProducts = [
      [
        {
          name: 'Producto 1',
          description: 'Descripción del producto 1',
          price: 100,
          discount: 10,
          originalPrice: 110,
          image: 'image1.png',
          rating: 4,
          reviews: 20,
        },
      ],
    ];
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.btn')).nativeElement;
    button.click();

    expect(component.addToCart).toHaveBeenCalled();
  });

  it('should return correct star classes from getStars', () => {
    const stars = component.getStars(3);
    expect(stars.length).toBe(5);
    expect(stars).toEqual([
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning',
    ]);
  });

});
