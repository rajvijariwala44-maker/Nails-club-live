/* ============================================
   FRONTEND — DOM Rendering
   Reads from appState (backend/state.js) and
   writes to the DOM. Pure presentation layer.
   ============================================ */

/**
 * Master render — call after any state change
 * to keep the whole UI in sync.
 */
function renderLiveSite() {
    renderHero();
    renderHomeServices();
    renderFullServices();
    renderCatalog();
    renderBookingDropdown();
}

// ── Hero Section ─────────────────────────────
function renderHero() {
    const bgImg   = document.getElementById('hero-bg-img');
    const mainTxt = document.getElementById('hero-main-text');
    const descTxt = document.getElementById('hero-desc-text');
    if (bgImg)   bgImg.src         = appState.hero.bgImage;
    if (mainTxt) mainTxt.innerHTML = appState.hero.mainText;
    if (descTxt) descTxt.innerHTML = appState.hero.descText;
}

// ── Home: Service Cards (max 3) ───────────────
function renderHomeServices() {
    const grid = document.getElementById('home-services-grid');
    if (!grid) return;
    grid.innerHTML = appState.services.slice(0, 3).map(s => `
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-hover">
            <div class="h-64 overflow-hidden">
                <img src="${s.img}" alt="${s.name}"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     loading="lazy">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-serif text-xl">${s.name}</h3>
                    <span class="text-maroon font-medium">${s.price}</span>
                </div>
                <p class="text-gray-500 text-sm font-light">${s.desc}</p>
            </div>
        </div>
    `).join('');
}

// ── Services Full-Page List ───────────────────
function renderFullServices() {
    const list = document.getElementById('full-services-list');
    if (!list) return;
    list.innerHTML = appState.services.map(s => `
        <div class="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <img src="${s.img}" alt="${s.name}"
                 class="w-full md:w-48 h-48 object-cover rounded-xl shrink-0" loading="lazy">
            <div class="flex-1 flex flex-col justify-center">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="font-serif text-2xl">${s.name}</h3>
                    <span class="text-xl text-maroon font-medium">${s.price}</span>
                </div>
                <p class="text-gray-600 font-light mb-6">${s.desc}</p>
                <a href="#booking"
                   class="bg-maroon text-white px-6 py-2 rounded-full text-sm w-fit
                          hover:bg-maroon-dark transition-colors cursor-hover">
                    Book Service
                </a>
            </div>
        </div>
    `).join('');
}

// ── Catalog Gallery ───────────────────────────
function renderCatalog() {
    filterCatalog('all');
}

function filterCatalog(cat) {
    const gallery = document.getElementById('catalog-gallery');
    if (!gallery) return;
    const items = cat === 'all'
        ? appState.catalogItems
        : appState.catalogItems.filter(i => i.cat === cat);

    gallery.innerHTML = items.map(i => `
        <div class="masonry-item relative group rounded-xl overflow-hidden cursor-pointer">
            <img src="${i.img}" alt="${i.cat} nails"
                 class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                 loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity">
                <span class="text-white text-sm font-medium bg-maroon/80 px-3 py-1 rounded-full">
                    ${i.cat}
                </span>
            </div>
        </div>
    `).join('');
}

// ── Booking Service Dropdown ──────────────────
function renderBookingDropdown() {
    const sel = document.getElementById('bf-service');
    if (!sel) return;
    sel.innerHTML =
        '<option value="">Choose a service...</option>' +
        appState.services.map(s =>
            `<option value="${s.name}">${s.name} — ${s.price}</option>`
        ).join('');
}

// ── Admin: CMS Editor Sync ────────────────────
function syncCmsEditorFields() {
    const preview = document.getElementById('cms-hero-img-preview');
    const main    = document.getElementById('cms-hero-main');
    const desc    = document.getElementById('cms-hero-desc');
    if (preview) preview.src   = appState.hero.bgImage;
    if (main)    main.value    = appState.hero.mainText;
    if (desc)    desc.value    = appState.hero.descText;
}

/** Live-preview hero text while admin types */
window.updateLiveHeroText = function () {
    appState.hero.mainText = document.getElementById('cms-hero-main').value;
    appState.hero.descText = document.getElementById('cms-hero-desc').value;
    const mainEl = document.getElementById('hero-main-text');
    const descEl = document.getElementById('hero-desc-text');
    if (mainEl) mainEl.innerHTML = appState.hero.mainText;
    if (descEl) descEl.innerHTML = appState.hero.descText;
};

// ── Admin: Tables & Lists ─────────────────────

