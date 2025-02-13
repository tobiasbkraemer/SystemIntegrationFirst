import json
import yaml
import csv
import xml.etree.ElementTree as ET
import os

# Set the base directory to go up one level to find the "data" folder
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


# Read and parse a text file
def parse_txt(file_path):
    with open(file_path, "r") as f:
        data = {}
        for line in f:
            key, value = line.strip().split(": ")
            data[key] = value
    return data

# Read and parse a JSON file
def parse_json(file_path):
    with open(file_path, "r") as f:
        return json.load(f)

# Read and parse an XML file
def parse_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    data = []
    for user in root.findall("user"):
        data.append({
            "name": user.find("name").text,
            "age": int(user.find("age").text),
            "location": user.find("location").text
        })
    return data

# Read and parse a YAML file
def parse_yaml(file_path):
    with open(file_path, "r") as f:
        return yaml.safe_load(f)

# Read and parse a CSV file
def parse_csv(file_path):
    with open(file_path, newline="") as f:
        reader = csv.DictReader(f)
        return [row for row in reader]

# File paths
files = {
    "txt": os.path.join(BASE_DIR, "data", "data.txt"),
    "json": os.path.join(BASE_DIR, "data", "data.json"),
    "xml": os.path.join(BASE_DIR, "data", "data.xml"),
    "yaml": os.path.join(BASE_DIR, "data", "data.yaml"),
    "csv": os.path.join(BASE_DIR, "data", "data.csv"),
}

# Parsing all files
print("TXT:", parse_txt(files["txt"]))
print("JSON:", parse_json(files["json"]))
print("XML:", parse_xml(files["xml"]))
print("YAML:", parse_yaml(files["yaml"]))
print("CSV:", parse_csv(files["csv"]))
