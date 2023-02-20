//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

async function checkifproperid(vari){ let vari1
vari1=vari

if(!vari)
throw 'Error : Invalid URL Parameter'
if(typeof(vari)!=="string")
throw 'Error : Invalid URL Parameter'
vari=vari.trim()
if(vari.length===0)
throw 'Error : Invalid URL Parameter'

if(!Number.isInteger(Number(vari)))
throw e='Error : Invalid URL Parameter'

if(vari<=0)
throw 'Error : Invalid URL Parameter'

vari1=vari1.trim()

return vari1
}

module.exports={checkifproperid}