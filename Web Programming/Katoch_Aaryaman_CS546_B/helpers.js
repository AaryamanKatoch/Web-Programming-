//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
async function checkifinputexists(vari){
if(!vari)
throw "input is not provided"
}

async function checkisproperusername(vari){
await checkifinputexists(vari)
if(typeof(vari)!="string")
throw "username has to be a string"
if(vari.trim().length==0)
throw "username can not be all white spaces"
 vari=vari.trim()
 vari=vari.toLowerCase()
 if(((/\s/).test(vari))==true)
 throw "username cannot have whitespaces"
 if (!vari.match(/^[0-9a-z]+$/))
throw "username should only be alphanumeric characters"
if(vari.length<4)
throw "username should be atleast 4 characters"
return vari
}

async function checkisproperpassword(vari){
await checkifinputexists(vari)
if(typeof(vari)!="string")
throw "password has to be a string"
if(vari.trim().length==0)
throw "password cannot be all white spaces"
if(((/\s/).test(vari))==true)
throw "password cannot have whitespaces"
if(vari.length<6)
throw "password should be atleast 6 characters long"
const testcondition = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
if (!testcondition.test(vari)) 
throw "password is not proper"
}

async function checkisequalobject(o1, o2) {
const k1 = Object.keys(o1);
const k2 = Object.keys(o2);
if (k1.length !== k2.length) 
      return false;
for (let key of k1) {
      if (o1[key] !== o2[key]) 
        return false;
    }
    return true;
  }
module.exports ={checkisproperpassword, checkisproperusername, checkisequalobject}
