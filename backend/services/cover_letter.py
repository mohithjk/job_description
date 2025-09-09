from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load .env
load_dotenv()
api_key = (os.getenv("GEMINI_API_KEY"))

if not api_key:
    raise ValueError("❌ GOOGLE_API_KEY not found in .env")

# Configure Gemini
genai.configure(api_key=api_key)

# Flask app
app = Flask(__name__,template_folder="../frontend")

@app.route("/")
def home():
    return render_template("main.html")

@app.route("/ask", methods=["POST"])
def ask_gemini():
    try:
        user_input = request.json.get("prompt", "")
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(user_input)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
