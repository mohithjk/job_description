import streamlit as st
import spacy
import re
import PyPDF2
import requests

# -----------------------------------
# Load spaCy model
# -----------------------------------
nlp = spacy.load("en_core_web_sm")

# -----------------------------------
# JSearch API Config
# -----------------------------------
API_KEY = "e9e2f97d0emshd78a016c638f792p1af214jsndf84d297661b"
RAPIDAPI_HOST = "jsearch.p.rapidapi.com"


# -----------------------------------
# PDF to Text
# -----------------------------------
def extract_pdf_text(pdf_file):
    reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        if page.extract_text():
            text += page.extract_text() + "\n"
    return text


# -----------------------------------
# Email Extraction
# -----------------------------------
def extract_email(text):
    match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    return match.group(0) if match else None


# -----------------------------------
# Phone Extraction
# -----------------------------------
def extract_phone(text):
    match = re.search(r"\+?\d[\d\s\-]{7,15}", text)
    return match.group(0).strip() if match else None


# -----------------------------------
# Extract Name (spaCy)
# -----------------------------------
def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None


# -----------------------------------
# Skill Extraction
# -----------------------------------
SKILL_KEYWORDS = [
    "Python", "Java", "C++", "Excel", "Leadership", "Communication",
    "Teamwork", "Customer service", "Sales", "Writing", "Coaching",
    "Time management", "Problem solving", "Cash handling", "Retail"
]

def extract_skills(text):
    found = []
    for skill in SKILL_KEYWORDS:
        if skill.lower() in text.lower():
            found.append(skill)
    return list(set(found))


# -----------------------------------
# Education Extraction
# -----------------------------------
def extract_education(text):
    edu_keywords = [
        "Bachelor", "Master", "B.Tech", "M.Tech", "Degree",
        "Diploma", "High School", "Secondary", "College", "University",
        "Year 10", "Year 11", "Year 12"
    ]
    lines = text.split("\n")
    education = []

    for line in lines:
        for word in edu_keywords:
            if word.lower() in line.lower():
                education.append(line.strip())

    return education


# -----------------------------------
# Experience Extraction
# -----------------------------------
def extract_experience(text):
    exp_keywords = ["experience", "worked", "responsible", "served", "delivered", "volunteer"]
    lines = text.split("\n")
    experience = []

    for line in lines:
        for word in exp_keywords:
            if word.lower() in line.lower():
                experience.append(line.strip())

    return experience


# -----------------------------------
# Convert Resume JSON → Job Query
# -----------------------------------
def build_job_query(data):
    skills = [s.lower() for s in data.get("skills", [])]

    # Retail / Store Jobs
    if any(s in skills for s in ["retail", "customer service", "cash handling"]):
        if "leadership" in skills or "coaching" in skills:
            return "Store Manager"
        if "cash handling" in skills:
            return "Cashier"
        return "Retail Associate"

    # Leadership roles
    if "leadership" in skills or "coaching" in skills:
        return "Team Lead"

    # Default fallback
    return "General Jobs"


# -----------------------------------
# Fetch Jobs from JSearch
# -----------------------------------
def get_opportunities(query="Retail Associate"):
    url = f"https://{RAPIDAPI_HOST}/search"

    headers = {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }

    params = {
        "query": query,
        "page": "1",
        "num_pages": "1",
        "country": "in"
    }

    response = requests.get(url, headers=headers, params=params)
    return response.json().get("data", [])


# -----------------------------------
# Parse Resume to JSON
# -----------------------------------
def parse_resume(text):
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience": extract_experience(text),
    }


# -----------------------------------
# STREAMLIT UI
# -----------------------------------
st.title("📄 AI Resume Parser + Job Finder")

uploaded_file = st.file_uploader("Upload your resume (PDF)", type=["pdf"])

if uploaded_file:

    with st.spinner("Reading PDF..."):
        pdf_text = extract_pdf_text(uploaded_file)

    st.subheader("📜 Extracted Resume Text")
    st.text_area("Text", pdf_text, height=300)

    extracted_json = parse_resume(pdf_text)

    st.subheader("📌 Parsed Resume JSON")
    st.json(extracted_json)

    st.subheader("🔍 Finding Matching Jobs...")

    query = build_job_query(extracted_json)

    st.write(f"### Query Used: `{query}`")

    jobs = get_opportunities(query)

    if not jobs:
        st.error("❌ No jobs found. Try adding more skills.")
    else:
        st.success("🔥 Matched Jobs")
        for job in jobs:
            st.markdown(f"""
                **{job.get('job_title')}**  
                🏢 {job.get('employer_name')}  
                📍 {job.get('job_location')}  
                🌐 [Apply Here]({job.get('job_apply_link')})
                ---
            """)

