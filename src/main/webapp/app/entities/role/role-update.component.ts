import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRole, Role } from 'app/shared/model/role.model';
import { RoleService } from './role.service';
import { IPermission } from 'app/shared/model/permission.model';
import { PermissionService } from 'app/entities/permission/permission.service';

@Component({
  selector: 'jhi-role-update',
  templateUrl: './role-update.component.html',
})
export class RoleUpdateComponent implements OnInit {
  isSaving = false;
  permissions: IPermission[] = [];
  editForm = this.fb.group({
    id: [],
    roleName: [
      null,
      [Validators.required, Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$')],
    ],
    description: [],
    status: [null, [Validators.required]],
    permissions: new FormArray([]),
  });

  constructor(
    protected roleService: RoleService,
    protected permissionService: PermissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ role }) => {
      this.updateForm(role);

      this.permissionService.query().subscribe((res: HttpResponse<IPermission[]>) => {
        this.permissions = res.body || [];
        let counter = 0;
        this.permissions.forEach(permission => {
          const temp = permission.permissionName?.substr(0, permission.permissionName?.indexOf('_'));
          permission.permissionDisplayName = temp;
          if (counter === 0 || counter % 4 === 0) {
            permission.displayCategory = true;
          }
          counter++;
        });
        this.addPermissionCheckboxes(role);
      });
    });
  }

  get permissionsArray(): FormArray {
    return this.editForm.controls.permissions as FormArray;
  }

  private addPermissionCheckboxes(role?: Role): void {
    this.permissions.forEach(permission => {
      let flag = false;
      role?.permissions?.forEach(rolePermission => {
        if (rolePermission.id === permission.id) {
          flag = true;
          this.permissionsArray.push(new FormControl(true));
          return;
        }
      });
      if (!flag) {
        this.permissionsArray.push(new FormControl(false));
      }
    });
  }

  updateForm(role: IRole): void {
    this.editForm.patchValue({
      id: role.id,
      roleName: role.roleName,
      description: role.description,
      status: role.status,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    const selectedOrderIds = this.editForm.value.permissions
      .map((checked: any, i: string | number) => (checked ? this.permissions[i] : null))
      .filter((v: null) => v !== null);
    this.isSaving = true;
    const role = this.createFromForm();
    role.permissions = selectedOrderIds;
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.roleService.update(role));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(role));
    }
  }

  private createFromForm(): IRole {
    return {
      ...new Role(),
      id: this.editForm.get(['id'])!.value,
      roleName: this.editForm.get(['roleName'])!.value,
      description: this.editForm.get(['description'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
