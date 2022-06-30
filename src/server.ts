import mongoose from 'mongoose';
import http from 'http';
import app from './app';

const DATABASE = process.env.DATABASE || 'invalid-db';
mongoose.connect(DATABASE).then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () =>
  console.log('Node API server started on port ' + port)
);
