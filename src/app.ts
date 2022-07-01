import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import customerRouter from './routes/customer.routes';
import operatorRouter from './routes/operator.routes';

const app: Application = express();
dotenv.config();
app.use(express.json({ limit: '10kb' }));
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.static('public', { maxAge: 86400000 }));

app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/operators', operatorRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.all('*', (req, res, next) => {
  next(res.status(404).send(`Can't find ${req.originalUrl} on this server`));
});

export default app;
