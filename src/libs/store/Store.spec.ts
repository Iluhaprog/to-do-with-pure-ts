/* eslint-disable no-undef */
import assert from 'assert';
import { Store } from './Store';
import { MSpy } from '../../helpers/Spy.mock';
import { MMiddleware } from '../../helpers/Middleware.mock';
import { MStoreSubscriber } from '../../helpers/StoreSubscriber.mock';

describe('Store', function () {
  it('must create instance', function () {
    const store = new Store<string>('');

    assert.equal(store instanceof Store, true);
  });

  it('must get init value', function () {
    const initValue = 'test-init-value';
    const store = new Store<string>(initValue);

    assert.equal(store.valueOf(), initValue);
  });

  it('must set store with new data [as some value]', function () {
    const newValue = 'test-new-value';
    const store = new Store<string>('');

    store.setStore(newValue);

    assert.equal(store.valueOf(), newValue);
  });

  it('must set store with new data [as function]', function () {
    const newValue = 'test-new-value';
    const store = new Store<string>('');

    store.setStore(() => newValue);

    assert.equal(store.valueOf(), newValue);
  });

  it('must change store with help old data [as function]', function () {
    const initValue = 'test-init-value';
    const additionalValue = 'test-additional-value';
    const store = new Store<string>(initValue);

    store.setStore((oldValue) => oldValue + additionalValue);

    assert.equal(store.valueOf(), initValue + additionalValue);
  });

  it('must run middleware', function () {
    const spy = new MSpy();
    const middleware = new MMiddleware();
    middleware.setSpy(spy);

    const store = new Store<string>('');
    store.applyMiddleware(middleware);

    store.setStore('');

    assert.equal(spy.isCalled(), true);
  });

  it('must run middleware only once', function () {
    const spy = new MSpy();
    const middleware = new MMiddleware();
    middleware.setSpy(spy);

    const store = new Store<string>('');
    store.applyMiddleware(middleware);

    store.setStore('');

    assert.equal(spy.getCallsCount(), 1);
  });

  it('must pass store data into middleware', function () {
    const newValue = 'test-new-value';
    const spy = new MSpy();
    const middleware = new MMiddleware();
    middleware.setSpy(spy);

    const store = new Store<string>('');
    store.applyMiddleware(middleware);

    store.setStore(newValue);

    assert.deepEqual(spy.getCalledArgs(), [newValue]);
  });

  it('must call subscriber', function () {
    const spy = new MSpy();
    const subscriber = new MStoreSubscriber();
    subscriber.setSpy(spy);

    const store = new Store<string>('');
    store.subscribe(subscriber);

    store.setStore('');

    assert.equal(spy.isCalled(), true);
  });

  it('must call subscriber only once', function () {
    const spy = new MSpy();
    const subscriber = new MStoreSubscriber();
    subscriber.setSpy(spy);

    const store = new Store<string>('');
    store.subscribe(subscriber);

    store.setStore('');

    assert.equal(spy.getCallsCount(), 1);
  });

  it('must pass store data into subscriber', function () {
    const newValue = 'test-new-value';
    const spy = new MSpy();
    const subscriber = new MStoreSubscriber();
    subscriber.setSpy(spy);

    const store = new Store<string>('');
    store.subscribe(subscriber);

    store.setStore(newValue);

    assert.deepEqual(spy.getCalledArgs(), [newValue]);
  });
});
