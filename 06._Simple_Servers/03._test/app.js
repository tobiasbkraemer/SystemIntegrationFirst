import express from "express"

const app = express();


app.get("/", (req, res) => {
    res.send({ data: "Second express server"})
})


app.get("/hello", (req, res) => {
    res.send({ data: "Hello there"})
})


const PORT = 8080;
app.listen(PORT, () =>  console.log("Yeehaw. Port: ", PORT))