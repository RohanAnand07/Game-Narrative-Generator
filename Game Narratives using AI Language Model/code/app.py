import os
from flask import Flask, render_template, request, jsonify, send_from_directory
import openai

app = Flask(__name__)

# Load GPT-3.5 Turbo API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Route to serve the HTML file
@app.route("/")
def index():
    return render_template("index.html")

# Route to serve static files (CSS and JS)
@app.route("/static/<path:filename>")
def serve_static(filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(root_dir, "static"), filename)

# Route to handle user inputs and generate narratives
@app.route("/generate_narrative", methods=["POST"])
def generate_narrative():
    user_choice = request.json.get("choice")  # Get user's choice from POST data

    print("Received request to generate narrative for character:", user_choice)  # Debug line

    # Display API key in the terminal
    print(f"Using OpenAI API key: {openai.api_key}")

    # Generate narrative using GPT-3.5 Turbo
    prompt = f"Generate a narrative about {user_choice} using GPT-3.5 Turbo."
    response = openai.Completion.create(
        engine="text-davinci-003",  # Choose the appropriate engine
        prompt=prompt,
        max_tokens=150  # Adjust the length of the generated narrative
    )
    
    narrative = response.choices[0].text.strip()

    print("Generated narrative:", narrative)  # Debug line

    return jsonify({"narrative": narrative})

if __name__ == "__main__":
    app.run(debug=True)
