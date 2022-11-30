const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};
describe('Function and closure', () => {
  describe('compose: composition of functions', () => {
    /**
     * @example
     * compose(fn1, fn2, fn3, fn4) === fn1(fn2(fn3(fn4(arg))))
     */
    const compose = TODO_IMPLEMENT_ME;

    test.todo('Write  tests');
  });

  describe('createIncrementor: create function that each time return new value incremented by incrementValue and start from start', () => {
    const createIncrementor = TODO_IMPLEMENT_ME;
    test('Should ... ', () => {
      const nextFrom10By7 = createIncrementor(10, 7);
      expect(nextFrom10By7()).toBe(10);
      expect(nextFrom10By7()).toBe(17);
      expect(nextFrom10By7()).toBe(24);
    });
  });

  describe('createUserCreator: create new user with unique number identifier using increment', () => {
    // Should return function
    const createUserCreator = TODO_IMPLEMENT_ME;
    // Write description
    test('Should ....', () => {
      const createUser = createUserCreator(1); // 1 is start id.
      expect(createUser('Ivan')).toStrictEqual({ name: 'Ivan', id: 1 });
      expect(createUser('Petr').name).toBe('Petr');
      expect(createUser('Anna').id).toBe(3);
    });

    test.todo('Write additional tests');
  });

  describe('createGetterSetter', () => {
    /***
     *  Function should return object with 2 methods: setValue and getValue.
     *  @example
     *  obj = createGetterSetter(10)
     *  obj.getValue(); // 10
     *  obj.setValue(20);
     *  obj.getValue(); //20
     */
    const createGetterSetter = TODO_IMPLEMENT_ME;
    test.todo('Created obj should have getValue and setValue methods');
    test.todo('Write additional tests');
  });

  describe('calcCall calculates number of function calls', () => {
    function fn() {
      // DON'T CHANGE ME
      return 'test';
    }

    function calcCall(func) {
      // TODO: implement
      return [func, () => 0]; // CHANGE TOO
    }

    test('Calculate function invocation', () => {
      const [callFn, getFnCount] = calcCall(fn);
      const [callFn2, getFn2Count] = calcCall(fn);

      callFn();
      callFn();
      expect(callFn()).toBe('test');
      expect(getFnCount()).toBe(3);
      callFn();
      expect(getFnCount()).toBe(4);
      callFn2();
      expect(getFn2Count()).toBe(1);
      callFn2();
      expect(getFn2Count()).toBe(2);
    });
  });

  describe('memoization', () => {
    // Before start see next task with memoize function to understand difference
    describe('memoizeLast Creates a function that memoizes the last result of function', () => {
      function memoizeLast(fn) {
        // TODO: implement
      }
      test('Should cache the result of function with single argument', () => {
        // DON'T CHANGE.
        let invokesCount = 0;
        function formula(x) {
          // DON'T CHANGE.
          invokesCount++;
          return 10 * x + 5;
        }

        const memoizedFormula = memoizeLast(formula);

        expect(memoizedFormula(10)).toBe(105);
        expect(memoizedFormula(10)).toBe(105);
        expect(invokesCount).toBe(1);
        expect(memoizedFormula(5)).toBe(55);
        expect(invokesCount).toBe(2);
        expect(memoizedFormula(10)).toBe(105); // Recalculated
        expect(invokesCount).toBe(3);
      });

      /**
       *  https://jestjs.io/docs/mock-functions
       *  toHaveBeenCalledTimes = https://jestjs.io/docs/expect#tohavebeencalledtimesnumber
       */
      test.todo('Use jest.fn() instead of formula function');
    });

    describe('memoize Creates a function that memoizes all previous result of function invocation', () => {
      function memoize(fn) {
        // TODO: implement
      }
      test('Should cache the result of function with single argument', () => {
        // DON'T CHANGE.
        let invokesCount = 0;
        function formula(x) {
          // DON'T CHANGE.
          invokesCount++;
          return 10 * x + 5;
        }

        const memoizedFormula = memoize(formula);

        expect(memoizedFormula(10)).toBe(105);
        expect(memoizedFormula(10)).toBe(105);
        expect(invokesCount).toBe(1);
        expect(memoizedFormula(5)).toBe(55);
        expect(invokesCount).toBe(2);
        expect(memoizedFormula(10)).toBe(105); // Get result from a cache
        expect(invokesCount).toBe(2);
      });

      /**
       *  https://jestjs.io/docs/mock-functions
       *  toHaveBeenCalledTimes = https://jestjs.io/docs/expect#tohavebeencalledtimesnumber
       */
      test.todo('Use jest.fn() instead of formula function');
    });
  });

  // In this task you don't need to write function implementation
  // You have to write test using mocks and spy https://jestjs.io/docs/mock-functions

  describe('Mocking: try to use jest mock and spy', () => {
    // DON'T CHANGE.
    const logger = {
      messages: [],
      log: function (message) {
        this.messages.push(message);
      },
    };

    // DON'T CHANGE.
    const logMe =
      (logger) =>
      (fn) =>
      (...args) => {
        logger.log('start');
        const result = fn(...args);
        logger.log('end');
        return result;
      };

    test('logMe should log start and end of call js function', () => {
      const loggedExample = logMe(logger)((arg) => arg);
      expect(loggedExample('test1')).toBe('test1');
      expect(logger.messages).toStrictEqual(['start', 'end']);
    });

    test.todo('Write test using mock instead of example');
    test.todo('Write test using mock for logger');
  });

  describe('Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.', () => {
    function once(fn) {
      // TODO: implement
    }

    test('...', () => {
      // DON'T CHANGE
      let callsCount = 0;
      // DON'T CHANGE
      function init() {
        callsCount++;
      }

      const initialize = once(init);
      initialize();
      initialize();
      initialize();

      expect(callsCount).toBe(1);
    });
  });

  describe('partial Creates a function that invokes func with partials prepended to the arguments it receives.', () => {
    /***
     * @example
     * const add = (a, b) => a + b
     * const add10 = partial(add, 10)
     * add10(5); // 15
     */
    function partial(fn, arg1) {
      // TODO: implement
    }

    test.todo('Write tests');
  });

  describe('findNode: recursion', () => {
    const node = {
      name: 'Name 1',
      key: 'AAA-AAA',
      items: [
        {
          name: 'Name 1.1',
          key: 'BBB-BBB',
        },
        {
          name: 'Name 1.2',
          key: 'DDD-DDD',
          items: [
            {
              key: 'CCC-CCC',
              name: 'Name 1.2.1',
            },
            {
              key: 'EEE-EEE',
              name: 'Name 1.2.2',
              items: [],
            },
          ],
        },
      ],
    };
    /**
     * TODO
     * @example
     *  find(data, "DDD-DDD"); // { name: "Name 1.2", key: 'DDD-DDD', items: [...] }
     *   find(data, "AAA-AAA"); // { name: "Name 1", key: 'AAA-AAA', items: [ ... ] }
     *   find(data, "EEE-EEE"); // { name: "Name 1.2.2", key: 'EEE-EEE', items: [ ... ] }
     */
    function find(node, key) {}

    it.todo('Write tests');
  });

  describe('error handling: try/catch/finally', () => {
    /**
     *
     * @param callMe Should be wrapped by try /catch block
     * @param callMeOnErrorFn Should be called if callMe throws an error
     * @param callMeInAnyCase Should be called in any case (finally)
     */
    const callMeWithErrorHandling = (
      callMe,
      callMeOnErrorFn,
      callMeInAnyCase
    ) => {};

    it.todo('Write tests');
  });

  describe('useState:', () => {
    /***
     *  useState is similar to React.useState, but has significant different:
     *  - it uses unique name (first argument) to distinguish different useState instead of invocation order
     *  - It can be called in any function in any place
     * @example
     *     const [value, setValue] = useState('Unique state name', 'initial value')
     *     const [year, setYear] = useState('year', 2000)
     *     value; // 2000
     *     setValue(2015);
     *     value; // 2000
     *     const  [updatedYear] = useState('year', 2000)
     *     updatedYear; // 2015
     *     const [month, setMonth] = useState('month', 'Jan');
     *     month;// Jan
     *     setMonth('Feb');
     *     const [updatedMonth] = useState('month', 'Jan');
     *     updatedMonth; // Feb
     *     const  [updatedYear2] = useState('year', 2000)
     *     updatedYear; // 2015
     */
    const useState = TODO_IMPLEMENT_ME;
  });
});
