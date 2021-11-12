import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have createUser function', () => {
    expect(service.createUser).toBeTruthy();
  });

  it('should have getUsers function', () => {
    expect(service.getUsers).toBeTruthy();
  });

  it('#getUsers should return expected data', (done) => {
    const expectedData: any[] = [];
    service.getUsers().subscribe((data) => {
      expect(data.results).toEqual(expectedData);
      done();
    });
    // const req = httpMock.expectOne(
    //   'https://node-express-app-api.herokuapp.com/api/v1/user'
    // );
    // expect(req.request.method).toBe('GET');
    // req.flush(expectedData);
  });

  it('should have getUserById function', () => {
    expect(service.getUserById).toBeTruthy();
  });

  it('#getUserById should return expected data', (done) => {
    const expectedData: any = {};
    // service.getUserById().subscribe((data) => {
    //   expect(data.results).toEqual(expectedData);
    //   done();
    // });
  });

  it('should have updateUser function', () => {
    expect(service.updateUser).toBeTruthy();
  });

  it('should have deleteUser function', () => {
    expect(service.deleteUser).toBeTruthy();
  });
});
