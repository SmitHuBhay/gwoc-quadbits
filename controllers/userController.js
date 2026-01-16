const User = require('../models/User');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //ye mota moti hashing krke password store krne ke liye
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hash });

        req.session.user = user;//user ka session hai aisa declare kr rahe hai
        res.redirect('/user/dashboard');
    } catch (e) { res.render('user/register', { error: 'Email exists' }); }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password))//yaha compare kr rahe hai password and type shit ko dono true hue to continue
    {
        req.session.user = user;
        res.redirect('/user/dashboard');
    } else { res.render('user/login', { error: 'Invalid Email or Password' }); }
};

exports.getDashboard = async (req, res) => {
    if (!req.session.user) return res.redirect('/user/login');
    const bookings = await Booking.find({ user: req.session.user._id }).populate('service').sort({ date: -1 });//user ki history date wise sort format mai
    res.render('user/dashboard', { user: req.session.user, bookings });//yaha bhej rahe hai display krne ke liye
};