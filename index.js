const http = require('node:http');
const fs = require('fs');
const express = require("express");
const app = express();

const PORT = 8080;

const handleError = function sendBackErrorPage(req, res) {
    res.sendFile("src/404.html", {root: __dirname}, function (err) {
        if (err) {
            console.log("Can't find error file!");
        } else {
            return;
        }
    });
}

app.get("/", (req, res) => {
    res.sendFile("src/index.html", {root: __dirname}, function (err) {
        if (err) {
            handleError(req, res);
        } else {
            return;
        }
    })
});

app.get("/:name", (req, res) => {
    const newURL = req.url.slice(1);
    res.sendFile(`src/${newURL}.html`, {root: __dirname}, function (err) {     
        if (err) {
            handleError(req, res);
        } else {
            return;
        }
    })
});

app.use(handleError);

app.listen(PORT);
