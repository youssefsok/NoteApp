import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import errorHandler from '../api/middlewares/error.handler';
import * as OpenApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import mongoose from 'mongoose';
import {MockMongoose} from 'mock-mongoose';
const app = express();

export default class ExpressServer {
  private routes: (app: Application) => void;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));

    /* Db Setup start */
    const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

    if (process.env.NODE_ENV === 'test') {
      const mockMongoose = new MockMongoose(mongoose);
    
      mockMongoose.prepareStorage().then(function() {
        mongoose.connect(`mongodb://example.com/${process.env.MONGO_DB}`, function(err) {
          console.log('connected');
        });
      });
    } else {
      mongoose.connect(url, { useNewUrlParser: true });
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function () {
        l.info('Connected successfully to DB');
      });
        }


    /* Db Setup end   */

    /* Swagger Setup start */
    let swaggerFile: any = (__dirname + "/swagger/swagger.json");
    let swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
    let swaggerDocument = JSON.parse(swaggerData);
    app.use('/api/docs', swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, null, null, null));
    /* Swagger Setup end */

  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
