import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAddressService } from 'app/entities/user-address/user-address.service';
import { IUserAddress, UserAddress } from 'app/shared/model/user-address.model';
import { Country } from 'app/shared/model/enumerations/country.model';
import { AddressType } from 'app/shared/model/enumerations/address-type.model';

describe('Service Tests', () => {
  describe('UserAddress Service', () => {
    let injector: TestBed;
    let service: UserAddressService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserAddress;
    let expectedResult: IUserAddress | IUserAddress[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UserAddressService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new UserAddress('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', Country.USA, 'AAAAAAA', AddressType.PRIMARY);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UserAddress', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new UserAddress()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UserAddress', () => {
        const returnedFromService = Object.assign(
          {
            userId: 'BBBBBB',
            address: 'BBBBBB',
            city: 'BBBBBB',
            state: 'BBBBBB',
            country: 'BBBBBB',
            zipcode: 'BBBBBB',
            addressType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UserAddress', () => {
        const returnedFromService = Object.assign(
          {
            userId: 'BBBBBB',
            address: 'BBBBBB',
            city: 'BBBBBB',
            state: 'BBBBBB',
            country: 'BBBBBB',
            zipcode: 'BBBBBB',
            addressType: 'BBBBBB',
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

      it('should delete a UserAddress', () => {
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
