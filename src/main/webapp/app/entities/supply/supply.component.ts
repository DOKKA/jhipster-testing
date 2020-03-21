import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupply } from 'app/shared/model/supply.model';
import { SupplyService } from './supply.service';
import { SupplyDeleteDialogComponent } from './supply-delete-dialog.component';

@Component({
  selector: 'jhi-supply',
  templateUrl: './supply.component.html'
})
export class SupplyComponent implements OnInit, OnDestroy {
  supplies?: ISupply[];
  eventSubscriber?: Subscription;

  constructor(protected supplyService: SupplyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.supplyService.query().subscribe((res: HttpResponse<ISupply[]>) => (this.supplies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSupplies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupply): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupplies(): void {
    this.eventSubscriber = this.eventManager.subscribe('supplyListModification', () => this.loadAll());
  }

  delete(supply: ISupply): void {
    const modalRef = this.modalService.open(SupplyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supply = supply;
  }
}
