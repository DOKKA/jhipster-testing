import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGood } from 'app/shared/model/good.model';
import { GoodService } from './good.service';
import { GoodDeleteDialogComponent } from './good-delete-dialog.component';

@Component({
  selector: 'jhi-good',
  templateUrl: './good.component.html'
})
export class GoodComponent implements OnInit, OnDestroy {
  goods?: IGood[];
  eventSubscriber?: Subscription;

  constructor(protected goodService: GoodService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.goodService.query().subscribe((res: HttpResponse<IGood[]>) => (this.goods = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGoods();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGood): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGoods(): void {
    this.eventSubscriber = this.eventManager.subscribe('goodListModification', () => this.loadAll());
  }

  delete(good: IGood): void {
    const modalRef = this.modalService.open(GoodDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.good = good;
  }
}
