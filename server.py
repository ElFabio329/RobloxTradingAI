from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "Roblox Trading AI Server"
    })

@app.route("/item/<int:item_id>")
def get_item(item_id):
    # À remplacer plus tard par une vraie source de données
    fake_database = {
        97911105474335: {
            "name": "Red Sparkle Squid",
            "rap": 335,
            "value": 350
        },
        97461784744442: {
            "name": "Christmas Gingerbread Valkyrie",
            "rap": 800,
            "value": 825
        }
    }

    if item_id not in fake_database:
        return jsonify({
            "success": False,
            "error": "Item introuvable"
        }), 404

    item = fake_database[item_id]

    return jsonify({
        "success": True,
        "id": item_id,
        "name": item["name"],
        "rap": item["rap"],
        "value": item["value"]
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)