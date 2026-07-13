from flask import Flask, jsonify
import os
import time
import json
import requests


app = Flask(__name__)


print("✅ Roblox Trading AI V5 lancé")


CACHE_TIME = 300

cache = {}




def analyse(rap, value):


    if value >= rap * 1.25:
        return "🟢 VENDRE POSSIBLE - Value forte"


    if value <= rap * 0.90:
        return "🔴 ATTENDRE - Value faible"


    return "🟡 GARDER - Surveiller"





def get_live_item(item_id):


    """
    Ici on branche la source de données Limiteds.
    Le format attendu :

    {
      name:"",
      rap:0,
      value:0
    }

    """



    try:


        # emplacement de la future source live


        return None



    except Exception:


        return None







@app.route("/")
def home():

    return jsonify({

        "success":True,

        "status":"online",

        "message":"Roblox Trading AI V5"

    })








@app.route("/item/<item_id>")
def item(item_id):


    now=time.time()



    if item_id in cache:


        if now-cache[item_id]["time"] < CACHE_TIME:

            return jsonify(cache[item_id]["data"])





    data=get_live_item(item_id)



    if data is None:


        return jsonify({

            "success":False,

            "error":"Source live indisponible"

        })





    result={


        "success":True,

        "id":item_id,

        "name":data["name"],

        "rap":data["rap"],

        "value":data["value"],

        "resell":data["value"],

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