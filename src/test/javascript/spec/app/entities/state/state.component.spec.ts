import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementFeTestModule } from '../../../test.module';
import { StateComponent } from 'app/entities/state/state.component';
import { StateService } from 'app/entities/state/state.service';
import { State } from 'app/shared/model/state.model';

describe('Component Tests', () => {
  describe('State Management Component', () => {
    let comp: StateComponent;
    let fixture: ComponentFixture<StateComponent>;
    let service: StateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [StateComponent],
      })
        .overrideTemplate(StateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StateService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new State('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.states && comp.states[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
