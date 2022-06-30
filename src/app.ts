import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import customerRouter from './routes/customer.routes';

const app: Application = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.json);
dotenv.config({ path: `$(__dirname}/../.env` });

app.use(express.static('public', { maxAge: 86400000 }));

app.use('/api/v1/customers', customerRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.all('*', (req, res, next) => {
  next(res.status(404).send(`Can't find ${req.originalUrl} on this server`));
});

export default app;
