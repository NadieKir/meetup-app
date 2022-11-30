const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Array', () => {
  describe('double: Duplicate each array element twice', () => {
    const double = TODO_IMPLEMENT_ME;
    it('Should return specified array twice', () => {
      expect(double([1, 2, 3])).toStrictEqual([1, 2, 3, 1, 2, 3]);
    });
    it.todo('Write additional tests');
  });

  describe('convertItemsToString: Convert each array element to string', () => {
    const convertItemsToString = TODO_IMPLEMENT_ME;
    it('Converts number array to the array of string values', () => {
      expect(convertItemsToString([1, 2, 3])).toStrictEqual(['1', '2', '3']);
    });
    it.todo('Write additional tests');
  });

  describe('calculateOccurrences: Calculate occurrences of an item in the array', () => {
    const calculateOccurrences = TODO_IMPLEMENT_ME;
    it('Should return the number of all occurrences of specified item in an array', () => {
      expect(calculateOccurrences([1, 2, 1, 4, 1], 1)).toBe(3);
    });
    it.todo('Write additional tests');
  });

  describe('toUppercase: Uppercase each array item', () => {
    const toUppercase = TODO_IMPLEMENT_ME;
    it('Should convert strings from specified array to uppercase', () => {
      expect(toUppercase(['aaaa', 'abc'])).toStrictEqual(['AAAA', 'ABC']);
    });
  });

  describe('insert: Insert item into array', () => {
    const insert = TODO_IMPLEMENT_ME;
    it('Insert an item at specified position', () => {
      expect(insert([1, 2, 4], 3, 2)).toStrictEqual([1, 2, 3, 4]);
    });
  });

  describe('last: Get n last items from array', () => {
    const last = TODO_IMPLEMENT_ME;
    it('Should return n last items from the specified array', () => {
      expect(last([1, 2, 3, 4, 5, 6, 7], 3)).toStrictEqual([5, 6, 7]);
    });
  });

  describe('countFalsyValues: Count falsy values in the array', () => {
    const countFalsyValues = TODO_IMPLEMENT_ME;
    it('Should return number of falsy values in specified array', () => {
      expect(countFalsyValues([1, 0, '', null, 'hello', '0'])).toBe(3);
    });
  });

  describe('unique: Find all unique items in array', () => {
    const unique = TODO_IMPLEMENT_ME;
    it('Should return array of unique items from specified array', () => {
      expect(unique(['a', 'b', 'a', 'c', 'e', 'b', 'o'])).toStrictEqual([
        'a',
        'b',
        'c',
        'e',
        'o',
      ]);
    });
  });

  describe('groupBy: Group array data by key', () => {
    const groupBy = TODO_IMPLEMENT_ME;
    it('Should return a map of grouped data by key and value selector', function () {
      let arr = [
        { country: 'Belarus', city: 'Brest' },
        { country: 'Russia', city: 'Omsk' },
        { country: 'Russia', city: 'Samara' },
        { country: 'Belarus', city: 'Grodno' },
        { country: 'Belarus', city: 'Minsk' },
        { country: 'Poland', city: 'Lodz' },
      ];

      expect(groupBy(arr, 'country')).toStrictEqual([
        ['Belarus', ['Brest', 'Grodno', 'Minsk']],
        ['Russia', ['Omsk', 'Samara']],
        ['Poland', ['Lodz']],
      ]);
    });
  });

  describe('compact: Remove all falsy values from array', () => {
    const compact = TODO_IMPLEMENT_ME;
    it('Should create array with all falsy values removed.', () => {
      expect(compact([1, 0, null, 'a'])).toStrictEqual([1, 'a']);
    });
  });

  describe('flatten: Flatten array. ', () => {
    //Write you own implementation do not use Array.flat
    const flatten = TODO_IMPLEMENT_ME;
    it('Should flatten array (make it one level less deep)', () => {
      expect(flatten([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, [3, [4]], 5]);
    });
  });

  describe('flattenDeep: Flatten array deep. Write you own implementation do not use Array.flat', () => {
    // Write you own implementation do not use Array.flat
    const flattenDeep = TODO_IMPLEMENT_ME;
    it('Should recursively flatten array.', () => {
      expect(flattenDeep([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('remove: Remove element from array by predicate', () => {
    const remove = TODO_IMPLEMENT_ME;

    it(
      'Should remove all elements from array, that predicate returns truth for and return an array of the removed elements. ' +
        'The predicate is invoked with two arguments: (value, index).',
      () => {
        const arr = [1, 7, 5, 2, 8];
        const gt5 = (v) => v > 5;

        let removed = remove(arr, gt5);
        expect(arr).toStrictEqual([1, 5, 2]);
        expect(removed).toStrictEqual([7, 8]);
      }
    );
  });

  describe('calculateTotal: Calculate basket total', () => {
    const calculateTotal = TODO_IMPLEMENT_ME;
    it('Should calculate total price for all goods in the basket', () => {
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
  });

  describe('calculateTotal: Calculated basket total when basket contains only item id', () => {
    const calculateTotal = TODO_IMPLEMENT_ME;
    it('Should calculate total price for all items in the basket', () => {
      const goods = [
        {
          id: 'AAA-AAA',
          name: 'item A',
          price: 10,
        },
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

      const total = calculateTotal(goods, basket);

      expect(total).toBe(40);
    });
  });

  describe('Stack: Implement stack data structure  using array. LIFO(Last in First Out)', () => {
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
    it.todo('push Adds an element to the stack');
    it.todo(
      'pop Removes an element from the stack,  if the function is call on an empty should throw exception'
    );
    it.todo('isEmpty returns true if the stack is empty');
  });

  describe('Queue: Implement Queue data structure using array. FIFO(First in First Out) ', () => {
    it.todo('enqueue adds an element to the queue');
    it.todo('dequeue removes an element from the queue');
    it.todo('isEmpty returns true if the queue is empty');
  });

  describe('Reduce. Own implementation of Array.reduce', () => {
    // Specification https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    // Pay attention to Edge cases https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#edge_cases
    it.todo('Write tests');
  });
});
