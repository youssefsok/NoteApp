import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import l from '../server/common/logger';

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
 
var MockMongoose = require('mock-mongoose').MockMongoose;
var mockMongoose = new MockMongoose(mongoose);

before(function() {
  mockMongoose.prepareStorage().then(function() {
    const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

      mongoose.connect('url', function(err) {
        l.error(err);
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
