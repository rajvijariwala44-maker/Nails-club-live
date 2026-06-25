/* ============================================
   BACKEND — Services & Catalog API
   CRUD operations for services and catalog items.
   In a real backend: REST endpoints under
   /api/services and /api/catalog
   ============================================ */

// ── Services ──────────────────────────────────

/**
 * Open modal to add a new service.
 * Acts as UI trigger for POST /services
 */
window.openAddServiceModal = function () {
    showModal('Add New Service', `
        <div class="space-y-4">
            <input type="text" id="new-svc-name" placeholder="Service Name *"
                   class="w-full p-3 border border-gray-200 rounded-lg outline-none
                          focus:border-maroon bg-gray-50 transition-colors">
            <input type="text" id="new-svc-price" placeholder="Price (e.g. $50+) *"
                   class="w-full p-3 border border-gray-200 rounded-lg outline-none
                          focus:border-maroon bg-gray-50 transition-colors">
            <textarea id="new-svc-desc" placeholder="Description" rows="3"
                      class="w-full p-3 border border-gray-200 rounded-lg outline-none
                             focus:border-maroon bg-gray-50 transition-colors resize-none"></textarea>
            <button onclick="createService()"
                    class="w-full bg-maroon text-white p-3 rounded-lg font-medium
                           hover:bg-maroon-dark transition-colors">
                Add Service
            </button>
        </div>
    `, true);
};

/**
 * POST /services — persist new service to state
 */
window.createService = function () {
    const name  = document.getElementById('new-svc-name').value.trim();
    const price = document.getElementById('new-svc-price').value.trim();
    const desc  = document.getElementById('new-svc-desc').value.trim();

    if (!name || !price) {
        alert('Service name and price are required.');
        return;
    }

    appState.services.push({
        id  : 's' + Date.now(),
        name, price, desc,
        img : 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500'
    });

    closeModal();
    renderLiveSite();
    renderAdminServices();
    saveGlobalState();
};

/**
 * DELETE /services/:idx
 */
window.deleteService = function (idx) {
    if (!confirm('Remove this service?')) return;
    appState.services.splice(idx, 1);
    renderLiveSite();
    renderAdminServices();
    saveGlobalState();
};

// ── Catalog ───────────────────────────────────

/**
 * Open modal to add a new catalog item.
 * Acts as UI trigger for POST /catalog
 */
window.openAddCatalogModal = function () {
    showModal('Add Catalog Item', `
        <div class="space-y-4">
            <select id="new-cat-type"
                    class="w-full p-3 border border-gray-200 rounded-lg outline-none bg-gray-50">
                <option value="Minimal">Minimal</option>
                <option value="Bridal">Bridal</option>
                <option value="Chrome">Chrome</option>
            </select>
            <div class="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg bg-gray-50">
                <p class="text-sm text-gray-500 mb-2">Select an image to upload</p>
                <input type="file" id="new-cat-img" accept="image/*" class="w-full text-sm">
            </div>
            <button onclick="createCatalogItem()"
                    class="w-full bg-maroon text-white p-3 rounded-lg font-medium
                           hover:bg-maroon-dark transition-colors">
                Add to Catalog
            </button>
        </div>
    `, true);
};

/**
 * POST /catalog — compress image, persist item
 */
window.createCatalogItem = function () {
    const cat       = document.getElementById('new-cat-type').value;
    const fileInput = document.getElementById('new-cat-img');

    if (!fileInput.files[0]) {
        alert('Please select an image.');
        return;
    }

    compressImage(fileInput.files[0], base64 => {
        appState.catalogItems.unshift({ id: 'c' + Date.now(), cat, img: base64 });
        appState.mediaLibrary.push({
            id      : 'm' + Date.now(),
            url     : base64,
            category: 'Catalog',
            title   : 'Catalog Upload'
        });
        closeModal();
        renderLiveSite();
        renderAdminCatalog();
        saveGlobalState();
    });
};

/**
 * DELETE /catalog/:idx
 */
window.deleteCatalogItem = function (idx) {
    if (!confirm('Remove this catalog item?')) return;
    appState.catalogItems.splice(idx, 1);
    renderLiveSite();
    renderAdminCatalog();
    saveGlobalState();
};
