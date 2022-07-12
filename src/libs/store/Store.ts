import { IStore } from './IStore';
import { IStoreMiddleware } from './IStoreMiddleware';
import { IStoreSubscriber } from './IStoreSubscriber';

export class Store<T> implements IStore<T> {
  private _store: T;
  private _subscribers: IStoreSubscriber<T>[] = [];
  private _middleware: IStoreMiddleware<T>[] = [];

  constructor (initStore: T) {
    this._store = initStore;
  }

  applyMiddleware (...middleware: IStoreMiddleware<T>[]): void {
    this._middleware = [...this._middleware, ...middleware];
  }

  removeMiddleware (middleware: IStoreMiddleware<T>): void {
    this._middleware = this._middleware.filter((md) => md !== middleware);
  }

  subscribe (subscriber: IStoreSubscriber<T>): void {
    this._subscribers.push(subscriber);
  }

  unsubscribe (subscriber: IStoreSubscriber<T>): void {
    this._subscribers = this._subscribers.filter((sub) => sub !== subscriber);
  }

  setStore (newData: T | ((prevState: T) => T)): void {
    if (newData instanceof Function) {
      this._store = newData(this._store);
    } else {
      this._store = newData;
    }

    this._middleware.forEach((middleware) => middleware.run(this._store));
    this._subscribers.forEach((subscriber) => subscriber.call(this._store));
  }

  valueOf (): T {
    return this._store;
  }
}
