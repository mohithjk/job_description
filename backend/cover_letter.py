import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


model = genai.GenerativeModel("gemini-1.5-flash")


prompt = "you have to generate a cover letter take exaplme of any company for data science engineer"


response = model.generate_content(prompt)

print("\n--- Gemini Output ---\n")
print(response.text)
