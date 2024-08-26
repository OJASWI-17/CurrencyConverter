
const BASE_URL ="https://v6.exchangerate-api.com/v6/0d59d413c2b299aa9042cf9b/latest";
const btn=document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr =document.querySelector(".from select");
const toCurr  =document.querySelector(".to select");
const msg = document.querySelector(".msg");


 

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value =currCode;
        if(select.name ==="from" && currCode ==='USD'){
            newOption.selected =true;
        }
        else if(select.name ==="to" && currCode ==='INR'){
            newOption.selected =true;
        }
        select.append(newOption);

    } 
    select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
    });  
}
const updateFlag = (element) =>{
    let currCode=element.value;
    let countryCode =  countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount  = document.querySelector(".amount input");
    let amtVal= amount.value;
    console.log(amtVal);
    if(amtVal ==="" || amtVal <1 ){
        amtVal =1;
        amount.value ="1";
    }
    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;
    const URL = `${BASE_URL}/${fromCurrency}`;

    try {
        let response = await fetch(URL);
        if (!response.ok) { 
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        let data = await response.json();
        let rate = data.conversion_rates[toCurrency];
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
    } catch (error) {
        msg.innerText = `Error: ${error.message}`;
    }
});





