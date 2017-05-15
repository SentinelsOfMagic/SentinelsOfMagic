let expect = require('chai').expect;
let app = require('../server/index.js');
let request = require('request');
let httpMocks = require('node-mocks-http');

let port = 5432;

describe('Serves pages', function() {
  it('Serves a homepage', function() {
    let options = {
      method: 'GET',
      uri: 'http://127.0.0.1:1337/',
    };

    request(options, function(error, res, body) {
      if (error) { return done(error); }
      expect(res.headers.location).to.equal('/');
      done();
    });
  });
});
