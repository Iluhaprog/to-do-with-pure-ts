import { IMiddleware } from './IMiddleware';
import { ERunOrder } from './ERunOrder';

export type TSetDataParam<T> = ((prevState: T) => T);

export interface IStore<T> {
  middlewares: { [key in ERunOrder]?: IMiddleware<T>[] };
  valueOf: () => T | null;

  setData(param: TSetDataParam<T>): Promise<void> | void;
  setMiddleware(middleware: IMiddleware<T>): Promise<void> | void;
}
