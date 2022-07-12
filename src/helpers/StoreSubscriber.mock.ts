import { IStoreSubscriber } from '../libs/store/IStoreSubscriber';
import { MSpy } from './Spy.mock';
import { ISpy } from './types/ISpy.mock';

export class MStoreSubscriber<T> implements IStoreSubscriber<T> {
  private _spy: ISpy | unknown;

  public setSpy (spy: ISpy) {
    this._spy = spy;
  }

  public call (data: T): void {
    this._spy instanceof MSpy && this._spy.call(data);
  }
}
