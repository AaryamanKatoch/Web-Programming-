//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
async function checkifinputexists(vari) {
    if(!vari)
    throw "No input is provided inn some field";
}

async function checkifstring(vari){
    if(typeof(vari)!=="string")
    throw 'Input is not a string';
}

async function checkifemptystring(vari){
if(vari.trim().length===0)
throw "string cant be empty or all white spaces";

}

async function checkifarray(vari){
    if(!Array.isArray(vari))
    throw "input is not array";
}

async function checkifpropertitle(vari){
    vari=vari.trim();
    if(vari.length < 2)
throw `title should be atleast two characters long`;
vari=vari.replace(/[A-Za-z]/g, "");
vari=vari.replace(/\d/g, "");
vari=vari.replaceAll(" ", "");
if(vari.length!==0)
throw 'not a valid title';
}

async function checkifproperstudio(vari){
    vari=vari.trim();
if(vari.length<5)
throw `studio must be atleast five characters long`;
vari=vari.replace(/[A-Za-z]/g, "");
vari=vari.replaceAll(" ", "");
vari=vari.replaceAll(",","")
vari=vari.replaceAll(".","")
vari=vari.replaceAll("'","")
vari=vari.replaceAll('"','')
vari=vari.replaceAll("-","")
vari=vari.replaceAll(":","")
vari=vari.replaceAll(";","")


if(vari.length!==0)
throw 'not a valid studio name'
}

async function checkifproperdirector(vari){ let arr =[];
    vari=vari.trim();
    arr= vari.split(" ")
    if(arr.length!==2)
    throw `not a proper name`;
    let firstname=arr[0];
    let fname=firstname
    let lastname=arr[1];
    let lname=lastname
    if(typeof(firstname)!="string")
    throw `not a string fname`
    if(typeof(lastname)!=="string")
    throw `not a string lname`
    if(firstname.length<3)
    throw `not a proper fname`
    if(lastname.length<3)
    throw `not a proper lname`
    firstname=firstname.replace(/[A-Za-z]/g, "");
    lastname=lastname.replace(/[A-Za-z]/g, "");
    firstname=firstname.replaceAll(".","")
    lastname=lastname.replaceAll("'","")
    lastname=lastname.replaceAll(".","")
    if(firstname.length!==0)
    throw `not a proper firstname`
    if(lastname.length!==0)
    throw `not a proper lastname`;
    fname=fname.toLowerCase()
    fname=fname.charAt(0).toUpperCase()+fname.slice(1)
    lname=lname.toLowerCase()
    lname=lname.charAt(0).toUpperCase()+lname.slice(1)
    /*let indexapos=0;
    indexapos = lname.indexOf("'")
    if(indexapos>=0)
    lname=lname.slice(0,indexapos+1)+lname.charAt(indexapos+1).toUpperCase()+lname.slice(indexapos+2) */

    for(i=0;i<fname.length;i++){
    if(fname[i]=="."){
        
    replacewith = fname.charAt(i+1).toUpperCase()
    fname= fname.replaceAt(i+1,replacewith)
     }
    }
    for(i=0;i<lname.length;i++){
        if(lname[i]=="."){
            
        replacewith = lname.charAt(i+1).toUpperCase()
        lname= lname.replaceAt(i+1,replacewith)
         }
        }
        for(i=0;i<lname.length;i++){
            if(lname[i]=="'"){
                
            replacewith = lname.charAt(i+1).toUpperCase()
            lname= lname.replaceAt(i+1,replacewith)
             }
            }

    vari = `${fname} ${lname}`
    
    return vari
    }
    
async function checkifvalidrating(vari){
vari=vari.trim();
if(vari!=="G" && vari!=="PG" && vari!=="PG-13" && vari!=="R" && vari!=="NC-17")
throw `not a proper rating`

}
async function checkispropergenre(vari){
await checkifinputexists(vari);
    
await checkifarray(vari);
if(vari.length===0)
throw `no element in array`;
let flag=0; let vari1=[]; vari1=[].concat(vari);
for (i in vari1){
   await checkifstring(vari1[i]);
   await checkifemptystring(vari1[i]);
    vari1[i]=vari1[i].trim();
    if(vari1[i].length<5){
    flag=1;
break;}
vari1[i]=vari1[i].replace(/[A-Za-z]/g, "");
vari1[i]=vari1[i].replaceAll(" ", "");
if(vari1[i].length!==0){
    flag=1;
    break;
}}

if(flag===1)
throw `not a proper genre`;
}

