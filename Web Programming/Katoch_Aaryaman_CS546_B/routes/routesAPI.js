//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const mongoCollections = require('../config/mongoCollections');
const user_collection = mongoCollections.user_collection;
const helpers = require('../helpers');
const userdata=require("../data/users");
const session = require('express-session');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    
  if(!req.session.user){
    res.render("userLogin")
  }
  else
  res.redirect("/protected")
  })

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
  if(req.session.user){
    res.redirect("/protected")
  }
  else{
    res.render("userRegister")
  }}
   
    

  )
  .post(async (req, res) => {
    //code here for POST
    let username=req.body.usernameInput
    let password=req.body.passwordInput
    
    try{
    if(!username)
    throw "no username is provided"
    if(!password)
    throw "no password is provided"
    
    await helpers.checkisproperpassword(password)
    username=await helpers.checkisproperusername(username)
    }catch(e){return res.status(400).render("userRegister",{error:true, message : e })}
   try{var yry={}
    yry=await userdata.createUser(username,password)
  }catch(e){return res.status(400).render("userRegister",{error:true, message : e })}
   if(await helpers.checkisequalobject(yry,{ insertedUser: true })){
   return res.redirect("/")
   }
   else{
    return res.status(500).send("Internal Server Error");
   }

  })

router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    username=req.body.usernameInput
    password=req.body.passwordInput
    try{
    if(!username)
    throw "no username is provided"
    if(!password)
    throw "no password is provided"
    await helpers.checkisproperpassword(password)
    username= await helpers.checkisproperusername(username)
    }catch(e){return res.status(400).render("userLogin",{error:true,message : e })}
    try{
      var user2={}
     user2 =await userdata.checkUser(username,password)
    }catch(e){res.status(400).render("userLogin",{error:true , message : e});return}
    
    if(await helpers.checkisequalobject(user2,{authenticatedUser: true})){
    req.session.user=username
    res.redirect('/protected') }


    // if(!user1)
      //return res.status(400).render("userLogin",{error:true , message : "not a valid username and/or password"});
      //else{
      //req.session.user=username
      //res.redirect('/protected') 
     // }
   // return res.status(400).render("userLogin",{error:true , message : "not a valid username and/or password"});
  
  })

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user){
      let date1=new Date().toUTCString()
      res.render("private",{username:req.session.user , date:date1})
    }
  })

router
  .route('/logout')
  .get(async (req, res) => {

    req.session.destroy()
    res.clearCookie("AuthCookie")
    res.render('logout')
  })

  module.exports=router