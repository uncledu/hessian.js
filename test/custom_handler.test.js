'use strict';

var assert = require('assert');
var hessian = require('../');
var supportES6Map = require('../lib/utils').supportES6Map;

describe('utils.test.js', function () {
  describe('v1.0', function () {
  	it('should decode with custom handler', function () {
  		hessian.registerDecodeHandler('java.math.BigDecimal', function (result) {
        return {
          $class: result.$class,
          $: result.$.value,
        };
  		});
      var o = { $class: 'java.math.BigDecimal', $: { value: '100.06' } };
      var buf = hessian.encode(o, '1.0');
      var output = hessian.decode(buf, '1.0');
      assert(output === '100.06');
      hessian.deregisterDecodeHandler('java.math.BigDecimal');
      output = hessian.decode(buf, '1.0');
      assert.deepEqual(output, { value: '100.06' });
  	});

  	if (!supportES6Map) {
  		return;
  	}

  	it('should decode map with custom handler', function () {
  		hessian.registerDecodeHandler('java.util.HashMap', function (result) {
        return {
          $class: result.$class,
          $: result.$.$map,
        };
  		});
      var map = new Map();
      map.set(1, 'fee');
      map.set(2, 'fie');
      map.set(3, 'foe');
      var buf = hessian.encode({
        $class: 'java.util.HashMap',
        $: map
      }, '1.0');
      var output = hessian.decode(buf, '1.0');
      assert(output instanceof Map);
      assert(output.get(1) === 'fee');
      assert(output.get(2) === 'fie');
      assert(output.get(3) === 'foe');
      hessian.deregisterDecodeHandler('java.util.HashMap');
  	});
  });

  describe('v2.0', function () {
  	it('should decode with custom handler', function () {
  		hessian.registerDecodeHandler('java.math.BigDecimal', function (result) {
        return {
          $class: result.$class,
          $: result.$.value,
        };
  		});
      var o = { $class: 'java.math.BigDecimal', $: { value: '100.06' } };
      var buf = hessian.encode(o, '2.0');
      var output = hessian.decode(buf, '2.0');
      assert(output === '100.06');
      hessian.deregisterDecodeHandler('java.math.BigDecimal');
      output = hessian.decode(buf, '2.0');
      assert.deepEqual(output, { value: '100.06' });
  	});

  	if (!supportES6Map) {
  		return;
  	}

  	it('should decode map with custom handler', function () {
  		hessian.registerDecodeHandler('java.util.HashMap', function (result) {
        return {
          $class: result.$class,
          $: result.$.$map,
        };
  		});
      var map = new Map();
      map.set(1, 'fee');
      map.set(2, 'fie');
      map.set(3, 'foe');
      var buf = hessian.encode({
        $class: 'java.util.HashMap',
        $: map
      }, '2.0');
      var output = hessian.decode(buf, '2.0');
      assert(output instanceof Map);
      assert(output.get(1) === 'fee');
      assert(output.get(2) === 'fie');
      assert(output.get(3) === 'foe');
      hessian.deregisterDecodeHandler('java.util.HashMap');
  	});
  });
});
