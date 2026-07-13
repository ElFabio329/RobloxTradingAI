const SERVER_URL = "https://robloxtradingai.onrender.com";


let items = JSON.parse(
    localStorage.getItem("robloxItems")
) || [];



function save(){

    localStorage.setItem(
        "robloxItems",
        JSON.stringify(items)
    );

}




function showPage(page){

    document
    .querySelectorAll(".page")
    .forEach(p => {
        p.classList.add("hidden");
    });


    document
    .getElementById(page)
    .classList.remove("hidden");

}






async function refreshPrices(){


    const status =
    document.getElementById("status");


    if(status)
    status.innerHTML =
    "🔄 Mise à jour...";




    for(let item of items){


        try{


            let response = await fetch(

                SERVER_URL +
                "/item/" +
                item.id +
                "?nocache=" +
                Date.now()

            );



            let data =
            await response.json();



            console.log(
                "Réponse API :",
                data
            );



            if(data.success){



                item.nom =
                data.name;



                item.rap =
                Number(data.rap);



                item.value =
                Number(data.value);



                item.conseil =
                data.advice;



            }



        }

        catch(error){


            console.log(
                "Erreur API :",
                error
            );


        }


    }



    save();

    display();



    if(status)
    status.innerHTML =
    "✅ Prix actualisés";


}









function display(){


    let list =
    document.getElementById("itemsList");



    if(!list)
    return;



    list.innerHTML = "";



    let totalValue = 0;

    let totalProfit = 0;



    items.forEach(
    (item,index)=>{


        let value =
        Number(item.value) || 0;



        let rap =
        Number(item.rap) || 0;



        let achat =
        Number(item.achat) || 0;



        let profit =
        value - achat;



        let percent =
        achat > 0
        ?
        ((profit / achat) * 100)
        .toFixed(1)
        :
        0;



        totalValue += value;

        totalProfit += profit;




        list.innerHTML += `


<div class="card">


<h3>
🎩 ${item.nom}
</h3>


<p>
🆔 ID :
${item.id}
</p>


<p>
💸 Achat :
${achat} Robux
</p>


<p>
📈 RAP :
${rap} Robux
</p>


<p>
💎 Value :
${value} Robux
</p>


<p>
💰 Profit :
${profit} Robux
(${percent}%)
</p>


<p>
🤖 Conseil :
${item.conseil || "Analyse en cours"}
</p>



<button onclick="changeBuy(${index})">
✏️ Modifier achat
</button>


</div>


`;



    });



    let total =
    document.getElementById("totalValue");


    if(total)
    total.innerHTML =
    totalValue + " Robux";



    let profit =
    document.getElementById("totalProfit");


    if(profit)
    profit.innerHTML =
    totalProfit + " Robux";



    let count =
    document.getElementById("totalItems");


    if(count)
    count.innerHTML =
    items.length;



}









async function addItem(){


    let id =
    document
    .getElementById("itemId")
    .value;



    let achat =
    Number(
    document
    .getElementById("buyPrice")
    .value
    );



    if(!id || !achat){


        alert(
        "Ajoute un ID et un prix d'achat"
        );


        return;

    }




    items.push({

        id:id,

        nom:"Chargement...",

        achat:achat,

        rap:0,

        value:0,

        conseil:""

    });



    save();



    await refreshPrices();



    alert(
    "Limited ajouté ✅"
    );



}







function changeBuy(index){


    let prix =
    prompt(
    "Nouveau prix d'achat :",
    items[index].achat
    );



    if(prix){


        items[index].achat =
        Number(prix);



        save();

        display();


    }


}







setInterval(
()=>{

    refreshPrices();

},
300000
);





display();