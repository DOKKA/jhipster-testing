import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDemand } from 'app/shared/model/demand.model';
import { DemandService } from './demand.service';

@Component({
  templateUrl: './demand-delete-dialog.component.html'
})
export class DemandDeleteDialogComponent {
  demand?: IDemand;

  constructor(protected demandService: DemandService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demandService.delete(id).subscribe(() => {
      this.eventManager.broadcast('demandListModification');
      this.activeModal.close();
    });
  }
}
