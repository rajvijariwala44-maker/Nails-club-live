/* ============================================
   BACKEND — Media Library API
   Upload and delete images from the media store.
   In a real backend: POST /media (multipart/form-data
   → S3/Cloudinary), DELETE /media/:id
   ============================================ */

/**
 * Upload the hero background image.
 * Acts as POST /media/hero
 */
window.handleHeroImageUpload = function (e) {
    const file = e.target.files[0];
    if (!file) return;

    compressImage(file, base64 => {
        appState.hero.bgImage = base64;

        // Also register in the central media library
        appState.mediaLibrary.push({
            id      : 'm' + Date.now(),
            url     : base64,
            category: 'Banners',
            title   : 'Uploaded Hero BG'
        });

        renderLiveSite();
        saveGlobalState();
    });
};

/**
 * Upload any image to the central media library.
 * Acts as POST /media
 */
window.handleLibraryUpload = function (e) {
    const file = e.target.files[0];
    if (!file) return;

    compressImage(file, base64 => {
        appState.mediaLibrary.push({
            id      : 'm' + Date.now(),
            url     : base64,
            category: 'General',
            title   : file.name
        });

        renderMediaLibrary();
        saveGlobalState();
    });
};

/**
 * Filter the media library view by category.
 * Acts as GET /media?category=X
 */
window.filterMedia = function (cat) {
    currentMediaFilter = cat;    // currentMediaFilter lives in backend/state.js
    renderMediaLibrary();
};

/**
 * Delete a media item by its visible index.
 * Acts as DELETE /media/:id
 */
window.deleteMedia = function (visibleIdx) {
    const visibleList = currentMediaFilter === 'All'
        ? appState.mediaLibrary
        : appState.mediaLibrary.filter(m => m.category === currentMediaFilter);

    const item = visibleList[visibleIdx];
    if (!item) return;
    if (!confirm('Delete this image?')) return;

    const realIdx = appState.mediaLibrary.findIndex(m => m.id === item.id);
    if (realIdx !== -1) appState.mediaLibrary.splice(realIdx, 1);

    renderMediaLibrary();
    saveGlobalState();
};
