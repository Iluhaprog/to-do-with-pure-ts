import { IStoreMiddleware } from './IStoreMiddleware';
import { IStoreSubscriber } from './IStoreSubscriber';

export interface IStore<T> {
  applyMiddleware(...middleware: IStoreMiddleware<T>[]): void;
  removeMiddleware(middleware: IStoreMiddleware<T>): void;
  subscribe(subscriber: IStoreSubscriber<T>): void;
  unsubscribe(subscriber: IStoreSubscriber<T>): void;
  setStore(newData: T & ((prevState: T) => T)): void;
  valueOf(): T;
}
