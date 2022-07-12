import { ISpy } from './types/ISpy.mock';

export class MSpy implements ISpy {
  private _args: unknown[] = [];
  private _callsCount = 0;
  private _isCalled = false;

  public call (...args: unknown[]): void {
    this._callsCount += 1;
    this._isCalled = true;
    this._args = args;
  }

  public isCalled (): boolean {
    return this._isCalled;
  }

  public getCallsCount (): number {
    return this._callsCount;
  }

  getCalledArgs (): unknown[] {
    return this._args;
  }
}
