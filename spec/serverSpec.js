let expect = require('chai').expect;
let app = require('../server/index.js');
let request = require('request');
let httpMocks = require('node-mocks-http');

let port = 5432;
let home = 'https://127.0.0.1:1337';

// selenium and nightwatch?
describe('Serves pages', function() {
  it('Serves a homepage', function() {
    let options = {
      method: 'GET',
      uri: home
    };

    request(options, function(error, res, body) {
      if (error) { return done(error); }
      expect(res.headers.location).to.equal('/');
      done();
    });
  });
});
