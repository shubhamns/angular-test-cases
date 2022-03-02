import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { DeleteUserComponent } from './delete-user.component';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({ close: () => ({}) });
    const matSnackBarStub = () => ({ open: () => ({}) });
    const userServiceStub = () => ({
      deleteUser: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeleteUserComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: UserService, useFactory: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onNoClick', () => {
    it('makes expected calls', () => {
      const matDialogRefStub = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.onNoClick();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  describe('confirmDelete', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'openSnackBar').and.callThrough();
      spyOn(userServiceStub, 'deleteUser').and.callThrough();
      component.confirmDelete();
      expect(component.openSnackBar).toHaveBeenCalled();
      expect(userServiceStub.deleteUser).toHaveBeenCalled();
    });
  });
});
