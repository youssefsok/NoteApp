import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
 
var MockMongoose = require('mock-mongoose').MockMongoose;
var mockMongoose = new MockMongoose(mongoose);
before(function(done) {
  mockMongoose.prepareStorage().then(function() {
      mongoose.connect('mongodb://example.com/TestingDB', function(err) {
          done(err);
      });
  });
});

describe('notes', () => {


  it('should add a new note', () =>
    request(Server)
      .post('/api/v1/notes')
      .send({ name: 'test', description: 'test-desc' })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should get all notes', () =>
    request(Server)
      .get('/api/v1/notes')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(2);
      }));

});
