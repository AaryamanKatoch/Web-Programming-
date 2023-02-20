const people = require("./people");
const companies = require("./companies");

async function main(){
    
   try{
       console.log(await people.getPersonById('1498e0da-aefc-4070-bfd7-ff26c5a78712'));
       
    }catch(e){
        console.log (e);
    }

    try{

        console.log(await people.sameJobTitle('help DESK opeRAtOr'));
       
    }catch(e){
        console.log (e);
    }

    try{

        console.log(await people.getPostalCodes("ausTIN", "TExas"));
       
    }catch(e){
        console.log (e);
    }
    

    try{

        console.log(await people.sameCityAndState('austIN','TEXAS'));
       
    }catch(e){
        console.log (e);
    } 

    try{

        console.log(await companies.listEmployees("Batz-Sauer"));
       
    }catch(e){
        console.log (e);
    }


try{

    console.log(await companies.sameIndustry("AUTO parts:O.E.M."));
   
}catch(e){
    console.log (e);
}



try{
    console.log(await companies.getCompanyById('fb90892a-f7b9-4687-b497-d3b4606faddf'));
   
}catch(e){
    console.log (e);
}


 }


//call main
main();

