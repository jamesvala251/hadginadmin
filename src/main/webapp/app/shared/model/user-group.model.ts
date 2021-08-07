import { IRole } from 'app/shared/model/role.model';
import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';

export interface IUserGroup {
  id?: string;
  groupName?: string;
  description?: string;
  status?: StatusEnum;
  roles?: IRole[];
}

export class UserGroup implements IUserGroup {
  constructor(
    public id?: string,
    public groupName?: string,
    public description?: string,
    public status?: StatusEnum,
    public roles?: IRole[]
  ) {}
}
