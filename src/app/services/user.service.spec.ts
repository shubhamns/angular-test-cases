import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { User } from '../models/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('createUser', () => {
    xit('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const userStub: User = <any>{};
      service.createUser(userStub).subscribe(res => {
        expect(res).toEqual(userStub);
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('POST');
      req.flush(userStub);
      httpTestingController.verify();
    });
  });

  describe('getUsers', () => {
    xit('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getUsers().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
