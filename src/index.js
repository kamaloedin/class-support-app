require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

global.appRoot = path.resolve(__dirname);

const app = express();
const port = 4000;

// Routes
const indexRoutes = require('./routes/index');
const classRoutes = require('./routes/classes');
const studentRoutes = require('./routes/students');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const logoutRoutes = require('./routes/logout');
const subjectRoutes = require('./routes/subjects');

// Passport Config & Initialization
const userModel = require('./models/users');
const initializePassport = require('./config/passport-config');
initializePassport(
  passport,
  userModel.getUserCredentialsByUsername,
  userModel.getUserCredentialsById,
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middlewares
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use('/favicon.ico', express.static('/img/favicon.ico'));

app.use('/', indexRoutes);
app.use('/classes', classRoutes);
app.use('/students', studentRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);
app.use('/subjects', subjectRoutes);

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
