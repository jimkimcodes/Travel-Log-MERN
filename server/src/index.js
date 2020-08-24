const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const { notFound, errorHandler } = require('./middlewares');
const logs = require('./api/logs');
const users = require('./api/users');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello 🌍',
  });
});

app.use('/api/logs', logs);
app.use('/auth', users);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 2330;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
