# 🚀 START YOUR CRM

## You Need 2 Terminals Running

### Terminal 1: API Server (Port 3001)
```bash
cd /Users/ahmedgomaa/Downloads/masr-pro-crm
node server/index.js
```

**Keep this running!** You should see:
```
╔════════════════════════════════════════════════════════════╗
║         🚀 API Server Running on Port 3001                 ║
╚════════════════════════════════════════════════════════════╝
```

### Terminal 2: Frontend (Port 8080)
```bash
cd /Users/ahmedgomaa/Downloads/masr-pro-crm
pnpm dev
```

**Keep this running too!** You should see:
```
VITE v5.4.19  ready in 188 ms
➜  Local:   http://localhost:8080/
```

---

## ✅ Then Open Browser

Go to: **http://localhost:8080/**

You should see:
- Dashboard with stats
- Properties list
- Leads list
- All data from MariaDB!

---

## ⚠️ Important

**BOTH servers must be running at the same time!**

- API Server (3001) = connects to MariaDB
- Frontend (8080) = connects to API Server

---

## 🧪 Quick Test

After starting API server, test it:
```bash
curl http://localhost:3001/api/health
```

Should return:
```json
{"status":"ok","database":"connected"}
```

---

## 🔥 Or Use One Command (if you have concurrently)

```bash
npm install -g concurrently
npm run dev:all
```

This starts both servers in one terminal!
