import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'good',
        loadChildren: () => import('./good/good.module').then(m => m.GotchooGoodModule)
      },
      {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(m => m.GotchooServiceModule)
      },
      {
        path: 'unit',
        loadChildren: () => import('./unit/unit.module').then(m => m.GotchooUnitModule)
      },
      {
        path: 'demand',
        loadChildren: () => import('./demand/demand.module').then(m => m.GotchooDemandModule)
      },
      {
        path: 'supply',
        loadChildren: () => import('./supply/supply.module').then(m => m.GotchooSupplyModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.GotchooLocationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GotchooEntityModule {}
