import { IRole } from 'app/shared/model/role.model';
import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';

export interface IPermission {
  id?: string;
  permissionName?: string;
  permissionDisplayName?: string;
  category?: string;
  description?: string;
  status?: StatusEnum;
  roles?: IRole[];
  displayCategory?: boolean;
}

export class Permission implements IPermission {
  constructor(
    public id?: string,
    public permissionName?: string,
    public category?: string,
    public description?: string,
    public status?: StatusEnum,
    public roles?: IRole[]
  ) {}
}
