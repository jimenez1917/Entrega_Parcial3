const express= require('express');
const router=express.Router();
const passport= require('passport');
const uploader = require('../utils/uploader.js');
const {userDao,productDao} = require('../daos');


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
    let cart=req.user[0].cart;
    let newCart= [...cart,req.params.id];
    console.log('new',newCart);
    const product = await userDao.UploadById(newCart,req.user[0].id);
    res.redirect('/api/productos');
})
router.get('/carrito', (req, res,next)=>{
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
},async (req, res)=>{
    let products=[];
    let cart =req.user[0].cart;
    for (let i = 0; i < cart.length; i++) {
        let data = await productDao.getById(cart[i]).then(product => {
            // console.log('prou',product[0]);
            return product[0];
        })
        products.push(data);        
    }
    console.log('doris',products);
    
    // console.log('length',cart.length);
    res.render('carrito',{products:products})
})

module.exports = router;