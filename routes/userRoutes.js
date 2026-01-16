const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/login', (req, res) => res.render('user/login', { error: null }));
router.get('/register', (req, res) => res.render('user/register', { error: null }));
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/dashboard', controller.getDashboard);
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;