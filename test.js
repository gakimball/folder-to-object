'use strict';

const path = require('path');
const expect = require('chai').expect;
const toObject = require('.');

describe('toObject()', () => {
  const expected = {
    one: {
      one: true,
    },
    two: {
      three: {
        three: true,
      },
      four: {
        four: true,
      },
    },
  };

  it('converts a folder of data files into an object', () => {
    return toObject(path.join(__dirname, 'fixtures')).then(res => {
      expect(res).to.eql(expected);
    });
  });

  it('works with relative paths', () => {
    return toObject('fixtures').then(res => {
      expect(res).to.eql(expected);
    });
  });
});
