const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropDown = document.querySelectorAll(".drop-down select")
const btn = document.querySelector("#btn")
const fromCurr = document.querySelector(".from select") //->> name of the select tag
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


//here dropDown returns a nodelist so we will take on element from it ->> "a"

for(let select of dropDown)
{
    //countryList is an array of codes , so we take an element from country code ->> code
    for (code in countryList)
{
    
    //here an option attribute is created element ->> <option></option>
    let newOpt = document.createElement("option") 
    //example ->> a=0,code=IN,option attribute is created , option = code,
    newOpt.innerText = code;
    newOpt.value = code;

    if(select.name === "from" && code === "USD")
    {
        newOpt.selected = "selected"
    }

    else if(select.name === "to" && code === "INR")
    {
        newOpt.selected = "selected"
    }
    select.append(newOpt)



}
select.addEventListener("change",(ele)=>{
    updateFlag(ele.target); //target is used to check where the change has taken place
})
}

//here ele gives the element on which change has occurred ->> <select></select>
const updateFlag = (ele)=>{
    let currCode = ele.value //we will get currency code here ->> INR,USD,AUD
    let countryCode = countryList[currCode] // using country code we can get 
    let imgNew = `https://flagsapi.com/${countryCode}/flat/64.png` //here we added our country code
    let img = ele.parentElement.querySelector("img") //to change img go to the parent of select ->>tells the location of image
    img.src = imgNew


    
}

btn.addEventListener("click", async (ele)=>{
    let amt = document.querySelector(".amount input")
    let amtVal = amt.value;
    if(amtVal === ""||amtVal<0)
    {
        amtVal == 1;
        amt.value = "1"
    }

    //console.log(fromCurr.value,toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    console.log(rate)

    let amountNew = rate * amtVal;
    console.log(amountNew)

    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${amountNew} ${toCurr.value}`

})





  

   


