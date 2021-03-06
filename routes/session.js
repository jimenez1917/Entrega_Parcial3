const express= require('express');
const router=express.Router();
const passport= require('passport');
const uploader = require('../utils/uploader.js');
const {userDao,productDao} = require('../daos');
const transporter = require('../config/Ndmail')


router.get('/',(req,res,next)=>{
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
} ,(req, res) => {
    console.log('yeaaaa')
    res.render('partials/head')
})
router.get('/signup',(req,res)=>{
    if(req.isAuthenticated()) return res.redirect('/');
    res.render('register')
})
router.post('/signup', uploader.single('avatar'), passport.authenticate('signup',{
    failureRedirect:'/signup'
}),async (req,res,next)=>{
            console.log(req.user)
        const mailOptions = {
        from: 'Servidor',
        to: 'chad.reynolds79@ethereal.email',
        subject: 'nuevo registro',
        html: `<h5>Username</h5>
        <p>${req.user.username}</p>
        <h5>nombre</h5>
        <p>${req.user.nombre}</p>
        <h5>direccion</h5>
        <p>${req.user.direccion}</p>
        <h5>edad</h5>
        <p>${req.user.edad}</p>
        <h5>telefono</h5>
        <p>${req.user.telefono}</p>`
    }
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info);
        next();
    }catch(e){
        console.log(e);
    }
},(req, res)=>{
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
    
    // console.log('length',cart.length);
    res.render('carrito',{products:products})
})
router.get('/vaciar',(req,res,next)=>{
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
},(req,res)=>{
    let newCart = [];
    userDao.UploadById(newCart,req.user[0].id);
    res.redirect('/api/productos')
    }
)
router.get('/perfil',(req, res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/login')
}
,(req,res)=>{
    let body = req.user[0];
    console.log(body);
    res.render('perfil',{body:body});
})
router.post('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

module.exports = router;