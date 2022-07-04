import { IMiddleware } from './types/IMiddleware';
import { ERunOrder } from './types/ERunOrder';
import { IStore, TSetDataParam } from './types/IStore';

export class Store<T> implements IStore<T> {
  private _middlewares: { [key in ERunOrder]?: IMiddleware<T>[] } = {};
  private _store: T | null = null;

  get middlewares () {
    return this._middlewares;
  }

  public valueOf () {
    return this._store;
  }

  constructor (store: T) {
    this._store = store;
  }

  setData (data: TSetDataParam<T>): void | Promise<void> {
    this._middlewares[ERunOrder.BEFORE]?.forEach((middleware) => {
      middleware.run(this._store);
    });

    this._store = data(this._store);

    this._middlewares[ERunOrder.AFTER]?.forEach((middleware) => {
      middleware.run(this._store);
    });
  }

  setMiddleware (...middlewares: IMiddleware<T>[]): void | Promise<void> {
    middlewares.forEach((middleware) => {
      if (!Array.isArray(this._middlewares[middleware.order])) {
        this._middlewares[middleware.order] = [];
      }
      this._middlewares[middleware.order]?.push(middleware);
    });
  }
}
