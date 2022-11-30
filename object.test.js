const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Objects', () => {
  describe('clone object', () => {
    describe('shallowClone Creates shallow  copy of object', () => {
      /***
       * @example
       * const obj ={a: '1', b: {b1: 'a', b2:'2;}}
       * const cloned =  shallowClone(obj)
       * cloned !== obj
       * cloned.a === obj.a
       * cloned.b === obj.b
       * cloned.b.b1 === obj.b.b1
       */
      const shallowClone = TODO_IMPLEMENT_ME;

      it.todo('Write tests');
    });

    describe('deepClone: Create deep copy of object. Use recursion', () => {
      /***
       * @example
       * const obj ={a: '1', b: {b1: 'a', b2:'2;}}
       * const cloned =  deepClone(obj)
       * cloned !== obj
       * cloned.a === obj.a
       * cloned.b !== obj.b
       * cloned.b.b1 === obj.b.b1
       */
      const deepClone = TODO_IMPLEMENT_ME;

      it.todo('Write tests');
    });
  });

  describe('pick Creates an new object composed of picked object`s properties.', () => {
    /***
     * @example
     * const object = { a: 1, b: '2', c: 3 };
     * pick(object, ['a', 'c']); // { a: 1, c: 3 }
     * pick(object, ['c']); //  { c: 3 }
     */
    function pick(obj, props) {}

    it.todo('Write tests');
  });

  describe('Object comparison', () => {
    describe('isEqual performs shallow comparison between two values', () => {
      /**
       * @example
       * const obj1 = { a: 1, b: 2 };
       * const obj2 = { a: 1, b: 2 };
       * const obj3 = { a: 1, b: 4 };
       * isEqual(obj1, obj2); // true
       * isEqual(obj1, obj3); // false
       */
      function isEqual(o1, o2) {}

      it.todo('Write tests');
    });

    describe('isDeepEqual performs deep comparison between two values', () => {
      /**
       * @example
       * const obj1 = { a: 1, b: { a: 2 } };
       * const obj2 = { a: 1, b: { a: 2 } };
       * isDeepEqual(obj1, obj2); // true
       */
      function isEqual(o1, o2) {}

      it.todo('Write tests');
    });
  });

  describe('get: gets value from object by path.', () => {
    /***
     * @example
     * get({ a: { b: { c: 3 } }}, 'a') // { b: { c: 3 } }
     * get({ a: { b: { c: 3 } }, 'a.b.c') // 3
     */
    function get(obj, path) {}
  });
});
