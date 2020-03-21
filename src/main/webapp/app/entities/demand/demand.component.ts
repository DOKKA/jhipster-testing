import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemand } from 'app/shared/model/demand.model';
import { DemandService } from './demand.service';
import { DemandDeleteDialogComponent } from './demand-delete-dialog.component';

@Component({
  selector: 'jhi-demand',
  templateUrl: './demand.component.html'
})
export class DemandComponent implements OnInit, OnDestroy {
  demands?: IDemand[];
  eventSubscriber?: Subscription;

  constructor(protected demandService: DemandService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.demandService.query().subscribe((res: HttpResponse<IDemand[]>) => (this.demands = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDemands();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDemand): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDemands(): void {
    this.eventSubscriber = this.eventManager.subscribe('demandListModification', () => this.loadAll());
  }

  delete(demand: IDemand): void {
    const modalRef = this.modalService.open(DemandDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demand = demand;
  }
}