async function checkispropercastmemeber(vari){let fname;let lname; let vari1=vari;
    
  await  checkifinputexists(vari);
    
  await  checkifarray(vari);
    if(vari.length===0)
    throw `no element in array`;
    let flag=0;
    for (i in vari){ let arr=[];
    await   checkifstring(vari[i]);
    await    checkifemptystring(vari[i]);
        vari[i]=vari[i].trim()
        arr= vari[i].split(" ")
if(arr.length!==2){
flag=1;break;}
let firstname=arr[0];
fname=firstname
let lastname=arr[1];
lname=lastname
if(typeof(firstname)!="string")
{flag=1;break;}
if(typeof(lastname)!=="string")
{flag=1;break;}
if(firstname.length<3)
{flag=1;break;}
if(lastname.length<3)
{flag=1;break;}
firstname=firstname.replace(/[A-Za-z]/g, "");
firstname=firstname.replaceAll(".","")
lastname=lastname.replace(/[A-Za-z]/g, "");
lastname=lastname.replaceAll("'","")
lastname=lastname.replaceAll(".","")
if(firstname.length!==0)
{flag=1;break;}
if(lastname.length!==0)
{flag=1;break;}
    }
    if(flag===1)
    throw `not a valid input`
/*
for (i in vari1){let arr=[];
      vari1[i]=vari1[i].trim()
      arr= vari1[i].split(" ")
fname=arr[0];

lname=arr[1];

fname=fname.toLowerCase()
    fname=fname.charAt(0).toUpperCase()+fname.slice(1)
    lname=lname.toLowerCase()
    lname=lname.charAt(0).toUpperCase()+lname.slice(1)
   // vari1[i] = `${fname} ${lname}`    
 } */

 for (i in vari1){let arr=[];
    vari1[i]=vari1[i].trim()
    arr= vari1[i].split(" ")
fname=arr[0];

lname=arr[1];
fname=fname.toLowerCase()
    fname=fname.charAt(0).toUpperCase()+fname.slice(1)
    lname=lname.toLowerCase()
    lname=lname.charAt(0).toUpperCase()+lname.slice(1)
    vari1[i] = `${fname} ${lname}` }

   // return vari1}

for (i in vari1){
    let arr=[];
    vari1[i]=vari1[i].trim()
    arr= vari1[i].split(" ")
    fname=arr[0];
    lname=arr[1];
for(j=0;j<fname.length;j++){
if(fname[j]=="."){
replacewith = fname.charAt(j+1).toUpperCase()
fname= fname.replaceAt(j+1,replacewith)
         }
        }
for(j=0;j<lname.length;j++){
if(lname[j]=="."){
replacewith = lname.charAt(j+1).toUpperCase()
lname= lname.replaceAt(j+1,replacewith)
             }
            }
for(j=0;j<lname.length;j++){
if(lname[j]=="'"){
replacewith = lname.charAt(j+1).toUpperCase()
lname= lname.replaceAt(j+1,replacewith)
                 }
                }vari1[i] = `${fname} ${lname}`} return vari1}






/*    
for(i=0;i<fname.length;i++){
    if(fname[i]=="."){
        
    replacewith = fname.charAt(i+1).toUpperCase()
    fname= fname.replaceAt(i+1,replacewith)
     }
    }
    for(i=0;i<lname.length;i++){
        if(lname[i]=="."){
            
        replacewith = lname.charAt(i+1).toUpperCase()
        lname= lname.replaceAt(i+1,replacewith)
         }
        }
        for(i=0;i<lname.length;i++){
            if(lname[i]=="'"){
                
            replacewith = lname.charAt(i+1).toUpperCase()
            lname= lname.replaceAt(i+1,replacewith)
             }
            }vari1[i] = `${fname} ${lname}` }

 return vari1} */

