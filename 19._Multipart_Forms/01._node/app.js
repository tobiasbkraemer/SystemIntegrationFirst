import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(express.urlencoded({ extended: true }));

import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(undefined, './uploads');
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const uniqueFilename = `${uniquePrefix}__${file.originalname}`;
        
        cb(undefined, uniqueFilename);
    }
});

function fileFilter(req, file, cb) {
    const validTypes = ["image/png", "image/svg", "image/jpeg"];

    if (!validTypes.includes(file.mimetype)) {
        cb(new Error("File type not allowed" + file.mimetype), false);
    } else {
        cb(null, true);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB
    },
    fileFilter
});




app.post("/form", (req, res) => {
    console.log(req.body);
    delete req.body.password;
    res.send(req.body);
});

app.post("/fileform", upload.single('file'), (req, res) => {
    console.log(req.body);
    res.send({ });
});

const PORT = Number(process.env.PORT) || 8080;


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/nested", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "nestedForms.html"));
});


app.listen(PORT, () => console.log("Server is running on port", PORT));


//-------------------GET-------------------------
// Viser en fil direkte i browseren
app.get('/image/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.sendFile(filePath);
});

// Trigger download af fil
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});
