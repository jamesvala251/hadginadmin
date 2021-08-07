import { Moment } from 'moment';
import { ViewStatus } from 'app/shared/model/enumerations/view-status.model';

export interface INotification {
  id?: string;
  sender?: string;
  receiver?: string;
  title?: string;
  details?: string;
  type?: string;
  status?: ViewStatus;
  modifiedOn?: Moment;
  modifiedBy?: string;
}

export class Notification implements INotification {
  constructor(
    public id?: string,
    public sender?: string,
    public receiver?: string,
    public title?: string,
    public details?: string,
    public type?: string,
    public status?: ViewStatus,
    public modifiedOn?: Moment,
    public modifiedBy?: string
  ) {}
}
