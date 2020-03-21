import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GotchooTestModule } from '../../../test.module';
import { SupplyDetailComponent } from 'app/entities/supply/supply-detail.component';
import { Supply } from 'app/shared/model/supply.model';

describe('Component Tests', () => {
  describe('Supply Management Detail Component', () => {
    let comp: SupplyDetailComponent;
    let fixture: ComponentFixture<SupplyDetailComponent>;
    const route = ({ data: of({ supply: new Supply(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GotchooTestModule],
        declarations: [SupplyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SupplyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupplyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load supply on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supply).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
