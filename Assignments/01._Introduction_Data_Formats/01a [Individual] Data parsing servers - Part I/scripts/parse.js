const fs = require("fs");
const yaml = require("js-yaml");
const xml2js = require("xml2js");
const path = require("path"); // Import path module

// Get the absolute path to the "data" folder
const BASE_DIR = path.join(__dirname, "..", "data");

const files = {
    txt: path.join(BASE_DIR, "data.txt"),
    json: path.join(BASE_DIR, "data.json"),
    xml: path.join(BASE_DIR, "data.xml"),
    yaml: path.join(BASE_DIR, "data.yaml"),
    csv: path.join(BASE_DIR, "data.csv")
};


// Read and parse a text file
function parseTxt(filePath) {
    const data = fs.readFileSync(filePath, "utf-8").split("\n");
    return Object.fromEntries(data.map(line => line.split(": ").map(s => s.trim())));
}

// Read and parse a JSON file
function parseJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Read and parse an XML file
async function parseXml(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = await xml2js.parseStringPromise(data, { explicitArray: false }); // Prevent unnecessary arrays
    return parsedData.users.user.map(user => ({
        name: user.name,
        age: parseInt(user.age, 10),  // Convert age to an integer
        location: user.location
    }));
}


// Read and parse a YAML file
function parseYaml(filePath) {
    return yaml.load(fs.readFileSync(filePath, "utf-8"));
}

// Read and parse a CSV file
function parseCsv(filePath) {
    const data = fs.readFileSync(filePath, "utf-8").split("\n");
    const headers = data[0].split(",");
    return data.slice(1).map(row => Object.fromEntries(row.split(",").map((val, i) => [headers[i], val.trim()])));
}

// Run parsing functions
console.log("TXT:", parseTxt(files.txt));
console.log("JSON:", parseJson(files.json));

parseXml(files.xml).then(xmlData => {
    console.log("XML:", xmlData);
});

console.log("YAML:", parseYaml(files.yaml));
console.log("CSV:", parseCsv(files.csv));
