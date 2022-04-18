from fastapi import FastAPI, Request
from transformers import AutoTokenizer, TFAutoModel
from tensorflow import keras
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

max_length = 30
model_name = "bert-base-cased"

tokenizer = AutoTokenizer.from_pretrained(model_name)
bert = TFAutoModel.from_pretrained(model_name)
model = keras.models.load_model(
    "/backend/model/model.h5", custom_objects={"TFBertModel": bert}
)

def format_data(input_ids, masks):
  return {"input_ids": input_ids[0], "attention_mask": masks[0]}


@app.get("/")
async def fun():
    return {"data": "hello"}


@app.post("/predict")
async def verify(request: Request):
    body = await request.json()
    print(body["news_headline"])
    tokens = tokenizer.encode_plus(
        body["news_headline"],
        max_length=max_length,
        truncation=True,
        padding="max_length",
        add_special_tokens=True,
        return_token_type_ids=False,
        return_attention_mask=True,
        return_tensors="tf",
    )
    result = model.predict([tokens["input_ids"], tokens["attention_mask"]])
    prob = result[0][np.argmax(result)]
    result = np.argmax(result)
    print(result)
    return {"data": int(result), "prob": float(prob)}
