# Color
- Green Confidence (Hiring vibes)
- Background: bg-gray-50
- Primary CTA: bg-emerald-600 hover:bg-emerald-700
- Accent: text-emerald-700
- Text Neutral: text-gray-800
- Muted: text-gray-500

👉 Green is associated with acceptance/success ✅.

# Font: Inter


# Flow

1. **Home Page (`/`)**

   * Two buttons:

     * **Upload Resume** → goes to `/upload`
     * **View JDs** → goes to `/jds`


2. **Upload Resume (`/upload`)**

   * User uploads resume (PDF/DOC).
   * System parses it (skills, education, experience).
   * After success → Redirect to **Resume Analytics**.


3. **Resume Analytics (`/analytics`)**

   * Show parsed details + ATS Score.
   * Suggestions for improvement.
   * **Internship & Job Recommendations** based on skills.
   * Button to view **All Internships/Jobs** (optional → `/internships`).


4. **Job Descriptions (`/jds`)**

   * Shows list of scraped JDs.
   * Filters (Role, Company, Location).
   * Option: Compare a JD with uploaded resume → show match %.


5. **Internship Matches (`/internships`)** *(optional page)*

   * Full list of internships matched with resume.
   * Filters for type, location, etc.


6. **Login / Signup (`/auth`)** *(if needed later)*

   * User can create account → saves resumes, matches history.


7. **Dashboard (`/dashboard`)** *(if login is added)*

   * Shows uploaded resumes.
   * History of JD matches + internship suggestions.


👉 Simplest MVP flow:
**Home → Upload Resume → Analytics → Internship/Job Suggestions**
**Home → JDs → Compare with Resume**

