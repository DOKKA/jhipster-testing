export interface IGood {
  id?: number;
  name?: string;
}

export class Good implements IGood {
  constructor(public id?: number, public name?: string) {}
}
