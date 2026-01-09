const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Content = require('../models/Content');
const bcrypt = require('bcryptjs');
//sare models and libraries^^
// login page
exports.getLogin = (req, res) => {
    res.render('admin/login', { error: null });
};

// login post request , verifying login details
exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;//yaha name and password input aa rahe hai
        const admin = await Admin.findOne({ username });//ye admin details verify kr raha hai dbms se match krke
        
        if (admin && await bcrypt.compare(password, admin.password)) {
            req.session.admin = admin._id;// admin ka session chalu hai aisa declare kr diya
            res.redirect('/admin');
        } else {
            res.render('admin/login', { error: 'Invalid Credentials' });//agar dbms me nahi hua aisa kuch toh error 
        }
    } catch (err) {
        res.render('admin/login', { error: 'Server Error' });//agar server error aya to restart
    }
};

//logout request handler
exports.logout = (req, res) => {
    //yaha pe session destroy kr rahe hai means kisi ka bh session nahi chlra aisa declare ho raha hai
    req.session.destroy(() => {
        res.redirect('/');//home page pe redirect kr rahe hai
    });
};
//logs related chize^^

// admin dashboard
exports.getDashboard = async (req, res) => {
    try {
        const services = await Service.find({});
        const bookings = await Booking.find({}).populate('service').sort({ date: -1 });//date wise sort krne ka syntax
        const posts = await Content.find({ type: 'Blog' }).sort({ createdAt: -1 });//latest to oldest wala sorting
        res.render('admin/dashboard', { services, bookings, posts });//ye sab variables ke sath render krne ke liye
    } catch (err) {
        console.error(err);
        res.send("Server Error");
    }
};

//create service
exports.createService = async (req, res) => {
    try {
        let { title, price, discountPercent, duration, imageURL, category } = req.body;
        price = Number(price);
        discountPercent = Number(discountPercent) || 0;//default 0

        // discounted price calculation
        let discountPrice = price;
        if (discountPercent > 0) {
            discountPrice = Math.round(price - (price * (discountPercent / 100)));
        }

        await Service.create({
            title, price, discountPercent, discountPrice, duration, imageURL, category
        });//service create krne ke liye (discount wale shit ke sath)
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
};

//update service
exports.updateService = async (req, res) => {
    try {
        let { title, price, discountPercent, duration } = req.body;
        price = Number(price);
        discountPercent = Number(discountPercent) || 0;
        let discountPrice = price;
        if (discountPercent > 0) {
            discountPrice = Math.round(price - (price * (discountPercent / 100)));
        }
        await Service.findByIdAndUpdate(req.params.id, {
            title,
            price,
            discountPercent,
            discountPrice,
            duration
        });//yaha pe update ho raha hai rather than create
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
};

//delete
exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);//find krke delete ez
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
};
// service related chize^^

//booking status (confirm or not)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;// do button hai ek daba ke vo status laga denge (default pending hai)
        await Booking.findByIdAndUpdate(req.params.id, { status });
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
};
//booking related chize^^

//blog create krne ko
exports.createContent = async (req, res) => {
    try {
        const { title, body, imageURL, tags } = req.body;
        const tagArray = tags ? tags.split(',').map(t => t.trim()) : [];        
        await Content.create({
            title,
            body,
            imageURL,
            tags: tagArray
        });// create krke dbms me store krke render krne ke kaam
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
};
//delete blog
exports.deleteContent = async (req, res) => {
    try {
        await Content.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
};

//edit blog
exports.getEditContent = async (req, res) => {
    try {
        const post = await Content.findById(req.params.id);
        res.render('admin/editBlog', { post });
    } catch (err) {
        res.redirect('/admin');
    }
};

//blog update krne ko
exports.updateContent = async (req, res) => {
    try {
        const { title, body, imageURL, tags } = req.body;
        const tagArray = tags ? tags.split(',').map(t => t.trim()) : [];

        await Content.findByIdAndUpdate(req.params.id, {
            title,
            body,
            imageURL,
            tags: tagArray
        });
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
};