const http = require('node:http');
const fs = require('fs');
const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    fs.readFile("./src/index.html", (err, data) => {
        if (err) {
            fs.readFile("./src/404.html", (err, data) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }
    })  
});

app.get("/:name", (req, res) => {
    const newURL = req.url.slice(1);
    fs.readFile(`./src/${newURL}.html`, {flag: "r"}, (err, data) => {
                
        if (err) {
            fs.readFile("./src/404.html", (err, data) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }
    })
});

app.listen(PORT);
