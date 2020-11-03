import io
import json
import os
import shutil
from snips_nlu import SnipsNLUEngine
from snips_nlu.default_configs import CONFIG_EN

engine = SnipsNLUEngine(config=CONFIG_EN)

with io.open("dataset.json") as f:
    dataset = json.load(f)

engine.fit(dataset)

if os.path.isdir("model"):
    shutil.rmtree("model")

engine.persist("./model")