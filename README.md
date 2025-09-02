# job_description
# Job Portal with Resume ATS Scoring

## Project Overview
This web application allows users to **upload their resumes** and get **personalized job and internship recommendations** along with an **ATS (Applicant Tracking System) compatibility score** for each position. The system analyzes resumes, extracts key information, and matches users to relevant opportunities.

---

## Features
- **User Authentication**
  - Secure login/signup
  - Support for OAuth (Google, LinkedIn)
- **Resume Upload**
  - Accept PDF and DOCX formats
  - Secure storage
- **Resume Parsing**
  - Extracts education, experience, skills, and contact information
- **Job Recommendations**
  - Matches resumes to jobs/internships
  - Computes ATS compatibility score for each match
- **Dashboard**
  - View uploaded resumes
  - Browse matched jobs and scores
- **Admin Panel**
  - Add/manage job listings
  - View analytics (optional)

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React / Next.js |
| Backend | Python Flask / Django |
| Database | PostgreSQL |
| Parsing & NLP | PyPDF2, docx2txt, spaCy, NLTK |
| Authentication | JWT, OAuth2 |
| Hosting | Vercel (frontend), Heroku / Render (backend) |




