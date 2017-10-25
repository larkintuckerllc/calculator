const assert = require('assert');
const gv = require('./config.js');

beforeAll(() => {
  browser.url('file:///Users/jason/Projects/calculator/index.html');
})

afterEach(() => {
  browser.refresh();
})

describe('calculator', () => {

  it('should do rational addition', () => {
    gv.two.click();
    gv.three.click();
    gv.period.click();
    gv.five.click();
    gv.plus.click();
    gv.seven.click();
    gv.equals.click();

    assert.equal(gv.responsePaneText, '30.5');

  });

  it('should do chained operations', () => {
    gv.two.click();
    gv.plus.click();
    gv.three.click();
    gv.minus.click();
    gv.one.click();
    gv.seven.click();
    gv.equals.click();

    assert.equal(gv.responsePaneText, '-12');

  });

  it('should do chained and ordered operations', () => {
    gv.two.click();
    gv.plus.click();
    gv.three.click();
    gv.times.click();
    gv.eight.click();
    gv.equals.click();

    assert.equal(gv.responsePaneText, '26');

  });

  it('should display Undefined when dividing by zero', () => {
    gv.two.click();
    gv.dividedBy.click();
    gv.zero.click();
    gv.equals.click();

    assert.equal(gv.responsePaneText, 'Undefined');
  });

  it('should display Error if there are more than 10 digits', () => {
    gv.two.click();
    gv.zero.click();
    gv.zero.click();
    gv.zero.click();
    gv.zero.click();
    gv.times.click();
    gv.nine.click();
    gv.nine.click();
    gv.nine.click();
    gv.nine.click();
    gv.nine.click();
    gv.times.click();
    gv.nine.click();
    gv.zero.click();
    gv.equals.click();

    assert.equal(gv.responsePaneText, 'Error');
  });

  it('should respect order of operations as early as possible with multiplication', () => {
    gv.two.click();
    gv.plus.click();
    gv.three.click();
    gv.times.click();
    gv.four.click();
    gv.dividedBy.click();

    assert.equal(gv.responsePaneText, 12);

    gv.six.click();
    gv.equals.click();

    assert.equal(gv.responsePaneText, 4);
  });

  it('should respect order of operations as early as possible with addition', () => {
    gv.two.click();
    gv.plus.click();
    gv.four.click();
    gv.plus.click();

    assert.equal(gv.responsePaneText, 6);

    gv.three.click();
    gv.times.click();
    gv.four.click();
    gv.minus.click();

    assert.equal(gv.responsePaneText, 18);

    gv.six.click();
    gv.equals.click();

    assert.equal(gv.responsePaneText, 12);
  });
});
