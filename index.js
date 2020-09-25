const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const usersRouter = require('./routes/users');
const socialsRouter = require('./routes/socials');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();

const port = 4000;

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true, // maxAge -> 갱신
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000 * 30, // 30분간 세션 유지
    },
  })
);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://nightlockwasp.com'],
    method: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use('/users', usersRouter);
app.use('/socials', socialsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

module.exports = app;
