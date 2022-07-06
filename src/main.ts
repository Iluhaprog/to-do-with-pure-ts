import { Component } from './libs/middlewares/component/Component';
import { createStore } from './libs/store/service';

class Button<T> extends Component<T> {
  constructor () {
    super({ element: 'button' });
  }

  onClick (handler: (e: Event) => void) {
    this.getElement().addEventListener('click', handler);
    return this;
  }
}

class P extends Component<string | number> {
  constructor () {
    super({ element: 'p' });
  }
}

export async function main (): Promise<void> {
  const store = createStore<number>(0);

  const app = new Component<number>({
    element: 'div'
  });

  app.children(
    new P(),
    new Button()
      .onClick(() => store.setData((prev) => { prev += 1; return prev; }))
      .inner(() => {
        return 'Inc';
      }),
    new Button()
      .onClick(() => store.setData((prev) => { prev -= 1; return prev; }))
      .inner(() => {
        return 'Dec';
      })
  );

  store.setMiddleware(app);
  store.setData((data) => data);
  document.getElementById('root')?.append(app.getElement());
}
