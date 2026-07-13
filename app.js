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
    .forEach(p=>{

        p.classList.add("hidden");

    });


    document
    .getElementById(page)
    .classList.remove("hidden");

}





async function refreshPrices(){


    document.getElementById("status").innerHTML =
    "🔄 Mise à jour...";



    for(let item of items){


        try{


            let response = await fetch(
                `${SERVER_URL}/item/${item.id}`
            );


            let data = await response.json();



            if(data.success){


                item.nom = data.name;

                item.rap = data.rap;

                item.value = data.value;

                item.prix = data.value || data.rap;


            }



        }

        catch(error){


            console.log(error);


        }


    }



    save();

    display();



    document.getElementById("status").innerHTML =
    "✅ Mise à jour terminée";


}








function display(){


    let list =
    document.getElementById("itemsList");


    list.innerHTML = "";



    let total = 0;

    let profitTotal = 0;



    items.forEach((item,index)=>{


        let profit =
        item.prix - item.achat;



        total += item.prix;

        profitTotal += profit;



        let color =
        profit >= 0
        ?
        "profit"
        :
        "loss";




        list.innerHTML += `


        <div class="card">


        <h3>
        ${item.nom}
        </h3>



        <p>
        ID : ${item.id}
        </p>



        <p>
        Achat :
        ${item.achat} Robux
        </p>



        <p>
        RAP :
        ${item.rap || 0} Robux
        </p>



        <p>
        Value :
        ${item.value || 0} Robux
        </p>



        <p>
        Profit :

        <span class="${color}">
        ${profit} Robux
        </span>

        </p>



        <button onclick="changeBuy(${index})">

        ✏️ Modifier achat

        </button>



        </div>


        `;


    });




    document.getElementById("totalValue")
    .innerHTML =
    total+" Robux";



    document.getElementById("totalProfit")
    .innerHTML =
    profitTotal+" Robux";



    document.getElementById("totalItems")
    .innerHTML =
    items.length;



    checkAlerts();



}









async function addItem(){



    let id =
    document.getElementById("itemId").value;



    let name =
    document.getElementById("itemName").value
    ||
    "Limited Roblox";



    let buy =
    Number(
        document.getElementById("buyPrice").value
    );



    if(!id || !buy){


        alert("Mets un ID et un prix d'achat");

        return;


    }



    let newItem = {


        id:id,

        nom:name,

        achat:buy,

        prix:buy,

        rap:0,

        value:0


    };



    items.push(newItem);



    save();


    await refreshPrices();


    alert("Limited ajouté ✅");


}









function changeBuy(index){



    let price = prompt(

        "Nouveau prix d'achat :",

        items[index].achat

    );



    if(price){


        items[index].achat =
        Number(price);



        save();

        display();


    }



}










function checkAlerts(){



    let box =
    document.getElementById("alerts");



    let messages = [];



    items.forEach(item=>{


        let profit =
        item.prix - item.achat;



        if(profit >= 20){



            messages.push(

            "🔔 "
            +
            item.nom
            +
            " +"
            +
            profit
            +
            " Robux"

            );


            playSound();


        }



    });



    box.innerHTML =

    messages.length

    ?

    messages.join("<br>")

    :

    "Aucune alerte";



}








function playSound(){



    let sound =
    document.getElementById("alertSound");



    if(sound){


        sound.play()
        .catch(()=>{});


    }



}






setInterval(()=>{


    refreshPrices();


},300000);





display();