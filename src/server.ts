import mongoose from 'mongoose';
import http from 'http';
import app from './app';
import RoleModel from './models/role.model';

const DATABASE = process.env.DATABASE || 'invalid-db';
const options = {
  useNewUrlParser: true,
  autoIndex: true, //this is the code I added that solved it all
  keepAlive: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true,
};
mongoose
  .connect(DATABASE, options)
  .then(() => console.log('Connected to database!'))
  .catch(err => console.log(err));

const initial = () => {
  RoleModel.estimatedDocumentCount((err: String, count: number) => {
    if (!err && count === 0) {
      new RoleModel({ name: 'customer' }).save(error => {
        if (error) console.log('error:' + error);
        else console.log('added customer to roles collection');
      });
      new RoleModel({ name: 'operator' }).save(error => {
        if (error) console.log('error:' + error);
        else console.log('added operator to roles collection');
      });
      new RoleModel({ name: 'admin' }).save(error => {
        if (error) console.log('error:' + error);
        else console.log('added admin to roles collection');
      });
    }
  });
};

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () =>
  console.log('Node API server started on port ' + port)
);
