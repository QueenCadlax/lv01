# ⚡ COMMAND REFERENCE CARD

## 🚀 Essential Commands

### Start Development
```bash
npm run dev
```
**What it does:** Starts Vite dev server at http://localhost:3000  
**Expected output:** "VITE ... ready in ... ms" + automatic browser open  
**Stop with:** Ctrl+C

---

### Test Mobile View (after `npm run dev` is running)
```
Press F12         → Open DevTools
Press Ctrl+Shift+M → Toggle device view
Select iPhone 12   → Choose 390px viewport
Navigate to:       → Any category (Food, Health, etc.)
Verify:            → See 2 cards per row ✅
```

**Mobile View Shortcuts:**
- Chrome/Edge: `Ctrl+Shift+M` or `F12` → device icon
- Firefox: `Ctrl+Shift+M` or `F12` → responsive icon
- Safari: `Cmd+Option+I` → Develop → Enter Responsive Design Mode

---

### Deploy to Git
```bash
git add .
git commit -m "Mobile optimization: 2-column layout"
git push origin main
```

**What it does:**
1. Stages all changes
2. Creates commit with message
3. Pushes to main branch
4. Triggers deployment (if using GitHub Actions/Vercel/Netlify)

---

## 🔧 Troubleshooting Commands

### Clear Browser Cache & Restart
```bash
# 1. Stop dev server
# Press Ctrl+C

# 2. Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
# Safari: Cmd+Y (history), then Clear All

# 3. Restart dev server
npm run dev

# 4. Hard refresh browser
# Chrome: Ctrl+Shift+R
# Firefox: Ctrl+Shift+R
# Safari: Cmd+Shift+R
```

---

### Check if Port 3000 is Free
```bash
# Windows PowerShell:
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# Then restart:
npm run dev
```

---

### View All Changes You Made
```bash
git diff
```
**Shows:** All CSS changes in red (-) and green (+)

---

### Undo All Changes (Nuclear Option)
```bash
git checkout -- .
```
**Warning:** This deletes ALL your changes! Only use if something is very broken.

---

## 📱 Device Testing Commands

### Get Your Computer's IP (for phone testing)
```bash
# Windows PowerShell:
ipconfig

# Look for: IPv4 Address: 192.168.x.x or 10.0.x.x
# Then visit on phone: http://YOUR_IP:3000
# Example: http://192.168.1.100:3000
```

---

### Test Different Screen Sizes
```bash
# After opening DevTools (F12):

iPhone SE (375px)    → Ctrl+Shift+M → iPhone SE
iPhone 12 (390px)    → Ctrl+Shift+M → iPhone 12
iPhone 14 Pro (393px) → Ctrl+Shift+M → iPhone 14 Pro
iPad (768px)         → Ctrl+Shift+M → iPad
iPad Air (1024px)    → Ctrl+Shift+M → iPad Air
Desktop (1920px)     → Ctrl+Shift+M → Laptop (1920px)
```

---

## 📊 Verify Changes Commands

### Check Specific File Changes
```bash
# View changes in specific file:
git diff SubcategoryPage.tsx
git diff SubcategoryCard.tsx
git diff Shared.tsx
git diff App.tsx
```

---

### Count Lines Changed
```bash
git diff --stat
```
**Output shows:** Files changed and total +/- lines

---

## 🔍 Code Search Commands

### Find All Grid Classes (if needed)
```bash
# Windows PowerShell - find all grid classes:
grep -r "grid-cols" --include="*.tsx" .
```

---

### Find Image Height Classes
```bash
grep -r "h-36\|h-40\|h-44\|h-48\|h-52" --include="*.tsx" .
```

---

## 📈 Monitoring Commands

### Check Build Size (if needed)
```bash
npm run build
```
**What it does:** Creates production build in `dist/` folder  
**Use:** To check bundle size before deployment

---

### View All Commits
```bash
git log --oneline -10
```
**Shows:** Last 10 commits with messages

---

## 🌐 Browser Console Tricks

### Inside Browser DevTools (F12):

**View all console errors:**
- Click "Console" tab
- Look for red error messages
- Most errors appear in red or yellow

