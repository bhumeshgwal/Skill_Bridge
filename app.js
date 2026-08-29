// app.js
// This is the "brain" of the platform.
// The core idea: match a student to a job by comparing skill tags.
// No real AI/ML model — just set overlap. This is intentional:
// it's simple enough to explain in 30 seconds to a judge,
// and it's exactly how many real matching systems start out.

/**
 * Calculates how well a student's skills match a job's required skills.
 * Formula: (skills student has that job needs) / (total skills job needs)
 * Returned as a percentage, rounded to nearest whole number.
 */
function getMatchScore(studentSkills, jobSkills) {
  const studentSet = new Set(studentSkills.map(s => s.toLowerCase().trim()));
  const jobSet = jobSkills.map(s => s.toLowerCase().trim());

  const matched = jobSet.filter(skill => studentSet.has(skill));
  const score = (matched.length / jobSet.length) * 100;

  return Math.round(score);
}

/**
 * Returns a color class based on match score, used for the match badge.
 */
function getMatchClass(score) {
  if (score >= 70) return "match-high";
  if (score >= 40) return "match-mid";
  return "match-low";
}

/**
 * Given one student, returns all jobs ranked by match score (highest first).
 */
function getRankedJobsForStudent(student) {
  const jobs = getJobs();
  return jobs
    .map(job => ({
      ...job,
      score: getMatchScore(student.skills, job.skills)
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Given one job, returns all students ranked by match score (highest first).
 * Used on the industry side to show "best-fit applicants" even before anyone applies.
 */
function getRankedStudentsForJob(job) {
  const students = getStudents();
  return students
    .map(student => ({
      ...student,
      score: getMatchScore(student.skills, job.skills)
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Turns a comma separated skill input string into a clean array.
 * e.g. "Python, sql , React" -> ["Python", "sql", "React"]
 */
function parseSkillsInput(raw) {
  return raw
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Simple helper to generate a unique-ish id for new records in the demo.
 */
function generateId(prefix) {
  return prefix + "_" + Date.now();
}

// Make sure seed data exists as soon as any page loads app.js
initData();
