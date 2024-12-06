const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const classRoutes = require('./routes/classes');
const studentRoutes = require('./routes/students');

const app = express();
const port = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/classes', classRoutes);
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.render('index', { layout: 'layouts/main-layout', title: 'Class Support App | Home' });
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
