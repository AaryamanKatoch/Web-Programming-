const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
const reviews = mongoCollections.reviews;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
require('../config/mongoCollections');
const { movies } = require('../config/mongoCollections');
const { getMovieById } = require('./movies');



const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if(!movieId)
  throw `no id is given`;
  if(typeof(movieId)!=="string")
  throw `type of id is not a string`;
  if(movieId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  movieId=movieId.trim();
  if(!ObjectId.isValid(movieId))
  throw `id is not valid`;
  await checkifinputexists(movieId);
  await checkifinputexists(reviewTitle);
  
  await checkifinputexists(reviewerName);
  await checkifinputexists(review);
  //await checkifinputexists(rating);
  await checkifstring(reviewTitle);
  await checkifemptystring(reviewTitle);

  if(reviewTitle.trim().length<2)
  throw "not proper title for review"

  await checkifstring(reviewerName);
  await checkifemptystring(reviewerName);
  reviewerName=await checkifproperdirector(reviewerName)
  await checkifstring(review);
  await checkifemptystring(review);
  if(!Number.isFinite(rating))
  throw 'rating is not a number'
  if(typeof(rating)!="number" )
  throw 'rating is not a number'
  if(isNaN(rating))
  throw 'rating is not a number'
  if(rating<0 || rating>5)
  throw 'rating is not valid'
  rating=Number(rating.toFixed(1))
  //check rating
  movieId=movieId.trim()
  reviewTitle=reviewTitle.trim()
  reviewerName=reviewerName.trim()
  review=review.trim()
  //check name
  reviewDate=await helper.getdate()
  
  
  
  try{
  const movief= await getMovieById(movieId)
  }catch(e){//console.log(e) 
   throw "movie not found"}
  
  const revid=ObjectId();
  const moviesCollection= await movies()
 // const reviewcoll = await reviews();
  
  let review1 = {
  
  reviewTitle : reviewTitle,
  reviewDate:reviewDate,
  reviewerName : reviewerName,
  review :review,
  rating:rating
  }
 // reviewcollec=await reviews()
  const revId = ObjectId();
  
  const updatedReviews = { _id: revId, ...review1 };
  //updatedReviews._id=updatedReviews._id.toString();


  try{
  const updatedInfo= await moviesCollection.updateOne({ _id: ObjectId(movieId) }, { $push: { reviews: updatedReviews } });
  if (updatedInfo.modifiedCount === 0) 
    throw "could not add review";
  }catch(e){throw "movie not found"}
  const updatedMovie = await getMovieById(movieId);
  let ratingsum=0;let overall=0
  if(updatedMovie){
  for(i=0;i<updatedMovie.reviews.length;i++){
    ratingsum=ratingsum+updatedMovie.reviews[i].rating
  }
  
  averagerating=ratingsum/updatedMovie.reviews.length

await moviesCollection.updateOne({ _id: ObjectId(movieId) }, { $set: { overallRating: averagerating } });
  }
  updatedReviews._id=updatedReviews._id.toString()
  return updatedReviews

  
}




const getAllReviews = async (movieId) => {
  if(!movieId)
  throw `no id is given`;
  if(typeof(movieId)!=="string")
  throw `type of id is not a string`;
  if(movieId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  movieId=movieId.trim();
  if(!ObjectId.isValid(movieId))
  throw `id is not valid`;
  movieId=movieId.trim()
 
  const movie1 = await getMovieById(movieId);
// movie1.reviews._id=movie1.reviews._id.toString()
 return movie1.reviews
};

const getReview = async (reviewId) => {
  
  if(!reviewId)
  throw `no id is given`;
  if(typeof(reviewId)!=="string")
  throw `type of id is not a string`;
  if(reviewId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  reviewId=reviewId.trim();
  if(!ObjectId.isValid(reviewId))
  throw `id is not valid`;
  reviewId=reviewId.trim()
//const reviewcoll = await reviews()
const moviecoll=await movies()
/*
const reviewbyid= await reviewcoll.findOne({_id: ObjectId(reviewId)});
if(reviewbyid===null) 
throw `no review found with that id`;
reviewbyid._id=reviewbyid._id.toString();
return reviewbyid;
*/
const movieList = await moviecoll.find({}).toArray();
let found = false;
let review = {};
for (let i = 0; i < movieList.length; i++) {
    const currentmovie = movieList[i];
    for (let j = 0; j < currentmovie.reviews.length; j++) {
        if (currentmovie.reviews[j]._id.toString() == reviewId) {
            found= true;
            review = currentmovie.reviews[j];
        }
    }
}
if (!found) throw 'no review with that id';
review._id=review._id.toString()
return review;
};



const removeReview = async (reviewId) => {
  const moviesCollection = await movies();
  const allmovies = await moviesCollection.find({}).toArray();
  let reviewFound = false;
  let movieId = "";
  let newallmovies = [];
  let curmovie = {};
  for (let i = 0; i < allmovies.length; i++) {
      curmovie = allmovies[i];
      let oldReviewsList = curmovie.reviews;     
for (let j = 0; j < oldReviewsList.length; j++) {
          if (oldReviewsList[j]._id.toString() == reviewId) {



  reviewFound = true;
  movieId = oldReviewsList[j]._id;
              for (let k = 0; k < oldReviewsList.length; k++) {
          if (oldReviewsList[k]._id.toString() == reviewId) {
    continue;
    

                  }
    newallmovies.push(oldReviewsList[k]);
              }
          }
    if (reviewFound) break;
      }
      curmovie.reviews = newallmovies;
      if (reviewFound) break;
  }
  if (!reviewFound) {
      throw `could not delete review with id of ${reviewId}`;
  }

  const newReviews = {};
  newReviews.reviews = curmovie.reviews;
  //console.log(newReviews);
  await moviesCollection.updateOne({_id: curmovie._id}, {$set: {reviews : curmovie.reviews}});
  newmovie = await getMovieById(curmovie._id.toString());
  
  let ratingsum=0;let overall=0
  if(newmovie){
  for(i=0;i<newmovie.reviews.length;i++){
    ratingsum=ratingsum+newmovie.reviews[i].rating
  }
  
  averagerating=ratingsum/newmovie.reviews.length

await moviesCollection.updateOne({ _id: curmovie._id }, { $set: { overallRating: averagerating.toFixed(1) } });
 
newmovie = await getMovieById(curmovie._id.toString());
return newmovie

};

}
  


module.exports = {createReview,getAllReviews,getReview,removeReview};
