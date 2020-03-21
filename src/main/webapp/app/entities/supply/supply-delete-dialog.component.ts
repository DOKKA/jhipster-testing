import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupply } from 'app/shared/model/supply.model';
import { SupplyService } from './supply.service';

@Component({
  templateUrl: './supply-delete-dialog.component.html'
})
export class SupplyDeleteDialogComponent {
  supply?: ISupply;

  constructor(protected supplyService: SupplyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supplyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('supplyListModification');
      this.activeModal.close();
    });
  }
}
