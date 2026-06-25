/* ============================================
   FRONTEND — Main Entry Point
   Boots the app after all page partials are
   fetched and injected into the DOM.
   ============================================ */

document.addEventListener('pagesLoaded', () => {

    // ── 1. Initialise UI systems ───────────────
    initSmoothScroll();
    initGSAP();
    initCursor();
    initMagneticButtons();
    initMobileMenu();
    initCatalogFilters();
    initAdminTabs();

    // ── 2. Render data into DOM ────────────────
    renderLiveSite();

    // ── 3. Start router ────────────────────────
    handleRouting();
    window.addEventListener('hashchange', handleRouting);

    // ── 4. Wire up forms ──────────────────────
    document.getElementById('booking-form')
        ?.addEventListener('submit', handleBookingSubmit);

    document.getElementById('custom-order-form')
        ?.addEventListener('submit', handleOrderSubmit);

    document.getElementById('admin-login-form')
        ?.addEventListener('submit', handleAdminLogin);

    // ── 5. Admin logout ───────────────────────
    document.getElementById('admin-logout-btn')
        ?.addEventListener('click', () => {
            adminLoggedIn = false;
            window.location.hash = '#home';
        });

});
