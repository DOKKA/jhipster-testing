import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupply, Supply } from 'app/shared/model/supply.model';
import { SupplyService } from './supply.service';
import { SupplyComponent } from './supply.component';
import { SupplyDetailComponent } from './supply-detail.component';
import { SupplyUpdateComponent } from './supply-update.component';

@Injectable({ providedIn: 'root' })
export class SupplyResolve implements Resolve<ISupply> {
  constructor(private service: SupplyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupply> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supply: HttpResponse<Supply>) => {
          if (supply.body) {
            return of(supply.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Supply());
  }
}

export const supplyRoute: Routes = [
  {
    path: '',
    component: SupplyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.supply.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupplyDetailComponent,
    resolve: {
      supply: SupplyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.supply.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupplyUpdateComponent,
    resolve: {
      supply: SupplyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.supply.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupplyUpdateComponent,
    resolve: {
      supply: SupplyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.supply.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
