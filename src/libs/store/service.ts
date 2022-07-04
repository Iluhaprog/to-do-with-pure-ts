import { Store } from './Store';

export function createStore<T> (data: T) {
  return new Store<T>(data);
}
