# ⚡ SendGrid Quick Setup Checklist

## Follow These Steps in Order (Takes 20 minutes total)

### ✅ Step 1: Create SendGrid Account (5 min)
- [ ] Go to https://sendgrid.com
- [ ] Click "Start Free"
- [ ] Sign up with email and password
- [ ] Verify email in inbox
- [ ] Log back into SendGrid

### ✅ Step 2: Get API Key (3 min)
- [ ] In SendGrid dashboard, click "Settings" → "API Keys"
- [ ] Click "Create API Key"
- [ ] Name it: `LowveldHub Newsletter`
- [ ] Select "Restricted Access"
- [ ] Enable: "Mail Send (Full Access)"
- [ ] Click "Create & Copy"
- [ ] **SAVE THIS KEY** - Looks like: `SG.xxxxxxxxxxxxx`

### ✅ Step 3: Update .env File (2 min)

**Location:** `backend/.env`

**Add these lines:**
```env
SENDGRID_API_KEY=SG.paste_your_key_here
SENDGRID_FROM_EMAIL=noreply@lowveldhub.co.za
SENDGRID_ADMIN_EMAIL=info@lowveldhub.co.za
```

**Full example .env:**
```env
# SendGrid
SENDGRID_API_KEY=SG.abc123def456ghi789jkl
SENDGRID_FROM_EMAIL=noreply@lowveldhub.co.za
SENDGRID_ADMIN_EMAIL=info@lowveldhub.co.za

# Database
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key
```

- [ ] Save the file (Ctrl+S)

### ✅ Step 4: Install SendGrid Package (2 min)

**Open PowerShell and run:**
```powershell
cd backend
npm install @sendgrid/mail
```

**Wait for:** `added X packages` message

### ✅ Step 5: Rebuild & Start Backend (3 min)

**Run in PowerShell:**
```powershell
cd backend
npm run build
node dist/server.js
```

**You should see:**
```
✅ Backend listening on port 5000
✅ Database connected (or similar)
```

- [ ] Backend is running

### ✅ Step 6: Test Newsletter (5 min)

1. [ ] Open http://localhost:3000 in browser
2. [ ] Scroll to footer
3. [ ] Find "Stay Updated" section
4. [ ] Enter test email: `your.test@gmail.com`
5. [ ] Click "Join"
6. [ ] Wait 3 seconds

### ✅ Step 7: Check Emails

**Check your email inbox for TWO emails:**

1. [ ] **Email 1 (To you):**
   - From: noreply@lowveldhub.co.za
   - Subject: Welcome to LowveldHub Newsletter! 🎉
   - Content: Welcome message + what to expect

2. [ ] **Email 2 (To info@lowveldhub.co.za):**
   - From: noreply@lowveldhub.co.za
   - Subject: New Newsletter Subscriber: your.test@gmail.com
   - Content: Subscriber details + admin info

---

## ✨ You're Done!

If both emails arrived:
- ✅ Newsletter system is WORKING
- ✅ All future signups go to info@lowveldhub.co.za
- ✅ Users get welcome emails automatically

---

## 🔧 Quick Troubleshooting

### No emails received?
1. Check spam/promotions folder
2. Verify .env file has correct API key (no spaces)
3. Check backend console for red errors
4. Make sure backend says "listening on port 5000"

### "Cannot find module @sendgrid/mail"?
```powershell
cd backend
npm install @sendgrid/mail
npm run build
node dist/server.js
```

### "SENDGRID_API_KEY is undefined"?
1. Verify .env file exists in backend/ folder
2. Check API key line: `SENDGRID_API_KEY=SG.xxxxx` (no spaces around =)
3. Save file
4. Restart backend completely

### Still not working?
Check backend console output (should show errors in red). Copy the error message and we'll debug it.

---

## 📧 What Happens Now

Every time someone enters their email in the newsletter:
1. Email validated on frontend ✅
2. Sent to backend API ✅
3. Stored in database ✅
4. Welcome email sent to them ✅
5. Admin notification sent to info@lowveldhub.co.za ✅

---

## 🎉 Next Steps

### Track Your Subscribers
- Log into SendGrid: https://sendgrid.com
- Dashboard → See all email activity
- View: Opens, clicks, bounces, delivery status

### Send Bulk Campaigns
Once you have 10+ subscribers:
1. SendGrid dashboard → "Marketing"
2. Create newsletter campaign
3. Send to all subscribers
4. Track who opened/clicked

### FAQ

**Q: Can I change the sender email?**
A: Yes! Update `SENDGRID_FROM_EMAIL` in .env (must be verified in SendGrid first)

**Q: Can I change the admin notification email?**
A: Yes! Update `SENDGRID_ADMIN_EMAIL` in .env and restart backend

**Q: What if someone enters their email twice?**
A: Database automatically prevents duplicates. Second signup updates timestamp only.

**Q: Can I export subscriber list?**
A: Yes! Log into SendGrid and export from Contacts section, or query the database.

**Q: How many emails can I send per day?**
A: Free tier: 100/day. Paid tier: Up to 500,000/day depending on plan.

---

## ✅ Ready to Test?

1. Finish steps 1-5 above
2. Open http://localhost:3000
3. Test the newsletter form
4. Check your email inbox
5. Celebrate! 🎉

**Need help? Check backend console for errors (red text) and let me know what it says.**
