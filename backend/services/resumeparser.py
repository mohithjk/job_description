# import streamlit as st
# import spacy
# import re
# import PyPDF2

# # ---------------------------
# # Load spaCy model
# # ---------------------------
# nlp = spacy.load("en_core_web_sm")


# # ---------------------------
# # PDF → Text
# # ---------------------------
# def extract_pdf_text(pdf_file):
#     reader = PyPDF2.PdfReader(pdf_file)
#     text = ""

#     for page in reader.pages:
#         if page.extract_text():
#             text += page.extract_text() + "\n"

#     return text


# # ---------------------------
# # Extract Email
# # ---------------------------
# def extract_email(text):
#     match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
#     return match.group(0) if match else None


# # ---------------------------
# # Extract Phone
# # ---------------------------
# def extract_phone(text):
#     match = re.search(r"\+?\d[\d\s\-]{7,15}", text)
#     return match.group(0).strip() if match else None


# # ---------------------------
# # Extract Name using spaCy NER
# # ---------------------------
# def extract_name(text):
#     doc = nlp(text)
#     for ent in doc.ents:
#         if ent.label_ == "PERSON":
#             return ent.text
#     return None


# # ---------------------------
# # Extract Skills (simple keywords)
# # ---------------------------
# SKILL_KEYWORDS = [
#     "Python", "Java", "C++", "Excel", "Leadership", "Communication",
#     "Teamwork", "Customer service", "Sales", "Writing", "Coaching",
#     "Time management", "Problem solving", "Cash handling", "Retail"
# ]

# def extract_skills(text):
#     found = []
#     for skill in SKILL_KEYWORDS:
#         if skill.lower() in text.lower():
#             found.append(skill)
#     return list(set(found))


# # ---------------------------
# # Extract Education
# # ---------------------------
# def extract_education(text):
#     edu_keywords = [
#         "Bachelor", "Master", "B.Tech", "M.Tech", "Degree",
#         "Diploma", "High School", "Secondary", "College", "University",
#         "Year 10", "Year 11", "Year 12"
#     ]

#     lines = text.split("\n")
#     education = []

#     for line in lines:
#         for word in edu_keywords:
#             if word.lower() in line.lower():
#                 education.append(line.strip())

#     return education


# # ---------------------------
# # Extract Experience
# # ---------------------------
# def extract_experience(text):
#     exp_keywords = ["experience", "worked", "responsible", "served", "delivered", "volunteer"]

#     lines = text.split("\n")
#     experience = []

#     for line in lines:
#         for word in exp_keywords:
#             if word.lower() in line.lower():
#                 experience.append(line.strip())

#     return experience


# # ---------------------------
# # Main function → JSON
# # ---------------------------
# def parse_resume(text):
#     return {
#         "name": extract_name(text),
#         "email": extract_email(text),
#         "phone": extract_phone(text),
#         "skills": extract_skills(text),
#         "education": extract_education(text),
#         "experience": extract_experience(text),
#     }


# # ---------------------------
# # STREAMLIT APP
# # ---------------------------
# st.set_page_config(page_title="AI Resume Parser (spaCy)", layout="centered")

# st.title("📄 AI Resume Parser (spaCy Only)")

# uploaded_file = st.file_uploader("Upload your PDF resume", type=["pdf"])

# if uploaded_file is not None:

#     st.success("PDF uploaded successfully!")

#     with st.spinner("Extracting text..."):
#         pdf_text = extract_pdf_text(uploaded_file)

#     st.subheader("📌 Extracted Text")
#     st.text_area("Resume Content", pdf_text, height=350)

#     st.subheader("🤖 Parsed Resume JSON")
#     extracted_json = parse_resume(pdf_text)
#     st.json(extracted_json)


import spacy
import re

# Load SpaCy model
nlp = spacy.load("en_core_web_sm")

def extract_resume_json(text):
    doc = nlp(text)

    skills_list = [
        "python", "java", "javascript", "react", "sql", "node",
        "html", "css", "c++", "c#", "mongodb", "aws", "docker"
    ]

    skills_found = []
    for token in doc:
        if token.text.lower() in skills_list:
            skills_found.append(token.text)

    # Extract phone numbers
    phone = re.findall(r"\b\d{10}\b", text)

    # Extract emails
    email = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.\w+", text)

    # Extract experience (simple version)
    experience = []
    for sent in doc.sents:
        if "experience" in sent.text.lower() or "worked" in sent.text.lower():
            experience.append(sent.text.strip())

    resume_json = {
        "name": doc[0].text if doc else "N/A",
        "email": email[0] if email else None,
        "phone": phone[0] if phone else None,
        "skills": list(set(skills_found)),
        "experience": experience,
        "full_text": text
    }

    return resume_json
