import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GotchooTestModule } from '../../../test.module';
import { SupplyComponent } from 'app/entities/supply/supply.component';
import { SupplyService } from 'app/entities/supply/supply.service';
import { Supply } from 'app/shared/model/supply.model';

describe('Component Tests', () => {
  describe('Supply Management Component', () => {
    let comp: SupplyComponent;
    let fixture: ComponentFixture<SupplyComponent>;
    let service: SupplyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GotchooTestModule],
        declarations: [SupplyComponent]
      })
        .overrideTemplate(SupplyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Supply(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.supplies && comp.supplies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
