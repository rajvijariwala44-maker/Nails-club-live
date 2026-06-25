/* ============================================
   BACKEND — Authentication
   Admin login handler.
   In a real backend: POST /auth/login with
   bcrypt password check + JWT/session token.
   ============================================ */

// Hardcoded credentials — in production replace
// with a proper hashed password check server-side.
const ADMIN_CREDENTIALS = {
    username: 'nishi',
    password: 'nishi2005'
};

/**
 * Validate admin credentials and start session.
 * Acts as POST /auth/login
 */
function handleAdminLogin(e) {
    e.preventDefault();

    const username = document.getElementById('admin-user').value.trim();
    const password = document.getElementById('admin-pass').value;

    if (username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password) {

        adminLoggedIn = true;    // set in-memory session flag (backend/state.js)
        e.target.reset();
        window.location.hash = '#admin-dashboard';

    } else {
        showModal('Access Denied',
            'Invalid username or password. Please try again.');
    }
}

/**
 * Initialise the admin dashboard on route entry.
 * Called by router when #admin-dashboard is loaded.
 */
function initAdminDashboard() {
    syncCmsEditorFields();
    renderAdminAppointments();
    renderAdminCustomOrders();
    renderAdminServices();
    renderAdminCatalog();
    renderMediaLibrary();
}
