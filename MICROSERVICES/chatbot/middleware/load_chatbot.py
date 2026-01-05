import os
import json
import torch
from models.model import ChatbotModel

INTENTS_PATH = os.path.join("data", "intents.json")
with open(INTENTS_PATH, 'r', encoding='utf-8') as f:
    intents = json.load(f)

MODEL_PATH = os.path.join("training", "model.pth")
data = torch.load(MODEL_PATH, map_location=torch.device('cpu'))

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = ChatbotModel(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

__all__ = [
    "model",
    "all_words",
    "tags",
    "intents",
    "device"
]
