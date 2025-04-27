const express = require('express');
const app = express();
const axios = require('axios');

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
    res.send(messages[key] ? messages[key] : "none")
    delete messages[key];
})

app.get('/out_test/:key', function (req, res) {
    let key = req.params.key;
    res.send(messages[key] ? messages[key] : "none")
})

app.get('/testConfig', function (req, res) {
    let key = req.params.key;
    res.send(
        {
            "cpuEnabled": 1,
            "cpuUpLimit": 45,
            "cpuDownLimit": 40,
            "cpuMaxBusyTime": 100,
            "cpuIdleTime": 10,
            "cpuLogIntervalCount": 100000,
            "memEnabled": 1,
            "memUpLimit": 45,
            "memDownLimit": 40,
            "memAllocSize": 52428800,
            "monitorInterval": 50,
            "monitorLogIntervalCount": 100
          }
    )
})


app.get('/ngUid/en/:phone', async function (req, res) {
    let phone = req.params.phone;
    let params = {
        "text": phone,
        "encode_flag": "utf8",
        "key": "ihx0UE0UyYPY80kn",
        "iv": "",
        "mode": "ECB",
        "padding": "zero",
        "out_mode": "hex"
    };
    // let headers = {
    //     "Host":"www.ssleye.com",
    //     "Origin":"https://www.ssleye.com",
    //     "Referer":"https://www.ssleye.com/ssltool/tdes_cipher.html",
    //     "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    // };
    let headers = { 
        "Accept": "application/json, text/javascript, */*; q=0.01",
     "Accept-Encoding": "gzip, deflate, br, zstd", 
     "Accept-Language": "zh-CN,zh;q=0.9", 
     "Cache-Control": "no-cache", 
     "Connection": "keep-alive", 
    //  "Content-Length": "85", 
     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", 
     "Cookie": "Hm_lvt_34a942241ce2f6c20e8a5dc3069deee3=1713235172; Hm_lpvt_34a942241ce2f6c20e8a5dc3069deee3=1713235189", 
     "DNT": "1", 
     "Host": "www.ssleye.com", 
     "Origin": "https://www.ssleye.com", 
     "Pragma": "no-cache", 
     "Referer": "https://www.ssleye.com/ssltool/tdes_cipher.html", 
     "Sec-Fetch-Dest": "empty", 
     "Sec-Fetch-Mode": "cors", 
     "Sec-Fetch-Site": "same-origin", 
     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36", 
     "X-Requested-With": "XMLHttpRequest", 
     "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
      "sec-ch-ua-mobile": "?0", 
      "sec-ch-ua-platform": "\"Windows\"" }

    try {
        let response = await axios.post(`https://www.ssleye.com/ssltool/3des_encrypt_hander`, params, { headers });
        res.send(response.data.msg);
    }
    catch (ex) {
        res.send(ex)
    }


})




app.listen(9090);

