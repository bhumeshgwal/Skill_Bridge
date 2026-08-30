// data.js
// Database layer: users, students, jobs, applications.
// Everything stored in localStorage (plain text, fine for demo).

// ============ USERS (with authentication) ============
const SEED_USERS = [
  { id: "u1", name: "Ananya Sharma", email: "ananya@example.com", phone: "9876543210", password: "pass123", role: "student", college: "DHSGSU Sagar", skills: ["Python", "Data Structures", "SQL"] },
  { id: "u2", name: "Rohit Verma", email: "rohit@example.com", phone: "9876543211", password: "pass123", role: "student", college: "DHSGSU Sagar", skills: ["React", "JavaScript", "CSS"] },
  { id: "u3", name: "Priya Singh", email: "priya@example.com", phone: "9876543212", password: "pass123", role: "student", college: "MANIT Bhopal", skills: ["Java", "Android", "Firebase"] },
  { id: "u4", name: "Karan Mehta", email: "karan@example.com", phone: "9876543213", password: "pass123", role: "student", college: "IIIT Bhopal", skills: ["Python", "Machine Learning", "SQL"] },
  { id: "u5", name: "Sneha Patel", email: "sneha@example.com", phone: "9876543214", password: "pass123", role: "student", college: "DHSGSU Sagar", skills: ["JavaScript", "Node.js", "MongoDB"] },
  { id: "u6", name: "TechNova HR", email: "hr@technova.com", phone: "9000000001", password: "pass123", role: "industry", orgName: "TechNova Pvt Ltd" },
  { id: "u7", name: "PixelCraft HR", email: "hr@pixelcraft.com", phone: "9000000002", password: "pass123", role: "industry", orgName: "PixelCraft Studio" },
  { id: "u8", name: "AppSphere HR", email: "hr@appsphere.com", phone: "9000000003", password: "pass123", role: "industry", orgName: "AppSphere Labs" },
];

// ============ JOBS ============
const SEED_JOBS = [
  { id: "j1", title: "Backend Intern", org: "TechNova Pvt Ltd", orgId: "u6", skills: ["Python", "SQL", "Data Structures"], stipend: "₹8,000/month", duration: "3 months" },
  { id: "j2", title: "Frontend Developer Intern", org: "PixelCraft Studio", orgId: "u7", skills: ["React", "JavaScript", "CSS"], stipend: "₹6,000/month", duration: "2 months" },
  { id: "j3", title: "Android App Intern", org: "AppSphere Labs", orgId: "u8", skills: ["Java", "Android", "Firebase"], stipend: "₹10,000/month", duration: "4 months" },
  { id: "j4", title: "ML Research Intern", org: "DataMinds AI", orgId: "u6", skills: ["Python", "Machine Learning"], stipend: "Unpaid + Certificate", duration: "3 months" },
  { id: "j5", title: "Full Stack Intern", org: "CodeWorks Solutions", orgId: "u7", skills: ["JavaScript", "Node.js", "MongoDB", "React"], stipend: "₹12,000/month", duration: "6 months" }
];

// ============ Initialize localStorage ============
function initData() {
  if (!localStorage.getItem("sb_users")) {
    localStorage.setItem("sb_users", JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem("sb_jobs")) {
    localStorage.setItem("sb_jobs", JSON.stringify(SEED_JOBS));
  }
  if (!localStorage.getItem("sb_applications")) {
    localStorage.setItem("sb_applications", JSON.stringify([]));
  }
}

// ============ User Management (AUTH) ============

function getUsers() {
  return JSON.parse(localStorage.getItem("sb_users") || "[]");
}

function getUserByEmailOrPhone(emailOrPhone) {
  const users = getUsers();
  return users.find(u => u.email === emailOrPhone || u.phone === emailOrPhone) || null;
}

function validateLogin(emailOrPhone, password) {
  const user = getUserByEmailOrPhone(emailOrPhone);
  if (!user) return null; // user doesn't exist
  if (user.password !== password) return null; // wrong password
  return user; // login success
}

function signup(name, emailOrPhone, password, role, extraData) {
  // Check if already exists
  if (getUserByEmailOrPhone(emailOrPhone)) {
    return null; // user already exists
  }
  
  const newUser = {
    id: generateId("u"),
    name,
    password,
    role,
    ...extraData // spread in college/skills (for student) or orgName (for industry)
  };
  
  // Determine if input is email or phone
  if (emailOrPhone.includes("@")) {
    newUser.email = emailOrPhone;
  } else {
    newUser.phone = emailOrPhone;
  }
  
  const users = getUsers();
  users.push(newUser);
  localStorage.setItem("sb_users", JSON.stringify(users));
  return newUser;
}

function getCurrentUser() {
  const userId = localStorage.getItem("sb_current_user_id");
  if (!userId) return null;
  return getUsers().find(u => u.id === userId) || null;
}

function setCurrentUser(user) {
  localStorage.setItem("sb_current_user_id", user.id);
}

function logoutUser() {
  localStorage.removeItem("sb_current_user_id");
}

// ============ Jobs ============

function getJobs() {
  return JSON.parse(localStorage.getItem("sb_jobs") || "[]");
}

function addJob(job) {
  const jobs = getJobs();
  jobs.push(job);
  localStorage.setItem("sb_jobs", JSON.stringify(jobs));
}

// ============ Applications ============

function getApplications() {
  return JSON.parse(localStorage.getItem("sb_applications") || "[]");
}

function addApplication(application) {
  const apps = getApplications();
  apps.push(application);
  localStorage.setItem("sb_applications", JSON.stringify(apps));
}

function updateApplicationStatus(appId, status) {
  const apps = getApplications();
  const app = apps.find(a => a.id === appId);
  if (app) {
    app.status = status;
    localStorage.setItem("sb_applications", JSON.stringify(apps));
  }
}
