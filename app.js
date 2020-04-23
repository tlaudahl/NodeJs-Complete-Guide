const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000);