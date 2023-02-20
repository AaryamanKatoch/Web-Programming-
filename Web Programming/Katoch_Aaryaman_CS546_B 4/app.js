/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/
//const movies = require('./movies');
//const posts = require('./posts');
//const connection = require('./mongoConnection');
const movies = require('./data/movies');
const connection = require('./config/mongoConnection');


async function main() {
    const db = await connection.dbConnection();
    let hackers=undefined;
    let movie2 =undefined;
    let movie3 = undefined;
    await db.dropDatabase();
  ////////////////////////////////1,2//////////  
try{

    hackers = await movies.createMovie("Hackers ", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["  Crime ","Thriller","Drama"], "  PG  "," H.G.'s studio  ", " hgik.l. o'iLLIic.k  ",[" hellsing sr.     ","jon o'neil","  jackson hemiing  "], "01/28/2024   ", "    14h 04min    ");
   console.log(hackers);
}catch(e){
    console.log(e);
}

/////////////////3////////////////
try{

    movie2 = await movies.createMovie("42","In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.",["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers","Brian Helgeland" ,["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], "04/09/2013", "2h 8min");
}catch(e){
    console.log(e);
}
/////////////////////////////////4/////
try{

   const allMovies = await movies.getAllMovies();
  console.log(allMovies);
}catch(e){
    console.log(e);
}
///////////////////////////////////5,6/////////
try{

    movie3 = await movies.createMovie("Movie 3", "Movi e 3 description  are blamed for making a virus that will capsize five oil tankers.", ["Crime","Sci Fi"], "PG-13", "United Artists", "Iain Softley", ["Miller Jonny", "Jolie Angelina", "Lliard Matthew", "Fisher Stevens"], "12/15/2015", "2h 55min");
   console.log(movie3);
}catch(e){
    console.log(e);
}
//////////////////////7,8///////////////
try{
    const renamed = await movies.renameMovie(hackers._id, "new hackers renamed"); 
     console.log(renamed); 
    }catch(e){console.log(e)}

////////////////////////////////9////////////
try{
    const deletmovie = await movies.removeMovie(movie2._id); 
  console.log(deletmovie); 
}catch(e){console.log(e);}
//////////////////////////////////10/////
try{

    const allMovies = await movies.getAllMovies();
   console.log(allMovies);
 }catch(e){
     console.log(e);
 }
 //////////////////////////////////////////11
 try{

    const errormov = await movies.createMovie("Hackers []{", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
   console.log(errormov);
}catch(e){
    console.log(e);
}
//////////////////////////////////////12
try{
    const deletmovie = await movies.removeMovie(movie2._id); 
  //  console.log(deletmovie); 
}catch(e){console.log(e);}
///////////////////////////////////13////////////


try{
    const renamed = await movies.renameMovie(movie2._id, "new name"); 
     console.log(renamed); 
    }catch(e){console.log(e)}


/////////////14//////////////////

try{
    const renamed = await movies.renameMovie(movie3._id, []); 
     console.log(renamed); 
    }catch(e){console.log(e)}
////////////////////////////////15
try{
    
    const fortytwo = await movies.getMovieById(); 
   // console.log(fortytwo); 
}catch(e){console.log(e);}




await connection.closeConnection();
}
main();