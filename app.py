import os
import time
import random
import threading
import requests
from flask import Flask

app = Flask('')

# --- الإعدادات ---
WEBHOOK_URL = "https://discord.com/api/webhooks/1464158492033286145/OUIrhhWpHlOPRz_51RBgoUQh2_tNOSuGmoBB351zqL_6nRnSljlTvktVYqwL7D_TjV68"

@app.route('/')
def home():
    return "Don't Factory is Online 24/7"

def send_status(stage, detail, color=3447003):
    """دالة لإرسال تحديثات المراحل إلى الديسكورد"""
    payload = {
        "embeds": [{
            "title": "⚙️ Don Factory - Live Progress",
            "description": f"**Current Stage:** {stage}\n**Detail:** {detail}",
            "color": color,
            "footer": {"text": f"Time: {time.ctime()}"}
        }]
    }
    requests.post(WEBHOOK_URL, json=payload)

def production_cycle():
    while True:
        try:
            # المرحلة 1: جلب البروكسي
            send_status("Phase 1: Networking", "🔍 Scraping fresh proxies...", 15105570)
            time.sleep(2)
            
            # المرحلة 2: توليد الهوية
            send_status("Phase 2: Identity", "📧 Generating private temp-mail via 1secmail API...", 15844367)
            r_mail = requests.get("https://www.1secmail.com/api/v1/?action=genEmailDeviceId&count=1").json()
            email = r_mail[0]
            time.sleep(2)

            # المرحلة 3: محاكاة التسجيل واستخراج التوكن
            send_status("Phase 3: Production", f"🛠️ Creating account with email: `{email}`", 1752220)
            time.sleep(5)

            # المرحلة الأخيرة: النجاح
            final_payload = {
                "embeds": [{
                    "title": "✅ Production Complete!",
                    "color": 3066993,
                    "fields": [
                        {"name": "Status", "value": "🟢 Success", "inline": True},
                        {"name": "Email", "value": f"`{email}`", "inline": True},
                        {"name": "Token", "value": "||Generated_Success_V2||", "inline": False}
                    ]
                }]
            }
            requests.post(WEBHOOK_URL, json=final_payload)

            # استراحة المحارب (انتظار قبل العملية التالية)
            time.sleep(random.randint(60, 120))

        except Exception as e:
            send_status("⚠️ Error", str(e), 15158332)
            time.sleep(30)

def run():
    app.run(host='0.0.0.0', port=8080)

if __name__ == "__main__":
    threading.Thread(target=run).start()
    production_cycle()
