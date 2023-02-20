/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

let flag=true;
(function (){
  function sortArray(inp){
    if(!inp)
    throw "input must be provided"
    inp=inp.trim()
    if(inp.length==0)
    throw 'input cant be empty or all white spaces'
    inp=inp.replaceAll(" ","")
    inp=inp.replaceAll("    ","")
    if(inp.includes("."))
    throw "not integer format or unwanted character"
   // for(i=0;i<inp.length;i++){
     //   if(inp[i]!=="["&&inp[i]!=="]"&& (!Number.isInteger(Number(inp[i]))) && inp[i]!==",")
       // throw 'only arrays with intreger values allowed'
    //}
    if(inp[0]!="[" && inp[0]!=",")
    throw "not starting array"
   
    if(inp[0]==","){
      e=0
      while(inp[e]!="["){
        if(inp[e]!="," && inp[e]!=" ")
        throw "something other than comma or space before starting array stuff"
        e=e+1
      }
    }


    let resarr=[];
    for(i=0;i<inp.length;i++){
    if (inp[i]=="[")
    {   j=i
        while(inp[i]!="]"){
        i=i+1
        if(inp[i]=="[")
        throw "not proper array format"
        if(i==inp.length && inp[i]!="]")
        throw "not an array"
        }
        
    

        let o=i+1
        let n=o
        while(inp[o]!="[" && o<inp.length){
            
            
            if(inp[o]!=",")
            throw 'not proper arrayyy format'
            o=o+1
            
        }
        let s=o; 
if(s!=inp.length){
let comma=false;
for(x=n;x<s;x++){
    if(inp[x]==","){
        comma=true
        break
    }
}
if(comma==false)
throw "not comma between arrays"}

        arr=inp.slice(j,i+1)
        
        let arr1=arr.slice(1,arr.length-1)
        arr1=arr1.trim()
        if(arr1.length==0)
        throw "array should have atleast one element"
        arr2=arr1.split(",")

        for(w=0;w<arr2.length;w++){
          if(arr2[w]==""){
          arr2.splice(w,1);
          w=w-1}
      }
      if(arr2.length==0)
      throw "array cant be just commas"
        
       for(k=0;k<arr2.length;k++){
           if(Number.isInteger(Number(arr2[k])))
            resarr.push(arr2[k])
           else
            throw 'array elemnts should be integers'
         }
   
        }

}
for(i=0;i<resarr.length;i++){
    resarr[i]=Number(resarr[i])
}
resarr.sort(function(a, b){return a - b});
return resarr
}


const staticForm = document.getElementById('formid');
const list1 = document.getElementById("results");
if(staticForm){
    const inp=document.getElementById('inputid');
    const errorContainer = document.getElementById('error-container');
    const errorTextElement = errorContainer.getElementsByClassName(
      'text-goes-here'
    )[0];

    const resultContainer = document.getElementById('result-container');
    const resultTextElement = resultContainer.getElementsByClassName(
      'text-goes-here'
    )[0];
    staticForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        try {
          // hide containers by default
          errorContainer.classList.add('hidden');
          resultContainer.classList.add('hidden');
        
          // Values come from inputs as strings, no matter what :(
          const inputValue = inp.value;
          
          const result = sortArray(inputValue)
          
          const li = document.createElement("li");
          li.appendChild(document.createTextNode(`[${result}]`))
        list1.appendChild(li)
          if(flag)
          li.setAttribute("class", "is-green");
          else
          li.setAttribute("class", "is-red");
          flag=!flag
          
         // for(i=0;i<list1.length;i++){
           // if(i%2==0)
            //li.setAttribute("class", "is_red");
            //else
            //li.setAttribute("class", "is_green");
          //}
          resultContainer.classList.remove('hidden');
          errorContainer.classList='hidden';
          errorTextElement.textContent = "";
          
        } catch (e) {
          const message = typeof e === 'string' ? e : e.message;
          errorTextElement.textContent = e;
        errorContainer.classList.remove('hidden');
        }
      });
}
  })();
