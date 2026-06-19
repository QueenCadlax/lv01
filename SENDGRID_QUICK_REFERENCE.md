# ⚡ SendGrid Setup - Quick Reference Card

## 📌 Print This or Screenshot It!

---

## THE 5 COMMANDS YOU NEED

### Command 1: Go to SendGrid
```
https://sendgrid.com → Sign up → Verify email
```

### Command 2: Get API Key
```
Settings → API Keys → Create API Key
Name: LowveldHub Newsletter
Select: Restricted Access + Mail Send
Click: Create & Copy
Save it!
```

### Command 3: Update .env (backend/.env)
```env
SENDGRID_API_KEY=SG.your_key_here
SENDGRID_FROM_EMAIL=noreply@lowveldhub.co.za
SENDGRID_ADMIN_EMAIL=info@lowveldhub.co.za
```

### Command 4: Install Package
```powershell
cd backend
npm install @sendgrid/mail
```

### Command 5: Start Backend
```powershell
npm run build
node dist/server.js
```

---

## THE TEST

1. Go to: http://localhost:3000
2. Scroll to footer
3. Find: "Stay Updated"
4. Enter: Your email
5. Click: "Join"
6. Check: Your inbox for 2 emails ✅

---

## WHAT YOU'LL RECEIVE

| Email | To | From | Subject |
|-------|----|----|---------|
| **#1** | your@email.com | noreply@lowveldhub.co.za | Welcome to LowveldHub Newsletter! 🎉 |
| **#2** | info@lowveldhub.co.za | noreply@lowveldhub.co.za | New Newsletter Subscriber: your@email.com |

---

## IF SOMETHING BREAKS

| Problem | Fix |
|---------|-----|
| No emails | Check SPAM folder |
| Can't find module | `cd backend && npm install @sendgrid/mail` |
| .env undefined | Check: `SENDGRID_API_KEY=SG.xxx` (no spaces!) |
| Backend won't start | Run `npm run build` first |

---

## FILES YOU NEED

| File | Why |
|------|-----|
| backend/.env | Config file (create if missing) |
| backend/src/routes/newsletterRoutes.ts | Already updated ✅ |
| App.tsx | Already works ✅ |

---

## TIMELINE

| Step | Time |
|------|------|
| Create SendGrid account | 5 min |
| Get API key | 3 min |
| Update .env | 2 min |
| npm install | 2 min |
| Build & run backend | 3 min |
| Test | 5 min |
| **TOTAL** | **20 min** |

---

## SUCCESS INDICATORS

✅ Backend shows: "listening on port 5000"
✅ Form submission works
✅ You receive welcome email
✅ Admin receives notification email

---

## KEY .env VALUES

```env
# Copy your SendGrid API key here (full key including "SG." prefix)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Sender email (no need to verify, SendGrid handles it)
SENDGRID_FROM_EMAIL=noreply@lowveldhub.co.za

# Admin notification email (where you get notified)
SENDGRID_ADMIN_EMAIL=info@lowveldhub.co.za
```

---

## HELPFUL LINKS

- SendGrid: https://sendgrid.com
- LowveldHub Frontend: http://localhost:3000
- Backend Health Check: http://localhost:5000/health

---

## QUICK LINKS TO FULL GUIDES

1. **Visual 7 Steps:** `SENDGRID_VISUAL_7_STEPS.md`
2. **Quick Checklist:** `SENDGRID_QUICK_CHECKLIST.md`
3. **Setup Instructions:** `SENDGRID_SETUP_INSTRUCTIONS.md`
4. **Code Changes:** `SENDGRID_CODE_CHANGES.md`
5. **Setup Complete:** `SENDGRID_COMPLETE_SETUP.md`
6. **Email Flow Diagrams:** `NEWSLETTER_EMAIL_VISUAL_FLOW.md`

---

## MOST COMMON MISTAKES

❌ **Don't:** Use spaces in .env (`SENDGRID_API_KEY = xxx`)
✅ **Do:** Use no spaces (`SENDGRID_API_KEY=xxx`)

❌ **Don't:** Forget to save .env file
✅ **Do:** Ctrl+S after editing

❌ **Don't:** Skip `npm run build`
✅ **Do:** Always build before running `node dist/server.js`

❌ **Don't:** Check inbox immediately
✅ **Do:** Wait 5-10 seconds for emails

---

## VERIFICATION

After setup, run this to verify everything:

```powershell
# Check backend is running
curl http://localhost:5000/health

# Should return:
# {"status":"ok","timestamp":"..."}

# ✅ If you see this, you're good!
```

---

## WHAT HAPPENS BEHIND THE SCENES

```
User → Email form → API call → Backend processes
→ Validate email → Store in DB → Send via SendGrid
→ 2 emails sent → User gets welcome → Admin gets notification
→ ✅ Success!
```

---

## EMAIL EXAMPLES

### User Email
```
Subject: Welcome to LowveldHub Newsletter! 🎉

Hi there! 👋

Thank you for subscribing to the LowveldHub newsletter!

You'll now receive updates about:
• New premium listings in Mpumalanga
• Featured business spotlights
• Exclusive opportunities
• LowveldHub updates and news

Best regards,
The LowveldHub Team ✨
```

### Admin Email
```
Subject: New Newsletter Subscriber: user@example.com

🎉 New Subscriber Alert

Email: user@example.com
Date: May 12, 2026, 2:45 PM
Subscriber ID: 1

Total Subscribers: 1
```

---

## NEXT STEPS AFTER SETUP

1. **Monitor:** Log into SendGrid dashboard
2. **Track:** See email opens, clicks, bounces
3. **Export:** Download subscriber list anytime
4. **Campaign:** Send bulk newsletters to all subscribers
5. **Upgrade:** If you need > 100/day, add paid plan

---

## SHORTCUT: COPY-PASTE THIS

### For PowerShell:
```powershell
cd backend
npm install @sendgrid/mail
npm run build
node dist/server.js
```

### For .env File:
```env
SENDGRID_API_KEY=SG.your_full_key_here
SENDGRID_FROM_EMAIL=noreply@lowveldhub.co.za
SENDGRID_ADMIN_EMAIL=info@lowveldhub.co.za
```

---

## ONE PAGE SUMMARY

1. ✅ Create SendGrid account
2. ✅ Get API key (copy it)
3. ✅ Update backend/.env with 3 lines
4. ✅ Run: `cd backend && npm install @sendgrid/mail`
5. ✅ Run: `npm run build && node dist/server.js`
6. ✅ Test at http://localhost:3000
7. ✅ Check inbox for 2 emails
8. ✅ Done! 🎉

---

## COST & LIMITS

- **Cost:** FREE
- **Daily limit:** 100 emails/day
- **Upgrade:** $14/month for 10,000/day
- **Perfect for:** Starting out

---

## SUCCESS!

When you see both emails in your inbox:
🎉 🎉 🎉 YOUR NEWSLETTER IS LIVE! 🎉 🎉 🎉

**Bestie, you did it!** 📧✨

---

**Stuck? Check the full guides or message me!** 💪
