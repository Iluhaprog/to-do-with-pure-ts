import { ERunOrder } from '../../store/types/ERunOrder';
import { IMiddleware } from '../../store/types/IMiddleware';
import { TagName } from './types/elements';
import { IComponent } from './types/IComponent';

export class Component<T> implements IMiddleware<T>, IComponent<T> {
  public name = 'comonent';
  public order: ERunOrder = ERunOrder.AFTER;
  private _children: IComponent<T>[] = [];
  private element: HTMLElement;
  private processor: (data: T | string) => string = (d) => `${d}`;

  constructor (init: { name?: string, order?: ERunOrder, element: TagName}) {
    this.name = init.name || this.name;
    this.order = init.order || this.order;
    this.element = document.createElement(init.element);
  }

  children (...children: IComponent<T>[]) {
    this._children = children;
  }

  inner (processor: (data: T | string) => string) {
    this.processor = processor;
    return this;
  }

  getInstance (data: T | string): HTMLElement {
    if (this._children.length > 0) {
      this.element.append(...this._children.map((child) => child.getInstance(this.processor(data) || data)));
      return this.element;
    }

    this.element.innerText = this.processor(data);

    return this.element;
  }

  getElement () {
    return this.element;
  }

  public run (data: T): void {
    this.element.innerHTML = '';
    this.element.append(
      ...this._children.map((element) => element.getInstance(data))
    );
  }
}
