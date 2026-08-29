// data.js
// This file is our "database" for the demo.
// In a real product this would live in Firebase/MySQL etc,
// but for a prototype, plain JS arrays are enough to show the mechanism.

// Pre-seeded students (so the demo has content before anyone signs up)
const SEED_STUDENTS = [
  { id: "s1", name: "Ananya Sharma", college: "DHSGSU Sagar", skills: ["Python", "Data Structures", "SQL"] },
  { id: "s2", name: "Rohit Verma", college: "DHSGSU Sagar", skills: ["React", "JavaScript", "CSS"] },
  { id: "s3", name: "Priya Singh", college: "MANIT Bhopal", skills: ["Java", "Android", "Firebase"] },
  { id: "s4", name: "Karan Mehta", college: "IIIT Bhopal", skills: ["Python", "Machine Learning", "SQL"] },
  { id: "s5", name: "Sneha Patel", college: "DHSGSU Sagar", skills: ["JavaScript", "Node.js", "MongoDB"] }
];

// Pre-seeded internships posted by industry/organizations
const SEED_JOBS = [
  {
    id: "j1",
    title: "Backend Intern",
    org: "TechNova Pvt Ltd",
    skills: ["Python", "SQL", "Data Structures"],
    stipend: "₹8,000/month",
    duration: "3 months"
  },
  {
    id: "j2",
    title: "Frontend Developer Intern",
    org: "PixelCraft Studio",
    skills: ["React", "JavaScript", "CSS"],
    stipend: "₹6,000/month",
    duration: "2 months"
  },
  {
    id: "j3",
    title: "Android App Intern",
    org: "AppSphere Labs",
    skills: ["Java", "Android", "Firebase"],
    stipend: "₹10,000/month",
    duration: "4 months"
  },
  {
    id: "j4",
    title: "ML Research Intern",
    org: "DataMinds AI",
    skills: ["Python", "Machine Learning"],
    stipend: "Unpaid + Certificate",
    duration: "3 months"
  },
  {
    id: "j5",
    title: "Full Stack Intern",
    org: "CodeWorks Solutions",
    skills: ["JavaScript", "Node.js", "MongoDB", "React"],
    stipend: "₹12,000/month",
    duration: "6 months"
  }
];

// ---- localStorage helpers ----
// These functions are the only place that touch localStorage.
// Everything else in app.js calls these instead of localStorage directly.

function initData() {
  if (!localStorage.getItem("sb_students")) {
    localStorage.setItem("sb_students", JSON.stringify(SEED_STUDENTS));
  }
  if (!localStorage.getItem("sb_jobs")) {
    localStorage.setItem("sb_jobs", JSON.stringify(SEED_JOBS));
  }
  if (!localStorage.getItem("sb_applications")) {
    localStorage.setItem("sb_applications", JSON.stringify([]));
  }
}

function getStudents() {
  return JSON.parse(localStorage.getItem("sb_students") || "[]");
}

function getJobs() {
  return JSON.parse(localStorage.getItem("sb_jobs") || "[]");
}

function getApplications() {
  return JSON.parse(localStorage.getItem("sb_applications") || "[]");
}

function addStudent(student) {
  const students = getStudents();
  students.push(student);
  localStorage.setItem("sb_students", JSON.stringify(students));
}

function addJob(job) {
  const jobs = getJobs();
  jobs.push(job);
  localStorage.setItem("sb_jobs", JSON.stringify(jobs));
}

function addApplication(application) {
  const apps = getApplications();
  apps.push(application);
  localStorage.setItem("sb_applications", JSON.stringify(apps));
}
