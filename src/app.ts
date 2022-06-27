import express, { Express, Request, Response } from 'express';
import UserRoutes from './routes/user.routes';

const app: Express = express();
const port = 3456;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(express.static('public', { maxAge: 86400000 }));

app.use('/api/v1/users', UserRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
