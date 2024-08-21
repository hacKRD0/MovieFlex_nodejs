import 'dotenv/config';
import express from 'express';
import authRoute from './routes/authRoute.js';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;

app.use(authRoute);

app.get('/', (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME}`);
});

app.use('*', (req, res) => {
  res.status(404).json({
    err: 'not found',
  });
});

server.listen(port, () => {
  console.log(`App ${process.env.APP_NAME} listening on port ${port}`);
});
