const axios = require('axios');
//Axios call to get all data

const getAllPeople = async () => {
    const {data}  = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    
    if(!searchPersonName) throw "no input provided"
    if(typeof(searchPersonName)!="string") throw "name is not a string"
    if(searchPersonName.trim().length==0) throw "name cannot be empty or all white spaces"

    const peopledata=await getAllPeople() ;let res=[];let res2=[]
    for(i=0;i<peopledata.length;i++){
        let fname=peopledata[i].firstName
        let lname=peopledata[i].lastName
        searchPersonName=searchPersonName.toLowerCase()
        fname=fname.toLowerCase()
        lname=lname.toLowerCase()
        if((fname.includes(searchPersonName))||(lname.includes(searchPersonName)))
        res.push(peopledata[i].id)}
        
       
        res=res.sort(function(a, b){return a - b})
        if(res.length>20){
        for(j=0;j<20;j++){
            res2.push(await searchPeopleByID(res[j]))
        }}
        else{
            
            for(j=0;j<res.length;j++){
                
                res2.push(await searchPeopleByID(res[j]))  
               
        }}
        
        if(res2.length===0)
        throw "no person found"
      return res2
        



};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    

if(!id)
throw 'id not provided'

//if(typeof(id)!=="string")
//throw "id is not string"

//if(id.trim().length===0)
//throw 'id should not be all white spaces'


if(!Number.isInteger(Number(id)))
throw "id should be a number"

if(id<=0)
throw 'id should be greater than 1'
    const peopledata=await getAllPeople()
    for(i=0;i<peopledata.length;i++){
        if(id==peopledata[i].id)
        return peopledata[i]
    }
    throw "no stuff with id"
};

module.exports = { searchPeopleByName, searchPeopleByID };
