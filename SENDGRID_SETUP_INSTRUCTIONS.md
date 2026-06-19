# 📧 SendGrid Setup - Step by Step

## Step 1: Create SendGrid Account (5 minutes)

### 1a. Sign Up
- Go to: https://sendgrid.com
- Click "Start Free"
- Fill in:
  - Name: Your name
  - Email: Use your Gmail or work email (NOT info@lowveldhub yet)
  - Password: Create strong password
  - Accept terms
- Click "Create Account"

### 1b. Verify Email
- Check your email inbox
- Click verification link from SendGrid
- Done! ✅

---

## Step 2: Get Your API Key (3 minutes)

### 2a. Navigate to API Keys
1. Log into SendGrid dashboard
2. Left sidebar → Click "Settings"
3. Click "API Keys"
4. Click "Create API Key" (blue button, top right)

### 2b. Create & Copy API Key
1. **Name it:** `LowveldHub Newsletter`
2. **Permissions:** Select "Restricted Access"
   - Scroll down and select:
     - ✅ Mail Send (Full Access)
3. Click "Create & Copy" (blue button)
4. **COPY THE KEY** - It looks like:
   ```
   SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. **IMPORTANT:** Paste it somewhere safe (you can only see it once!)

### 2c. If You Missed It
If you didn't copy the key:
1. Go back to API Keys
2. Click the key you just created
3. Click "Copy Key" icon
4. Now you have it

---

## Step 3: Update Your .env File (2 minutes)

### 3a. Open Backend .env File
- Location: `backend/.env`
- If it doesn't exist, create it

### 3b. Add SendGrid Configuration

Add these lines to your `.env` file:

```env
# SendGrid Email Configuration
SENDGRID_API_KEY=SG.your_api_key_here_paste_the_full_key
SENDGRID_FROM_EMAIL=noreply@lowveldhub.co.za
SENDGRID_ADMIN_EMAIL=info@lowveldhub.co.za

# Other existing config
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

**Example (with fake key):**
```env
SENDGRID_API_KEY=SG.aBcDeFgHiJkLmNoPqRsT123456789
SENDGRID_FROM_EMAIL=noreply@lowveldhub.co.za
SENDGRID_ADMIN_EMAIL=info@lowveldhub.co.za
```

### 3c. Save the File
- Press Ctrl+S
- Done! ✅

---

## Step 4: Check Your Backend Route (Already Created)

The backend newsletter route should already exist or we'll create it. Let me verify the setup works by checking the backend installation.

**Backend newsletter route location:**
```
backend/src/routes/newsletterRoutes.ts
```

This file handles:
- Receiving email from frontend
- Validating email format
- Sending via SendGrid
- Sending confirmation to user
- Sending notification to admin

---

## Step 5: Install SendGrid Package (1 minute)

### 5a. Open Terminal in Backend Directory

In your terminal (PowerShell):
```powershell
cd backend
npm install @sendgrid/mail
```

This installs the SendGrid library that your backend needs to send emails.

### 5b. Wait for Installation
- Watch for: `added X packages`
- Done when you see npm prompt again

---

## Step 6: Restart Backend (2 minutes)

### 6a. Stop Current Backend
If backend is running, press `Ctrl+C` to stop it

### 6b. Rebuild Backend
```powershell
cd backend
npm run build
```
Wait for completion (should say "Compiled successfully")

### 6c. Start Backend
```powershell
node dist/server.js
```

You should see:
```
✅ Backend listening on port 5000
✅ Database connected
```

---

## Step 7: Test It Out! (5 minutes)

### 7a. Open Frontend
- Go to: http://localhost:3000
- Scroll to bottom
- Find "Stay Updated" section

### 7b. Enter Test Email
1. Enter your email: `your.name@gmail.com`
2. Click "Join"
3. Wait for response

### 7c. Check Results

**You should receive TWO emails:**

