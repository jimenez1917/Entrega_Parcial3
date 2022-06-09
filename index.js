const express = require('express');
const ProductsRouter = require('./routes/ProductsRouter');
const passport= require('passport');
const cookieParser= require('cookie-parser');
const session = require('express-session');
const initializePassport=require('./config/passport-config.js')
const Session = require('./routes/session.js');


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'cualquiercosa',
    resave: true,
    saveUninitialized: true
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/',Session);
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`listening on ${PORT}`));




app.use('/api/productos',ProductsRouter);

//error en la url
app.use('*',(req, res) => {
    res.send({error:-2,descripcion:`ruta ${req.url} metodo ${req.method} no implementad`})
})