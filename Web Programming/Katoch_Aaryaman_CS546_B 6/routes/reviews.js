//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const reviewData= data.reviews
require('../helpers')
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const {ObjectId} = require('mongodb');

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    info=req.params.movieId
    if(!info)
    return res.status(400).json({ error: 'id doesnt exits' });
    if(typeof(info)!=="string")
    return res.status(400).json({ error: 'id not valid' });
    if(info.trim().length===0)
    return res.status(400).json({ error: 'id not valid' });
    if(!ObjectId.isValid(info))
    return res.status(400).json({ error: 'id not valid' });
    try {
      const reviewstotal = await reviewData.getAllReviews(info);
    if (reviewstotal.length === 0) {
         return res.status(404).json([]);
  }
res.status(200).json(reviewstotal);
  } catch (e) {
      return res.status(404).json({ error:"movie  not found" });
      }

  })
  .post(async (req, res) => {
    //code here for POST
    const info=req.params.movieId
    const body1 = req.body
    if(!info)
    return res.status(400).json({ error: 'id doesnt exits' });
    if(typeof(info)!=="string")
    return res.status(400).json({ error: 'id not valid' });
    if(info.trim().length===0)
    return res.status(400).json({ error: 'id not valid' });
    if(!ObjectId.isValid(info))
    return res.status(400).json({ error: 'id not valid' });
    try {
  
  await checkifinputexists(body1.reviewTitle);
  await checkifinputexists(body1.reviewerName);
  await checkifinputexists(body1.review);
  await checkifinputexists(body1.rating);
  await checkifstring(body1.reviewTitle);
  await checkifemptystring(body1.reviewTitle);
  await checkifstring(body1.reviewerName);
  await checkifemptystring(body1.reviewerName);
  await checkifstring(body1.review);
  await checkifemptystring(body1.review);
  if(!Number.isFinite(body1.rating))
  throw 'rating is not a number'
 if(typeof(body1.rating)!="number" )
  throw 'rating is not a number'
  if(isNaN(body1.rating))
  throw 'rating is not a number'
  if(body1.rating<0 || body1.rating>5)
  throw 'rating is not a number'
  body1.rating=Number(body1.rating.toFixed(1))
    }
    catch(e){
      return res.status(400).json({ error: e });}
try{
const movie11 = await movieData.getMovieById(info)
}
catch{return res.status(404).json({ error: "no movie with id" })}


try{
const newreview=await reviewData.createReview(info,body1.reviewTitle,body1.reviewerName,body1.review,body1.rating)
}catch(e){ 
  return res.status(400).json({ error: e });}
return res.status(200).json(await movieData.getMovieById(info))

}

  );

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    const info=req.params.reviewId
    const body1 = req.body
    if(!info)
    return res.status(400).json({ error: 'id doesnt exits' });
    if(typeof(info)!=="string")
    return res.status(400).json({ error: 'id not valid' });
    if(info.trim().length===0)
    return res.status(400).json({ error: 'id not valid' });
    if(!ObjectId.isValid(info))
    return res.status(400).json({ error: 'id not valid' });
try{
const review11 = await reviewData.getReview(info)
return res.status(200).json(review11)
}catch(e){
  return res.status(404).json({ error: "no review with id" })}
  }

    //code here for GET
  )
  .delete(async (req, res) => {
    //code here for DELETE
    const info=req.params.reviewId
    const body1 = req.body
    if(!info)
    return res.status(400).json({ error: 'id doesnt exits' });
    if(typeof(info)!=="string")
    return res.status(400).json({ error: 'id not valid' });
    if(info.trim().length===0)
    return res.status(400).json({ error: 'id not valid' });
    if(!ObjectId.isValid(info))
    return res.status(400).json({ error: 'id not valid' });
try{const newmovie11 = await reviewData.removeReview(info)
  return res.status(200).json(newmovie11)
  }catch(e){
    return res.status(404).json({ error: "no review with id" })}}

  );



  module.exports = router;