**Email 1: To you (Confirmation)**
```
From: noreply@lowveldhub.co.za
To: your.name@gmail.com
Subject: Welcome to LowveldHub Newsletter! 🎉

Hi there!
Thank you for subscribing to the LowveldHub newsletter!

You'll now receive updates about:
• New premium listings in Mpumalanga
• Featured business spotlights
• Exclusive opportunities
• LowveldHub updates and news

Best regards,
The LowveldHub Team ✨
```

**Email 2: To Admin (Notification)**
```
From: noreply@lowveldhub.co.za
To: info@lowveldhub.co.za
Subject: New Newsletter Subscriber

🎉 New Subscriber Alert

Email: your.name@gmail.com
Date: May 12, 2026, 2:45 PM

Total Subscribers: 1
```

### 7d: Verify Success

✅ **If both emails arrived:**
- Newsletter system is WORKING!
- Celebrate! 🎉
- All emails from now on go to info@lowveldhub.co.za

❌ **If no emails received:**
- Check spam folder
- Check .env has correct API key
- See troubleshooting below

---

## 🔧 Troubleshooting

### Problem: "Invalid API Key"

**Solution:**
1. Go back to SendGrid dashboard
2. Verify your API key is correct
3. Make sure you copied the ENTIRE key (starts with SG.)
4. Update .env file
5. Restart backend

### Problem: "SENDGRID_API_KEY is undefined"

**Solution:**
1. Check .env file exists in `backend/` folder
2. Verify the line has no spaces: `SENDGRID_API_KEY=SG.xxxxx` (not `SENDGRID_API_KEY = SG.xxxxx`)
3. Save .env file
4. Restart backend
5. If still not working: restart terminal window completely

### Problem: No email received after 2 minutes

**Solution:**
1. Check spam/promotions folder
2. Check that test email is valid
3. Check backend console for errors (red text)
4. If error shows: Copy and paste the error message
5. Verify SendGrid account is active (log into sendgrid.com to check)

### Problem: "Error: Module not found @sendgrid/mail"

**Solution:**
```powershell
cd backend
npm install @sendgrid/mail
npm run build
node dist/server.js
```

---

## 📊 What Happens Behind the Scenes

When someone subscribes via the newsletter form:

```
1. User enters email in footer
2. Frontend validates (checks for @)
3. Sends to: POST /api/newsletter/subscribe
4. Backend receives request
5. Backend validates email format again
6. Backend calls SendGrid API
7. SendGrid sends Email #1 (to subscriber)
8. SendGrid sends Email #2 (to info@lowveldhub.co.za)
9. Backend responds with success
10. Frontend shows "Thanks for subscribing!"
```

---

## 📈 Next Steps After Testing

### Monitor Your Subscribers
1. Log into SendGrid: https://sendgrid.com
2. Dashboard → Check email activity
3. See: Opens, clicks, bounces
4. See: Delivery status

### Later: Send Bulk Emails
Once you have several subscribers, you can:
1. Go to SendGrid Dashboard
2. Click "Marketing" → "Automation"
3. Create bulk newsletter campaigns
4. Send to all subscribers at once

### Track Your Stats
- SendGrid shows you:
  - Total emails sent
  - Open rate
  - Click rate
  - Bounce rate
  - Spam complaints

---

## 🎉 You're Done!

**Summary of what just happened:**
- ✅ Created SendGrid account (FREE)
- ✅ Generated API key
- ✅ Updated .env configuration
- ✅ Installed SendGrid package
- ✅ Restarted backend
- ✅ Tested with real email
- ✅ Confirmed emails arriving at info@lowveldhub.co.za

**Your newsletter is now LIVE! 📧✨**

---

## Questions?

**Still having issues?**
1. Check troubleshooting section above
2. Verify .env file has correct API key
3. Make sure backend is running (should see "listening on port 5000")
4. Check backend console for errors (red text)
5. Try sending test email again

**Need to change admin email?**
- Update `SENDGRID_ADMIN_EMAIL` in .env file
- Restart backend
- New admin email receives next notifications

**Want to change from email address?**
- Update `SENDGRID_FROM_EMAIL` in .env file
- NOTE: Must be verified in SendGrid account
- Restart backend
