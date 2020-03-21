import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDemand, Demand } from 'app/shared/model/demand.model';
import { DemandService } from './demand.service';
import { DemandComponent } from './demand.component';
import { DemandDetailComponent } from './demand-detail.component';
import { DemandUpdateComponent } from './demand-update.component';

@Injectable({ providedIn: 'root' })
export class DemandResolve implements Resolve<IDemand> {
  constructor(private service: DemandService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemand> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((demand: HttpResponse<Demand>) => {
          if (demand.body) {
            return of(demand.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Demand());
  }
}

export const demandRoute: Routes = [
  {
    path: '',
    component: DemandComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.demand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DemandDetailComponent,
    resolve: {
      demand: DemandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.demand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DemandUpdateComponent,
    resolve: {
      demand: DemandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.demand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DemandUpdateComponent,
    resolve: {
      demand: DemandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.demand.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
