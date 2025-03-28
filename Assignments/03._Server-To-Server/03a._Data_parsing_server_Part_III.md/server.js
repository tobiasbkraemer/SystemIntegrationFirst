// Use import instead of require
import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import yaml from "yamljs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 5000;
const SERVER_A_URL = "http://127.0.0.1:8000";

// Get directory path (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// File Paths
const DATA_DIR = path.join(__dirname, "../data");
const FILES = {
    "csv": path.join(DATA_DIR, "data.csv"),
    "xml": path.join(DATA_DIR, "data.xml"),
    "yaml": path.join(DATA_DIR, "data.yaml"),
    "txt": path.join(DATA_DIR, "data.txt"),
    "json": path.join(DATA_DIR, "data.json"),
};

// Parsing functions
const parseCSV = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const lines = data.split("\n");
        const headers = lines[0].split(",");
        return lines.slice(1).map(line => {
            const values = line.split(",");
            return headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {});
        });
    } catch (err) {
        return { error: err.message };
    }
};

const parseJSON = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
        return { error: err.message };
    }
};

const parseXML = (filePath) => {
    try {
        return fs.readFileSync(filePath, "utf8"); // Placeholder for XML parsing
    } catch (err) {
        return { error: err.message };
    }
};

const parseYAML = (filePath) => {
    try {
        return yaml.load(filePath);
    } catch (err) {
        return { error: err.message };
    }
};

const parseTXT = (filePath) => {
    try {
        return fs.readFileSync(filePath, "utf8").split("\n");
    } catch (err) {
        return { error: err.message };
    }
};

const LOCAL_PARSERS = {
    "csv": parseCSV,
    "xml": parseXML,
    "yaml": parseYAML,
    "txt": parseTXT,
    "json": parseJSON,
};

// Endpoint to fetch data from Server A (or fallback)
app.get("/parse/:fileType", async (req, res) => {
    const { fileType } = req.params;

    try {
        const response = await axios.get(`${SERVER_A_URL}/parse/${fileType}`);
        res.json(response.data);
    } catch (error) {
        if (LOCAL_PARSERS[fileType]) {
            res.json({ source: "Server B (fallback)", data: LOCAL_PARSERS[fileType](FILES[fileType]) });
        } else {
            res.status(404).json({ error: "Unsupported file type" });
        }
    }
});

// Root Endpoint
app.get("/", (req, res) => {
    res.json({ message: "Server B (Node.js Express) is running." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server B running on http://localhost:${PORT}`);
});
