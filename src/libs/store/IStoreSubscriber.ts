export interface IStoreSubscriber<T> {
  call(data: T): void;
}
