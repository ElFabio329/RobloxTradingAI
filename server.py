from flask import Flask, jsonify
import os
import time

app = Flask(__name__)


print("✅ Roblox Trading AI Server lancé")


# Cache 5 minutes
cache = {}

CACHE_DURATION = 300



# Base prête à recevoir les vraies données
# Format :
# ID Roblox : infos Limited

limiteds = {

}



@app.route("/")
def home():

    return jsonify({

        "success": True,
        "status": "online",
        "message": "Roblox Trading AI Server"

    })





@app.route("/item/<item_id>")
def get_item(item_id):


    now = time.time()


    # Cache
    if item_id in cache:

        if now - cache[item_id]["time"] < CACHE_DURATION:

            return jsonify(cache[item_id]["data"])




    # Recherche

    if item_id not in limiteds:


        return jsonify({

            "success": False,

            "error": "Limited non trouvé"

        })




    item = limiteds[item_id]



    result = {

        "success": True,

        "id": item_id,

        "name": item["name"],

        "rap": item["rap"],

        "value": item["value"],

        "updated": now

    }




    cache[item_id] = {

        "time": now,

        "data": result

    }



    return jsonify(result)





@app.route("/search/<name>")
def search(name):


    results = []


    for item_id, item in limiteds.items():

        if name.lower() in item["name"].lower():

            results.append({

                "id": item_id,

                "name": item["name"],

                "rap": item["rap"],

                "value": item["value"]

            })



    return jsonify({

        "success": True,

        "results": results

    })







if __name__ == "__main__":


    port = int(os.environ.get("PORT",10000))


    app.run(

        host="0.0.0.0",

        port=port

    )