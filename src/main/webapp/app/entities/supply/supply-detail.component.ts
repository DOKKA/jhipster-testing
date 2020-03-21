import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupply } from 'app/shared/model/supply.model';

@Component({
  selector: 'jhi-supply-detail',
  templateUrl: './supply-detail.component.html'
})
export class SupplyDetailComponent implements OnInit {
  supply: ISupply | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supply }) => (this.supply = supply));
  }

  previousState(): void {
    window.history.back();
  }
}