async function checkisproperdate(vari){ 
    let arr=[];
   await checkifinputexists(vari);
   await checkifstring(vari);
   await checkifemptystring(vari);
    vari=vari.trim();
  arr=vari.split("/");
  if(arr.length!==3)
  throw `not a proper date`;
  let day=arr[1];
 //day=day.trim();
 await checkifinputexists(day);
 await checkifstring(day);
 await checkifemptystring(day);
  let month=arr[0];
  //month=month.trim();
  await checkifinputexists(month);
  await checkifstring(month);
  await checkifemptystring(month);
  let year=arr[2];
  //year=year.trim();
  await checkifinputexists(year);
  await checkifstring(year);
  await checkifemptystring(year);

if(day.length!==2)
throw `not proper day format`
if(month.length!==2)
throw `not proper month format`
if(year.length!==4)
throw `not proper year format`

let day1=day.replace(/\d/g, "");
let month1=month.replace(/\d/g, "");
let year1=year.replace(/\d/g, "");
if(day1.length!==0)
throw `invalid day input`
if(month1.length!==0)
throw `invalid month input`
if(year1.length!==0)
throw `invalid year input`


day=Number(day);
month=Number(month);
year=Number(year);
const currentyear = 2022;
if(year<1900 || year>currentyear+2)
throw `not a valid year`
if(month<1|| month>12)
throw `not a valid month`
if(month===2 && (day<1 || day>28))
throw `februrary dates are wrong`
if((month===1 || month===3||month===5||month===7||month===8||month===10||month===12) && (day<1 || day>31))
throw 'day is not valid'
if((month===4 || month===6||month===9||month===11) && (day<1 || day>30))
throw 'day is not valid'

}

async function checkisproperruntime(vari){
   await checkifinputexists(vari);
   await checkifstring(vari);
  await  checkifemptystring(vari);
    vari=vari.trim();
    let arr=[];
    arr=vari.split(" ");
    if(arr.length>2)
    throw `not proper runtime value`;
    let hour=arr[0];
    let mins=arr[1];
    if(hour.length<2)
    throw `not proper hour`
    if(hour.length>3)
    throw `not proper hour field`
    if(hour.length===2)
    {
       let hour1=hour.substring(0,1)
        if(!(Number.isInteger(Number(hour1))))
        throw `hours are not integers`
        if(Number(hour1)<1)
        throw `hour should be atleast 1`
       if(Number(hour1)>9)
       throw 'not valid hours'
       let hour2 = hour.substring(1)
       if(typeof(hour2)!=="string")
       throw ' not h'
       if(hour2!=="h")
throw `not proper h`
}
if(hour.length===3){
    let hour1=hour.substring(0,2)
    if(!(Number.isInteger(Number(hour1))))
    throw `hours are not integers`
    if(Number(hour1)<1)
    throw `hour should be atleast 1`
   if(Number(hour1)>15)
   throw 'not valid hours'
   let hour2 = hour.substring(2)
   if(typeof(hour2)!=="string")
   throw ' not h'
   if(hour2!=="h")
throw `not proper h`
}
if(mins.length<4)
throw `not proper mins`
if(mins.length>5)
throw `not proper mins`
if(mins.length===4){
let min1=mins.substring(0,1)
if(!(Number.isInteger(Number(min1))))
throw 'not proper min - not number'
if(Number(min1)>9 || Number(min1)<0)
throw 'not proper min'
let min2=mins.substring(1);
if(typeof(min2)!=="string")
throw ' not min'
if(min2!=="min")
throw `not proper min`
}

if(mins.length===5)
{
        let min1=mins.substring(0,2)
        if(!(Number.isInteger(Number(min1))))
        throw 'not proper min - not number'
        if(Number(min1)>59 || Number(min1)<0)
        throw 'not proper min'
        let min2=mins.substring(2);
        if(typeof(min2)!=="string")
        throw ' not min'
        if(min2!=="min")
        throw `not proper min`
}
}


String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

async function getdate() {
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
return today;
}

module.exports = {
   checkifinputexists,
   checkifstring,
   checkifemptystring,
   checkifarray,
   checkifpropertitle,
   checkifproperstudio,
   checkifproperdirector,
   checkifvalidrating,
   checkispropergenre,
   checkispropercastmemeber,
   checkisproperdate,
   checkisproperruntime,
   getdate
  };
  