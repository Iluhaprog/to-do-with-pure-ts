import { ISpy } from './types/ISpy.mock';
import { IStoreMiddleware } from '../libs/store/IStoreMiddleware';
import { MSpy } from './Spy.mock';

export class MMiddleware<T> implements IStoreMiddleware<T> {
  public name = 'mocked-middleware';
  private _spy: ISpy | unknown;

  public setSpy (spy: ISpy) {
    this._spy = spy;
  }

  public run (store: T) {
    this._spy instanceof MSpy && this._spy.call(store);
  }
}
