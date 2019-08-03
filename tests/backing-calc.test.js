const calc = require('../js/backing-calc');

test('30 Width, 40 Height', () => {
    let result = calc(30, 40);
    expect(calc(30, 40)).toBe(3);
  });