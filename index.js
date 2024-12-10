const http = require('node:http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    const newURL = req.url.slice(1);
    if (newURL === "") {
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
    } else {
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
    } 
}).listen(8080);
