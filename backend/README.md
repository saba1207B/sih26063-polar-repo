# NCPOR Digital Knowledge Platform — backend

## Run on Windows

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Open `http://127.0.0.1:8000/docs` for the interactive API documentation.

## Verify

```powershell
.\.venv\Scripts\python.exe -m pytest -q -p no:cacheprovider
```

The default backend uses the bundled NetworkX graph and JSON catalogue. Neo4j and external AI services are not required. All supplied research measurements, people and publications are clearly marked demonstration content.
