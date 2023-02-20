//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require('express');
const router = express.Router();
const data = require('../data');
const { getPokemonbyid } = require('../data/pokemon');
const { checkifproperid } = require('../helpers');
const pokemondata=data.pokemon
require('../helpers')

router
  .route('/pokemon')
  .get(async (req, res) => {
    try{
      const poke = await data.pokemon.getPokemons();
      res.json(poke);
    } catch (e) {
      res.status(404).json(e);
    }
   
  });
//Request Method

router
  .route('/pokemon/:id')
  .get(async (req, res) => {

    try{
          
       req.params.id = await checkifproperid(req.params.id)
     
       //console.log(req.params.id)
      
       const pokemid = await data.pokemon.getPokemonbyid(req.params.id);
       res.json(pokemid);
  }    catch (e) {

if(e=="Error : Invalid URL Parameter")
res.status(400).json({e});
else if(e=="Error: Pokémon Not Found!")
      res.status(404).json({e});
else
res.status(500).json(e="Error: internal server error")
      
  } 
 
});
//Request Method

module.exports = router;