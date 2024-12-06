import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminComponent} from './admin.component';
import {Subject} from 'rxjs';

describe('AdminComponent - Paginator Initialization', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule,AdminComponent // Agregado para evitar errores NG05105
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize userPaginator correctly when dataSource.paginator is null', () => {
    const paginatorMock = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>() // Observable simulado
    });
    component.dataSource = { paginator: null } as MatTableDataSource<any>;
    component.userPaginator = paginatorMock;

    component.initializePaginator();

    expect(component.dataSource.paginator).toBe(component.userPaginator);
  });

  it('should not reinitialize userPaginator if already set', () => {
    const mockPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });
    component.dataSource = { paginator: mockPaginator } as MatTableDataSource<any>;
    component.userPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });

    component.initializePaginator();

    expect(component.dataSource.paginator).toBe(mockPaginator);
  });

  it('should initialize productPaginator correctly when productDataSource.paginator is null', () => {
    const paginatorMock = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>() // Observable simulado
    });
    component.productDataSource = { paginator: null } as MatTableDataSource<any>;
    component.productPaginator = paginatorMock;

    component.initializePaginator();

    expect(component.productDataSource.paginator).toBe(component.productPaginator);
  });

  it('should not reinitialize productPaginator if already set', () => {
    const mockPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });
    component.productDataSource = { paginator: mockPaginator } as MatTableDataSource<any>;
    component.productPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });

    component.initializePaginator();

    expect(component.productDataSource.paginator).toBe(mockPaginator);
  });
});
