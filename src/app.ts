import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import routes from './app/routes';
const app: Application = express();
app.use(cors());
app.use(cookieParser());

console.log(path.join(process.cwd()));

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to  house hunter!');
});

// global error handler
app.use(globalErrorHandler);

app.get('/images/:fileName', (req: Request, res: Response) => {
  const fileName = req.params.fileName;

  const filePath = path.resolve(__dirname, 'images/', fileName);

  // Send the file as a response
  res.sendFile(filePath);
});

// handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Can't find ${req.originalUrl} on house hunter server!`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `Api not found!`,
      },
    ],
  });
  next();
});

export default app;
