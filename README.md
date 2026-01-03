# Birthday Website (Flask)

A cute animated birthday site with tulips 🌷 & roses 🌹, confetti + falling petals, and a photo slideshow.

## 🧰 What's inside
- `app.py` — Flask app
- `templates/index.html` — Jinja2 template
- `static/css/style.css`, `static/js/app.js`
- `static/img/rose.svg`, `static/img/tulip.svg`, `static/img/placeholder.png`
- `static/photos/` — put your real photos here; filenames can be anything
- `config/config.json` — edit `girl_name`, `from_name`, `subtitle`, and `message_html`
- `requirements.txt`, `Procfile` — for easy deployment

---

## ▶ Run locally
```bash
# 1) Create and activate venv (optional but recommended)
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# 2) Install deps
pip install -r requirements.txt

# 3) Put your photos into static/photos/

# 4) Edit config/config.json with her name & your message

# 5) Run
python app.py
# Open http://localhost:5000
```

---

## 🌍 Deploy (get a shareable link)

### Option A — Render (free, easy)
1. Create a **public GitHub repo** (e.g., `birthday-flask-site`) and push these files.
2. Go to **render.com** → New → **Web Service** → Connect your GitHub repo.
3. Settings:
   - Runtime: **Python 3**
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
4. Click **Create Web Service**. In ~1–2 minutes you’ll get a live URL like `https://your-app.onrender.com/`.

### Option B — Railway (free tier)
1. Create a **public GitHub repo** and push these files.
2. Go to **railway.app** → New Project → **Deploy from GitHub Repo**.
3. When it asks for start command, set:
   - Install: `pip install -r requirements.txt`
   - Start: `gunicorn app:app`
4. Deploy → copy the assigned public URL (e.g., `https://your-app.up.railway.app/`).

> Tip: If you don’t want Git, you can zip-upload in both platforms’ dashboards (available in some plans). Otherwise, GitHub is the smoothest.

---

## ✍️ Quick customization checklist
- `config/config.json` → set `"girl_name"`, `"from_name"`, `"subtitle"`, `"message_html"` (supports HTML & emojis)
- Add photos into `static/photos` (any filename). The gallery picks them up automatically.
- Click **Celebrate** to trigger confetti + floating petals.

Enjoy! 🎉