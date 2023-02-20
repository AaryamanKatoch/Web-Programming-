//Your data modules to make the Axios calls and get the data
const axios = require('axios');
const { checkifproperid } = require('../helpers');
require("../helpers")

async function getPokemons(){
    const {data}  = await axios.get('https://pokeapi.co/api/v2/pokemon');

    return data;
}

async function getPokemonbyid(id){
    
    
    id= await checkifproperid(id)
    id=id.trim()
    try{
   // console.log((id))
    //link= `https://pokeapi.co/api/v2/pokemon/${id}`
//console.log(typeof(link))
 //   console.log(link)
 
const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);


return data;
    } catch(e) {throw 'Error: Pokémon Not Found!'}
}


module.exports={
    getPokemons,
    getPokemonbyid
}