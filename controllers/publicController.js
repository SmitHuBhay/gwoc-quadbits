//ye sare models hai means database me is format me saved thi info type shit
const Service = require('../models/Service');
const Content = require('../models/Content');
const Booking = require('../models/Booking');
const Feedback = require('../models/Feedback');
//for homepage
exports.getHome = async (req, res) => {
    const services = await Service.find({}).limit(3);//database mese pull krne ke baad run krega since async
    const reviews = await Feedback.find({}).sort({createdAt: -1}).limit(3);//same as above 
    res.render('index', { services, reviews });
};//async await because we are pulling service and feedback from mongodb since it can be changed
//for services page
exports.getServices = async (req, res) => {
    const services = await Service.find({});
    res.render('services', { services });
};
//for getting booking page (looking)
exports.getBooking = async (req, res) => {
    // Only allow booking if logged in
    if (!req.session.user) return res.redirect('/user/login');//if not login, return kr raha hai login page pe
    const services = await Service.find({});
    res.render('booking', { services, selectedService: req.query.service, user: req.session.user });//ye sab variable get request marne ke baad ageya
};

exports.postBooking = async (req, res) => {
    await Booking.create({
        //get request se aaya hua data upar he tha yaha use krre
        user: req.session.user._id,
        customerName: req.session.user.name,
        email: req.session.user.email,
        ...req.body
    });
    res.redirect('/user/dashboard');
};
//get founder page (yap)
exports.getFounder = (req, res) => res.render('founder');

//get feedback page
exports.getFeedback = (req, res) => res.render('feedback');
//review post krne ke liye
exports.postFeedback = async (req, res) => {
    await Feedback.create({
        user: req.session.user ? req.session.user._id : null,
        name: req.body.name,
        rating: req.body.rating,
        message: req.body.message
    });
    res.redirect('/');
};
//timepass page pr booklet me kaha tha awareness bhi rakho
exports.getAwareness = async (req, res) => {
    const posts = await Content.find({ type: 'Blog' }).sort({ createdAt: -1 });
    res.render('awareness', { posts });
};
