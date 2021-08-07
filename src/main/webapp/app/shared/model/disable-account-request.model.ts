import { Moment } from 'moment';
import { AccountRequestStatus } from 'app/shared/model/enumerations/account-request-status.model';

export interface IDisableAccountRequest {
  id?: string;
  userId?: string;
  reason?: string;
  status?: AccountRequestStatus;
  createdDate?: Moment;
  updatedDate?: Moment;
  updatedBy?: string;
}

export class DisableAccountRequest implements IDisableAccountRequest {
  constructor(
    public id?: string,
    public userId?: string,
    public reason?: string,
    public status?: AccountRequestStatus,
    public createdDate?: Moment,
    public updatedDate?: Moment,
    public updatedBy?: string
  ) {}
}
