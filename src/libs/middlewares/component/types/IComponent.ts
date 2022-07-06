export interface IComponent<T> {
  children(...elements: IComponent<T>[]): void;
  getInstance(data: T | string): HTMLElement;
}
