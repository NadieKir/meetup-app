const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Function and closure', () => {
  describe('compose: composition of functions', () => {
    function compose(...fns) {
      if (!fns.every(fn => typeof fn === 'function')) throw new Error('All arguments must be functions');

      return arg => fns.reduceRight((acc, fn) => fn(acc), arg);
    }

    test('Makes composition of functions', () => {
      const change = str => str.replace('Epam', 'Sam Solutions');
      const upperCase = str => str.toUpperCase();
      const repeat = str => `${str} `.repeat(3);

      const fnWithСompose1 = compose(repeat, upperCase, change);

      expect(fnWithСompose1('Epam лучший')).toStrictEqual(repeat(upperCase(change('Epam лучший'))));

      const fnWithСompose2 = compose(change);

      expect(fnWithСompose2('Epam лучший')).toStrictEqual(change('Epam лучший'));
    });

    test('Throws an exception when at least one argument is not a function', () => {
      const change = 'Sam Solutions';
      const upperCase = str => str.toUpperCase();
      const repeat = str => `${str} `.repeat(3);

      expect(() => compose(repeat, upperCase, change)('Some str')).toThrow('All arguments must be functions');
    });
  });

  describe('createIncrementor: create function that each time return new value incremented by incrementValue and start from start', () => {
    function createIncrementor(initialValue, increment) {
      if(typeof initialValue !== 'number' || typeof increment !== 'number') throw new Error('All arguments must be numbers');

      let counter = initialValue - increment;

      return function() {
        counter = counter + increment;

        return counter;
      }
    }

    test('Returns new value of initialValue incremented by incrementValue and start from start', () => {
      const nextFrom10By7 = createIncrementor(10, 7);
      const nextFrom20By2 = createIncrementor(20, 2);

      expect(nextFrom10By7()).toBe(10);
      expect(nextFrom20By2()).toBe(20);
      expect(nextFrom10By7()).toBe(17);
      expect(nextFrom10By7()).toBe(24);
      expect(nextFrom20By2()).toBe(22);
    });

    test('Throws an exception when at least one argument is not a number', () => {
      expect(() => createIncrementor(10, '7')()).toThrow('All arguments must be numbers');
    });
  });

  describe('createUserCreator: create new user with unique number identifier using increment', () => {
    function createUserCreator(initialId) {
      if(!['string', 'number'].includes(typeof initialId) || isNaN(initialId)) throw new Error('The argument must be able to be converted to number');

      let id = +initialId;

      return function(name) {
        return {'id': id++, name};
      }
    }

    test('Creates new user with a unique number identifier using increment', () => {
      const createUser = createUserCreator(1); 

      expect(createUser('Ivan')).toStrictEqual({ name: 'Ivan', id: 1 });
      expect(createUser('Petr').name).toBe('Petr');
      expect(createUser('Anna').id).toBe(3);
    });

    test('Converts string id to number and creates new user', () => {
      const createUser = createUserCreator('1'); 

      expect(createUser('Ivan')).toStrictEqual({ name: 'Ivan', id: 1 });
      expect(createUser('Petr').name).toBe('Petr');
      expect(createUser('Anna').id).toBe(3);
    });

    test('Throws an exception when initialId argument is not a number or string that can be converted to number', () => {
      expect(() => createUserCreator([7, 7])('Иван')).toThrow('The argument must be able to be converted to number');
      expect(() => createUserCreator('1str')('Иван')).toThrow('The argument must be able to be converted to number');
    });
  });

  describe('createGetterSetter', () => {
    function createGetterSetter1(initialValue) {
      const obj = {
        _value: initialValue,

        setValue(value) {
          this._value = value
        },

        getValue() {
          return this._value;
        }
      };

      return obj;
    }

    function createGetterSetter2(initialValue) {
      class Obj {
        #value;

        constructor(initialValue) {
          this.#value = initialValue;
        }
        
        setValue(value) {
          this.#value = value
        }

        getValue() {
          return this.#value;
        }
      };

      return new Obj(initialValue);
    }

    // const createGetterSetter = createGetterSetter1;
    const createGetterSetter = createGetterSetter2;

    test('Created obj should have getValue and setValue methods', () => {
      const obj = createGetterSetter(10);

      expect(obj.getValue()).toBe(10);

      obj.setValue(20);

      expect(obj.getValue()).toBe(20);
    });

    test('Returns undefined value if no argument provided', () => {
      const obj = createGetterSetter();

      expect(obj.getValue()).toBeUndefined();
    });
  });

  describe('calcCall calculates number of function calls', () => {
    function fn() {
      return 'test';
    }

    function calcCall(func) {
      if(typeof func !== 'function') throw new Error('The argument must be a function');

      let counter = 0;

      const funcWithCounter = () => {
        counter++;

        return func();       
      }

      return [funcWithCounter, () => counter]; 
    }

    test('Calculates function invocation', () => {
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

    test('Throws an exception when argument is not a function', () => {
      expect(() => calcCall('fn')).toThrow('The argument must be a function');
    });
  });

  describe('memoization', () => {
    describe('memoizeLast Creates a function that memoizes the last result of function', () => {
      function memoizeLast(fn) {
        if(typeof fn !== 'function') throw new Error('The argument must be a function');

        let prevArg, prevRes;

        return function(arg) {
          if (prevArg === arg) return prevRes;

          prevArg = arg;
          prevRes = fn(arg);

          return prevRes;
        };
      }

      test('Should cache the result of function with single argument', () => {
        let invokesCount = 0;

        function formula(x) {
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

      test('Works with jest.fn() instead of formula function', () => {
        const formula = jest.fn(x => x + 10);
        const memoizedFormula = memoizeLast(formula);

        memoizedFormula(10);
        memoizedFormula(10);
        expect(formula).toBeCalledTimes(1);

        memoizedFormula(5);
        expect(formula).toBeCalledTimes(2);

        memoizedFormula(10); // Recalculated
        expect(formula).toBeCalledTimes(3);
      });

      test('Throws an exception when argument is not a function', () => {
        expect(() => memoizeLast('fn')).toThrow('The argument must be a function');
      });
    });

    describe('memoize Creates a function that memoizes all previous result of function invocation', () => {
      function memoize1(fn) {
        if(typeof fn !== 'function') throw new Error('The argument must be a function');

        const prevResults = {};

        return function(arg) {
          if (prevResults[arg]) return prevResults[arg];

          prevResults[arg] = fn(arg);

          return prevResults[arg];
        };
      }

      function memoize2(fn) {
        if(typeof fn !== 'function') throw new Error('The argument must be a function');

        const prevResults = new Map();

        return function(arg) {
          if (prevResults.has(arg)) return prevResults.get(arg);

          prevResults.set(arg, fn(arg));

          return prevResults.get(arg);
        };
      }

      // const memoize = memoize1;
      const memoize = memoize2;

      test('Should cache the result of function with single argument', () => {
        let invokesCount = 0;

        function formula(x) {
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

      test('Works with jest.fn() instead of formula function', () => {
        const formula = jest.fn(x => x + 10);
        const memoizedFormula = memoize(formula);

        memoizedFormula(10);
        memoizedFormula(10);
        expect(formula).toBeCalledTimes(1);

        memoizedFormula(5);
        expect(formula).toBeCalledTimes(2);

        memoizedFormula(10); // Get result from a cache
        expect(formula).toBeCalledTimes(2);
      });

      test('Throws an exception when argument is not a function', () => {
        expect(() => memoize('fn')).toThrow('The argument must be a function');
      });
    });
  });

  // In this task you don't need to write function implementation
  // You have to write test using mocks and spy https://jestjs.io/docs/mock-functions

  describe('Mocking: try to use jest mock and spy', () => {
    const logger = {
      messages: [],
      log: function (message) {
        this.messages.push(message);
      },
    };

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

    test('Works using mock instead of example', () => {
      jest.mock(
        './loggedExample',
        () => (
          {
            messages: [],
            log: function (arg) {
              this.messages.push('start');
              const result = arg;
              this.messages.push('end');
              return result;
            },
          }
        ),
        { virtual: true }
      );
      
      const mockExample = require('./loggedExample');

      const loggedResult = mockExample.log('test1');
      expect(loggedResult).toBe('test1');
      expect(mockExample.messages).toStrictEqual(['start', 'end']);

      mockExample.log('test2');
      expect(mockExample.messages).toStrictEqual(['start', 'end', 'start', 'end']);
    });

    test('Works using mock for logger', () => {
      jest.mock('./loggerMock', () => ({ 
        messages: [],
        log: function (message) {
          this.messages.push(message);
        },
      }),
      { virtual: true }
      );

      const logMe =
      (logger) =>
      (fn) =>
      (...args) => {
        logger.log('start');
        const result = fn(...args);
        logger.log('end');
        return result;
      };

      const loggerMock = require('./loggerMock');
      const spyLog = jest.spyOn(loggerMock, 'log');
      const loggedExample = logMe(loggerMock)((arg) => arg);

      expect(loggedExample('test1')).toBe('test1');
      expect(spyLog).toBeCalledTimes(2);
      expect(loggerMock.messages).toStrictEqual(['start', 'end']);
    });
  });

  describe('Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.', () => {
    function once(fn) {
      let wasInvoked = false;
      let res;

      return function(...args) {
        if(wasInvoked) return res;

        wasInvoked = true;
        res = fn(...args);

        return res;
      }
    }

    test('Invokes function once and then returns a value of first function invocation', () => {
      let callsCount = 0;

      function init() {
        callsCount++;
      }

      const initialize = once(init);
      initialize();
      initialize();
      initialize();

      expect(callsCount).toBe(1);
    });

    test("Works with mock", () => {
      const fn = jest.fn();
      const initialize = once(fn);

      initialize();
      initialize();
      initialize();

      expect(fn).toBeCalledTimes(1);
    });
  });

  describe('partial Creates a function that invokes func with partials prepended to the arguments it receives.', () => {
    function partial(fn, arg1) {
      if(typeof fn !== 'function') throw new Error('The argument must be a function');

      return function(...args) {
        return fn(arg1, ...args);
      }
    }

    test('Invokes func with partials prepended to the arguments it receives', () => {
      const add = (a, b) => a + b;
      const add10 = partial(add, 10);

      expect(add10(5)).toBe(15);

      const concat = (a, b, c) => a + b + c;
      const concatSam = partial(concat, 'Sam Solutions ');

      expect(concatSam('лучший', '!')).toBe('Sam Solutions лучший!');
    });

    test('Throws an exception when argument is not a function', () => {
      expect(() => partial('fn', 9)).toThrow('The argument must be a function');
    });
  });

  describe('findNode: recursion', () => {
    const data = {
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

    function find(node, key) {
      if (typeof node !== 'object' || Array.isArray(node) || node === null) throw new Error('The first argument must be an object');

      let result;

      if (node.key === key) return node;
   
      if (Array.isArray(node.items) && node.items.length > 0) {
         node.items.some((item) => {
           result = find(item, key);
           return result;
         });
      }

      return result;
    }

    test('Returns node by id', () => {
      expect(find(data, "DDD-DDD").name).toBe('Name 1.2');
      expect(find(data, "AAA-AAA").name).toBe('Name 1');
      expect(find(data, "EEE-EEE").name).toBe('Name 1.2.2');
    })

    test('Returns undefined if there is no such a key in a node', () => {
      expect(find(data, "DDD-AAA")).toBeUndefined();
    });

    test('Throws an exception if data is not an object', () => {
      expect(() => find([1,2,3], 7)).toThrow('The first argument must be an object');
    })
  });

  describe('error handling: try/catch/finally', () => {
    const callMeWithErrorHandling = (
      callMe,
      callMeOnErrorFn,
      callMeInAnyCase
    ) => {
      if([callMeOnErrorFn, callMeInAnyCase].some(fn => typeof fn !== 'function')) throw new Error('All arguments must be functions');

      try{
        callMe();
      } catch {
        callMeOnErrorFn();
      } finally {
        callMeInAnyCase();
      }
    };

    test('Invokes functions in try/catch/finally block', () => {
      const callMe = jest.fn();
      const callMeWithError = jest.fn(() => { throw new Error() });
      const callMeWithErrorBecauseArray = [1, 3, 5];
      const callMeOnErrorFn = jest.fn();
      const callMeInAnyCase = jest.fn();

      callMeWithErrorHandling(callMe, callMeOnErrorFn, callMeInAnyCase);

      expect(callMeOnErrorFn).toBeCalledTimes(0);
      expect(callMeInAnyCase).toBeCalledTimes(1);

      callMeWithErrorHandling(callMeWithError, callMeOnErrorFn, callMeInAnyCase);

      expect(callMeOnErrorFn).toBeCalledTimes(1);
      expect(callMeInAnyCase).toBeCalledTimes(2);

      callMeWithErrorHandling(callMeWithErrorBecauseArray, callMeOnErrorFn, callMeInAnyCase);

      expect(callMeOnErrorFn).toBeCalledTimes(2);
      expect(callMeInAnyCase).toBeCalledTimes(3);
    });

    test('Handle not functions trying to be invoked', () => {
      const callMeWithErrorBecauseArray = [1, 3, 5];
      const callMeOnErrorFn = jest.fn();
      const callMeInAnyCase = jest.fn();

      callMeWithErrorHandling(callMeWithErrorBecauseArray, callMeOnErrorFn, callMeInAnyCase);

      expect(callMeOnErrorFn).toBeCalledTimes(1);
      expect(callMeInAnyCase).toBeCalledTimes(1);
    });

    test('Throws an exception if second or third argument is not a function', () => {
      expect(() => callMeWithErrorHandling(jest.fn(), [1, 2, 5], jest.fn())).toThrow('All arguments must be functions')
    })
  });

  describe('useState:', () => {
    /***
     *  useState is similar to React.useState, but has significant different:
     *  - it uses unique name (first argument) to distinguish different useState instead of invocation order
     *  - It can be called in any function in any place
     */
     const state = {
      _state: {},

      setValue(id) {
        return value => this._state[id] = value;       
      },

      getValue(id) {
        return this._state[id];
      }
    };

    function useState(id, initValue) {
      if(state._state[id] === undefined) state._state[id] = initValue;

      return [state.getValue(id), state.setValue(id)];
    }

    test('Sets state of variable like useState in React, but using key as a first argument', () => {
      const [year, setYear] = useState('year', 2000);
      expect(year).toBe(2000);
      setYear(2015);
      setYear(2018);
      expect(year).toBe(2000);

      const  [updatedYear] = useState('year', 2000);
      expect(updatedYear).toBe(2018);

      const [month, setMonth] = useState('month', 'Jan');
      expect(month).toBe('Jan');
      setMonth('Feb');

      const [updatedMonth] = useState('month', 'Jan');
      expect(updatedMonth).toBe('Feb');

      const [updatedYear2] = useState('year', 2000)
      expect(updatedYear2).toBe(2018);
    })
  });
});
