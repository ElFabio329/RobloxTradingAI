const SERVER_URL =
"https://robloxtradingai.onrender.com";



let items = [

{
id:"97911105474335",
nom:"Red Sparkle Squid",
achat:300,
rap:0,
value:0,
conseil:""
},

{
id:"97461784744442",
nom:"Christmas Gingerbread Valkyrie",
achat:800,
rap:0,
value:0,
conseil:""
}

];





function save(){

localStorage.setItem(
"robloxItems",
JSON.stringify(items)
);

}





async function refreshPrices(){


document.getElementById("status").innerHTML =
"🔄 Mise à jour...";



for(let item of items){


try{


let response =
await fetch(
SERVER_URL+
"/item/"+
item.id+
"?time="+Date.now()
);



let data =
await response.json();



console.log(
"API :",
data
);



if(data.success){


item.nom=data.name;

item.rap=Number(data.rap);

item.value=Number(data.value);

item.conseil=data.advice;


}


}

catch(error){

console.log(error);

}


}



save();

display();



document.getElementById("status").innerHTML =
"✅ Actualisé";


}








function display(){


let list =
document.getElementById("itemsList");


list.innerHTML="";



let total=0;



items.forEach((item,index)=>{


let profit =
item.value-item.achat;



total+=item.value;



list.innerHTML+=`

<div class="card">

<h3>
🎩 ${item.nom}
</h3>


<p>
ID : ${item.id}
</p>


<p>
💸 Achat :
${item.achat} Robux
</p>


<p>
📈 RAP :
${item.rap} Robux
</p>


<p>
💎 Value :
${item.value} Robux
</p>


<p>
💰 Profit :
${profit} Robux
</p>


<p>
🤖 ${item.conseil}
</p>


<button onclick="changeBuy(${index})">
Modifier achat
</button>


</div>

`;



});



document.getElementById("totalValue")
.innerHTML =
total+" Robux";


document.getElementById("totalItems")
.innerHTML =
items.length;


}





function changeBuy(index){


let p =
prompt(
"Prix achat :",
items[index].achat
);


if(p){

items[index].achat =
Number(p);


save();

display();

}


}





display();