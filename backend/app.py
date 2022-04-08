from fastapi import FastAPI

app=FastAPI()

@app.get("/")
async def fun():
    return {"data":"hello"}