from flask import Flask, render_template
from pathlib import Path
import json

app = Flask(__name__)

def load_config():
    cfg_path = Path("config/config.json")
    if cfg_path.exists():
        with cfg_path.open(encoding="utf-8") as f:
            return json.load(f)
    return {
        "girl_name": "[Name]",
        "from_name": "[Your Name]",
        "subtitle": "A very sweet wish just for you 💖",
        "message_html": "<p>Happy Birthday! Wishing you lots of love and happiness.</p>"
    }

def get_photos():
    p = Path(app.static_folder) / "photos"
    photos = []

    if not p.exists():
        return photos

    for ext in ("*.png","*.jpg","*.jpeg","*.webp","*.gif"):
        for x in sorted(p.glob(ext)):
            photos.append(f"/static/photos/{x.name}")

    return photos

@app.route("/")
def index():
    cfg = load_config()
    photos = get_photos()

    return render_template(
        "index.html",
        girl_name=cfg.get("girl_name","[Name]"),
        from_name=cfg.get("from_name","[Your Name]"),
        subtitle=cfg.get("subtitle",""),
        message_html=cfg.get(
            "message_html",
            "<p>Happy Birthday! Wishing you lots of love and happiness.</p>"
        ),
        photos=photos
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
