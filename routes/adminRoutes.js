const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


//routes 
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.logout);

//check krne ke liye admin logged in hai ya nahi
const auth = (req, res, next) => {
    if (req.session.admin) {
        return next();
    }
    res.redirect('/admin/login');
};
//after authentication
//dashboard admin ka main page
router.get('/', auth, adminController.getDashboard);//yaha palahe check krege auth me aur fir get dashboard se dashboard render hoga

//service routes , service manipulation ke liye
router.post('/service', auth, adminController.createService);
router.put('/service/:id', auth, adminController.updateService);
router.delete('/service/:id', auth, adminController.deleteService);

//booking routes , booking manipulation ke liye
router.put('/booking/:id', auth, adminController.updateBookingStatus);

//content routes , content manipulation ke liye (blog update krneko)
router.post('/content', auth, adminController.createContent);

// Blog Management
router.get('/content/edit/:id', auth, adminController.getEditContent);//iske baad niche wali window ayegi uspe asli update hoga
router.post('/content/edit/:id', auth, adminController.updateContent);//yaha dalenge ya update krege
router.post('/content/delete/:id', auth, adminController.deleteContent);//ye delete krne ke liye

module.exports = router;