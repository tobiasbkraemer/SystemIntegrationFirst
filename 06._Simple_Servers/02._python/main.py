from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def root():
    return {"data": "Hello wolrd"}


@app.get("/greetings")
def root():
    return { "data": "Welcome to my server"}
