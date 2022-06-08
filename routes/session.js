const express= require('express');
const router=express.Router();
const passport= require('passport');
const uploader = require('../utils/uploader.js');


router.get('/',(req,res,next)=>{
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
} ,(req, res) => {
    // si ya iniciamos sesión 
    // si no hemos iniciado sesión redireccionar a /login
    res.render('partials/head')
})
router.get('/signup',(req,res)=>{
    if(req.isAuthenticated()) return res.redirect('/')
    res.render('register')
})
router.post('/signup', uploader.single('avatar'), passport.authenticate('signup',{
    failureRedirect:'/signup'
}),(req, res)=>{
    res.redirect('/');
})
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', passport.authenticate('loginStrategy',{
    successRedirect: '/',
    failureRedirect: '/login',
}));
router.post('/:id', async (req,res)=>{
    console.log(req)
})

module.exports = router;