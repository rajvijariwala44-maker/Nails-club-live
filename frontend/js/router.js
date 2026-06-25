/* ============================================
   FRONTEND — Hash-Based SPA Router
   Handles navigation between page views.
   ============================================ */

const ROUTES = {
    '#home'            : 'view-home',
    '#catalog'         : 'view-catalog',
    '#services-full'   : 'view-services-full',
    '#services'        : 'view-home',       // scroll anchor on home
    '#custom-order'    : 'view-custom-order',
    '#booking'         : 'view-booking',
    '#admin-login'     : 'view-admin-login',
    '#admin-dashboard' : 'view-admin-dashboard',
    '#contact'         : 'view-home'        // scroll anchor in footer
};

function handleRouting() {
    const hash = window.location.hash || '#home';

    // Guard: redirect to login if not authenticated
    if (hash === '#admin-dashboard' && !adminLoggedIn) {
        window.location.hash = '#admin-login';
        return;
    }

    // Hide all views
    document.querySelectorAll('.page-view').forEach(v => {
        v.classList.remove('active');
        v.classList.add('hidden');
    });

    // Show target view
    const viewId = ROUTES[hash] || 'view-home';
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.remove('hidden');
        requestAnimationFrame(() => target.classList.add('active'));
    }

    // Scroll to top (skip same-page anchors)
    if (hash !== '#services' && hash !== '#contact') {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Close mobile menu on navigate
    document.getElementById('mobile-menu')?.classList.add('hidden');

    // Route-specific side effects
    if (hash === '#catalog') {
        filterCatalog('all');
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-maroon', 'text-white', 'border-maroon');
            b.classList.add('border-gray-300');
            if (b.dataset.filter === 'all') {
                b.classList.add('bg-maroon', 'text-white', 'border-maroon');
                b.classList.remove('border-gray-300');
            }
        });
    }

    if (hash === '#admin-dashboard') {
        initAdminDashboard();
    }
}
