import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiDataUtils, JhiEventManager, JhiFileLoadError, JhiEventWithContent, JhiLanguageService } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LANGUAGES } from 'app/core/language/language.constants';
import { UserGroupService } from 'app/entities/user-group/user-group.service';
import { IUserGroup } from 'app/shared/model/user-group.model';
import { IProfilePicture, ProfilePicture } from 'app/shared/model/profile-picture.model';
import { ProfilePictureService } from './profile-picture.service';
import { HttpResponse } from '@angular/common/http';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  account!: Account;
  userGroupName: string | undefined;
  pictureProfile: IProfilePicture | null = null;
  success = false;
  isSaving = false;
  languages = LANGUAGES;
  settingsForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    langKey: [undefined],
    gender: [undefined],
    birthDate: [undefined],
    phone: [undefined],
    userGroup: [undefined],
    userGroupName: [undefined],
  });

  //For profile picture
  editPictureForm = this.fb.group({
    id: [],
    userId: [null, []],
    pictureName: [null, []],
    pictureImage: [null, [Validators.required]],
    pictureImageContentType: [],
  });

  constructor(
    private userGroupService: UserGroupService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService,
    //profile picture
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected profilePictureService: ProfilePictureService,
    protected elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.getUserGroupName(account.userGroup);
        this.settingsForm.patchValue({
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          gender: account.gender,
          birthDate: account.birthDate,
          phone: account.phone,
          langKey: account.langKey,
          userGroup: account.userGroup,
        });
        this.account = account;
      }
    });
    this.loadPictureByUserId();
  }

  getUserGroupName(userGroupId: string): void {
    let expectedResult: IUserGroup | null;
    this.userGroupService.find(userGroupId).subscribe(resp => {
      expectedResult = resp.body;
      this.userGroupName = expectedResult?.groupName;
      this.settingsForm.patchValue({
        userGroupName: expectedResult?.groupName,
      });
    });
  }

  save(): void {
    this.success = false;

    this.account.firstName = this.settingsForm.get('firstName')!.value;
    this.account.lastName = this.settingsForm.get('lastName')!.value;
    this.account.email = this.settingsForm.get('email')!.value;
    this.account.gender = this.settingsForm.get('gender')!.value;
    this.account.birthDate = this.settingsForm.get('birthDate')!.value;
    this.account.phone = this.settingsForm.get('phone')!.value;
    this.account.langKey = this.settingsForm.get('langKey')!.value;
    this.account.userGroup = this.settingsForm.get('userGroup')!.value;
    this.accountService.save(this.account).subscribe(() => {
      this.success = true;

      this.accountService.authenticate(this.account);

      if (this.account.langKey !== this.languageService.getCurrentLanguage()) {
        this.languageService.changeLanguage(this.account.langKey);
      }
    });
  }

  //profile picture
  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editPictureForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('userManagementFeApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editPictureForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  pictureSave(): void {
    this.isSaving = true;
    const profilePicture = this.pictureCreateFrom();
    if (profilePicture.id && profilePicture.id !== undefined) {
      this.pictureSubscribeToSaveResponse(this.profilePictureService.update(profilePicture));
    } else {
      this.pictureSubscribeToSaveResponse(this.profilePictureService.create(profilePicture));
    }
    this.profilePictureService.setNewProfilePicture(profilePicture);
  }

  private pictureCreateFrom(): IProfilePicture {
    return {
      ...new ProfilePicture(),
      id: this.editPictureForm.get(['id'])!.value,
      userId: this.account?.email,
      pictureName: 'profile',
      pictureImageContentType: this.editPictureForm.get(['pictureImageContentType'])!.value,
      pictureImage: this.editPictureForm.get(['pictureImage'])!.value,
    };
  }

  protected pictureSubscribeToSaveResponse(result: Observable<HttpResponse<IProfilePicture>>): void {
    result.subscribe(
      () => this.pictureOnSaveSuccess(),
      () => this.pictureOnSaveError()
    );
  }

  protected pictureOnSaveSuccess(): void {
    this.isSaving = false;
  }

  protected pictureOnSaveError(): void {
    this.isSaving = false;
  }

  loadPictureByUserId(): void {
    if (this.account && this.account.email) {
      this.profilePictureService.findByUserId(this.account.email).subscribe((res: HttpResponse<IProfilePicture>) => {
        this.pictureProfile = res.body || null;
        if (this.pictureProfile) {
          this.updatePictureForm(this.pictureProfile);
        }
      });
    }
  }

  updatePictureForm(profilePicture: IProfilePicture): void {
    this.editPictureForm.patchValue({
      id: profilePicture.id,
      userId: profilePicture.userId,
      pictureName: profilePicture.pictureName,
      pictureImage: profilePicture.pictureImage,
      pictureImageContentType: profilePicture.pictureImageContentType,
    });
  }
}
