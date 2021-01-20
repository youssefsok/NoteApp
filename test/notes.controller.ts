import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import l from '../server/common/logger';
import dbHandler from '../server/common/db-handler';
import { before } from 'mocha';
let server;

describe('notes', () => {
before( async ()=>{server = await Server;})

  it('should add a new note', async () =>
    request(server)
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
    request(server)
      .get('/api/v1/notes')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(1);
      }));
  
});
