const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');

const pageNotFound = require('./controllers/404');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);



app.use(pageNotFound.pageNotFound)

app.listen(3000);