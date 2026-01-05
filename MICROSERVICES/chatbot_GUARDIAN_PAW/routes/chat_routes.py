from flask import Blueprint, request
from controller.chatbot_controller import ChatbotController

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/chatbot/message", methods=["POST"])
def chatbot_response():
    data_json = request.get_json()
    sentence = data_json.get("message", "")

    return ChatbotController.handle_message(sentence)
