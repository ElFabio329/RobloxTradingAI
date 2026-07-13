from flask import Flask, jsonify
import os
import time
import requests


app = Flask(__name__)


print("✅ Roblox Trading AI V3 lancé")


CACHE_TIME = 300

cache = {}





def get_item_data(item_id):

    """
    Ici sera branchée la vraie source Limiteds.
    Pour l'instant on prépare le système.
    """

    # Exemple de réponse attendue :
    #
    # {
    #   name:"",
    #   rap:0,
    #   value:0
    # }


    return None






def analyse(rap, value):


    if value > rap + 50:

        return "🟢 Value haute - possible bon maintien"


    if value < rap:

        return "🔴 Value faible - attention"


    return "🟡 Surveiller"






@app.route("/")
def home():

    return jsonify({

        "success":True,

        "status":"online",

        "message":"Roblox Trading AI V3"

    })







@app.route("/item/<item_id>")
def item(item_id):


    now=time.time()



    if item_id in cache:


        if now-cache[item_id]["time"] < CACHE_TIME:

            return jsonify(cache[item_id]["data"])




    data=get_item_data(item_id)



    if not data:


        return jsonify({

            "success":False,

            "error":"Données indisponibles"

        })





    result={


        "success":True,

        "id":item_id,

        "name":data["name"],

        "rap":data["rap"],

        "value":data["value"],

        "advice":analyse(

            data["rap"],

            data["value"]

        ),

        "updated":now

    }





    cache[item_id]={

        "time":now,

        "data":result

    }




    return jsonify(result)







if __name__=="__main__":


    port=int(os.environ.get("PORT",10000))


    app.run(

        host="0.0.0.0",

        port=port

    )