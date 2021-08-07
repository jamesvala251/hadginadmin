import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { DisableAccountRequestDetailComponent } from 'app/entities/disable-account-request/disable-account-request-detail.component';
import { DisableAccountRequest } from 'app/shared/model/disable-account-request.model';

describe('Component Tests', () => {
  describe('DisableAccountRequest Management Detail Component', () => {
    let comp: DisableAccountRequestDetailComponent;
    let fixture: ComponentFixture<DisableAccountRequestDetailComponent>;
    const route = ({ data: of({ disableAccountRequest: new DisableAccountRequest('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [DisableAccountRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DisableAccountRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DisableAccountRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load disableAccountRequest on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.disableAccountRequest).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
