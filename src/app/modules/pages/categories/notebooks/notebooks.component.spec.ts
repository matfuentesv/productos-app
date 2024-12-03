import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotebooksComponent } from './notebooks.component';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('NotebooksComponent', () => {
  let component: NotebooksComponent;
  let fixture: ComponentFixture<NotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotebooksComponent,HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebooksComponent);
    component = fixture.componentInstance;

    component.chunkedProducts = [
      [{ id: 1, name: 'Notebook 1' }, { id: 2, name: 'Notebook 2' }]
    ];
    component.loading = false;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chunkedProducts correctly', () => {
    expect(component.chunkedProducts).toBeDefined();
    expect(component.chunkedProducts.length).toBe(1);
  });

  it('should render the app-grid component', () => {
    const gridElement = fixture.debugElement.query(By.css('app-grid'));
    expect(gridElement).toBeTruthy();
  });

  it('should pass correct inputs to app-grid component', () => {
    const gridElement = fixture.debugElement.query(By.css('app-grid'));
    expect(gridElement.componentInstance.chunkedProducts).toEqual(component.chunkedProducts);
    expect(gridElement.componentInstance.loading).toBe(component.loading);
  });
});
