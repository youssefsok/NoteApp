import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';


describe('notes', () => {


  it('should get all notes', () =>
    request(Server)
      .get('/api/v1/notes')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(2);
      }));

  it('should add a new note', () =>
    request(Server)
      .post('/api/v1/notes')
      .send({ name: 'test', description:'test-desc' })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

});
