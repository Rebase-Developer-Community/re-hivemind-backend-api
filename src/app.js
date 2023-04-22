import express from 'express';
import appConfig from './appConfig.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errHandler, headerFunction, notFound, unauthorizedErrors } from './middleware/errorMiddleware.js';
import { testAuth } from './helper/extraHelper.js';
import { extendedRequestMiddleware } from './middleware/index.js';

const app = express();
const { whiteList } = appConfig;

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    };
  } else {
    corsOptions = {
      origin: false,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    };
  }
  callback(null, corsOptions);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(helmet());
app.use('*', cors(corsOptionsDelegate));
app.all('*', headerFunction);
app.use(extendedRequestMiddleware);
// route
app.get('/', testAuth);
app.use(unauthorizedErrors);
app.use(errHandler);
app.use(notFound);

export default app;
