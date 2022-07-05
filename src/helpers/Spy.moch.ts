import { ISpy } from './types/ISpy.moch';

export class MSpy implements ISpy {
  private args: unknown[];
  private callsCount = 0;
  private _isCalled = false;

  public call (...args: unknown[]): void {
    this.callsCount += 1;
    this._isCalled = true;
    this.args = args;
  }

  public isCalled (): boolean {
    return this._isCalled;
  }

  public getCallsCount (): number {
    return this.callsCount;
  }

  getCalledArgs (): unknown[] {
    return this.args;
  }
}
