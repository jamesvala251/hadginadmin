import { AddressType } from 'app/shared/model/enumerations/address-type.model';
import { ICountry } from './country.model';
import { IState } from './state.model';

export interface IUserAddress {
  id?: string;
  userId?: string;
  address?: string;
  city?: string;
  country?: ICountry;
  state?: IState;
  zipcode?: string;
  addressType?: AddressType;
}

export class UserAddress implements IUserAddress {
  constructor(
    public id?: string,
    public userId?: string,
    public address?: string,
    public city?: string,
    public country?: ICountry,
    public state?: IState,
    public zipcode?: string,
    public addressType?: AddressType
  ) {}
}
