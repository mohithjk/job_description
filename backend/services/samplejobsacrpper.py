from flask import Flask, jsonify
from flask_cors import CORS
import requests, re, os
from dotenv import load_dotenv

# Load API key
load_dotenv()
API_KEY = "e9e2f97d0emshd78a016c638f792p1af214jsndf84d297661b"
RAPIDAPI_HOST = "jsearch.p.rapidapi.com"

if not API_KEY:
    raise SystemExit("❌ Missing API_KEY in .env file")

app = Flask(__name__)
CORS(app)

# --- Extract details from description ---
def extract_details_from_description(desc):
    details = {
        "expected_skills": [],
        "good_to_have": [],
        "buzzwords": [],
        "rounds": None,
        "cutoff": None,
        "topics": []
    }

    if not desc:
        return details

    skills_keywords = ["Python", "Java", "JavaScript", "React", "SQL", "AWS", "Docker"]
    details["expected_skills"] = [s for s in skills_keywords if s.lower() in desc.lower()]
    details["buzzwords"] = list(set(re.findall(r'\b[A-Z][a-zA-Z0-9]+\b', desc)))

    return details

# --- Fetch jobs from API ---
def get_opportunities(query="full stack developer", num_pages=1, location="India"):
    url = f"https://{RAPIDAPI_HOST}/search"
    headers = {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }
    params = {
        "query": query,
        "page": "1",
        "num_pages": str(num_pages),
        "country": "in",
        "location": location
    }

    response = requests.get(url, headers=headers, params=params)
    return response.json().get("data", [])

# --- MAIN: Print output directly in terminal ---
if __name__ == "__main__":
    print("\n=== FETCHING JOB RESULTS ===\n")

    jobs = get_opportunities()

    if not jobs:
        print("No jobs found or API error.")
        exit()

    for idx, item in enumerate(jobs, 1):
        print(f"--- Job {idx} ---")
        print(f"ID: {item.get('job_id')}")
        print(f"Title: {item.get('job_title', 'N/A')}")
        print(f"Company: {item.get('employer_name', 'N/A')}")
        print(f"Location: {item.get('job_country', 'N/A')}")
        print(f"Remote: {'Yes' if item.get('job_is_remote', False) else 'No'}")
        print(f"Apply Link: {item.get('job_apply_link', '#')}")
        print("\nExtracted Details:")
        print(extract_details_from_description(item.get("job_description", "")))
        print("\n------------------------\n")
