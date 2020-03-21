import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDemand, Demand } from 'app/shared/model/demand.model';
import { DemandService } from './demand.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IUnit } from 'app/shared/model/unit.model';
import { UnitService } from 'app/entities/unit/unit.service';
import { IGood } from 'app/shared/model/good.model';
import { GoodService } from 'app/entities/good/good.service';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from 'app/entities/service/service.service';

type SelectableEntity = IUser | ILocation | IUnit | IGood | IService;

@Component({
  selector: 'jhi-demand-update',
  templateUrl: './demand-update.component.html'
})
export class DemandUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  locations: ILocation[] = [];
  units: IUnit[] = [];
  goods: IGood[] = [];
  services: IService[] = [];

  editForm = this.fb.group({
    id: [],
    type: [],
    quantity: [],
    user: [],
    location: [],
    unit: [],
    good: [],
    service: []
  });

  constructor(
    protected demandService: DemandService,
    protected userService: UserService,
    protected locationService: LocationService,
    protected unitService: UnitService,
    protected goodService: GoodService,
    protected serviceService: ServiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demand }) => {
      this.updateForm(demand);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.locationService.query().subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body || []));

      this.unitService.query().subscribe((res: HttpResponse<IUnit[]>) => (this.units = res.body || []));

      this.goodService.query().subscribe((res: HttpResponse<IGood[]>) => (this.goods = res.body || []));

      this.serviceService.query().subscribe((res: HttpResponse<IService[]>) => (this.services = res.body || []));
    });
  }

  updateForm(demand: IDemand): void {
    this.editForm.patchValue({
      id: demand.id,
      type: demand.type,
      quantity: demand.quantity,
      user: demand.user,
      location: demand.location,
      unit: demand.unit,
      good: demand.good,
      service: demand.service
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demand = this.createFromForm();
    if (demand.id !== undefined) {
      this.subscribeToSaveResponse(this.demandService.update(demand));
    } else {
      this.subscribeToSaveResponse(this.demandService.create(demand));
    }
  }

  private createFromForm(): IDemand {
    return {
      ...new Demand(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      user: this.editForm.get(['user'])!.value,
      location: this.editForm.get(['location'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      good: this.editForm.get(['good'])!.value,
      service: this.editForm.get(['service'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemand>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
