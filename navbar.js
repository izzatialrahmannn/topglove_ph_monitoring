/* ================= SUPABASE CONFIG ================= */
const SUPABASE_URL = "https://agaungomzsupvdjfcded.supabase.co"; // replace with your URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYXVuZ29tenN1cHZkamZjZGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMTc5NzcsImV4cCI6MjA4MDU5Mzk3N30.6PBQ9jVSIItUxKDvYPWGijmmJfv12YZMD2BxSsUJ7ng"; // replace with your anon key
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ================= CUSTOM AUTH FUNCTIONS ================= */

// Get session from localStorage
function getSession() {
  const session = localStorage.getItem('session');
  return session ? JSON.parse(session) : null;
}

// Set session in localStorage
function setSession(userData) {
  localStorage.setItem('session', JSON.stringify({
    email: userData.email,
    full_name: userData.full_name,
    badgeid: userData.badgeid,
    role_id: userData.role_id,
    loginTime: Date.now()
  }));
}

// Clear session
function clearSession() {
  localStorage.removeItem('session');
}

/* ================= PAGE PROTECTION ================= */
function protectPage() {
  const session = getSession();

  if (!session) {
    window.location.href = "index.html"; // redirect if not logged in
    return null;
  }

  // Show "Create Admin" only for superadmin
  const createAdminMenu = document.getElementById("createAdminMenu");
  if (createAdminMenu) {
    const isSuperadmin = session.role_id === "superadmin";
    createAdminMenu.style.display = isSuperadmin ? "inline" : "none";
  }

  return session;
}

// Call page protection immediately
protectPage();

/* ================= LOGOUT ================= */
function logout() {
  try {
    // Clear localStorage session
    clearSession();

    // Redirect to login page
    window.location.href = "login.html";
  } catch (err) {
    console.error("Logout error:", err.message);
    alert("Failed to logout: " + err.message);
  }
}

// Make logout function globally available
window.logout = logout;

// Make supabaseClient globally available
window.supabaseClient = supabaseClient;

// Attach logout event listener after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});

