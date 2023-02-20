//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
require('../helpers')
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const {ObjectId} = require('mongodb');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const allmovies = await movieData.getAllMovies();
      let movielist = [];
      for (i = 0; i < allmovies.length; i++) {
        movielist.push({ _id: allmovies[i]._id, title: allmovies[i].title });
      }
      res.json(movielist);
    } catch (e) {
      res.status(500).json({ error: 'movies not found' });
    }
  })
  .post(async (req, res) => {
    const info = req.body;
    
    try {
    
      await checkifinputexists(info.plot);
     
      await checkifinputexists(info.title);
      await checkifinputexists(info.genres);
      await checkifinputexists(info.rating);
      await checkifinputexists(info.studio);
      await checkifinputexists(info.director);
      await checkifinputexists(info.castMembers);
      await checkifinputexists(info.dateReleased);
      await checkifinputexists(info.runtime);
      await checkifstring(info.title);
      await checkifemptystring(info.title);
      await checkifstring(info.plot);
      await checkifemptystring(info.plot);
      await checkifstring(info.rating);
      await checkifemptystring(info.rating);
      await checkifstring(info.studio);
      await checkifemptystring(info.studio);
      await checkifstring(info.director);
      await checkifemptystring(info.director);
      await checkifstring(info.dateReleased);
      await checkifemptystring(info.dateReleased);
      await checkifstring(info.runtime);
      await checkifemptystring(info.runtime);
      
      await checkifpropertitle(info.title);
      await checkifproperstudio(info.studio);
     director = await checkifproperdirector(info.director);
      await checkifvalidrating(info.rating);
      await checkispropergenre(info.genres);
    castMembers= await checkispropercastmemeber(info.castMembers);
      await checkisproperdate(info.dateReleased);
      await checkisproperruntime(info.runtime);
    
    } catch(e){
      
      return res.status(400).json({error: e});
    }
  
    try {
      
      const {  title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateReleased,
        runtime   } = info
      const newmovie = await movieData.createMovie(title,plot,genres,rating,studio,director,castMembers,dateReleased,runtime );
      res.status(200).json(newmovie);
    } catch (e) {
      
      res.status(500).json({error: e});
    }
    //code here for POST
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    const info = req.params.movieId
  if(!info)
  return res.status(400).json({ error: 'id doesnt exits' });
  if(typeof(info)!=="string")
  return res.status(400).json({ error: 'id not valid' });
  if(info.trim().length===0)
  return res.status(400).json({ error: 'id not valid' });
  if(!ObjectId.isValid(info))
  return res.status(400).json({ error: 'id not valid' });
    //code here for GET
  try{
    const moviebyid = await movieData.getMovieById(info);
    res.status(200).json(moviebyid);
  } catch (e) {
    res.status(404).json({ error: 'movie not found with that id' });
  }

  }
  )
  .delete(async (req, res) => {
    const info = req.params.movieId
    if(!info)
    return res.status(400).json({ error: 'id doesnt exits' });
    if(typeof(info)!=="string")
    return res.status(400).json({ error: 'id not valid' });
    if(info.trim().length===0)
    return res.status(400).json({ error: 'id not valid' });
    if(!ObjectId.isValid(info))
    return res.status(400).json({ error: 'id not valid' });
      //code here for GET
    try{
      const moviebyid = await movieData.removeMovie(info);
      res.status(200).json({"movieId": info, "deleted": true});
    } catch (e) {
      res.status(404).json({ error: 'movie not found with that id' });
    }

    //code here for DELETE
  })
  .put(async (req, res) => {
    const info = req.params.movieId
    const bodyy=req.body
   // console.log(info)
    if(!info)
    return res.status(400).json({ error: 'id doesnt exits' });
    if(typeof(info)!=="string")
    return res.status(400).json({ error: 'id not valid' });
    if(info.trim().length===0)
    return res.status(400).json({ error: 'id not valid' });
    if(!ObjectId.isValid(info))
    return res.status(400).json({ error: 'id not valid' });
    
    try{
      await checkifinputexists(bodyy.title);
      await checkifinputexists(bodyy.plot);
      await checkifinputexists(bodyy.genres);
      await checkifinputexists(bodyy.rating);
      await checkifinputexists(bodyy.studio);
      await checkifinputexists(bodyy.director);
      await checkifinputexists(bodyy.castMembers);
      await checkifinputexists(bodyy.dateReleased);
      await checkifinputexists(bodyy.runtime);
      await checkifstring(bodyy.title);
      await checkifemptystring(bodyy.title);
      await checkifstring(bodyy.plot);
      await checkifemptystring(bodyy.plot);
      await checkifstring(bodyy.rating);
      await checkifemptystring(bodyy.rating);
      await checkifstring(bodyy.studio);
      await checkifemptystring(bodyy.studio);
      await checkifstring(bodyy.director);
      await checkifemptystring(bodyy.director);
      await checkifstring(bodyy.dateReleased);
      await checkifemptystring(bodyy.dateReleased);
      await checkifstring(bodyy.runtime);
      await checkifemptystring(bodyy.runtime);
      
      await checkifpropertitle(bodyy.title);
      await checkifproperstudio(bodyy.studio);
      director = await checkifproperdirector(bodyy.director);
      await checkifvalidrating(bodyy.rating);
      await checkispropergenre(bodyy.genres);
      castMembers= await checkispropercastmemeber(bodyy.castMembers);
      await checkisproperdate(bodyy.dateReleased);
      await checkisproperruntime(bodyy.runtime);
    } catch(e){ 
      return res.status(400).json({ error: 'parameters not valid' });
    }
    try{
      await movieData.getMovieById(info)
    }catch(e){return res.status(404).json({ error: 'movie not found with that id' });}
      //code here for GET
    try{
     // console.log("here")
      const updatedmovie= await movieData.updateMovie(info,bodyy.title,bodyy.plot,bodyy.genres,bodyy.rating,bodyy.studio,bodyy.director,bodyy.castMembers,bodyy.dateReleased,bodyy.runtime)
    res.status(200).json(updatedmovie);
  }catch(e){
    res.status(400).json({ error: 'could not update successfully' });
  };

  })

  module.exports = router;