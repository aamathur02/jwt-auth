const express = require("express");
const morgan = require("morgan");
const { generateJWT, decodeJWT, validateJWT } = require("./handle_auth.js");
const app = express();
const port = process.env.Port || 3000;
app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to the auth test server!"));

app.post("/api/generateJWT", (req, res) => {
    let {header, claims, key} = req.body;
    key = key || "&Aayush-auth-app";
    res.json(generateJWT(header, claims, key));
});

app.post("/api/validateJWT", (req, res) => {
    let {header, token, key} = req.body;
    key = key || "&Aayush-auth-app";
    res.json(validateJWT(header, token, key));
});

app.post("/api/decodeJWT", (req, res) =>
    res.json(decodeJWT(req.body.sJWS))
);


app.listen(port, () => console.log("App running on port ${port}"));