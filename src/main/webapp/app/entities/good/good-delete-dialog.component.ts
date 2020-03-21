import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGood } from 'app/shared/model/good.model';
import { GoodService } from './good.service';

@Component({
  templateUrl: './good-delete-dialog.component.html'
})
export class GoodDeleteDialogComponent {
  good?: IGood;

  constructor(protected goodService: GoodService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.goodService.delete(id).subscribe(() => {
      this.eventManager.broadcast('goodListModification');
      this.activeModal.close();
    });
  }
}
