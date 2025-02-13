from fastapi import FastAPI, HTTPException
import csv
import json
import yaml
import xml.etree.ElementTree as ET
from pathlib import Path

app = FastAPI()

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

# API Endpoints
@app.get("/parse/csv")
async def get_csv():
    return parse_csv(FILES["csv"])

@app.get("/parse/xml")
async def get_xml():
    return parse_xml(FILES["xml"])

@app.get("/parse/yaml")
async def get_yaml():
    return parse_yaml(FILES["yaml"])

@app.get("/parse/txt")
async def get_txt():
    return parse_txt(FILES["txt"])

@app.get("/parse/json")
async def get_json():
    return parse_json(FILES["json"])


print(f"Data directory: {DATA_DIR}")
print(f"Expected CSV file location: {FILES['csv']}")
