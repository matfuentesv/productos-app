import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AdminComponent} from './admin.component';

import {of} from 'rxjs';
import {UserModalComponent} from '../../../shared/components/user-modal/user-modal.component';
import {EditUserModalComponent} from '../../../shared/components/edit-user-modal/edit-user-modal.component';

describe('AdminComponent - Dialogs and Methods', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule,
        AdminComponent,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open the UserModalComponent and reload data when rsp is 1', () => {
    const dialogRefSpy = {
      afterClosed: () => of(1) // Simular que el diálogo devuelve 1
    };
    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    spyOn(component.ngZone, 'run').and.callFake((fn) => fn());
    spyOn(component, 'loadData');

    component.openModal();

    expect(dialogSpy.open).toHaveBeenCalledWith(UserModalComponent, { data: { users: component.user }, disableClose: true });
    expect(component.ngZone.run).toHaveBeenCalled();
    expect(component.loadData).toHaveBeenCalled();
  });

  it('should open the EditUserModalComponent and reload data when result is 1', () => {
    const userMock = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      rut: '12345678-9',
      email: 'test@example.com',
      phone: '123456789',
      address: 'Test Address',
      password: 'password',
      roles: ['admin']
    };

    const dialogRefSpy = {
      afterClosed: () => of(1) // Simular que el diálogo devuelve 1
    };
    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    spyOn(component.ngZone, 'run').and.callFake((fn) => fn());
    spyOn(component, 'loadData');

    component.editElement(userMock);

    expect(dialogSpy.open).toHaveBeenCalledWith(EditUserModalComponent, { data: { users: component.user, user: userMock }, disableClose: true });
    expect(component.ngZone.run).toHaveBeenCalled();
    expect(component.loadData).toHaveBeenCalled();
  });
});
