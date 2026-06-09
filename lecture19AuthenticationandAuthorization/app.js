const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const errorController = require('./controllers/error');
const rootDir = require('./utils/pathUtil');

const app = express();

const DB_PATH =
  "mongodb+srv://root:Qwerty%408433@completecoding.ndwpjkz.mongodb.net/airbnb?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

store.on('error', (err) => {
  console.log("Session Store Error:", err);
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
    store
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn ;

  // res.locals.isLoggedIn = req.session.isLoggedIn;
  // res.locals.user = req.session.user;

  next();
});

app.use(authRouter);
app.use(storeRouter);

app.use('/host', (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
});

app.use('/host', hostRouter);

app.use(errorController.get404);

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log('Mongo Connected');

    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });
  })
  .catch(err => console.log(err));