<!DOCTYPE html>
<html lang="fr">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Roblox Trading AI</title>

<link rel="stylesheet" href="style.css">

<link rel="manifest" href="manifest.json">

</head>


<body>


<header>

<h1>🤖 Roblox Trading AI</h1>

<p id="status">
Connecté
</p>

<button onclick="refreshPrices()">
🔄 Actualiser les prix
</button>

</header>



<nav>

<button onclick="showPage('home')">
🏠 Accueil
</button>


<button onclick="showPage('items')">
🎩 Limiteds
</button>


<button onclick="showPage('add')">
➕ Ajouter
</button>


<button onclick="showPage('trades')">
🤝 Trades
</button>


</nav>





<section id="home" class="page">


<h2>
📊 Dashboard
</h2>


<div class="dashboard">


<div class="box">

<h3>
💰 Valeur
</h3>

<p id="totalValue">
0 Robux
</p>

</div>



<div class="box">

<h3>
📈 Profit
</h3>

<p id="totalProfit">
0 Robux
</p>

</div>



<div class="box">

<h3>
🎩 Items
</h3>

<p id="totalItems">
0
</p>

</div>



</div>



<h2>
🔔 Alertes
</h2>


<div id="alerts">
Aucune alerte
</div>


</section>







<section id="items" class="page hidden">


<h2>
🎩 Mes Limiteds
</h2>


<div id="itemsList">

</div>


</section>








<section id="add" class="page hidden">


<h2>
➕ Ajouter un Limited
</h2>


<input 
id="itemId"
placeholder="ID Roblox">


<br>


<input 
id="itemName"
placeholder="Nom">


<br>


<input
id="buyPrice"
placeholder="Prix achat">


<br>


<button onclick="addItem()">
Ajouter
</button>


</section>








<section id="trades" class="page hidden">


<h2>
🤝 Trade Calculator
</h2>


<p>
Bientôt disponible 🚀
</p>


</section>







<audio id="alertSound">

<source src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg">

</audio>





<script src="app.js?v=11"></script>


</body>

</html>