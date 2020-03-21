import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GotchooSharedModule } from 'app/shared/shared.module';
import { UnitComponent } from './unit.component';
import { UnitDetailComponent } from './unit-detail.component';
import { UnitUpdateComponent } from './unit-update.component';
import { UnitDeleteDialogComponent } from './unit-delete-dialog.component';
import { unitRoute } from './unit.route';

@NgModule({
  imports: [GotchooSharedModule, RouterModule.forChild(unitRoute)],
  declarations: [UnitComponent, UnitDetailComponent, UnitUpdateComponent, UnitDeleteDialogComponent],
  entryComponents: [UnitDeleteDialogComponent]
})
export class GotchooUnitModule {}
