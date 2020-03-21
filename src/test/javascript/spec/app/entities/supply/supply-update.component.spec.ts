import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GotchooTestModule } from '../../../test.module';
import { SupplyUpdateComponent } from 'app/entities/supply/supply-update.component';
import { SupplyService } from 'app/entities/supply/supply.service';
import { Supply } from 'app/shared/model/supply.model';

describe('Component Tests', () => {
  describe('Supply Management Update Component', () => {
    let comp: SupplyUpdateComponent;
    let fixture: ComponentFixture<SupplyUpdateComponent>;
    let service: SupplyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GotchooTestModule],
        declarations: [SupplyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SupplyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Supply(123);
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
        const entity = new Supply();
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
