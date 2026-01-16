
import zipfile, os, json, re, shutil
from pathlib import Path

BASE = Path(__file__).resolve().parent
TARGET = BASE / 'static' / 'portfolios'
DATA_FILE = BASE / 'data' / 'portfolios_metadata_design_tags.json'

def ensure_data():
    if not DATA_FILE.exists():
        DATA_FILE.write_text(json.dumps({"entries":[]}, ensure_ascii=False, indent=2), encoding='utf-8')

def process_zip(zip_path):
    ensure_data()
    with zipfile.ZipFile(zip_path, 'r') as zf:
        names = zf.namelist()
        # look for manifest
        manifest = None
        for cand in ['manifest.json','manifest.csv','meta.json']:
            if cand in names:
                manifest = cand
                break
        if manifest:
            try:
                raw = zf.read(manifest)
                data = json.loads(raw.decode('utf-8'))
            except Exception:
                data = None
            if isinstance(data, list):
                for rec in data:
                    filename = rec.get('filename')
                    if filename and filename in names:
                        dest = TARGET / filename
                        dest.parent.mkdir(parents=True, exist_ok=True)
                        with open(dest, 'wb') as out:
                            out.write(zf.read(filename))
                        # append metadata
                        add_entry_from_manifest(rec, dest)
        else:
            # fallback: extract all pdfs
            for f in names:
                if f.lower().endswith('.pdf'):
                    dest = TARGET / os.path.basename(f)
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    with open(dest, 'wb') as out:
                        out.write(zf.read(f))
                    add_minimal_entry(dest.name)
    print("Processed zip to", TARGET)

def add_entry_from_manifest(rec, dest):
    # load existing
    data = json.loads(DATA_FILE.read_text(encoding='utf-8'))
    entries = data.get('entries', [])
    rec_copy = rec.copy()
    rec_copy['pdf_path_local'] = str(dest.relative_to(BASE))
    entries.append(rec_copy)
    data['entries'] = entries
    DATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')

def add_minimal_entry(filename):
    data = json.loads(DATA_FILE.read_text(encoding='utf-8'))
    entries = data.get('entries', [])
    rec = {
        "id": os.path.splitext(filename)[0],
        "filename": filename,
        "team_name": "",
        "description": "",
        "tags": [],
        "templates": [],
        "pdf_path_local": str(Path('static') / 'portfolios' / filename),
        "thumbnail_path": ""
    }
    entries.append(rec)
    data['entries'] = entries
    DATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
