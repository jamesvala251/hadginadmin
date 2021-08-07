import { IState } from 'app/shared/model/state.model';

export interface ICountry {
  id?: string;
  code?: string;
  name?: string;
  states?: IState[];
}

export class Country implements ICountry {
  constructor(public id?: string, public code?: string, public name?: string, public states?: IState[]) {}
}
