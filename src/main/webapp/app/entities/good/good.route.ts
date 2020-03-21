import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGood, Good } from 'app/shared/model/good.model';
import { GoodService } from './good.service';
import { GoodComponent } from './good.component';
import { GoodDetailComponent } from './good-detail.component';
import { GoodUpdateComponent } from './good-update.component';

@Injectable({ providedIn: 'root' })
export class GoodResolve implements Resolve<IGood> {
  constructor(private service: GoodService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGood> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((good: HttpResponse<Good>) => {
          if (good.body) {
            return of(good.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Good());
  }
}

export const goodRoute: Routes = [
  {
    path: '',
    component: GoodComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.good.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GoodDetailComponent,
    resolve: {
      good: GoodResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.good.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GoodUpdateComponent,
    resolve: {
      good: GoodResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.good.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GoodUpdateComponent,
    resolve: {
      good: GoodResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gotchooApp.good.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
