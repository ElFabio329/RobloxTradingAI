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
    .forEach(p => p.classList.add("hidden"));

    document.getElementById(page)
    .classList.remove("hidden");

}




async function refreshPrices(){


    document.getElementById("status").innerHTML =
    "🔄 Connexion serveur...";


    for(let item of items){


        console.log(
            "Envoi ID :",
            item.id
        );


        try{


            let response = await fetch(
                `${SERVER_URL}/item/${item.id}`
            );


            console.log(
                "Status HTTP :",
                response.status
            );


            let data =
            await response.json();



            console.log(
                "Réponse complète :",
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



                console.log(
                    "Sauvegarde :",
                    item.rap,
                    item.value
                );


            }

        }

        catch(error){


            console.log(
                "ERREUR FETCH :",
                error
            );


        }

    }



    save();


    display();


    document.getElementById("status").innerHTML =
    "✅ Terminé";


}






function display(){


    let list =
    document.getElementById("itemsList");


    list.innerHTML="";



    items.forEach((item,index)=>{


        let rap =
        item.rap ?? "ERREUR";


        let value =
        item.value ?? "ERREUR";



        list.innerHTML += `

<div class="card">

<h3>
${item.nom}
</h3>

<p>ID :
${item.id}
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
💎 VALUE :
${value} Robux
</p>


<p>
🤖 ${item.conseil || "Aucun"}
</p>


<button onclick="changeBuy(${index})">
Modifier achat
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

        rap:0,

        value:0,

        conseil:""

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