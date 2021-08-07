import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementFeTestModule } from '../../../test.module';
import { CommunicationChannelComponent } from 'app/entities/communication-channel/communication-channel.component';
import { CommunicationChannelService } from 'app/entities/communication-channel/communication-channel.service';
import { CommunicationChannel } from 'app/shared/model/communication-channel.model';

describe('Component Tests', () => {
  describe('CommunicationChannel Management Component', () => {
    let comp: CommunicationChannelComponent;
    let fixture: ComponentFixture<CommunicationChannelComponent>;
    let service: CommunicationChannelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [CommunicationChannelComponent],
      })
        .overrideTemplate(CommunicationChannelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommunicationChannelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommunicationChannelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CommunicationChannel('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.communicationChannels && comp.communicationChannels[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
