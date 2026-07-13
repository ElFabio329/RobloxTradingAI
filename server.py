from flask import Flask, jsonify
import os
import time


app = Flask(__name__)


print("✅ Roblox Trading AI V2 lancé")



# Cache 5 minutes

CACHE_TIME = 300

cache = {}



# Structure des données
# Cette partie sera branchée à la vraie source ensuite

items = {

}



def analyse_item(item):


    rap = item["rap"]

    value = item["value"]


    difference = value - rap



    if difference > 50:

        conseil = "🟢 GARDER - Value supérieure au RAP"


    elif value < rap:

        conseil = "🔴 ATTENTION - Value faible"


    else:

        conseil = "🟡 SURVEILLER"



    return conseil






@app.route("/")
def home():

    return jsonify({

        "success":True,

        "status":"online",

        "message":"Roblox Trading AI V2"

    })







@app.route("/item/<item_id>")
def get_item(item_id):


    now = time.time()



    if item_id in cache:


        if now - cache[item_id]["time"] < CACHE_TIME:

            return jsonify(cache[item_id]["data"])




    if item_id not in items:


        return jsonify({

            "success":False,

            "error":"Limited non trouvé"

        })





    item = items[item_id]



    data = {


        "success":True,

        "id":item_id,

        "name":item["name"],


        "rap":item["rap"],


        "value":item["value"],


        "resell":item["value"],


        "advice":analyse_item(item),


        "updated":now


    }



    cache[item_id]={

        "time":now,

        "data":data

    }




    return jsonify(data)








if __name__ == "__main__":


    port=int(os.environ.get("PORT",10000))


    app.run(

        host="0.0.0.0",

        port=port

    )