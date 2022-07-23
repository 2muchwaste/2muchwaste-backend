import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import customerRoutes from './routes/customer.routes';
import operatorRoutes from './routes/operator.routes';
import dumpsterRoutes from './routes/dumpster.routes';
import depositRoutes from './routes/deposit.routes';
import paymentRoutes from './routes/payment.routes';
import costRoutes from './routes/cost.routes';
import areaRoutes from './routes/area.routes';
import operatorNotificationRoutes from './routes/operatorNotification.routes';
import authRoutes from './routes/auth.routes';
import cookieSession from 'cookie-session';

const app: Application = express();
dotenv.config();
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: '2muchwaste-session',
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);
app.use(helmet());
app.use(express.static('public', { maxAge: 86400000 }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dumpsters', dumpsterRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/operators', operatorRoutes);
app.use('/api/v1/opnotifications', operatorNotificationRoutes);
app.use('/api/v1/deposits', depositRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/costs', costRoutes);
app.use('/api/v1/areas', areaRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to 2muchwaste backend!');
});
app.all('*', (req, res, next) => {
  next(res.status(404).send(`Can't find ${req.originalUrl} on this server`));
});

export default app;
