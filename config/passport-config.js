const passport=require('passport');
const PassportLocal= require('passport-local').Strategy;
const User= require('../models/user.js');
const {createHash,isValidPassword} = require('../utils/utils');

const initializePassport=()=>{
    passport.use('signup', new PassportLocal({passReqToCallback:true},(req,username, password,done)=>{
        let {nombre,direccion,edad,telefono} = req.body;
        User.findOne({username: username},(err,user)=>{
            console.log(typeof req.file);
            if(!req.file) return done(null,false,{message:'couldnt upload avatar'})
            // console.log(req.file);
            if(err) return done(err);
            if(user) return done(null,false,{message:'user already exist'})
            const newUser = {
                username: username,
                password: createHash(password),
                nombre: nombre,
                direccion: direccion,
                edad: edad,
                telefono: telefono,
                profile_picture:req.file.filename,
                cart:[],
            }

            User.create(newUser,(err,userCreated)=>{
                if(err) return done(err)
                return done(null,userCreated)
            })
        })
    }))
    passport.use('loginStrategy',new PassportLocal(function(username,password,done){
        User.findOne({username: username},(err,userFound)=>{
            if(err) return done(err);
            if(!userFound) return done(null,false,{message:'user not found please signup'});
            if(!isValidPassword(userFound,password)) {
                return done(null,userFound)
            }else{return done(null,false,{message:'password invalid'})}
                
        })
    }))

//serializacion

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    done(null,{id:1,name:'Uriel'})
})
}

module.exports = initializePassport;