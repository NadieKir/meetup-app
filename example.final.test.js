describe('Example', () => {
  describe('average', () => {
    function average1(arr) {
      if (arr.length === 0) {
        return null;
      }
      return arr.reduce((acc, val) => acc + val, 0) / arr.length;
    }

    // alternative solution
    function average2(arr) {
      if (arr.length === 0) {
        return null;
      }
      let sum = 0;
      for (const it of arr) {
        sum += it;
      }

      return sum / arr.length;
    }

    const average = average1;
    // const average = average2;

    it('calculates average for array ', () => {
      // Arrange
      const array = [1, 2, 3];

      // Act
      const result = average(array);

      // Assert
      expect(result).toBe(2);
    });

    it('calculates average for single element array', () => {
      expect(average([3])).toBe(3);
    });

    it('returns null if array is empty', () => {
      expect(average([])).toBe(null);
    });
  });
});
