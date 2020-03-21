export interface IService {
  id?: number;
  name?: string;
}

export class Service implements IService {
  constructor(public id?: number, public name?: string) {}
}
