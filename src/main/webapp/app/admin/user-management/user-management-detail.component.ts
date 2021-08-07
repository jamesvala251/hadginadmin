import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'app/core/user/user.model';
import { UserGroupService } from 'app/entities/user-group/user-group.service';
import { IUserGroup } from 'app/shared/model/user-group.model';

@Component({
  selector: 'jhi-user-mgmt-detail',
  templateUrl: './user-management-detail.component.html',
})
export class UserManagementDetailComponent implements OnInit {
  user: User | null = null;
  userGroupName: string | undefined;

  constructor(private userGroupService: UserGroupService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => (this.user = user));
    if (this.user?.userGroup !== undefined) {
      this.getUserGroupName(this.user.userGroup);
    }
  }

  getUserGroupName(userGroupId: string): void {
    let expectedResult: IUserGroup | null;
    this.userGroupService.find(userGroupId).subscribe(resp => {
      expectedResult = resp.body;
      this.userGroupName = expectedResult?.groupName;
    });
  }
}
