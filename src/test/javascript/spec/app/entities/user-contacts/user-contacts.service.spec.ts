import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserContactsService } from 'app/entities/user-contacts/user-contacts.service';
import { IUserContacts, UserContacts } from 'app/shared/model/user-contacts.model';
import { Relation } from 'app/shared/model/enumerations/relation.model';

describe('Service Tests', () => {
  describe('UserContacts Service', () => {
    let injector: TestBed;
    let service: UserContactsService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserContacts;
    let expectedResult: IUserContacts | IUserContacts[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UserContactsService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new UserContacts(
        'ID',
        'AAAAAAA',
        'AAAAAAA',
        Relation.FATHER,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UserContacts', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new UserContacts()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UserContacts', () => {
        const returnedFromService = Object.assign(
          {
            userId: 'BBBBBB',
            name: 'BBBBBB',
            relation: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            email: 'BBBBBB',
            address: 'BBBBBB',
            city: 'BBBBBB',
            state: 'BBBBBB',
            country: 'BBBBBB',
            zipCode: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UserContacts', () => {
        const returnedFromService = Object.assign(
          {
            userId: 'BBBBBB',
            name: 'BBBBBB',
            relation: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            email: 'BBBBBB',
            address: 'BBBBBB',
            city: 'BBBBBB',
            state: 'BBBBBB',
            country: 'BBBBBB',
            zipCode: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UserContacts', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
