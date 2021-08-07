import { ICountry } from 'app/shared/model/country.model';

export interface IState {
  id?: string;
  code?: string;
  name?: string;
  country?: ICountry;
}

export class State implements IState {
  constructor(public id?: string, public code?: string, public name?: string, public country?: ICountry) {}
}
