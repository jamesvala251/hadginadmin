import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { CommunicationChannelDetailComponent } from 'app/entities/communication-channel/communication-channel-detail.component';
import { CommunicationChannel } from 'app/shared/model/communication-channel.model';

describe('Component Tests', () => {
  describe('CommunicationChannel Management Detail Component', () => {
    let comp: CommunicationChannelDetailComponent;
    let fixture: ComponentFixture<CommunicationChannelDetailComponent>;
    const route = ({ data: of({ communicationChannel: new CommunicationChannel('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [CommunicationChannelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CommunicationChannelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommunicationChannelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load communicationChannel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.communicationChannel).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
