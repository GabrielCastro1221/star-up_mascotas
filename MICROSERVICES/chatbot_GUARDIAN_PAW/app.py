from flask import Flask
from routes.chat_routes import chatbot_bp
from middleware.load_chatbot import model, all_words, tags, intents, device
from config.enviroment import config

app = Flask(__name__)
app.register_blueprint(chatbot_bp)

if __name__ == "__main__":
    port = config["server"]["port"]
    base_url = config["server"]["base_url"]

    print(f"Guardian Paw running on {base_url}:{port}")
    app.run(debug=True, port=port)
