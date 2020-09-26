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

const corsOptions = {
  origin: ['http://172.30.1.39:3000', 'http//localhost:3000'],
  method: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credentials: true,
  // * 사용 시 cookie(session) 사용 불가 -> 임시로 팀원 각각 ngrok 발급해서 env 넣기
  // SSL 클라이언트에 붙이면 -> callback 해결, cors 해결
};

app.options('*', cors());
app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/socials', socialsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

module.exports = app;
