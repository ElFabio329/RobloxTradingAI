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

    document.querySelectorAll(".page")
    .forEach(p=>p.classList.add("hidden"));

    document.getElementById(page)
    .classList.remove("hidden");

}





async function refreshPrices(){


    document.getElementById("status").innerHTML =
    "🔄 Mise à jour...";



    for(let item of items){


        try{


            let response = await fetch(
                SERVER_URL +
                "/item/" +
                item.id +
                "?refresh=" +
                Date.now()
            );



            let data =
            await response.json();



            console.log(
                "DONNEES SERVEUR :",
                data
            );



            if(data.success === true){


                item.nom = data.name;

                item.rap = data.rap;

                item.value = data.value;

                item.conseil = data.advice;


            }


        }

        catch(error){


            console.log(
                "ERREUR :",
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



    list.innerHTML = "";



    items.forEach((item,index)=>{



        let rap =
        item.rap !== undefined
        ? item.rap
        : 0;



        let value =
        item.value !== undefined
        ? item.value
        : 0;



        let profit =
        value - item.achat;




        list.innerHTML += `


<div class="card">


<h3>
🎩 ${item.nom}
</h3>


<p>
🆔 ${item.id}
</p>



<p>
💸 Achat :
${item.achat} Robux
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
</p>



<p>
🤖 ${item.conseil || "Pas encore analysé"}
</p>


<button onclick="changeBuy(${index})">
✏️ Modifier achat
</button>


</div>


`;



    });


}








async function addItem(){


    let id =
    document.getElementById("itemId").value;



    let achat =
    Number(
        document.getElementById("buyPrice").value
    );



    items.push({

        id:id,

        nom:"Chargement...",

        achat:achat,

        rap:null,

        value:null,

        conseil:"Analyse..."

    });



    save();


    await refreshPrices();


}







function changeBuy(index){


    let prix =
    prompt(
        "Prix achat :",
        items[index].achat
    );


    if(prix){


        items[index].achat =
        Number(prix);


        save();

        display();

    }


}





display();