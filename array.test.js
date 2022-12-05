const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Array', () => {

  // TEST: double 

  describe('double: Duplicate array twice', () => {
    function double1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      let result = [...arr];
      arr.forEach(item => result.push(item));

      return result;
    }

    function double2(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      return [...arr].concat(arr);
    }

    function double3(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      let result = [...arr];
      result.splice(arr.length, 0, ...arr);

      return result;
    }

    function double4(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      let result = [...arr];
      const arrayLength = arr.length;

      for (let i = 0; i < arrayLength; i++) {
        result[arrayLength + i] = arr[i];
      }

      return result;
    }

    function double5(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      let result = [...arr];
      result.unshift(...arr);

      return result;
    }

    function double6(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      return [...arr, ...arr];
    }

    // const double = double1;
    // const double = double2;
    // const double = double3;
    // const double = double4;
    // const double = double5;
    const double = double6;

    it('Returns specified array twice', () => {
      expect(double([1, 2, 3])).toStrictEqual([1, 2, 3, 1, 2, 3]);
      expect(double([1, '2', 3, true])).toStrictEqual([1, '2', 3, true, 1, '2', 3, true]);
    });

    it('Returns empty array if specified array is empty', () => {
      expect(double([])).toStrictEqual([]);
    })

    it('Throws an exception when argument is not an array', () => {
      expect(() => double('1, 2, 3')).toThrow('The argument is not an array type');
    })
  });

    // TEST: doubleItem

    describe('doubleItem: Duplicate each array element twice', () => {
      function doubleItem1(arr) {
        if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

        return arr.reduce((acc, item) => {
          acc.push(item, item); 
          return acc;
        }, []);
      }

      function doubleItem2(arr) {
        if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

        const result = [...arr];

        for (let i = arr.length; i > 0; i--) {
          result.splice(i, 0, arr[i - 1]);
        }

        return result;
      }

      // const doubleItem = doubleItem1;
      const doubleItem = doubleItem2;

      it('Returns each array element twice', () => {
        expect(doubleItem([1, 2, 3])).toStrictEqual([1, 1, 2, 2, 3, 3]);
        expect(doubleItem([1, '2', 3, true])).toStrictEqual([1, 1, '2', '2', 3, 3, true, true]);
      });
  
      it('Returns empty array if specified array is empty', () => {
        expect(doubleItem([])).toStrictEqual([]);
      })
  
      it('Throws an exception when argument is not an array', () => {
        expect(() => doubleItem('1, 2, 3')).toThrow('The argument is not an array type');
      })
    });

  // TEST: convertItemsToString 

  describe('convertItemsToString: Convert each array element to string', () => {
    function convertItemsToString1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      const result = arr.map(item => item instanceof Object ? Object.values(item).map(String) : String(item));

      return result.flat();
    }

    const convertItemsToString = convertItemsToString1;

    it('Converts primitives array to the array of string values', () => {
      expect(convertItemsToString([1, 2, 3])).toStrictEqual(['1', '2', '3']);
      expect(convertItemsToString([true, false])).toStrictEqual(['true', 'false']);
      expect(convertItemsToString([null, undefined])).toStrictEqual(['null', 'undefined']);
    });

    it('Converts object array to the array of object values converted to string', () => {
      expect(convertItemsToString([{0: 1, 1: 2}, {'first': 2, 'second': null}, {'first': true, 'second': 'test'}])).toStrictEqual(['1', '2', '2', 'null', 'true', 'test']);
    });

    it('Converts two dimensional array to the array of its values converted to string', () => {
      expect(convertItemsToString([[1, '2'], [null, 2], [true, undefined]])).toStrictEqual(['1', '2', 'null', '2', 'true', 'undefined']);
    });

    it('Converts different types array to the array of string values', () => {
      expect(convertItemsToString([1, {2: 2}, '3', true, undefined, [false, 1]])).toStrictEqual(['1', '2', '3', 'true', 'undefined', 'false', '1']);
    });

    it('Remains string array the same', () => {
      expect(convertItemsToString(['a', '2', 'b1'])).toStrictEqual(['a', '2', 'b1']);
    });

    it('Returns empty array if specified array is empty', () => {
      expect(convertItemsToString([])).toStrictEqual([]);
    })

    it('Throws an exception when argument is not an array', () => {
      expect(() => convertItemsToString('1, 2, 3')).toThrow('The argument is not an array type');
    })

  });

  // TEST: calculateOccurrences 

  describe('calculateOccurrences: Calculate occurrences of an item in the array', () => {
    function calculateOccurrences1(arr, itemToCount) {
      if (!Array.isArray(arr)) throw new Error('First rgument is not an array type');

      const result = arr.reduce((acc, curr) => curr === itemToCount ? ++acc : acc, 0);

      return result;
    } 

    function calculateOccurrences2(arr, itemToCount) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');

      const result = arr.filter(item => item === itemToCount);

      return result.length;
    } 

    function calculateOccurrences3(arr, itemToCount) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');

      let count = 0;
      arr.forEach(item => item === itemToCount && count++);

      return count;
    } 

    // const calculateOccurrences = calculateOccurrences1;
    // const calculateOccurrences = calculateOccurrences2;
    const calculateOccurrences = calculateOccurrences3;

    it('Returns the number of all occurrences of specified item in an array', () => {
      expect(calculateOccurrences([1, 2, 1, 4, 1], 1)).toBe(3);
    });

    it('Returns the number of all occurrences of specified item in an array using strict equality', () => {
      expect(calculateOccurrences([1, 2, 1, 4, '1'], 1)).toBe(2);
    });

    it('Returns 0 if an array does not contain a specified item', () => {
      expect(calculateOccurrences([1, 2, 3, 3], 4)).toBe(0);
    })

    it('Throws an exception when first argument is not an array', () => {
      expect(() => calculateOccurrences('1, 2, 2, 3', 2)).toThrow('First argument is not an array type');
    })

  });

  // TEST: toUppercase 

  describe('toUppercase: Uppercase each array item', () => {
    function toUppercase1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      const result = arr.map(item => typeof item === 'string' ? item.toUpperCase() : item);

      return result;
    }

    function toUppercase2(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      let result = [];

      for (let item of arr) {
        result.push(typeof item === 'string' ? item.toUpperCase() : item);
      }

      return result;
    }

    function toUppercase3(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      const arrOfUppercaseStrings = arr.filter(item => typeof item === 'string').map(item => item.toUpperCase());
      const result = arr.map(item => typeof item === 'string' ? arrOfUppercaseStrings.shift() : item);

      return result;
    }

    // const toUppercase = toUppercase1;
    // const toUppercase = toUppercase2;
    const toUppercase = toUppercase3;
    
    it('Should convert strings from specified array to uppercase', () => {
      expect(toUppercase(['aaaa', 'abc', null])).toStrictEqual(['AAAA', 'ABC', null]);
    });

    it('Returns empty array if specified array is empty', () => {
      expect(toUppercase([])).toStrictEqual([]);
    })

    it('Remains array the same if there are no strings', () => {
      expect(toUppercase([21, true, null])).toStrictEqual([21, true, null]);
    });

    it('Throws an exception when argument is not an array', () => {
      expect(() => toUppercase('1, 2, 2, 3')).toThrow('The argument is not an array type');
    })
  });

  // TEST: insert 

  describe('insert: Insert item into array', () => {
    function insert1(arr, item, pos) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');      
      if (!Number.isInteger(pos)) throw new Error('Third argument (position) is not an integer number');

      const result = [...arr];
      const absPos = Math.abs(pos);

      if(pos < 0) result.reverse();

      absPos < arr.length ? result.splice(absPos, 0, item) : result[absPos] = item;

      return pos < 0 ? result.reverse() : result;
    }

    function insert2(arr, item, pos) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');      
      if (!Number.isInteger(pos)) throw new Error('Third argument (position) is not an integer number');

      const result = [...arr];

      if(pos === 0) {
        result.unshift(item);

        return result;
      } 

      const absPos = Math.abs(pos);

      if(pos < 0) result.reverse();

      let prev = result[absPos];
      result[absPos] = item;

      for(let i = absPos + 1; i <= arr.length; i++) {
        result[i] = prev;
        prev = result[i + 1];
      }

      return pos < 0 ? result.reverse() : result;
    }

    function insert3(arr, item, pos) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');      
      if (!Number.isInteger(pos)) throw new Error('Third argument (position) is not an integer number');

      if(Math.abs(pos) > arr.length) {
        const result = [...arr];

        if (pos < 0) result.reverse();

        result[Math.abs(pos)] = item;

        return pos < 0 ? result.reverse() : result;
      }

      const firstArraySlice = arr.slice(0, pos);
      const secondArraySlice = arr.slice(pos);

      return firstArraySlice.concat(item, secondArraySlice);
    }

    // const insert = insert1;
    // const insert = insert2;
    const insert = insert3;

    it('Insert an item at specified position', () => {
      expect(insert([1, 2, 4], 3, 3)).toStrictEqual([1, 2, 4, 3]);
      expect(insert([1, 2, 4], 3, 0)).toStrictEqual([3, 1, 2, 4]);
      expect(insert([1, 2, 4], 3, 2)).toStrictEqual([1, 2, 3, 4]);
    });

    it('Insert an item at specified position from the end if position argument is negative', () => {
      expect(insert([1, 2, 4], 3, -2)).toStrictEqual([1, 3, 2, 4]);
    });

    it('Insert an item at specified position and add undefined items if position argument is more than array length', () => {
      expect(insert([1, 2, 4], 3, 5)).toStrictEqual([1, 2, 4, , , 3]);
      expect(insert([1, 2, 4], 3, -5)).toStrictEqual([3, , , 1, 2, 4]);
      expect(insert([], 3, 5)).toStrictEqual([, , , , , 3]);
    });

    it('Throws an exception when first argument is not an array', () => {
      expect(() => insert('1, 2, 2, 3', 5, 4)).toThrow('First argument is not an array type');
    });

    it('Throws an exception when third argument is not an integer number', () => {
      expect(() => insert([1, 2, 2, 3], 5, 4.2)).toThrow('Third argument (position) is not an integer number');
      expect(() => insert([1, 2, 2, 3], 5, '4')).toThrow('Third argument (position) is not an integer number');
    });
  });

  // TEST: last

  describe('last: Get n last items from array', () => {
    function last1(arr, n) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array');      
      if (!Number.isInteger(n)) throw new Error('Second argument is not an integer number');
      if (arr.length === 0 || n === 0) return [];

      n = Math.abs(n);

      return arr.slice(-n);
    }

    function last2(arr, n) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array');      
      if (!Number.isInteger(n)) throw new Error('Second argument is not an integer number');
      if (arr.length === 0 || n === 0) return [];

      n = Math.abs(n);

      if (n > arr.length) return arr;

      const result = [];
      let arrayLength = arr.length;

      while (result.length !== n) {
        result.unshift(arr[--arrayLength]);
      } 

      return result;
    }

    // const last = last1;
    const last = last2;

    it('Returns n last items from the specified array', () => {
      expect(last([1, 2, 3, 4, 5, 6, 7], 3)).toStrictEqual([5, 6, 7]);
      expect(last([1, 2, 3], 3)).toStrictEqual([1, 2, 3]);
    });

    it('Considers negative second argument as positive and returns n last items from the specified array', () => {
      expect(last([1, 2, 3, 4, 5, 6, 7], -3)).toStrictEqual([5, 6, 7]);
    });

    it('Remains specified array the same if n is more than its length', () => {
      expect(last([1, 2, 3, 4, 5, 6, 7], 30)).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('Returns an empty array if specified array is empty or n equals 0', () => {
      expect(last([1, 2, 3, 4, 5, 6, 7], 0)).toStrictEqual([]);
      expect(last([], 7)).toStrictEqual([]);
    });

    it('Throws an exception when first argument is not an array', () => {
      expect(() => last('1, 2, 2, 3', 5, 4)).toThrow('First argument is not an array');
    });

    it('Throws an exception when second argument is not an integer number', () => {
      expect(() => last([1, 2, 2, 3], 3.2)).toThrow('Second argument is not an integer number');
      expect(() => last([1, 2, 2, 3], '3')).toThrow('Second argument is not an integer number');
    });
  });

  // TEST: countFalsyValues

  describe('countFalsyValues: Count falsy values in the array', () => {
    function countFalsyValues1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      return arr.reduce((acc, curr) => !!curr === false ? ++acc : acc, 0);
    }

    function countFalsyValues2(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      let counter = 0;
      arr.forEach(item => !!item === false && ++counter);

      return counter;
    }

    function countFalsyValues3(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      return arr.filter(item => !!item === false).length;
    }

    // const countFalsyValues = countFalsyValues1;
    // const countFalsyValues = countFalsyValues2;
    const countFalsyValues = countFalsyValues3;

    it('Returns number of falsy values in specified array', () => {
      expect(countFalsyValues([1, 0, '', null, 'hello', '0'])).toBe(3);
      expect(countFalsyValues([1, 'hello', '0', [], {}])).toBe(0);
    });

    it('Returns 0 if specified array is empty', () => {
      expect(countFalsyValues([])).toBe(0);
    });

    it('Throws an exception when argument is not an array', () => {
      expect(() => countFalsyValues('1, 2, 2, 3')).toThrow('The argument is not an array type');
    });
  });

  // TEST: unique

  describe('unique: Find all unique items in array', () => {
    function unique1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      return Array.from(new Set(arr));
    }

    function unique2(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      return arr.filter((item, index) => arr.indexOf(item) === index);
    }

    function unique3(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      return arr.reduce((result, item) => result.includes(item) ? result : [...result, item], []);
    }

    // const unique = unique1;
    // const unique = unique2;
    const unique = unique3;

    it('Returns array of unique items from specified array', () => {
      expect(unique(['a', 'b', 'a', 'c', 'e', 'b', 'o'])).toStrictEqual(['a', 'b', 'c', 'e', 'o']);
      expect(unique(['a', 1, 'a', 'c', '1', 1, 'o'])).toStrictEqual(['a', 1, 'c', '1', 'o']);
      expect(unique(['a', true, 'a', 'c', '1', true, 'o'])).toStrictEqual(['a', true, 'c', '1', 'o']);
      expect(unique(['a', 'b', 'c', 'e', 'o'])).toStrictEqual(['a','b','c','e','o']);
    });

    it('Returns an empty array if specified array is empty', () => {
      expect(unique([])).toStrictEqual([]);
    });

    it('Throws an exception when argument is not an array', () => {
      expect(() => unique('1, 2, 2, 3')).toThrow('The argument is not an array type');
    });
  });

  // TEST: groupBy

  describe('groupBy: Group array data by key ', () => {
    function groupBy1(arr, key, value) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');
      if(arr.length === 0) return [];
    
      const result = [];

      const allKeys = arr.map(obj => obj[key]).filter(item => item !== undefined);
      const allUniqueKeys = Array.from(new Set(allKeys));
  
      allUniqueKeys.forEach(uniqueKey => {
        const objectsWithKey = arr.filter(obj => obj[key] === uniqueKey);
        const valuesOfObjectsWithKey = objectsWithKey.map(item => item[value]).filter(item => item !== undefined);

        if (value === undefined) result.push([uniqueKey, objectsWithKey]);
        else result.push([uniqueKey, valuesOfObjectsWithKey]);
      })

      return result;
    }

    function groupBy2(arr, key, value) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');
      if(arr.length === 0) return [];

      return arr.reduce((result, obj) => {
        let existedField = result.find(array => array[0] === obj[key]);

        if(value === undefined) {
          if(existedField) existedField[1].push(obj);
          else if(obj[key]) result.push([obj[key], [obj]]);
        } else {
          if(existedField) {
            if (obj[value]) existedField[1].push(obj[value]);
          } 
          else if(obj[key]) result.push([obj[key], obj[value] ? [obj[value]] : []]);
        }

        return result;
      }, []);
    }

    // const groupBy = groupBy1;
    const groupBy = groupBy2;

    let arr = [
      { country: 'Belarus', city: 'Brest' },
      { country: 'Russia', city: 'Omsk' },
      { country: 'Russia', city: 'Samara' },
      { country: 'Belarus', city: 'Grodno' },
      { country: 'Belarus', city: 'Minsk' },
      { country: 'Poland', city: 'Lodz' },
      { country: 'Poland', population: 38 },
      { population: 2, city: 'Minsk' },
    ];

    it('Returns a map of grouped data by key and value selectors', function () {
      expect(groupBy(arr, 'country', 'city')).toStrictEqual([
        ['Belarus', ['Brest', 'Grodno', 'Minsk']],
        ['Russia', ['Omsk', 'Samara']],
        ['Poland', ['Lodz']],
      ]);
    });

    it('Returns a map of objects grouped by key if no value argument provided', () => {
      expect(groupBy(arr, 'country')).toStrictEqual([
        ['Belarus', [{ country: 'Belarus', city: 'Brest' }, { country: 'Belarus', city: 'Grodno' }, { country: 'Belarus', city: 'Minsk' }]],
        ['Russia', [{ country: 'Russia', city: 'Omsk' }, { country: 'Russia', city: 'Samara' }]],
        ['Poland', [{ country: 'Poland', city: 'Lodz' }, { country: 'Poland', population: 38 }]],
      ]);
    });

    it('Returns an empty array if none of the objects in speciefied array contain key', function () {
      expect(groupBy(arr, 'continent', 'city')).toStrictEqual([]);
    });

    it('Returns a map of objects grouped by key with empty array of values if none of the objects in speciefied array contain value', function () {
      expect(groupBy(arr, 'country', 'president')).toStrictEqual([
        ['Belarus', []],
        ['Russia', []],
        ['Poland', []],
      ]);
    });

    it('Returns an empty array if specified array is empty', function () {
      expect(groupBy([], 'country', 'city')).toStrictEqual([]);
    });

    it('Throws an exception when first argument is not an array', () => {
      expect(() => groupBy('1, 2, 2, 3', 3)).toThrow('First argument is not an array type');
    });
  });

  // TEST: compact

  describe('compact: Remove all falsy values from array', () => {
    function compact1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');
      
      return arr.filter(item => item);
    }

    function compact2(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');
      
      const result = [];
      arr.forEach(item => item && result.push(item));

      return result;
    }

    function compact3(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');
      
      const result = [...arr];
      arr.forEach((item, index) => !!item === false && delete(result[index]));
      
      return result.filter(item => item !== undefined);
    }

    // const compact = compact1;
    // const compact = compact2;
    const compact = compact3;

    it('Creates an array with all falsy values removed', () => {
      expect(compact([1, 0, null, 'a'])).toStrictEqual([1, 'a']);
      expect(compact([0, null, false, -0])).toStrictEqual([]);
      expect(compact([1, 'hello', '0', [], {}])).toStrictEqual([1, 'hello', '0', [], {}]);
    });

    it('Returns an empty array if specified array is empty', () => {
      expect(compact([])).toStrictEqual([]);
    });
    
    it('Throws an exception when argument is not an array', () => {
      expect(() => compact('1, 2, 2, 3')).toThrow('The argument is not an array type');
    });

  });

  // TEST: flatten

  describe('flatten: Flatten array. ', () => {
    function flatten1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      for (const [index, item] of arr.entries()) {
        if (Array.isArray(item)) 
          return [].concat(arr.slice(0, index), item, arr.slice(index + 1));
      }

      return arr;
    }

    function flatten2(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      const result = [...arr];

      for (const [index, item] of arr.entries()) {
        if (Array.isArray(item)) {
          result.splice(index, 1, ...item);

          return result;
        }
      }

      return result;
    }

    // const flatten = flatten1;    
    const flatten = flatten2;

    it('Should flatten array (make it one level less deep)', () => {
      expect(flatten([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, [3, [4]], 5]);
      expect(flatten([1, [2, 3, 4, 5]])).toStrictEqual([1, 2, 3, 4, 5]);
      expect(flatten([1, [2, [3], 4, 5]])).toStrictEqual([1, 2, [3], 4, 5]);
    });

    it('Returns speciefied array if it has one level', () => {
      expect(flatten([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4]);
    });

    it('Returns an empty array if specified array is empty', () => {
      expect(flatten([])).toStrictEqual([]);
    });

    it('Throws an exception when argument is not an array', () => {
      expect(() => flatten('1, 2, 2, 3')).toThrow('The argument is not an array type');
    });
  });

  // TEST: flattenDeep

  describe('flattenDeep: Flatten array deep', () => {
    function flattenDeep1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      function flatten(arr) {
        return arr.reduce((acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item), []);
      }

      return flatten(arr);
    }

    function flattenDeep2(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      const stack = [...arr];
      const result = [];

      while(stack.length) {
        const next = stack.pop();
        Array.isArray(next) ? stack.push(...next) : result.push(next);
      }

      return result.reverse();
    }

    // const flattenDeep = flattenDeep1;
    const flattenDeep = flattenDeep2;

    it('Recursively flattens array', () => {
      expect(flattenDeep([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, 3, 4, 5]);
      expect(flattenDeep([1, [2, 3, 4, 5]])).toStrictEqual([1, 2, 3, 4, 5]);
      expect(flattenDeep([1, [2, [3], 4, 5]])).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('Returns an empty array if specified array is empty', () => {
      expect(flattenDeep([])).toStrictEqual([]);
    });

    it('Throws an exception when argument is not an array', () => {
      expect(() => flattenDeep('1, 2, 2, 3')).toThrow('The argument is not an array type');
    });
  });

  // TEST: remove

  describe('remove: Remove element from array by predicate', () => {
    function remove1(arr, callback) {
      if (!Array.isArray(arr)) throw new Error('First argument is not an array type');

      const removed = [];
    
      for (const [index, value] of arr.entries()) {
        if(typeof callback === 'function' && callback(value)) removed.push(...arr.splice(index, 1));
      }

      return removed;
    }

    const remove = remove1;

    let arr;
    let callback;
    let removed;

    it(
      'Removes all elements from array, that predicate returns truth for and return an array of the removed elements. ' +
        'The predicate is invoked with two arguments: (value, index).',
      () => {
        arr = [1, 7, 5, 2, 8];
        callback = (v) => v > 5;
        removed = remove(arr, callback);

        expect(arr).toStrictEqual([1, 5, 2]);
        expect(removed).toStrictEqual([7, 8]);

        arr = [1, '7', 5, '2', 8];
        callback = (v) => typeof v === 'string';
        removed = remove(arr, callback);

        expect(arr).toStrictEqual([1, 5, 8]);
        expect(removed).toStrictEqual(['7', '2']);
      }
    );

    it('Returns an empty array if specified array is empty', () => {
      arr = [];
      callback = (v) => v > 5;
      removed = remove(arr, callback);

      expect(arr).toStrictEqual([]);
      expect(removed).toStrictEqual([]);
    });

    it('Remains specified array the same if second argument is not a function returning value', () => {
      arr = [1, '2', 2, 3];
      callback = (v) => { v++ };
      removed = remove(arr, callback);

      expect(arr).toStrictEqual(arr);
      expect(removed).toStrictEqual([]);

      callback = 3;
      removed = remove(arr, callback);

      expect(arr).toStrictEqual(arr);
      expect(removed).toStrictEqual([]);
    });

    it('Throws an exception when first argument is not an array', () => {
      expect(() => remove('1, 2, 2, 3', (v) => v > 5)).toThrow('First argument is not an array type');
    });
  });

  // TEST: calculateTotal

  describe('calculateTotal: Calculate basket total', () => {
    function calculateTotal1(arr) {
      if (!Array.isArray(arr)) throw new Error('The argument is not an array type');

      const total = arr.reduce((total, item) => {
        if (typeof item === 'object' && typeof item.price === 'number' && item.count) {
          return total + item.price * item.count;
        }

        return total;
      }, 0)

      return total;
    }

    const calculateTotal = calculateTotal1;

    it('Calculates total price for all goods in the basket', () => {
      const total = calculateTotal([
        {
          name: 'item A',
          price: 10,
          count: 2,
        },
        {
          name: 'item B',
          price: 30.5,
          count: 1,
        },
      ]);

      expect(total).toBe(50.5);
    });

    it('Calculates total price for all goods in the basket which are the objects that have a price field with value type number', () => {
      const total = calculateTotal([
        {
          name: 'item A',
          price: 10,
          count: 2,
        },
        {
          name: 'item B',
          price: '30.5',
          count: 1,
        },
        3,
        {
          name: 'item C',
          count: 1,
        },
      ]);

      expect(total).toBe(20);
    });

    it('Calculates total price for all goods in the basket that have count field', () => {
      const total = calculateTotal([
        {
          name: 'item A',
          price: 10,
          count: 2,
        },
        {
          name: 'item B',
          price: '30.5',
          count: 1,
        },
        {
          name: 'item C',
          price: 10,
        },
      ]);

      expect(total).toBe(20);
    });

    it('Returns 0 if specified array is empty', () => {
      expect(calculateTotal([])).toBe(0);
    }); 

    it('Throws an exception when the argument is not an array', () => {
      expect(() => calculateTotal('{1}, {2}, {2}, {3}')).toThrow('The argument is not an array type');
    });
  });

  // TEST: calculateTotalById

  describe('calculateTotalById: Calculated basket total when basket contains only item id', () => {
    function calculateTotalById1(goods, basket) {
      if (!Array.isArray(goods) || !Array.isArray(basket)) throw new Error('Both arguments must be an array type');

      const total = basket.reduce((total, item) => {
        if (typeof item === 'object' && item.count) {
          const basketItemPrice = goods.find(good => good.id === item.id)?.price;

          return typeof basketItemPrice === 'number' ? total + item.count * basketItemPrice : total;
        } 

        return total;
      }, 0);

      return total;
    }

    const calculateTotalById = calculateTotalById1;

    it('Calculates total price for all object items in the basket', () => {
      const goods = [
        {
          id: 'AAA-AAA',
          name: 'item A',
          price: 10,
        },
        3,
        {
          id: 'BBB-BBB',
          name: 'item B',
          price: 30.5,
        },
        {
          id: 'CCC-CCC',
          name: 'item C',
          price: 20,
        },
      ];
      const basket = [
        { id: 'AAA-AAA', count: 2 },
        { id: 'CCC-CCC', count: 1 },
      ];

      expect(calculateTotalById(goods, basket)).toBe(40);
    });

    it('Calculates total price for all items in the basket that have count field and number type price', () => {
      const goods = [
        {
          id: 'AAA-AAA',
          name: 'item A',
          price: 10,
        },
        {
          id: 'BBB-BBB',
          name: 'item B',
          price: '10',
        },
        {
          id: 'CCC-CCC',
          name: 'item C',
          price: 20,
        },
      ];
      const basket = [
        { id: 'AAA-AAA'},
        { id: 'BBB-BBB', count: 1},
        { id: 'CCC-CCC', count: 2 },
      ];

      expect(calculateTotalById(goods, basket)).toBe(40);
    });

    it('Returns 0 if at least one of the arguments is empty', () => {
      const goods = [
        {
          id: 'AAA-AAA',
          name: 'item A',
          price: 10,
        },
        3,
        {
          id: 'BBB-BBB',
          name: 'item B',
          price: 30.5,
        },
        {
          id: 'CCC-CCC',
          name: 'item C',
          price: 20,
        },
      ];
      const basket = [
        { id: 'AAA-AAA', count: 2 },
        { id: 'CCC-CCC', count: 1 },
      ];

      expect(calculateTotalById([], basket)).toBe(0);
      expect(calculateTotalById(goods, [])).toBe(0);
    });

    it('Throws an exception when at least one of the arguments is not an array', () => {
      expect(() => calculateTotalById([1, 2, 3], '1, 2, 3')).toThrow('Both arguments must be an array type');
    });
  });

  // TEST: Stack

  describe('Stack: Implement stack data structure using array. LIFO (Last in First Out)', () => {
    /***
     * Create class Stack with 3 methods push, pop, isEmpty
     * Array where you store data should be private property
     * Example
     * const stack = new Stack();
     * stack.push(5);
     * stack.push(2);
     * stack.pop();// 2
     * stack.pop();// 5
     */

    class Stack {
      #data = []; 

      push(item) {
        this.#data[this.#data.length] = item;
      }

      pop() {
        if(this.#data.length === 0) throw new Error('pop() can\'t be used with empty structures');

        return this.#data.splice(-1, 1)[0];
      }

      isEmpty() {
        return this.#data.length === 0;
      }
    }

    const stack = new Stack();

    it('push(item) adds an item to the stack', () => {
      stack.push(2);
      
      expect(stack.pop()).toBe(2);
    });

    it('pop() removes an element from the stack', () => {
      stack.push(2);
      stack.push(4);

      expect(stack.pop()).toBe(4);
      expect(stack.pop()).toBe(2);
    });

    it('isEmpty() returns whether the stack is empty', () => {
      expect(stack.isEmpty()).toBeTruthy();
    });

    it('pop() throw an exception if the function is called on an empty array', () => {
      const stack = new Stack();

      expect(() => stack.pop()).toThrow('pop() can\'t be used with empty structures');
    });
  });

  // TEST: Queue

  describe('Queue: Implement Queue data structure using array. FIFO(First in First Out) ', () => {
    class Queue {
      #data = []; 

      enqueue(item) {
        this.#data[this.#data.length] = item;
      }

      dequeue() {
        if(this.#data.length === 0) throw new Error('dequeue() can\'t be used with empty structures');

        return this.#data.shift();
      }

      isEmpty() {
        return this.#data.length === 0;
      }
    }

    const queue = new Queue();

    it('enqueue(item) adds an item to the queue', () => {
      queue.enqueue(2);
      
      expect(queue.dequeue()).toBe(2);
    });

    it('dequeue() removes an element from the queue', () => {
      queue.enqueue(2);
      queue.enqueue(4);

      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(4);
    });

    it('isEmpty() returns whether the queue is empty', () => {
      expect(queue.isEmpty()).toBeTruthy();
    });

    it('pop() throw an exception if the function is called on an empty array', () => {
      const queue = new Queue();

      expect(() => queue.dequeue()).toThrow('dequeue() can\'t be used with empty structures');
    });
  });

  // TEST: reduce

  describe('Reduce. Own implementation of Array.reduce', () => {
    Array.prototype.myReduce = function(callback, initialValue) {
      if (this === null) throw new Error('Reduce called on null or undefined');
      if (this.length === 0 && initialValue === undefined) throw new Error('Reduce of empty array with no initial value');
      if (typeof callback !== 'function') throw new Error(callback + ' is not a function');

      if (this.length === 1 && initialValue === undefined) return this[0];
      if (this.length === 0 && initialValue !== undefined) return initialValue;

      let i = 0;
    
      if (arguments.length < 2) {
        i = 1;
        initialValue = this[0];
      }

      for (; i < this.length; i++) {
        initialValue = callback(initialValue, this[i], i, this);
      }

      return initialValue;
    };

    it('Returns a single value recieved by invoking callback function on each element of the array', () => {
      const arr = [1, true, 5, null, 8];
      const callback = (acc, item) => {
        acc.push(String(item));
        return acc;
      };
      const initialValue = ['array of strings is right there'];
      
      expect(arr.myReduce(callback, initialValue)).toStrictEqual(['array of strings is right there', '1', 'true', '5', 'null', '8']);
    });

    it('Uses the first element of the array as an initial value if an initial value argument is not specified', () => {
      const arr = [1, 3, 5, 7, 8];
      const callback = (acc, item) => acc + item;
      
      expect(arr.myReduce(callback)).toBe(24);
    });

    it('Returns the only value of the array if its length equals 1', () => {
      const arr = [1];
      const callback = (acc, item) => acc + item;
      
      expect(arr.myReduce(callback)).toBe(arr[0]);
    });

    it('Returns an initial value if array is empty', () => {
      const arr = [];
      const callback = (acc, item) => acc + item;
      const initialValue = 0;
      
      expect(arr.myReduce(callback, initialValue)).toBe(initialValue);
    });

    it('Throws an exception if array is empty and initial value is undefined', () => {
      expect(() => [].myReduce((acc, item) => acc + item)).toThrow('Reduce of empty array with no initial value');
    });

    it('Throws an exception if callback argument is not a function', () => {
      const arr = [1, 2, 3];
      const callback = 5;
      const initialValue = 3;

      expect(() => arr.myReduce(callback, initialValue)).toThrow(callback + ' is not a function');
    });
  });
});
