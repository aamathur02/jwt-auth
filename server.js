import express from "express";
import JSRSASign from "jsrsasign"
import handle_auth from "handle_auth.js"
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Welcome to the auth test server!"));

app.post("/generateJWT", (req, res) =>
    res.json(handle_auth.generateJWT(req.body.header, req.body.claims. req.body.key))
);

app.post("/validateJWT", (req, res) =>
    res.json(handle_auth.validateJWT(req.body.header, req.body.claims. req.body.key))
);

app.post("/decodeJWT", (req, res) =>
    res.json(handle_auth.decodeJWT(req.body.sJWS))
);





app.listen(port, () => console.log("App running on port ${port}"));