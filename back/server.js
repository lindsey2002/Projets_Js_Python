
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Serveur OK");
});

app.listen(PORT, () => {
    console.log("Serveur lancé sur http://localhost:" + PORT);
});
