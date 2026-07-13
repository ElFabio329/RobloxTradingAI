from flask import Flask, jsonify
import os
import time

app = Flask(__name__)


print("✅ Roblox Trading AI Server lancé")


# Cache (évite de recalculer trop souvent)
cache = {}

CACHE_TIME = 300  # 5 minutes



# Base temporaire
# Sera remplacée par la vraie source Limiteds ensuite

items_database = {

    "97911105474335": {

        "name": "Red Sparkle Squid",

        "rap": 335,

        "value": 350

    },


    "97461784744442": {

        "name": "Christmas Gingerbread Valkyrie",

        "rap": 800,

        "value": 850

    }

}





@app.route("/")
def home():

    return jsonify({

        "status":"online",

        "message":"Roblox Trading AI Server"

    })







@app.route("/item/<item_id>")
def item(item_id):


    now = time.time()



    if item_id in cache:


        if now - cache[item_id]["time"] < CACHE_TIME:

            return jsonify(cache[item_id]["data"])




    if item_id not in items_database:


        return jsonify({

            "success":False,

            "error":"Limited inconnu"

        })





    item = items_database[item_id]



    result = {


        "success":True,

        "id":item_id,

        "name":item["name"],

        "rap":item["rap"],

        "value":item["value"],

        "updated":now


    }




    cache[item_id] = {


        "time":now,

        "data":result

    }




    return jsonify(result)






if __name__ == "__main__":


    port = int(os.environ.get("PORT",10000))


    app.run(

        host="0.0.0.0",

        port=port

    )