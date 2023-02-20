const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');
const { reviews } = require('../config/mongoCollections');


const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {await checkifinputexists(title);
  await checkifinputexists(plot);
  await checkifinputexists(genres);
  await checkifinputexists(rating);
  await checkifinputexists(studio);
  await checkifinputexists(director);
  await checkifinputexists(castMembers);
  await checkifinputexists(dateReleased);
  await checkifinputexists(runtime);
  await checkifstring(title);
  await checkifemptystring(title);
  await checkifstring(plot);
  await checkifemptystring(plot);
  await checkifstring(rating);
  await checkifemptystring(rating);
  await checkifstring(studio);
  await checkifemptystring(studio);
  await checkifstring(director);
  await checkifemptystring(director);
  await checkifstring(dateReleased);
  await checkifemptystring(dateReleased);
  await checkifstring(runtime);
  await checkifemptystring(runtime);
  
  await checkifpropertitle(title);
  await checkifproperstudio(studio);
  director = await checkifproperdirector(director);
  await checkifvalidrating(rating);
  await checkispropergenre(genres);
  castMembers= await checkispropercastmemeber(castMembers);
  await checkisproperdate(dateReleased);
  await checkisproperruntime(runtime);
  title=title.trim();
  plot=plot.trim();
  studio=studio.trim();
  director=director.trim();
  rating=rating.trim();
  for (i in genres){
    genres[i]=genres[i].trim();
  }
  for(i in castMembers){
    castMembers[i]=castMembers[i].trim();
  }
  dateReleased=dateReleased.trim();
  runtime=runtime.trim();
  ///
  let runarr=runtime.split("")
  for(i=0;i<runarr.length;i++){
   if(runarr[0]=="0")
   runarr.splice(0,1)
   if(runarr[i]==" " && runarr[i+1]=="0" && runarr[i+2]!="m")
   runarr.splice(i+1,1)
  
  }
  runtime=runarr.join("")
  
  
  
  ///
  const moviecoll = await movies();
  let movie1 = {
    title:title,
    plot:plot,
    genres:genres,
    rating:rating,
    studio:studio,
    director:director,
    castMembers:castMembers,
    dateReleased:dateReleased,
    runtime:runtime,
    reviews : [],
    overallRating :0
  }
  const insertInfo = await moviecoll.insertOne(movie1);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add movie';
  
     const newId = insertInfo.insertedId.toString();
  
      const movie = await getMovieById(newId);
     
       movie._id=movie._id.toString()
       return movie;};

const getAllMovies = async () => {    const movieCollection = await movies();

  const arr = await movieCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;};

const getMovieById = async (movieId) => {  if(!movieId)
  throw `no id is given`;
  if(typeof(movieId)!=="string")
  throw `type of id is not a string`;
  if(movieId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  movieId=movieId.trim();
  if(!ObjectId.isValid(movieId))
  throw `id is not valid`;
 const moviecollec =await movies();
 const moviebyid= await moviecollec.findOne({_id:ObjectId(movieId)});
 if(moviebyid===null) 
 throw `no movie found with that id`;
 moviebyid._id=moviebyid._id.toString()
 /////////
 for(i=0;i<moviebyid.reviews.length;i++){
  moviebyid.reviews[i]._id=moviebyid.reviews[i]._id.toString()
 }
 return moviebyid;};

const removeMovie = async (movieId) => {if(!movieId)
  throw `no id is given`;
  if(typeof(movieId)!=="string")
  throw `type of id is not a string`;
  if(movieId.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  movieId=movieId.trim();
  if(!ObjectId.isValid(movieId))
  throw `id is not valid`;
  const moviecollec =await movies();
  var deletename= await getMovieById(movieId);
  
  const deletedmovie = await moviecollec.deleteOne({_id: ObjectId(movieId)});

  if (deletedmovie.deletedCount === 0) {
    throw `Could not delete movie with id of ${movieId}`;
  }

  return (`${deletename.title} has been successfully deleted! `);};

const updateMovie = async (
  id,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  await checkifinputexists(title);
  await checkifinputexists(plot);
  await checkifinputexists(genres);
  await checkifinputexists(rating);
  await checkifinputexists(studio);
  await checkifinputexists(director);
  await checkifinputexists(castMembers);
  await checkifinputexists(dateReleased);
  await checkifinputexists(runtime);
  await checkifstring(title);
  await checkifemptystring(title);
  await checkifstring(plot);
  await checkifemptystring(plot);
  await checkifstring(rating);
  await checkifemptystring(rating);
  await checkifstring(studio);
  await checkifemptystring(studio);
  await checkifstring(director);
  await checkifemptystring(director);
  await checkifstring(dateReleased);
  await checkifemptystring(dateReleased);
  await checkifstring(runtime);
  await checkifemptystring(runtime);
  
  await checkifpropertitle(title);
  await checkifproperstudio(studio);
  director = await checkifproperdirector(director);
  await checkifvalidrating(rating);
  await checkispropergenre(genres);
  castMembers= await checkispropercastmemeber(castMembers);
  await checkisproperdate(dateReleased);
  await checkisproperruntime(runtime);
  title=title.trim();
  plot=plot.trim();
  studio=studio.trim();
  director=director.trim();
  rating=rating.trim();
  for (i in genres){
    genres[i]=genres[i].trim();
  }
  for(i in castMembers){
    castMembers[i]=castMembers[i].trim();
  }
  dateReleased=dateReleased.trim();
  runtime=runtime.trim();
  ///
  let runarr=runtime.split("")
  for(i=0;i<runarr.length;i++){
   if(runarr[0]=="0")
   runarr.splice(0,1)
   if(runarr[i]==" " && runarr[i+1]=="0" && runarr[i+2]!="m")
   runarr.splice(i+1,1)
  
  }
  runtime=runarr.join("")
  if(!id)
  throw `no id is given`;
  
  if(typeof(id)!=="string")
  throw `type of id is not a string`;
  if(id.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  id=id.trim();
  if(!ObjectId.isValid(id))
  throw `id is not valid`;
 //const oldmovie=await getMovieById(moviebyid)

  
  
  ///
  const moviecoll = await movies();
  let updatedmovie = {
    title:title,
    plot:plot,
    genres:genres,
    rating:rating,
    studio:studio,
    director:director,
    castMembers:castMembers,
    dateReleased:dateReleased,
    runtime:runtime
  }
  const updatedInfo = await moviecoll.updateOne({_id: ObjectId(id)},
  {$set: updatedmovie}
);
if (updatedInfo.modifiedCount === 0) {
  throw 'could not update movie successfully';
  
}
return await getMovieById(id)

};




module.exports = {createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie
};
