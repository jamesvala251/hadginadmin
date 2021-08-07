import { Relation } from 'app/shared/model/enumerations/relation.model';
import { ICountry } from './country.model';
import { IState } from './state.model';

export interface IUserContacts {
  id?: string;
  userId?: string;
  name?: string;
  relation?: Relation;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: ICountry;
  state?: IState;
  zipCode?: string;
}

export class UserContacts implements IUserContacts {
  constructor(
    public id?: string,
    public userId?: string,
    public name?: string,
    public relation?: Relation,
    public phoneNumber?: string,
    public email?: string,
    public address?: string,
    public city?: string,
    public country?: ICountry,
    public state?: IState,
    public zipCode?: string
  ) {}
}
