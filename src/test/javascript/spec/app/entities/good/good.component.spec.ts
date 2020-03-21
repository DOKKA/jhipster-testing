import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GotchooTestModule } from '../../../test.module';
import { GoodComponent } from 'app/entities/good/good.component';
import { GoodService } from 'app/entities/good/good.service';
import { Good } from 'app/shared/model/good.model';

describe('Component Tests', () => {
  describe('Good Management Component', () => {
    let comp: GoodComponent;
    let fixture: ComponentFixture<GoodComponent>;
    let service: GoodService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GotchooTestModule],
        declarations: [GoodComponent]
      })
        .overrideTemplate(GoodComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GoodComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GoodService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Good(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.goods && comp.goods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
