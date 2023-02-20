const axios = require('axios')
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data; // this will be the array of people objects
  }
async function checkisstring(vari){
if(typeof(vari)!=="string"){
throw `not a string`;
}}

async function checkinputexists(vari){
    if(!vari){
        throw `input doesnt exist`;
    }
}

async function stringallwhitespace(vari){ let count =0;
for(i=0;i<vari.length;i++){
    if(vari[i]===" ")
    count++;
}if(count===vari.length)
throw `string cannot be all white spaces`;

}

async function isemptystring(vari){
    if (vari.length===0)
    throw `string cant be empty`;
}


async function getPersonById(id){ 
    await checkinputexists(id);  
await checkisstring(id);  
await isemptystring(id);
await stringallwhitespace(id);

let obj= await getPeople();
    for(i=0;i<obj.length;i++)
    {
    let eachobject=obj[i];
    if(eachobject['id']===id)
    /*for(e in eachobject){
    if(eachobject[e]===id) */
    return eachobject;
    }
    throw 'person not found' ;
}



async function sameJobTitle(jobTitle) { 
    await checkinputexists(jobTitle);
    await checkisstring(jobTitle);
    await isemptystring(jobTitle);
    await stringallwhitespace(jobTitle);
    let resarr=[];
jobTitle=jobTitle.toLowerCase();
let obj= await getPeople();
for(i=0;i<obj.length;i++)
{
let eachobject=obj[i];
if(eachobject['job_title'].toLowerCase()===jobTitle)
/*for(e in eachobject){
    if(eachobject[e].toLowerCase()===jobTitle)*/
    resarr.push(eachobject);
}
if(resarr.length<2)
throw `there are not two people with that job title`;
return resarr;
}

async function getPostalCodes(city, state)
{
    await checkinputexists(city);
    await checkinputexists(state);

    
    await checkisstring(city);
    await checkisstring(state);
    
    await isemptystring(city);
    await isemptystring(state);
    
    await stringallwhitespace(city);
    await stringallwhitespace(state);
let resarr=[];
city=city.toLowerCase();
state=state.toLowerCase();
let obj= await getPeople();
for(i=0;i<obj.length;i++)
{
let eachobject=obj[i];
if(((eachobject["city"].toLowerCase())===city) && ((eachobject["state"].toLowerCase())===state))
resarr.push(eachobject["postal_code"]);
}
for(j=0;j<resarr.length;j++)
{
    resarr[j] = Number(resarr[j]);
}
resarr.sort(function(a, b) {return a - b;});

if(resarr.length===0)
throw `There are no postal_codes for the given city and state combination`;
if(resarr.length===1)
throw `There should be atleast two people living in the given state and city`;

return resarr;
}


async function sameCityAndState(city, state)
{
    await checkinputexists(city);
    await checkinputexists(state);

    
    await checkisstring(city);
    await checkisstring(state);
    
    await isemptystring(city);
    await isemptystring(state);
    
    await stringallwhitespace(city);
    await stringallwhitespace(state);

let resarr=[];let result=[];let tempobj={};
city=city.toLowerCase();
state=state.toLowerCase();
let obj= await getPeople();
for(i=0;i<obj.length;i++)
{
let eachobject=obj[i];

if(((eachobject["city"].toLowerCase())===city) && ((eachobject["state"].toLowerCase())===state))
tempobj[eachobject["first_name"]]=eachobject["last_name"];

}
let lastnarr = Object.values(tempobj);
lastnarr.sort();
for(i=0;i<lastnarr.length;i++){
let fname= await findkeys(tempobj,lastnarr[i]);
result.push(`${fname} ${lastnarr[i]}`);

}
if(result.length<2)
throw `There should be atleast two people living in the given state and city`
return result;
}


async function findkeys(object,k) {
    return Object.keys(object).find(key => object[key] === k);
  }




module.exports = {
   getPersonById,
   sameJobTitle,
   getPostalCodes,
   sameCityAndState
  };



