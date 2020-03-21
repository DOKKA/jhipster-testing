import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GotchooSharedModule } from 'app/shared/shared.module';
import { SupplyComponent } from './supply.component';
import { SupplyDetailComponent } from './supply-detail.component';
import { SupplyUpdateComponent } from './supply-update.component';
import { SupplyDeleteDialogComponent } from './supply-delete-dialog.component';
import { supplyRoute } from './supply.route';

@NgModule({
  imports: [GotchooSharedModule, RouterModule.forChild(supplyRoute)],
  declarations: [SupplyComponent, SupplyDetailComponent, SupplyUpdateComponent, SupplyDeleteDialogComponent],
  entryComponents: [SupplyDeleteDialogComponent]
})
export class GotchooSupplyModule {}
