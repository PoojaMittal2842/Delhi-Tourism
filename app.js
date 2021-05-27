const express = require('express');
const path = require('path');
const multer = require("multer");
const cors = require("cors");
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const request = require('request');
const passport = require('passport'); // to authenticate
const LocalStrategy = require('passport-local'); // to authenticate
const User = require('./models/user');
const Ticket = require('./models/ticket');
const flash = require('connect-flash');
const Hotel = require('./models/hotel');


const app = express();

const { MongoStore } = require('connect-mongo');
const { triggerAsyncId } = require('async_hooks');

const MongoDBStore = require('connect-mongo')(session);
const dbUrl = 'mongodb://localhost:27017/new-delhi';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
// This middleware is used to enable Cross Origin Resource Sharing This sets Headers to allow access to our client application
app.use(cors());


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });

  const upload = multer({ storage: fileStorageEngine });

const secret = process.env.SECRET || 'delhi-tourism';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});
store.on("error", function(e) {
    console.log("Session store error", e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // to store the user in some way
passport.deserializeUser(User.deserializeUser()); // to store the user in alternate way

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user; //to have that user then flash it
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})




app.get('/', async(req, res) => {

    if (req.user == undefined) {
        res.render('User/index');
    } else {
        const user = await User.findById(req.user._id);
        res.render('User/index', { user })
    }

});

app.get('/adminlogin', (req, res) => {
    res.render('Admin/login');
});
app.get('/admin', (req, res) => {
    var id = req.session.code;
    if (id == 20) {
        res.render('Admin/index');
    } else {
        res.render('layouts/error');
    }
});
app.post('/adminlogin', async(req, res) => {
    var password = req.body.password;
    req.session.code = null;
    if (password == "Admin@123") {
        req.session.code = 20;
        console.log(req.session.code);
        res.redirect('/admin');
    } else {
        res.render('layouts/error');
    }
});

app.get('/adminusers', (req, res) => {
   var theme=[{
        color:'blue'
    },
    {
        color:'green'
    },
    {
        color:'yellow'
    },
    {
        color:'blue'
    },
    {
        color:'green'
    },
    {
        color:'yellow'
    },
    {
        color:'blue'
    },
    {
        color:'green'
    },
    {
        color:'yellow'
    },
    {
        color:'blue'
    },
    {
        color:'green'
    },
    {
        color:'yellow'
    }];
    User.find({},function(err,users){
        res.render('Admin/users',{users,theme});
    });
});

app.get('/adminplace', (req, res) => {
    res.render('Admin/place');
});

app.get('/adminbooking', (req, res) => {
    res.render('Admin/booking');
});

app.get('/progress', (req, res) => {
    res.render('Admin/progress');
});

app.get('/admin_blog', (req, res) => {
    res.render('Admin/blog');
});

app.get('/addnewplace', (req, res) => {
    res.render('User/add_new_place');
});

app.get('/bookticket', async(req, res) => {
    if (req.user == undefined) {
        res.render('User/Book_ticket');
    } else {
        const user = await User.findById(req.user._id);
        res.render('User/Book_ticket', { user })
    }
});

app.get('/bookhotel', async(req, res) => {
    if (req.user == undefined) {
        res.render('User/index');
    } else {
        const user = await User.findById(req.user._id);
        res.render('User/hotel', { user })
    }
})

app.post('/bookticket', async(req, res) => {
    var ticket=new Ticket();
    const user=await User.findById(req.user._id);
    ticket.author=user.username;
    ticket.firstname=req.body.firstname;
    ticket.lastname=req.body.lastname;
    ticket.contact=req.body.contact;
    ticket.date=req.body.date;
    ticket.email=req.body.email;
    ticket.time_slot=req.body.time_slot;
    ticket.adult_no=req.body.no_adult;
    ticket.children_no=req.body.no_children;
    await ticket.save();
    res.redirect('/');
});

app.post('/adminticket',async(req,res)=>{
    const user=await User.findById(req.body.adminticket);
    const tickets=await Ticket.find({author:user.username});
    if(tickets.length != 0)
    {
        res.render('User/booked_ticket',{tickets});
    }
    else{
        res.redirect('/');
    }
});

app.post('/deleteuser',async(req,res)=>{
    const id=req.body.deleteuser;
    await User.findByIdAndDelete(id);
    res.redirect('/');
});

app.post('/deleteticket',async(req,res)=>{
    const id=req.body.id;
    await Ticket.findByIdAndDelete(id);
    res.redirect('/');
});

app.get('/bookedticket',async(req,res)=>{
    const user=await User.findById(req.user._id);
    const tickets=await Ticket.find({author:user.username});
    if(tickets.length != 0)
    {
        res.render('User/booked_ticket',{tickets});
    }
    else{
        res.redirect('/');
    }
});

app.post('/ticket-data',async(req,res)=>{
    const ticket=await Ticket.findById(req.body.id);
    res.render('User/updateticket',{ticket});
});

app.post('/updateticket',async(req,res)=>{
    const ticket= await Ticket.findById(req.body.id);
    ticket.firstname=req.body.firstname;
    ticket.lastname=req.body.lastname;
    ticket.contact=req.body.contact;
    ticket.date=req.body.date;
    ticket.email=req.body.email;
    ticket.time_slot=req.body.time_slot;
    ticket.adult_no=req.body.no_adult;
    ticket.children_no=req.body.no_children;
    await ticket.save();
    res.redirect('/');
});


app.get('/gallery', (req, res) => {
    res.render('User/gallery');
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

app.post('/changepassword', async(req, res) => {
    if (req.user == undefined) {
        res.render('User/index');
    } else {
        const user = await User.findById(req.user._id);
        var pass = req.body.password;
        var changepass = req.body.changepass;
        if (pass == changepass) {
            user.setPassword(pass, function() {
                user.save();
                res.redirect('/');
            })
        } else {
            res.render('layouts/error');
        }
    }
});

app.get('/contactus', (req, res) => {
    res.render('User/contactus');
});

app.get('/login', (req, res) => {
    res.render('User/login');
});

app.post("/login", passport.authenticate("local", {
    failureFlash: true,
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {

});

app.get('/registration', (req, res) => {
    res.render('User/registration');
});

app.get('/forgotpass', (req, res) => {
    res.render('User/forgotpass');
});

app.post('/registration',upload.single("image"), (req, res) => {
    User.register(new User({ username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, country: req.body.country, contact: req.body.contact, image:req.file.filename }), req.body.password, function(err, user) {
        if (err) {
            return res.render('User/registration', { 'error': err.message });
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect('/');
        });
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function(err) {
        res.redirect('/login'); //Inside a callback… bulletproof!
    });
});

app.get('/userprofile', async(req, res) => {
    if (req.user == undefined) {
        res.render('User/index');
    } else {
        const user = await User.findById(req.user._id);
        res.render('User/User_Profile', { user });
    }
});

app.get('/updateprofile', async(req, res) => {
    const user = await User.findById(req.user._id);
    res.render('User/update_profile.ejs', { user });
});

app.post('/updateprofile', async(req, res) => {
    if (req.user == undefined) {
        res.render('User/index');
    } else {
        const user = await User.findById(req.user._id);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const country = req.body.country;
        const contact = req.body.contact;
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.country = country;
        user.contact = contact;
        await user.save();
        res.redirect('/userprofile');
    }
});
app.get('/feedback',(req,res)=>{
    res.render('User/feedback');
});
app.get('/faq', (req, res) => {
    res.render('User/faq');
});
app.get('/picture_profile',async(req,res)=>{
    if (req.user == undefined) {
        res.render('User/index');
    } else {
        const user = await User.findById(req.user._id);
        res.render('User/updatepic',{user});
    }
});
app.post('/picture_profile',upload.single("image"),async(req,res)=>{
    if (req.user == undefined) {
        res.render('User/index');
    } else {
        const user = await User.findById(req.user._id);
        user.image=req.file.filename;
        await user.save();
        res.redirect('/userprofile');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})
