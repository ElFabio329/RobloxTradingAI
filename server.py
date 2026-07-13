from flask import Flask, jsonify
from flask_cors import CORS
import json
import os
import time


app = Flask(__name__)

CORS(app)


print("✅ Roblox Trading AI V5 Server lancé")



def load_database():

    try:

        with open(
            "limiteds.json",
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)

    except Exception as e:

        print(e)

        return {}





@app.route("/")
def home():

    return jsonify({

        "success": True,
        "status": "online",
        "message": "Roblox Trading AI V5"

    })






@app.route("/item/<item_id>")
def item(item_id):


    db = load_database()



    if item_id not in db:


        return jsonify({

            "success":False,
            "error":"Limited non trouvé"

        })




    limited = db[item_id]



    rap = int(
        limited.get(
            "rap",
            0
        )
    )



    value = int(
        limited.get(
            "value",
            0
        )
    )



    return jsonify({

        "success":True,

        "id":item_id,

        "name":
        limited.get(
            "name",
            "Unknown"
        ),

        "rap":rap,

        "value":value,

        "resell":value,

        "advice":
        "🟡 Surveiller",

        "updated":
        time.time()

    })






if __name__ == "__main__":


    port=int(
        os.environ.get(
            "PORT",
            10000
        )
    )


    app.run(
        host="0.0.0.0",
        port=port
    )