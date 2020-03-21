import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GotchooTestModule } from '../../../test.module';
import { DemandUpdateComponent } from 'app/entities/demand/demand-update.component';
import { DemandService } from 'app/entities/demand/demand.service';
import { Demand } from 'app/shared/model/demand.model';

describe('Component Tests', () => {
  describe('Demand Management Update Component', () => {
    let comp: DemandUpdateComponent;
    let fixture: ComponentFixture<DemandUpdateComponent>;
    let service: DemandService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GotchooTestModule],
        declarations: [DemandUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DemandUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DemandUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemandService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Demand(123);
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
        const entity = new Demand();
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
