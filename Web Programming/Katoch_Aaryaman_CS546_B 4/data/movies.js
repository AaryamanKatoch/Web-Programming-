const mongoCollections = require('../config/mongoCollections');
//const mongoCollections = require('../../../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper =require('../helpers');
const { checkifemptystring, checkifinputexists, checkifstring, checkifproperstudio, checkifproperdirector, checkifpropertitle, checkispropergenre, checkifvalidrating, checkispropercastmemeber, checkisproperdate, checkisproperruntime} = require('../helpers');



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
  runtime:runtime
}
const insertInfo = await moviecoll.insertOne(movie1);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add movie';

   const newId = insertInfo.insertedId.toString();

    const movie = await getMovieById(newId);
    movie._id=movie._id.toString();
     
     return movie;
//trim
};

const getAllMovies = async () => {
    const movieCollection = await movies();

    const arr = await movieCollection.find({}).toArray();
    if (arr===null) return [];
    for(i in arr){
      arr[i]._id=arr[i]._id.toString();
    }
    return arr;
  }


const getMovieById = async (id) => {
  if(!id)
  throw `no id is given`;
  if(typeof(id)!=="string")
  throw `type of id is not a string`;
  if(id.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  id=id.trim();
  if(!ObjectId.isValid(id))
  throw `id is not valid`;
 const moviecollec =await movies();
 const moviebyid= await moviecollec.findOne({_id:ObjectId(id)});
 if(moviebyid===null) 
 throw `no movie found with that id`;
 moviebyid._id=moviebyid._id.toString();
 return moviebyid;

};

const removeMovie = async (id) => {
  if(!id)
  throw `no id is given`;
  if(typeof(id)!=="string")
  throw `type of id is not a string`;
  if(id.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  id=id.trim();
  if(!ObjectId.isValid(id))
  throw `id is not valid`;
  const moviecollec =await movies();
  var deletename= await getMovieById(id);
  
  const deletedmovie = await moviecollec.deleteOne({_id: ObjectId(id)});

  if (deletedmovie.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;
  }

  return (`${deletename.title} has been successfully deleted!`);
}




const renameMovie = async (id, newName) => {
  if(!id)
  throw `no id is given`;
  if(typeof(id)!=="string")
  throw `type of id is not a string`;
  if(id.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  id=id.trim();
  if(!ObjectId.isValid(id))
  throw `id is not valid`;
  await checkifinputexists(newName);
  await checkifstring(newName);
await checkifemptystring(newName);
await checkifpropertitle(newName);
newName=newName.trim();

  var updatemovie = await getMovieById(id);
  if(updatemovie.title.toLowerCase()===newName.toLowerCase())
  throw `cant be same`
  const moviecollection = await movies();
  const movie_newname = {
    title: newName,

  };

  const updatedInfo = await moviecollection.updateOne(
    {_id: ObjectId(id)},
    {$set: movie_newname}
  );
    if (updatedInfo.modifiedCount === 0) {
      throw 'movie cannot be updated';
    }

    const movie11=await getMovieById(id);
    return movie11;

};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  removeMovie,renameMovie
};

