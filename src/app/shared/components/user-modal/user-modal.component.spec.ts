import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserModalComponent} from './user-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Ng2Rut2} from '../../directives/ng2-rut/ng2-rut.module';
import {DataService} from '../../../core/services/data/data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserModalComponent,
        BrowserAnimationsModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        Ng2Rut2,
        HttpClientTestingModule,
      ],
      providers:[
        DataService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
