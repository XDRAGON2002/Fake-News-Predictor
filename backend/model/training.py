import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
import seaborn as sns
import tensorflow as tf
from transformers import AutoTokenizer 

# fake_df = pd.read_csv("./Fake.csv", sep=",")
# fake_df.head()

# true_df = pd.read_csv("./True.csv", sep=",")
# true_df.head()

# fake_df["label"] = "Fake"
# true_df["label"] = "True"

# fake_df.head()

# df = pd.concat([fake_df, true_df], axis=0)

# df.head()

# df["label"].value_counts()

# df.to_csv("./NewsData.csv", sep=",", index=False)

df = pd.read_csv("./NewsData.csv", sep=",")

df.head()

seqlen = df["title"].apply(lambda x: len(x.split()))


sns.distplot(seqlen)

max(seqlen)

max_length = 30

model_name = "bert-base-cased"


tokenizer = AutoTokenizer.from_pretrained(model_name)

tokens = tokenizer.encode_plus("hello world", max_length=max_length, truncation=True, padding="max_length", add_special_tokens=True, return_token_type_ids=False, return_attention_mask=True, return_tensors="tf")

tokens

np.array(tokens['input_ids'])[0]

df["label"] = df["label"].apply(lambda x: 1 if x == "True" else 0)

df["label"]

df.head()

all_tokens = []

for idx, data in enumerate(df["title"]):
  all_tokens.append(tokenizer.encode_plus(data, max_length=max_length, truncation=True, padding="max_length", add_special_tokens=True, return_token_type_ids=False, return_attention_mask=True, return_tensors="tf"))

len(all_tokens)

all_tokens[0]

labels = np.array(df["label"])
labels

np.array(all_tokens[0]["input_ids"])

X_ids = []
X_masks = []

for tokens in all_tokens:
  X_ids.append(np.array(tokens["input_ids"]))
  X_masks.append(np.array(tokens["attention_mask"]))

X_ids = np.array(X_ids)
X_masks = np.array(X_masks)

X_ids[:2]

X_masks[:2]

labels[:2]



tf.config.list_physical_devices('GPU')

ds = tf.data.Dataset.from_tensor_slices((X_ids, X_masks, labels))

for i in ds.take(1):
  print(i)

def format_data(input_ids, masks, labels):
  return {"input_ids": input_ids[0], "attention_mask": masks[0]}, labels

ds = ds.map(format_data)

for i in ds.take(1):
  print(i)

ds = ds.shuffle(1000000).batch(32)

ds_len = len(list(ds))

ds_len

train_ds = ds.take(round(0.9 * ds_len))
val_ds = ds.skip(round(0.9 * ds_len))

from transformers import TFAutoModel

bert = TFAutoModel.from_pretrained(model_name)

from tensorflow import keras

input_ids = keras.layers.Input(shape=(max_length,), name="input_ids", dtype="int32")
mask = keras.layers.Input(shape=(max_length,), name="attention_mask", dtype="int32")
embeddings = bert(input_ids, attention_mask=mask)[0]
X = keras.layers.GlobalMaxPool1D()(embeddings)
X = keras.layers.BatchNormalization()(X)
X = keras.layers.Dense(128, activation="relu")(X)
X = keras.layers.Dropout(0.1)(X)
X = keras.layers.Dense(32, activation="relu")(X)
y = keras.layers.Dense(2, activation="softmax", name="outputs")(X)

model = keras.Model(inputs=[input_ids, mask], outputs=[y])
model.layers[2].trainable = False

model.summary()

optimizer = keras.optimizers.Adam(0.01)
loss = keras.losses.SparseCategoricalCrossentropy()
acc = keras.metrics.SparseCategoricalAccuracy("accuracy")

model.compile(optimizer=optimizer, loss=loss, metrics=[acc])

history = model.fit(train_ds, validation_data=val_ds, epochs=2)

model.save("model.h5")

