const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Objects', () => {
  describe('clone object', () => {
    describe('shallowClone Creates shallow copy of object', () => {
      function shallowClone1(obj) {
        if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) throw new Error('The argument is not an object');

        return Object.assign({}, obj);
      }

      function shallowClone2(obj) {
        if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) throw new Error('The argument is not an object');

        const copy = {};

        for(property in obj) {
          copy[property] = obj[property];
        }

        return copy;
      }

      // const shallowClone = shallowClone1;
      const shallowClone = shallowClone2;

      it('Creates shallow copy of an object', () => {
        const obj ={a: '1', b: { b1: 'a', b2: '2' }};
        const cloned =  shallowClone(obj);
        
        expect(cloned !== obj).toBeTruthy();
        expect(cloned.a === obj.a).toBeTruthy();
        expect(cloned.b === obj.b).toBeTruthy();
        expect(cloned.b.b1 === obj.b.b1).toBeTruthy();
      });

      it('Returns an empty object if speciefied object is empty', () => {
        const obj = {};
        const cloned = shallowClone(obj);
        
        expect(cloned !== obj).toBeTruthy();
      });
      
      it('Throws an exception when argument is not an object', () => {
        expect(() => shallowClone('a: 1, b: 2, c: 3')).toThrow('The argument is not an object');
      });
    });

    describe('deepClone: Create deep copy of object. Use recursion', () => {
      function deepClone(obj) {
        if (typeof obj !== "object") return obj;

        const copy = {};

        for (let key in obj) {
          const value = obj[key];
          copy[key] = deepClone(value); 
        }
      
        return copy;
      }

      it('Creates deep copy of an object', () => {
        const obj ={a: '1', b: {b1: 'a', b2: '2'}};
        const cloned = deepClone(obj);
        
        expect(cloned !== obj).toBeTruthy();
        expect(cloned.a === obj.a).toBeTruthy();
        expect(cloned.b !== obj.b).toBeTruthy();
        expect(cloned.b.b1 === obj.b.b1).toBeTruthy();
      });

      it('Returns an empty object if speciefied object is empty', () => {
        const obj = {};
        const cloned = deepClone(obj);
        
        expect(cloned !== obj).toBeTruthy();
      });
    });
  });

  describe('pick Creates a new object composed of picked object`s properties', () => {
    function pick(obj, props) {
      if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) throw new Error('First argument is not an object');
      
      if (!Array.isArray(props)) throw new Error('Second argument is not an array');
      
      const result = {};

      for (let prop in obj) {
        if (props.includes(prop)) result[prop] = obj[prop];
      }

      return result;
    }

    it('Creates a new object composed of picked object`s properties', () => {
      const object = { a: 1, b: '2', c: 3 };

      expect(pick(object, ['a', 'c'])).toStrictEqual({ a: 1, c: 3 });
      expect(pick(object, ['a', 'c', 'z'])).toStrictEqual({ a: 1, c: 3 });
      expect(pick(object, ['c'])).toStrictEqual({ c: 3 });
    });

    it('Returns an empty object if specified object or array is empty', () => {
      expect(pick({}, ['a', 'c'])).toStrictEqual({});
      expect(pick({ a: 1, b: '2', c: 3 }, [])).toStrictEqual({});
    });

    it('Throws an exception when first argument is not an object', () => {
      expect(() => pick(['a', 'c', 'c', 'a'], ['a', 'c'])).toThrow('First argument is not an object');
    });

    it('Throws an exception when second argument is not an array', () => {
      expect(() => pick({ a: 1, b: '2', c: 3 }, 'a')).toThrow('Second argument is not an array');
    });

  });

  describe('Object comparison', () => {
    describe('isEqual performs shallow comparison between two values', () => {
      function isEqual(obj1, obj2) {
        if (typeof obj1 !== 'object' || Array.isArray(obj1) || obj1 === null) throw new Error('Arguments must be objects');  
        if (typeof obj2 !== 'object' || Array.isArray(obj2) || obj2 === null) throw new Error('Arguments must be objects');  

        if(Object.keys(obj1).length !== Object.keys(obj2).length) return false;

        for(let property in obj1) {
          if (obj1[property] !== obj2[property]) return false;         
        }

        return true;
      }

      it('Performs shallow comparison between two values', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };
        const obj3 = { a: 1, b: 4 };
        const obj4 = { a: 1, b: 4, c: 6 };
        const obj5 = { a: 1, b: 4, c: { d: 6 } };
        const obj6 = { a: 1, b: 4, c: { d: 6 } };

        expect(isEqual(obj1, obj2)).toBeTruthy();
        expect(isEqual(obj1, obj3)).toBeFalsy();
        expect(isEqual(obj4, obj3)).toBeFalsy();
        expect(isEqual(obj4, obj5)).toBeFalsy();
        expect(isEqual(obj6, obj5)).toBeFalsy();
        expect(isEqual({}, {})).toBeTruthy();
      });

      it('Throws an exception when at least one of the arguments is not an object', () => {
        expect(() => isEqual(['a', 'c', 'c', 'a'], { a: 1, b: 2 })).toThrow('Arguments must be objects');
        expect(() => isEqual({ a: 1, b: 2 }, 'a')).toThrow('Arguments must be objects');
      });
    });

    describe('isDeepEqual performs deep comparison between two values', () => {
      function isDeepEqual(obj1, obj2) {
        if (obj1 === obj2) return true;

        if ((typeof obj1 === "object" && obj1 !== null) && (typeof obj2 === "object" && obj2 !== null)) {
          if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
      
          for (let prop in obj1) {
            if (obj2.hasOwnProperty(prop))
            {  
              if (!isDeepEqual(obj1[prop], obj2[prop])) return false;
            }
            else return false;
          }
          
          return true;
        }
        else return false;
      }

      it('Performs deep comparison between two values', () => {
        const obj1 = { a: 1, b: { a: 2 } };
        const obj2 = { a: 1, b: { a: 2 } };
        const obj8 = { a: 1, c: { a: 2 } };
        const obj3 = { a: 1, b: 2 };
        const obj4 = { a: 1, b: 2 };
        const obj5 = { a: 1, b: { a: 2, b: {c: 5} } };
        const obj6 = { a: 1, b: { a: 2, b: {c: 5} } };
        const obj7 = { a: 1, b: { a: 2, b: {c: 6} } };
        
        expect(isDeepEqual(obj1, obj2)).toBeTruthy();
        expect(isDeepEqual(obj3, obj4)).toBeTruthy();
        expect(isDeepEqual(obj5, obj6)).toBeTruthy();
        expect(isDeepEqual(obj7, obj6)).toBeFalsy();
        expect(isDeepEqual(obj2, obj8)).toBeFalsy();
        expect(isDeepEqual({}, {})).toBeTruthy();
      });
    });
  });

  describe('get: gets value from object by path', () => {
    function get(obj, path) {
      if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) throw new Error('First argument must be an objects');  
      if (typeof path !== 'string') throw new Error('Second argument must be a string');  

      const pathProps = path.split('.'); 
      let res = obj;

      for (let pathProp of pathProps) res = res?.[pathProp];

      return res;
    }

    it('Returns value from object by path', () => {
      expect(get({ a: { b: { c: 3 } }}, 'a')).toStrictEqual({ b: { c: 3 } });
      expect(get({ a: { b: { c: 3 } }}, 'a.b.c')).toBe(3);
    });

    it('Returns undefined if path is invalid or empty', () => {
      expect(get({ a: { b: { c: 3 } }}, 'a.c.b')).toBeUndefined();
      expect(get({}, 'a.b.c')).toBeUndefined();
      expect(get({ a: { b: { c: 3 } }}, '')).toBeUndefined();
    });

    it('Throws an exception when first argument is not an object', () => {
      expect(() => get(['a', 'c', 'c', 'a'], 'a.b.c')).toThrow('First argument must be an objects');
    });

    it('Throws an exception when second argument is not a string', () => {
      expect(() => get({ a: { b: { c: 3 } }}, ['a', 'b', 'c'])).toThrow('Second argument must be a string');
    });
  });
});
