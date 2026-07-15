const SERVER_URL = "https://robloxtradingai.onrender.com";


let items = JSON.parse(
    localStorage.getItem("robloxItems")
) || [

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




function showPage(page){


    document
    .querySelectorAll(".page")
    .forEach(section=>{

        section.classList.add("hidden");

    });



    let target =
    document.getElementById(page);



    if(target){

        target.classList.remove("hidden");

    }

}





function money(value){

    return Number(value || 0)
    .toLocaleString("fr-FR")
    + " Robux";

}




function calculateProfit(item){


    return Number(item.value || 0)
    -
    Number(item.achat || 0);

}




function getAdvice(item){


    let profit =
    calculateProfit(item);



    if(item.value === 0){

        return "⏳ Analyse en cours";

    }



    if(profit >= 50){

        return "🟢 Possible revente";

    }



    if(item.value < item.achat){

        return "🔴 Perte actuelle";

    }



    return "🟡 Surveiller";

}
function display(){


    const list =
    document.getElementById("itemsList");


    if(!list) return;



    list.innerHTML = "";



    let totalValue = 0;

    let totalProfit = 0;



    items.forEach((item,index)=>{


        let rap =
        Number(item.rap || 0);


        let value =
        Number(item.value || 0);


        let achat =
        Number(item.achat || 0);



        let profit =
        calculateProfit(item);



        totalValue += value;

        totalProfit += profit;



        list.innerHTML += `

        <div class="box">


            <h3>
            🎩 ${item.nom}
            </h3>


            <p>
            🆔 ID : ${item.id}
            </p>


            <p>
            💸 Achat : ${money(achat)}
            </p>


            <p>
            📈 RAP : ${money(rap)}
            </p>


            <p>
            💎 Value : ${money(value)}
            </p>


            <p>
            💰 Profit : ${money(profit)}
            </p>


            <p>
            🤖 ${item.conseil || getAdvice(item)}
            </p>



            <button onclick="changeBuy(${index})">
            ✏️ Modifier achat
            </button>


            <button onclick="deleteItem(${index})">
            🗑 Supprimer
            </button>


        </div>

        `;


    });



    let valueBox =
    document.getElementById("totalValue");


    if(valueBox){

        valueBox.innerHTML =
        money(totalValue);

    }



    let profitBox =
    document.getElementById("totalProfit");


    if(profitBox){

        profitBox.innerHTML =
        money(totalProfit);

    }



    let countBox =
    document.getElementById("totalItems");


    if(countBox){

        countBox.innerHTML =
        items.length;

    }



    updateAlerts();

}





function updateAlerts(){


    let alerts =
    document.getElementById("alerts");



    if(!alerts) return;



    let list = [];



    items.forEach(item=>{


        let profit =
        calculateProfit(item);



        if(profit > 0){


            list.push(
                "🟢 "
                +
                item.nom
                +
                " +"
                +
                profit
                +
                " Robux"
            );


        }


    });



    alerts.innerHTML =
    list.length
    ?
    list.join("<br>")
    :
    "Aucune alerte";

}





function changeBuy(index){


    let price =
    prompt(
        "Nouveau prix d'achat :",
        items[index].achat
    );



    if(price !== null){


        items[index].achat =
        Number(price);


        save();

        display();

    }

}




function deleteItem(index){


    if(confirm("Supprimer ce Limited ?")){


        items.splice(index,1);


        save();

        display();

    }

}
async function addItem(){


    let id =
    document.getElementById("itemId").value;


    let name =
    document.getElementById("itemName").value;


    let buy =
    Number(
        document.getElementById("buyPrice").value
    );



    if(!id || !buy){

        alert("Ajoute un ID et un prix d'achat");

        return;

    }



    items.push({

        id:id,

        nom:name || "Limited Roblox",

        achat:buy,

        rap:0,

        value:0,

        conseil:"⏳ Analyse en cours"

    });



    save();

    display();


    await refreshPrices();

}







async function refreshPrices(){


    let status =
    document.getElementById("status");


    if(status){

        status.innerHTML =
        "🔄 Analyse des Limiteds...";

    }



    for(let item of items){


        try{


            let response =
            await fetch(

                SERVER_URL +
                "/item/" +
                item.id +
                "?time=" +
                Date.now()

            );



            let data =
            await response.json();



            console.log(
                "API ROBLOX AI :",
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



    if(status){

        status.innerHTML =
        "✅ Prix actualisés";

    }


}






document
.querySelectorAll("nav button")
.forEach(button=>{


    button.addEventListener(
        "click",
        ()=>{


            showPage(
                button.dataset.page
            );


        }
    );


});






let refreshButton =
document.getElementById(
    "refreshButton"
);



if(refreshButton){

    refreshButton.onclick =
    refreshPrices;

}




let addButton =
document.getElementById(
    "addButton"
);



if(addButton){

    addButton.onclick =
    addItem;

}






display();