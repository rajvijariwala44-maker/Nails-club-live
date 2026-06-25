/* ============================================
   BACKEND — Storage Layer (localStorage API)
   Simulates a database persistence layer.
   In a real backend: replace localStorage calls
   with fetch() to a REST/GraphQL API.
   ============================================ */

const DB_KEY = 'aura_state';

/**
 * Load persisted state from storage.
 * Falls back to defaultState if nothing is saved.
 */
function loadState() {
    try {
        const saved = localStorage.getItem(DB_KEY);
        return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultState));
    } catch (err) {
        console.warn('[Storage] Failed to parse saved state, using defaults.', err);
        return JSON.parse(JSON.stringify(defaultState));
    }
}

/**
 * Persist current appState to storage.
 * Returns true on success.
 */
function persistState(state) {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(state));
        return true;
    } catch (err) {
        console.error('[Storage] Could not save state (localStorage full?).', err);
        return false;
    }
}

/**
 * Wipe all stored data and reset to defaults.
 * Used by admin "Reset" if added in future.
 */
function resetState() {
    localStorage.removeItem(DB_KEY);
    return JSON.parse(JSON.stringify(defaultState));
}

// Compress an uploaded image to base64 JPEG via Canvas
// (Belongs here because it's a data-processing utility)
function compressImage(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas    = document.createElement('canvas');
            const MAX_WIDTH = 800;
            let width  = img.width;
            let height = img.height;
            if (width > MAX_WIDTH) {
                height = Math.round(height * MAX_WIDTH / width);
                width  = MAX_WIDTH;
            }
            canvas.width  = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            callback(canvas.toDataURL('image/jpeg', 0.8));
        };
    };
}
