import { IPermission } from 'app/shared/model/permission.model';
import { IUserGroup } from 'app/shared/model/user-group.model';
import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';

export interface IRole {
  id?: string;
  roleName?: string;
  description?: string;
  status?: StatusEnum;
  permissions?: IPermission[];
  userGroups?: IUserGroup[];
}

export class Role implements IRole {
  constructor(
    public id?: string,
    public roleName?: string,
    public description?: string,
    public status?: StatusEnum,
    public permissions?: IPermission[],
    public userGroups?: IUserGroup[]
  ) {}
}
