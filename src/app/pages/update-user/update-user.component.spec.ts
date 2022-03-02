import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { UpdateUserComponent } from './update-user.component';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: () => ({}) });
    const activatedRouteStub = () => ({ paramMap: { subscribe: (f: (arg0: {}) => any) => f({}) } });
    const formBuilderStub = () => ({ group: () => ({}) });
    const matSnackBarStub = () => ({ open: () => ({}) });
    const userServiceStub = () => ({
      getUserById: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      updateUser: () => ({
        pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UpdateUserComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: UserService, useFactory: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`submitted has default value`, () => {
    expect(component.submitted).toEqual(false);
  });

  it(`errorAlert has default value`, () => {
    expect(component.errorAlert).toEqual(`This field is required`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'createForm').and.callThrough();
      spyOn(component, 'loadUserById').and.callThrough();
      component.ngOnInit();
      expect(component.createForm).toHaveBeenCalled();
      expect(component.loadUserById).toHaveBeenCalled();
    });
  });

  describe('createForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('loadUserById', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getUserById').and.callThrough();
      component.loadUserById();
      expect(userServiceStub.getUserById).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'openSnackBar').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(userServiceStub, 'updateUser').and.callThrough();
      component.onSubmit();
      expect(component.openSnackBar).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(userServiceStub.updateUser).toHaveBeenCalled();
    });
  });
});
