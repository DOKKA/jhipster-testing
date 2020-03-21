import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GotchooSharedModule } from 'app/shared/shared.module';
import { GoodComponent } from './good.component';
import { GoodDetailComponent } from './good-detail.component';
import { GoodUpdateComponent } from './good-update.component';
import { GoodDeleteDialogComponent } from './good-delete-dialog.component';
import { goodRoute } from './good.route';

@NgModule({
  imports: [GotchooSharedModule, RouterModule.forChild(goodRoute)],
  declarations: [GoodComponent, GoodDetailComponent, GoodUpdateComponent, GoodDeleteDialogComponent],
  entryComponents: [GoodDeleteDialogComponent]
})
export class GotchooGoodModule {}
