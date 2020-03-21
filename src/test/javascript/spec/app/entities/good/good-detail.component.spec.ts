import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GotchooTestModule } from '../../../test.module';
import { GoodDetailComponent } from 'app/entities/good/good-detail.component';
import { Good } from 'app/shared/model/good.model';

describe('Component Tests', () => {
  describe('Good Management Detail Component', () => {
    let comp: GoodDetailComponent;
    let fixture: ComponentFixture<GoodDetailComponent>;
    const route = ({ data: of({ good: new Good(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GotchooTestModule],
        declarations: [GoodDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GoodDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GoodDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load good on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.good).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
