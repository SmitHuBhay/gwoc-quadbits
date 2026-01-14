require('dotenv').config();
const express = require('express');//backend
const app = express();
const connectDB = require('./config/db');
const methodOverride = require('method-override');//put and delete
const session = require('express-session');//cookies
const expressLayouts = require('express-ejs-layouts'); 


connectDB(); // Connect Database

// Middleware
app.use(expressLayouts);          
app.set('layout', 'layout');      

app.set('view engine', 'ejs');// seting ejs as html file
app.use(express.static('public'));//for all assets in public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//parse json (data from database is in json)
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.admin = req.session.admin || null;
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/', require('./routes/indexRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/user', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ₹{PORT}`));