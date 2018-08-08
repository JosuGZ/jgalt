import JGalt from '../src'; // TODO: Test js

describe('JGalt', () => {
  var numberOfLogs = 0;
  const logger = console.log;
  const logCounter = (...args) => {
    numberOfLogs++;
    logger(...args);
  };
  console.log = logCounter;

  describe('fromTableToObjects()', () => {
    const table1 =
`a b     c d e
1 2 3 4 5

1 2 4 5     6`;
    const table2 = 'a b\n1 2\n 1 3\n';
    const table3 = 'a b\n\r1 2\n\r 1 3\n';

    it('works with table1', () => {
      const objects = JGalt.fromTableToObjects(table1);
      expect(objects).toMatchObject([
        { a: '1', b: '2', c: '3', d: '4', e: '5' },
        { a: '1', b: '2', c: '4', d: '5', e: '6' },
      ]);
    });

    it('works with table2', () => {
      const objects = JGalt.fromTableToObjects(table2);
      expect(objects).toMatchObject([
        { a: '1', b: '2' },
        { a: '1', b: '3' },
      ]);
    });

    it('works with table3', () => {
      const objects = JGalt.fromTableToObjects(table3);
      expect(objects).toMatchObject([
        { a: '1', b: '2' },
        { a: '1', b: '3' },
      ]);
    });

    it('it applies a custom function to cells', () => {
      const customFunction = (cell, header) => {
        let newCell = Number(cell);
        if (header === 'a') {
          return cell;
        } else {
          return newCell;
        }
      };
      const objects = JGalt.fromTableToObjects(table3, undefined, undefined, customFunction);
      expect(objects).toMatchObject([
        { a: '1', b: 2 },
        { a: '1', b: 3 },
      ]);
    });

    it('can split columns with a custom regex', () => {
      const table = 'a b   b\n1  2\n 1   3\n';
      const objects = JGalt.fromTableToObjects(table, undefined, /\s\s+/);
      expect(objects).toMatchObject([
        { 'a b': '1', b: '2' },
        { 'a b': ' 1', b: '3' },
      ]);
    });

  });

  describe('mergeArray()', () => {

    it('returns null on null', () => {
      const merged = JGalt.mergeArray(null);
      expect(merged).toBe(null);
    });

    it('returns null on undefined', () => {
      const merged = JGalt.mergeArray(undefined);
      expect(merged).toBe(null);
    });

    it('returns null on number', () => {
      const merged = JGalt.mergeArray(12 as any);
      expect(merged).toBe(null);
    });

    it('returns null on object', () => {
      const merged = JGalt.mergeArray({a: 1, b: 2} as any);
      expect(merged).toBe(null);
    });

    it('merges 1', () => {
      const merged = JGalt.mergeArray([{a: 1, b: 2}, {a: 2, b: 2}]);
      expect(merged).toMatchObject({a: [1, 2], b: 2});
    });

    it('merges 2', () => {
      var array = [
        {
          "model": "AMD Phenom(tm) II X6 1090T Processor",
          "speed": 1731,
          "times": {
            "user": 35647000,
            "nice": 88100,
            "sys": 8107700,
            "idle": 207430400,
            "irq": 0
          }
        },
        {
          "model": "AMD Phenom(tm) II X6 1090T Processor",
          "speed": 1506,
          "times": {
            "user": 36486900,
            "nice": 135200,
            "sys": 8365700,
            "idle": 207761300,
            "irq": 0
          }
        },
        {
          "model": "AMD Phenom(tm) II X6 1090T Processor",
          "speed": 3699,
          "times": {
            "user": 35550700,
            "nice": 96300,
            "sys": 8315700,
            "idle": 208997000,
            "irq": 0
          }
        },
        {
          "model": "AMD Phenom(tm) II X6 1090T Processor",
          "speed": 2190,
          "times": {
            "user": 32076200,
            "nice": 82100,
            "sys": 12637200,
            "idle": 207773100,
            "irq": 0
          }
        },
        {
          "model": "AMD Phenom(tm) II X6 1090T Processor",
          "speed": 2567,
          "times": {
            "user": 35344000,
            "nice": 99000,
            "sys": 8348400,
            "idle": 209135500,
            "irq": 0
          }
        },
        {
          "model": "AMD Phenom(tm) II X6 1090T Processor",
          "speed": 2399,
          "times": {
            "user": 35831600,
            "nice": 92400,
            "sys": 8356000,
            "idle": 208640200,
            "irq": 0
          }
        }
      ];
      const merged = JGalt.mergeArray(array);
      expect(merged).toMatchObject({
        model: 'AMD Phenom(tm) II X6 1090T Processor',
        speed: [1731, 1506, 3699, 2190, 2567, 2399],
        times: [
          {
            "user": 35647000,
            "nice": 88100,
            "sys": 8107700,
            "idle": 207430400,
            "irq": 0
          },
          {
            "user": 36486900,
            "nice": 135200,
            "sys": 8365700,
            "idle": 207761300,
            "irq": 0
          },
          {
            "user": 35550700,
            "nice": 96300,
            "sys": 8315700,
            "idle": 208997000,
            "irq": 0
          },
          {
            "user": 32076200,
            "nice": 82100,
            "sys": 12637200,
            "idle": 207773100,
            "irq": 0
          },
          {
            "user": 35344000,
            "nice": 99000,
            "sys": 8348400,
            "idle": 209135500,
            "irq": 0
          },
          {
            "user": 35831600,
            "nice": 92400,
            "sys": 8356000,
            "idle": 208640200,
            "irq": 0
          }
        ]
      });
    });

  });

  it('does not call console.log', () => {
    expect(numberOfLogs).toBe(0);
  });

});
