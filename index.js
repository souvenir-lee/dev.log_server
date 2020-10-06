const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const usersRouter = require('./routes/users');
const socialsRouter = require('./routes/socials');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const customRouter = require('./routes/custom');
const searchRouter = require('./routes/search');
const categoryRouter = require('./routes/category');

const app = express();

const port = 4000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true, // maxAge -> 갱신
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000 * 30, // 30분간 세션 유지
      // sameSite: 'lax',
    },
  })
);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'http://devyeon.com',
      'https://devyeon.com',
      'http://codeto.xyz',
      'https://codeto.xyz',
      'http://localhost:3000',
    ],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
  })
);

app.use('/users', usersRouter);
app.use('/socials', socialsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/custom', customRouter);
app.use('/search', searchRouter);
app.use('/category', categoryRouter);

app.get('/health', (req, res) => {
  console.log('Time:', Date());
  res.status(299).send('health check');
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

module.exports = app;
