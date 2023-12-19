const express = require('express');
const app = express();

let messages = {};

app.get('/in', function (req, res) {
    for (const key in req.query) {
        if (Object.hasOwnProperty.call(req.query, key)) {
            const element = req.query[key];
            let time = new Date().getTime();
            messages[key] = element;
        }
    }
    res.send("ok")
})

app.get('/out/:key', function (req, res) {
    let key = req.params.key;
    res.send(messages[key])
})






app.listen(9090);

