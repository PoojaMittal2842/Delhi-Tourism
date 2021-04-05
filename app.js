const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');


const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render('User/index');
});

app.get('/admin', (req, res) => {
    res.render('Admin/index');
});

app.get('/addnewplace', (req, res) => {
    res.render('User/add_new_place');
});

app.get('/bookticket', (req, res) => {
    res.render('User/Book_Ticket');
});

app.get('/browseplace', (req, res) => {
    res.render('User/Browse_Place');
});

app.get('/category', (req, res) => {
    res.render('User/Category');
});

app.get('/changepassword', (req, res) => {
    res.render('User/changepassword');
});

app.get('/contactus', (req, res) => {
    res.render('User/contactus');
});

app.get('/login', (req, res) => {
    res.render('User/login');
});

app.get('/registration', (req, res) => {
    res.render('User/registration');
});

app.get('/userprofile', (req, res) => {
    res.render('User/User_Profile');
});


const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})