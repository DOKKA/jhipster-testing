import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GotchooTestModule } from '../../../test.module';
import { GoodUpdateComponent } from 'app/entities/good/good-update.component';
import { GoodService } from 'app/entities/good/good.service';
import { Good } from 'app/shared/model/good.model';

describe('Component Tests', () => {
  describe('Good Management Update Component', () => {
    let comp: GoodUpdateComponent;
    let fixture: ComponentFixture<GoodUpdateComponent>;
    let service: GoodService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GotchooTestModule],
        declarations: [GoodUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GoodUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GoodUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GoodService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Good(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Good();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
