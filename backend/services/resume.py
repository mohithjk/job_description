import re
import os
import docx2txt
import PyPDF2
from flask import Flask, request, jsonify
from flask_cors import CORS # Import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

def extract_text_from_resume(file_path):
    """Extract raw text from a PDF or DOCX resume."""
    if file_path.endswith(".pdf"):
        text = ""
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                if page.extract_text():
                    text += page.extract_text() + " "
        return text.lower()
    elif file_path.endswith(".docx"):
        return docx2txt.process(file_path).lower()
    else:
        raise ValueError("Unsupported file format. Use PDF or DOCX.")


def extract_skills_from_jd(job_description):
    """Extract skills/keywords from job description."""
    skills_list = [
        "python", "java", "c++", "javascript", "sql", "html", "css", "react",
        "node.js", "django", "flask", "aws", "azure", "gcp", "docker",
        "kubernetes", "machine learning", "data science", "nlp", "git"
    ]

    jd_text = job_description.lower()
    found_skills = [skill for skill in skills_list if skill in jd_text]
    return found_skills


def calculate_ats_score(resume_text, job_description):
    """Calculate ATS score based on resume vs job description."""
    jd_skills = extract_skills_from_jd(job_description)
    resume_words = set(re.findall(r"\w+", resume_text.lower()))

    matched_skills = [skill for skill in jd_skills if skill in resume_words]
    missing_skills = [skill for skill in jd_skills if skill not in resume_words]
    
    score = (len(matched_skills) / len(jd_skills)) * 100 if jd_skills else 0

    return {
        "ats_score": round(score, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "total_required": len(jd_skills),
        "matched_count": len(matched_skills)
    }


@app.route("/upload_resume", methods=["POST"])
def upload_resume():
    """
    Upload resume (PDF/DOCX) and job description, get ATS score.
    POST request should contain:
    - file: Resume (PDF/DOCX)
    - job_description: Text
    """
    if "file" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400

    file = request.files["file"]
    job_description = request.form.get("job_description")

    if not job_description:
        return jsonify({"error": "Job description is required"}), 400
    
    file_path = file.filename
    file.save(file_path)

    try:
        resume_text = extract_text_from_resume(file_path)
        result = calculate_ats_score(resume_text, job_description)
        result["extracted_text"] = resume_text # Add extracted text to the response
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)  

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
