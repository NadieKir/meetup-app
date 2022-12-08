describe('THIS', () => {
  describe('call, apply, bind', () => {
    it('Invokes function with specific this', () => {
      const a = { msg: 'aaa' };
      const b = { msg: 'bbb' };

      function example() {
        return this.msg + ' ' + this.msg;
      }

      expect(example.call(a)).toBe('aaa aaa');
      expect(example.bind(b)()).toBe('bbb bbb');
    });

    it('Creates function connected with specific this', () => {
      function fn() {
        return this.name;
      }

      const tom = { name: 'Tom', age: 22 };
      const bob = { name: 'Bob', get: 50 };

      const getTomName = fn.bind(tom);
      const getBobName = fn.bind(bob);

      expect(getTomName()).toBe('Tom');
      expect(getBobName()).toBe('Bob');
    });

    it('Invokes function from object method', () => {
      const person = {
        firstName: 'Ivan',
        secondName: 'Ivanov',
        age: 20,

        sayHello() {
          return `Hi, ${this.firstName}!`;
        },
      };

      const sayHelloToPerson = person.sayHello.bind(person);
      expect(sayHelloToPerson()).toBe(person.sayHello());
    });

    describe('Math.max for array ', () => {
      describe('using call', () => {
        const findMax = (arr) => {
          return Math.max.call(this, ...arr);
        };

        it('Finds max number in array', () => {
          expect(findMax([1, 3, 5, 2])).toBe(5);
        });
      });

      describe('using apply', () => {
        const findMax = (arr) => {
          return Math.max.apply(this, arr);
        };

        it('Finds max number in array', () => {
          expect(findMax([1, 3, 5, 2])).toBe(5);
        });
      });

      describe('using spread ...', () => {
        const findMax = (arr) => {
          return Math.max(...arr);
        };

        it('Finds max number in array', () => {
          expect(findMax([1, 3, 5, 2])).toBe(5);
        });
      });
    });
  });

  describe('arrow functions', () => {
    test('Rewrite test to find mistake and fix implementation', () => {
      const person = {
        firstName: 'Ivan',
        secondName: 'Ivanov',
        age: 20,

        sayHello() {
          return `Hi, ${this.firstName}!`;
        },
      };

      const sayHello = person.sayHello.bind(person);
      expect(sayHello()).toBe(person.sayHello());

      const sayHello2 = person.sayHello.bind({ firstName: 'Igor' });
      expect(sayHello2()).toBe(`Hi, Igor!`);
    });

    class Person {
      constructor(firstName, age) {
        this.firstName = firstName;
        this.age = age;
      }

      sayHello = () => {
        return `Hi, ${this.firstName}!`
      }
    }

    const person1 = new Person('Ivan', 15);
    const person2 = new Person('Igor', 23);
    const person3 = {firstName: 'Petr', age: '22'};

    test('Creates the Person class with sayHello method using arrow function', () => {
      expect(person1.sayHello()).toBe('Hi, Ivan!');
      expect(person2.sayHello()).toBe('Hi, Igor!');
    });

    test('Can\'t rebind arrow function', () => {
      expect(person1.sayHello.call(person3)).toBe(person1.sayHello()); 
    });
  });
});