**Mobile viewport issues:**
- Right-click → Inspect element
- Check "Computed" styles
- Verify responsive classes are applied

**Check responsive breakpoints:**
```javascript
// In Console, type:
console.log(window.innerWidth)  // Shows screen width
```

---

## 📝 Documentation Navigation

### Quick Command to Open Files
```bash
# Windows PowerShell - open a file:
notepad IMMEDIATE_NEXT_STEPS.md
notepad VISUAL_IMPLEMENTATION_GUIDE.md
notepad BEFORE_AFTER_COMPARISON.md
```

**Or in VS Code:**
```bash
code .  # Opens entire project
```

---

## 🎯 Common Workflow

### Daily Workflow
```bash
# 1. Start dev server
npm run dev

# 2. Make changes in VS Code
# (Files auto-refresh)

# 3. Test in browser
# F12 → Ctrl+Shift+M

# 4. When done, stop server
Ctrl+C

# 5. Commit changes
git add .
git commit -m "Your message"
git push origin main
```

---

## 🚨 Emergency Commands

### If Everything Breaks
```bash
# 1. Stop dev server
Ctrl+C

# 2. Undo all changes
git checkout -- .

# 3. Start fresh
npm run dev
```

---

### If Port 3000 is Stuck
```bash
# Find and kill process on port 3000:
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# Then try again:
npm run dev
```

---

### If You Want to Undo a Commit
```bash
# Undo last commit but keep changes:
git reset --soft HEAD~1

# Then recommit or fix:
git add .
git commit -m "Fixed message"
```

---

## 📋 Testing Checklist Commands

### Verification Script
```bash
# After running npm run dev, execute in browser console:

// Check if responsive classes are applied:
document.querySelectorAll('[class*="grid-cols"]').forEach(el => {
  console.log(el.className);
});

// Should show: grid-cols-2 md:grid-cols-2 lg:grid-cols-3 etc.
```

---

## 🔐 Git Commands Cheat Sheet

| Command | Purpose |
|---------|---------|
| `git status` | See what changed |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Create commit |
| `git push` | Push to GitHub |
| `git pull` | Get latest from GitHub |
| `git diff` | See exact changes |
| `git log` | See commit history |
| `git checkout -- .` | Undo all changes |
| `git reset --soft HEAD~1` | Undo last commit |

---

## 🧪 Quick Test Commands

### Test Mobile (One-liner)
```bash
# 1. Start dev
npm run dev

# 2. Then in browser:
# - Press F12
# - Press Ctrl+Shift+M
# - Select iPhone 12
# - Verify 2 cards per row
# - Press Ctrl+Shift+M again to close mobile view
```

---

### Test on Real Phone
```bash
# Get your IP:
ipconfig

# Visit on phone:
http://192.168.1.100:3000  (replace IP)

# Test same things:
# - See 2 cards per row?
# - Responsive spacing?
# - Text readable?
```

---

## 📚 File Location Reference

| File | Quick Edit |
|------|-----------|
| SubcategoryPage.tsx | Line 679, 700, 705 |
| SubcategoryCard.tsx | Line 32, 60, 72, etc. |
| Shared.tsx | Line 160, 175, 200 |
| App.tsx | Line 432, 2350 |

---

## 🎨 Tailwind Commands

### If You Need to Update Tailwind
```bash
# Rebuild Tailwind CSS
npm run build

# Check Tailwind version
npm list tailwindcss

# Update Tailwind
npm update tailwindcss
```

---

## 📞 Quick Help

| Need | Command |
|------|---------|
| Start site | `npm run dev` |
| Stop site | `Ctrl+C` |
| Test mobile | `F12` → `Ctrl+Shift+M` |
| See changes | `git diff` |
| Deploy | `git push origin main` |
| Undo changes | `git checkout -- .` |
| Fix cache | `Ctrl+Shift+R` (browser) |
| Kill port | `Get-Process node \| Stop-Process` |
| Check IP | `ipconfig` |

---

## ✅ Done!

**Most Common Task:**
```bash
npm run dev
# Then F12 → Ctrl+Shift+M → Verify 2 cards per row
```

**That's it! 🚀**

---

*Save this card for quick reference while testing and deploying!*
