export interface ISpy {
  call(...args: unknown[]): void;
  isCalled(): boolean;
  getCallsCount(): number;
  getCalledArgs(): unknown[];
}
