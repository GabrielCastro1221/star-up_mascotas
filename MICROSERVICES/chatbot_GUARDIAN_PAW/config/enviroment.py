from dotenv import load_dotenv
import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--mode", default="build", help="Environment mode: dev or build")
parser.add_argument("--port", default="8080", help="Server port")
args = parser.parse_args()

env_path = ".env.dev" if args.mode == "dev" else ".env.build"
load_dotenv(dotenv_path=env_path)

config = {
    "server": {
        "port": int(os.getenv("PORT", args.port)),
        "base_url": os.getenv("BASE_URL", "http://127.0.0.1"),
    },
    "mode": args.mode
}
