require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { connect } = require('mongoose');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { isActiveRoute } = require('./server/helpers/routeHelper');

const connectDB = require('./server/config/db');

connectDB();

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(cookieParser());
app.locals.isActiveRoute = isActiveRoute; 

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://goyalmoney95:hI3UA69wbxff2NDk@cluster0.ex5u5nz.mongodb.net/blog'
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

//? Template Engine

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/admin'));
app.use('/',require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App Listening on Port ${PORT}`);
});