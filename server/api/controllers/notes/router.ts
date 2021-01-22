import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/cpu', controller.cpu)
  .get('/', controller.all);
