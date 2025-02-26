from fastapi import FastAPI, HTTPException
import csv
import json
import yaml
import requests  # For making HTTP requests to Server B
import xml.etree.ElementTree as ET
from pathlib import Path

app = FastAPI()

# Server B URL (Node.js Express)
SERVER_B_URL = "http://localhost:5000"

# File Paths
DATA_DIR = Path(__file__).resolve().parent.parent / "data"

FILES = {
    "csv": DATA_DIR / "data.csv",
    "xml": DATA_DIR / "data.xml",
    "yaml": DATA_DIR / "data.yaml",
    "txt": DATA_DIR / "data.txt",
    "json": DATA_DIR / "data.json",
}

# Function to parse CSV
def parse_csv(file_path):
    try:
        with open(file_path, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            return list(reader)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to parse XML
def parse_xml(file_path):
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        return [{child.tag: child.text for child in elem} for elem in root]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to parse YAML
def parse_yaml(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to parse TXT (returns a list of lines)
def parse_txt(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.readlines()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to parse JSON
def parse_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Dictionary for local parsing functions
LOCAL_PARSERS = {
    "csv": parse_csv,
    "xml": parse_xml,
    "yaml": parse_yaml,
    "txt": parse_txt,
    "json": parse_json,
}

# Endpoint to fetch data from Server B (and fallback to local parsing if needed)
@app.get("/parse/{file_type}")
async def get_data(file_type: str):
    """ Try to fetch parsed data from Server B first, fallback to local parsing if unavailable. """
    try:
        # Forward request to Server B
        response = requests.get(f"{SERVER_B_URL}/parse/{file_type}", timeout=5)
        response.raise_for_status()  # Raise an error if status code is not 2xx
        return response.json()
    
    except requests.exceptions.RequestException:
        # If Server B is unreachable, fallback to local parsing
        if file_type in LOCAL_PARSERS:
            return {"source": "Server A (fallback)", "data": LOCAL_PARSERS[file_type](FILES[file_type])}
        else:
            raise HTTPException(status_code=404, detail="Unsupported file type")

@app.get("/")
def root():
    return {"message": "Server A (Python FastAPI) is running."}

print(f"Data directory: {DATA_DIR}")
print(f"Expected CSV file location: {FILES['csv']}")

