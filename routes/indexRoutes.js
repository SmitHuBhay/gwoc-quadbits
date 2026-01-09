const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicController');

router.get('/', controller.getHome);
router.get('/services', controller.getServices);
router.get('/book', controller.getBooking);
router.post('/book', controller.postBooking);
router.get('/awareness', controller.getAwareness);
router.get('/founder', controller.getFounder);
router.get('/feedback', controller.getFeedback);
router.post('/feedback', controller.postFeedback);
router.get('/contact', (req, res) => res.render('contact'));

module.exports = router;