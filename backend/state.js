/* ============================================
   BACKEND — App State Manager
   Single source of truth for all application
   data. Exposes saveGlobalState() globally so
   the admin UI can trigger a save.
   ============================================ */

// Initialise from storage (or seed defaults)
let appState = loadState();

// Admin session flag — in-memory only,
// intentionally reset on page reload.
let adminLoggedIn = false;

// Current media filter state (admin UI)
let currentMediaFilter = 'All';

/**
 * Persist appState and re-render the live site.
 * Exposed on window so the admin "Save" button
 * can call it directly from HTML.
 */
window.saveGlobalState = function () {
    const btn = document.getElementById('admin-save-btn');

    if (btn) {
        const original = '<i class="ph ph-floppy-disk text-lg"></i> Save Website Changes';
        btn.innerHTML = '<i class="ph ph-spinner animate-spin text-lg"></i> Saving...';
        btn.classList.replace('bg-green-600', 'bg-blue-600');

        const ok = persistState(appState);
        renderLiveSite();

        setTimeout(() => {
            btn.innerHTML = ok
                ? '<i class="ph ph-check-circle text-lg"></i> Saved Successfully'
                : '<i class="ph ph-warning text-lg"></i> Save Failed';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.classList.replace('bg-blue-600', 'bg-green-600');
            }, 2000);
        }, 600);
    } else {
        // Called from non-admin context (e.g. form submit)
        persistState(appState);
    }
};
