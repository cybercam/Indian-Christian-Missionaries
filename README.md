# Missionaries Directory

A lightweight, **no-build** static site to showcase missionary data as a searchable, filterable directory.

## 🚀 Quick Start (GitHub Pages)
1. Create a new repository on GitHub (e.g., `missionaries`).
2. Upload `index.html` from this folder.
3. Go to **Settings → Pages → Build and deployment** and select **Deploy from a branch**; choose the default branch root (`/`).
4. Wait for deployment; your site will be live at `https://&lt;your-username&gt;.github.io/&lt;repo-name&gt;/`.

## ✨ Features
- Instant full‑text search across all fields
- Filters for Country and Organization (auto-detected)
- Sort by Name/Country/Organization
- Card view and Table view
- **Export filtered CSV** right from the page
- **Shareable filtered links** (URL keeps your filters/search)
- Works entirely client‑side (no backend or external CSS/JS CDNs)

## 🧱 How it works
- Your CSV was embedded directly into `index.html` as JSON at build time (in this export).
- The page auto‑detects meaningful columns (Name, Country, Organization, etc.) and displays the rest neatly.

## 🛠 Updating Data
- Re‑run the generation script (or replace the JSON inside `index.html`) with your latest CSV.
- Or ask ChatGPT to regenerate using your new file.

---

*Generated on 2025-08-26 08:06.*
