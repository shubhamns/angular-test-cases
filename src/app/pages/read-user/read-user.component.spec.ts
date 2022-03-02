import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../services/user.service';
import { ReadUserComponent } from './read-user.component';

describe('ReadUserComponent', () => {
  let component: ReadUserComponent;
  let fixture: ComponentFixture<ReadUserComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({
      open: () => ({
        afterClosed: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      }),
    });
    const userServiceStub = () => ({
      getUsers: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReadUserComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: UserService, useFactory: userServiceStub },
      ],
    });
    fixture = TestBed.createComponent(ReadUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([
      `sno`,
      `name`,
      `email`,
      `createdAt`,
      `updatedAt`,
      `update`,
      `delete`,
    ]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loadUser').and.callThrough();
      component.ngOnInit();
      expect(component.loadUser).toHaveBeenCalled();
    });
  });

  describe('loadUser', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService =
        fixture.debugElement.injector.get(UserService);
      spyOn(userServiceStub, 'getUsers').and.callThrough();
      component.loadUser();
      expect(userServiceStub.getUsers).toHaveBeenCalled();
    });
  });
});
