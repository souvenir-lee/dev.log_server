const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
// const commentsRouter = require('./routes/comments');

const app = express();

const port = 4000;

app.use(
  session({
    secret: '@switzerland',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true,
  })
);

// app.use('/users', usersRouter);
app.use('/posts', postsRouter);
// app.use('/comments', commentsRouter);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

module.exports = app;
