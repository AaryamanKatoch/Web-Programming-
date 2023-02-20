//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const data = require('../data');
const { searchPeopleByName, searchPeopleByID } = require('../data/people');
const peopledata = data.people
const path = require('path');

router.route("/").get(async (req, res) => {
  res.sendFile(path.resolve('static/homepage.html'));
  //res.render('layouts/main');
  //code here for GET
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  var term1 = req.body.searchPersonName;
  
  if(!term1){
  res.status(400).render("error",{class:"error",title:"People Found", err: "No name is given." })
  return}
 // if(typeof(term1)!="string"){res.status(400).render("error",{ title:"People Found",err: "Name is not a string" });return} 
  if(term1.trim().length==0) {res.status(400).render("error",{class: "error",title: "People Found", err: "No name is given or is all white spaces" });return}
  term1=term1.trim()
  try{
  var sol1 =await searchPeopleByName(term1)
  }catch(e){res.status(404).render("personNotFound",{title:"People Found",searchPersonName:term1});return}
  res.render('peopleFound',  { solution: sol1, searchPersonName:term1, title: "People Found" });
 // res.render('peopleFound',  { solution: sol1, searchPersonName: term1, title: "People Found" });
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  let term=req.params.id
  if(!term) {
    res.status(400).render("error",{class:"error", title: "Person Found",err: "No id is given." })
  }
  if(typeof(term)!=="string")
  {res.status(400).render("error",{class:"error", title:"Person Found",err: "Id is not a string" });return} 
  term=term.trim()
  if(term.length===0)
  {res.status(400).render("error",{class:"error",title:"Person Found", err: "No name is given or is all white spaces" });return}
  if(term.includes("."))
  {res.status(400).render("error",{ class:"error",title:"Person Found",err: "id should be a whole number,no decimals" });return}
  
  
  if(!Number.isInteger(Number(term)))
  {res.status(400).render("error",{class:"error", title:"Person Found",err: "id should be a number" });return}
  
  if(term<=0)
  {res.status(400).render("error",{class:"error",title:"Person Found", err: "id should be greater than 0" });return}

  req.params.id=req.params.id.trim()
try{
  var sol=await searchPeopleByID(req.params.id)
} catch(e){;res.status(404).render("personNotFound",{title:"Person Found",searchPersonName:term});return}

  res.render('personFoundByID', { solution1: sol,title: "Person Found" });
});
module.exports = router;