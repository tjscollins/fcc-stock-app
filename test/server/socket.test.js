/*global describe it beforeEach done*/
const expect = require('expect');
const request = require('supertest');

const WebSocket = require('ws');
const {app} = require('./../../server.js');


describe('WebSocket', () => {
  it('should respond to connections', (done) => {
    const ws = new WebSocket('ws://localhost:8080', {
      perMessageDeflate: false
    });

    ws.on('message', (data, flags) => {
      expect(data).toExist();
      expect(data).toEqual('WebSocket connection established...');
      done();
    });
  });
});
