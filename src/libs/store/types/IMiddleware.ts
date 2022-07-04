import { ERunOrder } from './ERunOrder';

export interface IMiddleware<T> {
  name: string;
  order: ERunOrder;
  run(store: T | null): Promise<void> | void;
}
