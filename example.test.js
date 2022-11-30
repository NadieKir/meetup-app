// We use this function for all function that have to be implemented
const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Example', () => {
  // This is test suit for "average" function
  // First part "average" is function name
  // Second part is function description
  describe('average: Calculates average for array of numbers ', () => {
    // Replace TODO_IMPLEMENT_ME by your own implementation
    const average = TODO_IMPLEMENT_ME;

    // This is first test, It for explanation how average function should work
    // It have to pass when you write correct implementation for average function
    it('Calculates average for array ', () => {
      expect(average([1, 2, 3])).toBe(2);
    });

    // You have to replace todo by additional test
    it.todo('Write additional tests');
  });
});