function renderAdminAppointments() {
    const tbody = document.getElementById('admin-appt-table-body');
    if (!tbody) return;
    tbody.innerHTML = appState.appointments.length
        ? appState.appointments.map(a => `
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-4">
                    <div class="font-medium">${a.name}</div>
                    <div class="text-xs text-gray-400">${a.id}</div>
                </td>
                <td class="p-4">${a.service}</td>
                <td class="p-4">${a.date}
                    <span class="text-xs text-gray-500 ml-1">${a.time}</span>
                </td>
                <td class="p-4">
                    <span class="px-2 py-1 rounded text-xs font-medium
                        ${a.status === 'Pending'   ? 'bg-yellow-100 text-yellow-700' :
                          a.status === 'Confirmed' ? 'bg-green-100 text-green-700'   :
                                                     'bg-gray-200 text-gray-600'}">
                        ${a.status}
                    </span>
                </td>
            </tr>
        `).join('')
        : '<tr><td colspan="4" class="p-8 text-center text-gray-400 italic">No appointments yet.</td></tr>';
}

function renderAdminCustomOrders() {
    const tbody = document.getElementById('admin-custom-orders-body');
    if (!tbody) return;
    tbody.innerHTML = appState.customOrders.length
        ? appState.customOrders.map((o, idx) => `
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-4 font-bold text-maroon">${o.id}</td>
                <td class="p-4">${o.name}
                    <br><span class="text-xs text-gray-500">${o.city}</span>
                </td>
                <td class="p-4 text-sm">${o.shape} · ${o.length}</td>
                <td class="p-4">${o.budget}</td>
                <td class="p-4 text-right">
                    <select class="text-xs border rounded p-1 cursor-pointer"
                            onchange="updateOrderStatus(${idx}, this.value)">
                        <option value="New"           ${o.status === 'New'           ? 'selected':''}>New</option>
                        <option value="In Production" ${o.status === 'In Production' ? 'selected':''}>Production</option>
                        <option value="Shipped"       ${o.status === 'Shipped'       ? 'selected':''}>Shipped</option>
                    </select>
                </td>
            </tr>
        `).join('')
        : '<tr><td colspan="5" class="p-8 text-center text-gray-400 italic">No orders yet.</td></tr>';
}

function renderAdminServices() {
    const list = document.getElementById('admin-services-list');
    if (!list) return;
    list.innerHTML = appState.services.length
        ? appState.services.map((s, idx) => `
            <div class="flex items-center gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
                <img src="${s.img}" alt="${s.name}"
                     class="w-12 h-12 object-cover rounded shadow-sm" loading="lazy">
                <div class="flex-1">
                    <p class="text-sm font-medium">${s.name}
                        <span class="text-maroon ml-2">${s.price}</span>
                    </p>
                    <p class="text-xs text-gray-500 truncate">${s.desc}</p>
                </div>
                <button onclick="deleteService(${idx})"
                        class="text-red-500 hover:text-red-700 p-2 transition-colors" title="Delete">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
        `).join('')
        : '<p class="text-sm text-gray-400 text-center py-4 italic">No services yet.</p>';
}

function renderAdminCatalog() {
    const list = document.getElementById('admin-catalog-list');
    if (!list) return;
    list.innerHTML = appState.catalogItems.length
        ? appState.catalogItems.map((c, idx) => `
            <div class="flex items-center gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
                <img src="${c.img}" alt="${c.cat}"
                     class="w-12 h-12 object-cover rounded shadow-sm" loading="lazy">
                <div class="flex-1">
                    <p class="text-sm font-medium">Category: ${c.cat}</p>
                </div>
                <button onclick="deleteCatalogItem(${idx})"
                        class="text-red-500 hover:text-red-700 p-2 transition-colors" title="Delete">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
        `).join('')
        : '<p class="text-sm text-gray-400 text-center py-4 italic">No items yet.</p>';
}

function renderMediaLibrary() {
    const grid = document.getElementById('admin-media-grid');
    if (!grid) return;
    const items = currentMediaFilter === 'All'
        ? appState.mediaLibrary
        : appState.mediaLibrary.filter(m => m.category === currentMediaFilter);

    grid.innerHTML = items.length
        ? items.map((m, idx) => `
            <div class="relative group rounded bg-gray-100 overflow-hidden aspect-square border border-gray-200">
                <img src="${m.url}" alt="${m.title}" class="w-full h-full object-cover" loading="lazy">
                <div class="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100
                            flex items-center justify-center transition-opacity backdrop-blur-sm">
                    <button onclick="deleteMedia(${idx})"
                            class="bg-red-600 text-white w-8 h-8 rounded-full
                                   flex items-center justify-center hover:bg-red-700">
                        <i class="ph ph-trash"></i>
                    </button>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-white/90 px-2 py-1 text-[10px] truncate">
                    ${m.title}
                </div>
            </div>
        `).join('')
        : '<p class="col-span-full text-sm text-gray-400 text-center py-8 italic">No images here.</p>';
}
