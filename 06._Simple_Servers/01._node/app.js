import express from 'express'

const app = express();

app.get("/", (req, res) => {
    res.send({ data: "Root route"});
})

// task /greetings

app.get("/greetings", (req, res) => {
    res.send({ data: "Greetings"});
})

const PORT = 8080
app.listen(PORT, () => console.log('Server is running on port', 8080));