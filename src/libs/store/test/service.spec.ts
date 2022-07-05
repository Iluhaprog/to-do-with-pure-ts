/* eslint-disable no-undef */

import assert from 'assert';
import { createStore } from '../service';
import { Store } from '../Store';

describe('Store service', function () {
  it('must create Store', function () {
    const store = createStore<string>('');

    assert.equal(store instanceof Store, true);
  });
});
