const SERVER_URL = "http://192.168.1.91:5000";


let items = JSON.parse(localStorage.getItem("robloxItems")) || [

{
    id:97911105474335,
    nom:"Red Sparkle Squid",
    achat:335,
    prix:335
},

{
    id:97461784744442,
    nom:"Christmas Gingerbread Valkyrie",
    achat:800,
    prix:800
}

];



function save(){

    localStorage.setItem(
        "robloxItems",
        JSON.stringify(items)
    );

}




function showPage(page){

    document.querySelectorAll(".page")
    .forEach(p=>{

        p.classList.add("hidden");

    });


    document.getElementById(page)
    .classList.remove("hidden");

}




async function refreshPrices(){


    document.getElementById("status").innerHTML =
    "🔄 Mise à jour des prix...";



    for(let item of items){


        try{


            let response = await fetch(
                `${SERVER_URL}/rap/${item.id}`
            );



            let data = await response.json();



            if(data.success && data.rap > 0){


                item.prix = data.rap;


            }



        }

        catch(error){


            console.log(
                "Erreur RAP :",
                error
            );


        }


    }



    save();

    display();



    document.getElementById("status").innerHTML =
    "✅ Prix actualisés";


}






function display(){


    let list =
    document.getElementById("itemsList");


    list.innerHTML="";



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
        ${item.prix} Robux
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






function addItem(){


    let id =
    Number(document.getElementById("itemId").value);



    let name =
    document.getElementById("itemName").value;



    let buy =
    Number(document.getElementById("buyPrice").value);




    items.push({

        id:id,

        nom:
        name || "Limited Roblox",

        achat:buy,

        prix:buy

    });



    save();

    display();



    alert("Limited ajouté ✅");


}






function changeBuy(index){


    let newPrice =
    prompt(
        "Nouveau prix d'achat :",
        items[index].achat
    );



    if(newPrice){


        items[index].achat =
        Number(newPrice);



        save();

        display();


    }


}






function checkAlerts(){


    let box =
    document.getElementById("alerts");



    let messages=[];



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