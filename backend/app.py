from typing import Dict, Union

import numpy as np
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from tensorflow import keras
from transformers import AutoTokenizer, TFAutoModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

max_length: int = 30
model_name: str = "bert-base-cased"

tokenizer = AutoTokenizer.from_pretrained(model_name)
bert = TFAutoModel.from_pretrained(model_name)
model = keras.models.load_model(
    "./model/model.h5", custom_objects={"TFBertModel": bert}
)


@app.get("/")
async def fun() -> Dict[str, str]:
    return {"data": "hello"}


@app.post("/predict")
async def verify(request: Request) -> Dict[str, Union[int, float]]:
    body: Dict[str, str] = await request.json()
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
    prob: float = result[0][np.argmax(result)]
    value: int = int(np.argmax(result))
    return {"data": int(value), "prob": float(prob)}
