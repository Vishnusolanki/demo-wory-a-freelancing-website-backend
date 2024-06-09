// import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import { jwtStrategy } from './src/config/passport';
import ApiError from './src/utils/ApiError';
import { errorConverter, errorHandler } from './src/middlewares/error'; // Add this line
import indexRouter from './routes/index';
import routes from './routes/v1';

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'SECRET', saveUninitialized: true, cookie: { maxAge: oneDay }, resave: false }));
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(passport.session());

app.use('/', indexRouter);
app.use('/v1', routes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Page Not found'));
});

// Middleware to handle errors
app.use(errorConverter);
app.use(errorHandler); 

export default app;
