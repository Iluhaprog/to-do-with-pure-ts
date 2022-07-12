export interface IStoreMiddleware<T> {
  name: string;
  run(data: T): void;
}
