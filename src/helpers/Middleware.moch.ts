import { ERunOrder } from '../libs/store/types/ERunOrder';
import { IMiddleware } from '../libs/store/types/IMiddleware';
import { ISpy } from './types/ISpy.moch';

export class MMiddleware<T> implements IMiddleware<T> {
  public name = 'moch-middleware';
  private _order: ERunOrder;
  private spy: ISpy;

  get order () {
    return this._order;
  }

  constructor (order = ERunOrder.BEFORE) {
    this._order = order;
  }

  public setSpy (spy: ISpy) {
    this.spy = spy;
  }

  public run (store: T | null) {
    this.spy && this.spy.call(store);
  }
}
