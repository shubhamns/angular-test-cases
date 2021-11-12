import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ReadUserComponent } from './read-user.component';
import { UserService } from './../../services/user.service';

describe('ReadUserComponent', () => {
  let component: ReadUserComponent;
  let fixture: ComponentFixture<ReadUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadUserComponent],
      imports: [RouterTestingModule, HttpClientModule, MatDialogModule],
      providers: [
        UserService,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
