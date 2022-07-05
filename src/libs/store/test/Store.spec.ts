/* eslint-disable no-undef */

import assert from 'assert';
import { MMiddleware } from '../../../helpers/Middleware.moch';
import { MSpy } from '../../../helpers/Spy.moch';
import { Store } from '../Store';
import { ERunOrder } from '../types/ERunOrder';
import { TSetDataParam } from '../types/IStore';

describe('Store', function () {
  it('must init store', function () {
    const store = new Store<string>('value');

    assert.equal(!!store.valueOf(), true);
    assert.equal(store instanceof Store, true);
  });

  it('valueOf must return same value as in store init', function () {
    const storeValue = 'some value';
    const store = new Store<typeof storeValue>(storeValue);

    assert.equal(store.valueOf(), storeValue);
  });

  it('must set new value in store', function () {
    const prevStoreValue = 1;
    const newStoreValue = 2;
    const store = new Store<number>(prevStoreValue);

    store.setData(() => newStoreValue);

    assert.equal(store.valueOf(), newStoreValue);
  });

  it('must update value in store', function () {
    const value = 'value';
    const additionalValue = 'additionalValue';
    const store = new Store<string>(value);
    const updateValue: TSetDataParam<string> = (prevValue) => prevValue + additionalValue;

    store.setData(updateValue);

    assert.equal(store.valueOf(), updateValue(value));
  });

  it('must set middleware which run before', function () {
    const store = new Store<string>('');
    store.setMiddleware(new MMiddleware());

    assert.equal(store.middlewares[ERunOrder.BEFORE]?.length, 1);
  });

  it('must set middleware which run after', function () {
    const store = new Store<string>('');
    store.setMiddleware(new MMiddleware(ERunOrder.AFTER));

    assert.equal(store.middlewares[ERunOrder.AFTER]?.length, 1);
  });

  it('must set definite middleware which run before', function () {
    const store = new Store<string>('');
    store.setMiddleware(new MMiddleware(ERunOrder.BEFORE));

    assert.equal(store.middlewares[ERunOrder.BEFORE][0] instanceof MMiddleware, true);
  });

  it('must set definite middleware which run after', function () {
    const store = new Store<string>('');
    store.setMiddleware(new MMiddleware(ERunOrder.AFTER));

    assert.equal(store.middlewares[ERunOrder.AFTER][0] instanceof MMiddleware, true);
  });

  it('must run middleware before set value', function () {
    const data = 'test-data';
    const store = new Store<string>(data);
    const mockedMiddleware = new MMiddleware(ERunOrder.BEFORE);
    const spy = new MSpy();
    mockedMiddleware.setSpy(spy);

    store.setMiddleware(mockedMiddleware);

    store.setData(() => 'new');

    assert.equal(spy.isCalled(), true);
    assert.equal(spy.getCallsCount(), 1);
    assert.deepEqual(spy.getCalledArgs(), [data]);
  });

  it('must run middleware after set value', function () {
    const data = 'test-data';
    const store = new Store<string>('');
    const mockedMiddleware = new MMiddleware(ERunOrder.AFTER);
    const spy = new MSpy();
    mockedMiddleware.setSpy(spy);

    store.setMiddleware(mockedMiddleware);

    store.setData(() => data);

    assert.equal(spy.isCalled(), true);
    assert.equal(spy.getCallsCount(), 1);
    assert.deepEqual(spy.getCalledArgs(), [data]);
  });
});
