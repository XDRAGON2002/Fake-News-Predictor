import numpy as np
import pytest
from tensorflow import keras
from transformers import AutoTokenizer, TFAutoModel

max_length = 30
model_name = "bert-base-cased"

tokenizer = AutoTokenizer.from_pretrained(model_name)
bert = TFAutoModel.from_pretrained(model_name)
model = keras.models.load_model("model/model.h5", custom_objects={"TFBertModel": bert})


@pytest.mark.parametrize(
    "text, expected",
    [
        (
            "Donald Trump Sends Out Embarrassing New Year's Eve Message; This is Disturbing",
            0,
        ),
        ("Drunk Bragging Trump Staffer Started Russian Collusion Investigation", 0),
        ("Indonesia to buy $1.14 billion worth of Russian jets", 1),
        ("Vatican upbeat on possibility of Pope Francis visiting Russia", 1),
    ],
)
def test_model(text, expected):
    tokens = tokenizer.encode_plus(
        text,
        max_length=max_length,
        truncation=True,
        padding="max_length",
        add_special_tokens=True,
        return_token_type_ids=False,
        return_attention_mask=True,
        return_tensors="tf",
    )
    assert len(np.array(tokens["input_ids"])[0]) == 30
    result = model.predict([tokens["input_ids"], tokens["attention_mask"]])
    assert len(result[0]) == 2
    prob = result[0][np.argmax(result)]
    assert 0 <= prob <= 1
    value = int(np.argmax(result))
    assert value in [0, 1]
    assert value == expected
    assert 1 == 2
