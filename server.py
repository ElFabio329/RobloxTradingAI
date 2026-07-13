from flask import Flask, jsonify
import os
import time
import json


app = Flask(__name__)


print("✅ Roblox Trading AI V4 lancé")


CACHE_TIME = 300

cache = {}





def load_database():

    try:

        with open("limiteds.json", "r", encoding="utf-8") as file:

            return json.load(file)

    except Exception as e:

        print("Erreur database :", e)

        return {}






def analyse(rap, value):


    if value >= rap + 50:

        return "🟢 Garder - Value intéressante"


    elif value < rap:

        return "🔴 Attention - Value basse"


    else:

        return "🟡 Surveiller"








@app.route("/")
def home():

    return jsonify({

        "success": True,

        "status": "online",

        "message": "Roblox Trading AI V4"

    })








@app.route("/item/<item_id>")
def get_item(item_id):


    now = time.time()



    if item_id in cache:


        if now - cache[item_id]["time"] < CACHE_TIME:

            return jsonify(cache[item_id]["data"])




    database = load_database()



    if item_id not in database:


        return jsonify({

            "success": False,

            "error": "Limited non trouvé"

        })





    item = database[item_id]



    result = {


        "success": True,

        "id": item_id,

        "name": item["name"],

        "rap": item["rap"],

        "value": item["value"],

        "resell": item["value"],

        "advice": analyse(

            item["rap"],

            item["value"]

        ),

        "updated": now

    }





    cache[item_id] = {

        "time": now,

        "data": result

    }




    return jsonify(result)







@app.route("/search/<text>")
def search(text):


    database = load_database()


    results = []



    for item_id,item in database.items():


        if text.lower() in item["name"].lower():

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