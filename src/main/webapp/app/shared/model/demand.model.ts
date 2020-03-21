import { IUser } from 'app/core/user/user.model';
import { ILocation } from 'app/shared/model/location.model';
import { IUnit } from 'app/shared/model/unit.model';
import { IGood } from 'app/shared/model/good.model';
import { IService } from 'app/shared/model/service.model';
import { Type } from 'app/shared/model/enumerations/type.model';

export interface IDemand {
  id?: number;
  type?: Type;
  quantity?: number;
  user?: IUser;
  location?: ILocation;
  unit?: IUnit;
  good?: IGood;
  service?: IService;
}

export class Demand implements IDemand {
  constructor(
    public id?: number,
    public type?: Type,
    public quantity?: number,
    public user?: IUser,
    public location?: ILocation,
    public unit?: IUnit,
    public good?: IGood,
    public service?: IService
  ) {}
}
