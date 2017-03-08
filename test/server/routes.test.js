/*global describe it beforeEach done*/
const expect = require('expect');
const request = require('supertest');

const {populateServer} = require('./seed');
const StockData = require('../../server/models/stocks');

const {app} = require('./../../server.js');

describe('Server Routes', () => {
  beforeEach((done) => {
    populateServer(done);
  });

  describe('/', () => {
    describe('GET', () => {
      it('should respond with success 200', (done) => {
        request(app)
          .get('/')
          .send()
          .expect(200)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });

  describe('/stocks', () => {
    describe('GET', () => {
      it('should return a list of stockData objects', (done) => {
        request(app)
          .get('/stocks')
          .send()
          .expect(200)
          .end((err, res) => {
            if (err)
              return done(err);
            let {stocks} = res.body;
            expect(stocks.length).toBe(2);
            expect(stocks[0].sym).toBe('SYM');
            expect(stocks[0].data).toExist();
            expect(Array.isArray(stocks[0].data)).toBe(true);
            expect(stocks[0].desc).toBe('A new company');
            done();
          });
      });
    });

    describe('POST', () => {
      it('make a query to yahooapis and convey the response to the client', (done) => {
        let [symbol, start, end] = ['GOOGL', '2016-01-01', '2017-01-01'];
        request(app)
          .post('/stocks')
          .send({sym: symbol, start, end})
          .expect(200)
          .end((err, res) => {
            if (err)
              return done(err);
            let {sym, data} = res.body;
            expect(sym).toBe(symbol);
            expect(Array.isArray(data)).toBe(true);
            done();
          });
      });
    });
  });

  // describe('/login', () => {   describe('GET', () => {     it('should respond
  // with success 200', (done) => {       request(app)         .get('/login')
  //    .send()         .expect(200)         .end((err, res) => {           if
  // (err)             return done(err);           done();         });     });
  // }); });
  //
  // describe('/logout', () => {   describe('GET', () => {     it('should redirect
  // to login after logout', (done) => {       request(app)
  // .get('/logout')         .send()         .expect(302)         .end((err, res)
  // => {           if (err)             return done(err);           done();
  //   });     });   }); });
  //
  // describe('/profile', () => {   describe('GET', () => {     it('should
  // redirect an unauthenticated user', (done) => {       request(app)
  // .get('/profile')         .send()         .expect(302)         .end((err, res)
  // => {           if (err)             return done(err);           done();
  //   });     });   }); });
  //
  // describe('/api/me', () => {   describe('GET', () => {     it('should redirect
  // an unauthenticated user', (done) => {       request(app)
  // .get('/api/me')         .send()         .expect(302)         .end((err, res)
  // => {           if (err)             return done(err);           done();
  //   });     });   }); });
});
