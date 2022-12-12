describe('async', () => {
  // Test basic promise functionality. You don't need to write you own implementation, just test native Promise.
  describe('Promise.prototype', () => {
    describe('then', () => {
      it('Calls first passed callback to then if promise is fulfilled', async () => {
        const fn = jest.fn();

        await Promise.resolve().then(fn);
        expect(fn).toBeCalled();
      });

      it('Works with chains', async () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();

        await Promise.resolve().then(fn1).then(fn2);
        expect(fn1).toBeCalled();
        expect(fn2).toBeCalled();
      });

      it('Works when callbacks have arguments', async () => {
        const fn1 = jest.fn(() => 'test');
        const fn2 = jest.fn(arg => arg + '!');

        await Promise.resolve().then(fn1).then(fn2);
        expect(fn1).toReturnWith('test');
        expect(fn2).toBeCalledWith('test');
        expect(fn2).toReturnWith('test!');
      });
    });

    describe('catch', () => {
      it('Tests catch when promise rejected', async () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();

        await Promise.reject().then(fn1).catch(fn2);
        expect(fn1).not.toBeCalled();
        expect(fn2).toBeCalled();
      });

      it('Tests catch when promise resolved but error occures in .then part', async () => {
        const fn1 = jest.fn(() => { throw new Error() });
        const fn2 = jest.fn();
        const fn3 = jest.fn();

        await Promise.resolve().then(fn1).then(fn2).catch(fn3);
        expect(fn1).toBeCalled();
        expect(fn2).not.toBeCalled();
        expect(fn3).toBeCalled();
      });

      it('Tests catch when promise resolved', async () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();

        await Promise.resolve().then(fn1).catch(fn2);
        expect(fn1).toBeCalled();
        expect(fn2).not.toBeCalled();
      });
    });

    describe('finally', () => {
      it('Tests finally when promise resolved', async () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();

        await Promise.resolve().then(fn1).catch(fn2).finally(fn3);
        expect(fn1).toBeCalled();
        expect(fn2).not.toBeCalled();
        expect(fn3).toBeCalled();
      });

      it('Tests finally when promise rejected', async () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();

        await Promise.reject().then(fn1).catch(fn2).finally(fn3);
        expect(fn1).not.toBeCalled();
        expect(fn2).toBeCalled();
        expect(fn3).toBeCalled();
      });
    });
  });

  describe('Promise.all', () => {
    it('Tests Promise.all when all promises resolved', async () => {
      const fn1 = Promise.resolve();
      const fn2 = Promise.resolve();
      const fn3 = Promise.resolve();
      const thenFn = jest.fn();

      await Promise.all([fn1, fn2, fn3]).then(thenFn);
      expect(thenFn).toBeCalled();
    });

    it('Tests Promise.all when at least one promise rejected', async () => {
      const fn1 = Promise.resolve();
      const fn2 = Promise.reject();
      const fn3 = Promise.resolve();
      const thenFn = jest.fn();
      const catchFn = jest.fn();

      await Promise.all([fn1, fn2, fn3]).then(thenFn).catch(catchFn);
      expect(thenFn).not.toBeCalled();
      expect(catchFn).toBeCalled();
    });
  });

  describe('Promise.race', () => {
    it('Tests Promise.race when the first done promise is resolved', async () => {
      const fn1 = new Promise((res, rej) => setTimeout(res, 300, 'fn1'));
      const fn2 = new Promise((res, rej) => setTimeout(rej, 500, 'fn2'));
      const fn3 = new Promise((res, rej) => setTimeout(res, 100, 'fn3')); 

      await Promise.race([fn1, fn2, fn3]).then(data => expect(data).toBe('fn3'));
    });
    
    it('Tests Promise.race when the first done promise is rejected', async () => {
      const fn1 = new Promise((res, rej) => setTimeout(res, 1200, 'fn1'));
      const fn2 = new Promise((res, rej) => setTimeout(rej, 500, 'fn2'));
      const fn3 = new Promise((res, rej) => setTimeout(res, 1000, 'fn3')); 

      await Promise.race([fn1, fn2, fn3]).catch(data => expect(data).toBe('fn2'));
    });
  });

  describe('Promise_all: your own implementation of Promise.all', () => {
    Promise.myAll = function(arrayOfPromises) {
      return new Promise((resolve, reject) => {
        let counter = 0;
        let results = [];

        for (let i = 0; i < arrayOfPromises.length; i++) {
          Promise.resolve(arrayOfPromises[i])
            .then((value) => {
              counter++;
              results[i] = value;
              if (counter == arrayOfPromises.length) {
                resolve(results);
              }
            })
            .catch((err) => reject(err));
        }
      });
    };
    
    it('Promise.myAll resolves if all arguments are resolved', async () => {
      const fn1 = Promise.resolve();
      const fn2 = Promise.resolve();
      const fn3 = Promise.resolve();
      const thenFn = jest.fn();

      await Promise.myAll([fn1, fn2, fn3]).then(thenFn);
      expect(thenFn).toBeCalled();
    });

    it('Promise.myAll resolves with an array of all arguments resolvations data', async () => {
      const fn1 = Promise.resolve('fn1');
      const fn2 = Promise.resolve('fn2');
      const fn3 = Promise.resolve('fn3');

      await Promise.myAll([fn1, fn2, fn3]).then(data => expect(data).toStrictEqual(['fn1', 'fn2', 'fn3']));
    });

    it('Promise.myAll rejects if at least one argument rejected', async () => {
      const fn1 = Promise.resolve();
      const fn2 = Promise.reject();
      const fn3 = Promise.resolve();
      const thenFn = jest.fn();
      const catchFn = jest.fn();

      await Promise.all([fn1, fn2, fn3]).then(thenFn).catch(catchFn);
      expect(thenFn).not.toBeCalled();
      expect(catchFn).toBeCalled();
    });

    it('Promise.myAll rejects with the data of the first rejected argument', async () => {
      const fn1 = Promise.resolve();
      const fn2 = Promise.reject('fn2');
      const fn3 = Promise.resolve();

      await Promise.all([fn1, fn2, fn3]).catch(data => expect(data).toBe('fn2'));
    });
  });

  describe('Articles', () => {
    const users = [
      {
        id: 1,
        name: 'User1',
      },
      {
        id: 2,
        name: 'User2',
      },
    ];

    const articles = [
      {
        id: 1,
        name: 'Article1',
        authorId: 1,
      },
      {
        id: 2,
        name: 'Article2',
        authorId: 1,
      },
    ];

    const comments = [
      {
        id: 1,
        articleId: 1,
        userId: 1,
        text: 'comment text',
      },
      {
        id: 1,
        articleId: 1,
        userId: 9,
        text: 'comment text',
      },
    ];

    // TODO: use Promise.resolve and Promise.reject to emulate async behaviour
    const fetchUser = (id) => {
      const user = users.find(user => user.id === id);
      return user ? Promise.resolve(user) : Promise.reject(new Error('User not found'));
    };

    // TODO: use Promise constructor - new Promise((resolve, reject) => {...})
    const fetchArticle = async (articleId, withComments = false) => {
      return new Promise((res, rej) => {
        const article = articles.find(article => article.id === articleId);

        if (withComments) {
          article.comments = comments.filter(comment => comment.articleId === articleId);
        } 

        article ? res(article) : rej(new Error('Article not found'));
      })
    };

    const fetchComments = (articleId, withUser = false) => {
      return new Promise((res, rej) => {
        let articleComments = comments.filter(comment => comment.articleId === articleId);

        if (withUser) {
          articleComments = articleComments.map(comment => {
            comment.userData = users.find(user => user.id === comment.userId) || { name: 'Anonymous' };
            delete comment.userId;
            return comment;
          });
        }

        articleComments.length ? res(articleComments) : rej(new Error('Comments not found'));
      });
    };

    describe('fetchUser', () => {
      it('fetches user by id', async () => {
        const user = await fetchUser(1);
        expect(user.name).toBe('User1');
      });

      it('rejects if user is not found', async () => {
        await expect(fetchUser(10)).rejects.toThrowError('User not found');
      });
    });

    describe('fetchArticle', () => {
      it('fetches article by id', async () => {
        const article = await fetchArticle(2);
        expect(article.name).toBe('Article2');
      });

      it('fetches article and its comment by id', async () => {
        const article = await fetchArticle(1, true);
        expect(article.name).toBe('Article1');
        expect(article.comments[0].id).toBe(1);

        const article2 = await fetchArticle(2, true);
        expect(article2.comments).toStrictEqual([]);
      });

      it('rejects if article is not found', async () => {
        await expect(fetchArticle(10)).rejects.toThrowError('Article not found');
      });
    });

    describe('fetchComments', () => {
      it('fetches comments by articleId', async () => {
        const comments = await fetchComments(1);
        expect(comments[0].userId).toBe(1);
      });

      it('fills user data for each comment by userId', async () => {
        const comments = await fetchComments(1, true);
        expect(comments[0].userData).toStrictEqual({ id: 1, name: 'User1' });
      });

      it('use anonymous user data if comments author is not found', async () => {
        const comments = await fetchComments(1, true);
        expect(comments[1].userData).toStrictEqual({ name: 'Anonymous' });
      });

      it('rejects if comments are not found', async () => {
        await expect(fetchComments(10)).rejects.toThrowError('Comments not found');
      });
    });
  });

  describe('setTimeout vs Promise.resolve', () => {
    it('Tests that Promise.resolve callback is called before setTimeout callback', async () => {
      jest.useFakeTimers();

      let executionOrders = [];

      setTimeout(() => executionOrders.push('timeout'), 0);
      Promise.resolve().then(executionOrders.push('promise'));

      jest.runAllTimers();

      expect(executionOrders).toStrictEqual(['promise', 'timeout']);
    });
  });
});
