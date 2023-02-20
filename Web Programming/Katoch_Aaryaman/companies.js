const axios = require('axios')
async function getCompanies(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/a2a5867e4ebf4ef483618fad01f0818f225e5d86/companies.json');
return data;
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


async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data; // this will be the array of people objects
  }

async function getemployeesbycompanyid(cid) {
    
    let resarr=[];let result=[];let tempobj={};
    
    let obj= await getPeople();
    let obj1 = await getCompanies();
    for(i=0;i<obj.length;i++)
    {
    let eachobject=obj[i];
    
    if(eachobject["company_id"]===cid)
    tempobj[eachobject["first_name"]]=eachobject["last_name"];
    
    }
    let lastnarr = Object.values(tempobj);
    lastnarr.sort();
    for(i=0;i<lastnarr.length;i++){
    let fname= await findkeys(tempobj,lastnarr[i]);
    result.push(`${fname} ${lastnarr[i]}`);
    }
    return result;
    }
    
////////////////////////////////////////////////////
async function listEmployees(companyName){

    await checkinputexists(companyName);  
    await checkisstring(companyName);  
    await isemptystring(companyName);
    await stringallwhitespace(companyName);


    let obj = await getCompanies();
    for(i=0;i<obj.length;i++){
        let eachobject=obj[i];
    if(eachobject["name"]===companyName){
    eachobject["employees"]=await getemployeesbycompanyid(eachobject["id"])
return eachobject;}}

throw `No company name with ${companyName}`
    }

/////////////////////////////////////////////
async function sameIndustry(industry) { let arr=[];
    await checkinputexists(industry);  
    await checkisstring(industry);  
    await isemptystring(industry);
    await stringallwhitespace(industry);
    industry=industry.toLowerCase();
    let obj= await getCompanies();
for(i=0;i<obj.length;i++)
{
let eachcompany=obj[i];
if(eachcompany["industry"].toLowerCase()===industry)
arr.push(eachcompany);
}
if(arr.length===0)
throw `industry cannot be found in the given list`
return arr;
}


/////////////////////////

async function getCompanyById(id){
    await checkinputexists(id);  
    await checkisstring(id);  
    await isemptystring(id);
    await stringallwhitespace(id);
    let obj= await getCompanies();
    for(i=0;i<obj.length;i++)
    {
    let eachcompany=obj[i];
    if(eachcompany['id']===id)
    return eachcompany;

}
throw `No company name with ${id}`
}










    
    async function findkeys(object,k) {
        return Object.keys(object).find(key => object[key] === k);
      }


      module.exports = {
        listEmployees,
        sameIndustry,
        getCompanyById
       };
     
     

