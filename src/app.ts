import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import customerRoutes from './routes/customer.routes';
import operatorRoutes from './routes/operator.routes';
import dumpsterRoutes from './routes/dumpster.routes';

const app: Application = express();
dotenv.config();
app.use(express.json({ limit: '10kb' }));
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.static('public', { maxAge: 86400000 }));

app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/operators', operatorRoutes);
app.use('/api/v1/dumpsters', dumpsterRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.all('*', (req, res, next) => {
  next(res.status(404).send(`Can't find ${req.originalUrl} on this server`));
});

export default app;
