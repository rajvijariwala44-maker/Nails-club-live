/* ============================================
   BACKEND — Custom Orders API
   Handles custom order form submission and
   order status management.
   In a real backend: POST /orders, PATCH /orders/:id
   ============================================ */

/**
 * Create a new custom order from the order form.
 * Acts as POST /orders
 */
function handleOrderSubmit(e) {
    e.preventDefault();

    const name   = document.getElementById('co-name').value.trim();
    const city   = document.getElementById('co-city').value.trim();
    const shape  = document.getElementById('co-shape').value;
    const length = document.getElementById('co-length').value;
    const desc   = document.getElementById('co-desc').value.trim();
    const budget = document.getElementById('co-budget').value;

    if (!name || !city || !desc) {
        showModal('Missing Fields', 'Please fill in all required fields.');
        return;
    }

    const order = {
        id    : 'TNC-2026-' + Math.floor(Math.random() * 9000 + 1000),
        name,
        city,
        shape,
        length,
        desc,
        budget,
        status: 'New',
        date  : new Date().toISOString().split('T')[0]
    };

    // "INSERT INTO custom_orders"
    appState.customOrders.unshift(order);
    saveGlobalState();
    e.target.reset();

    showModal('Order Received!', `
        <div class="text-center py-2">
            <i class="ph ph-sparkle text-5xl text-maroon mb-3 block"></i>
            <p class="text-gray-600">
                Your custom nail order <strong>${order.id}</strong> has been saved.
            </p>
            <p class="text-xs text-gray-400 mt-3">We'll reach out to confirm your design.</p>
        </div>
    `);
    window.location.hash = '#home';
}

/**
 * Update status of a custom order.
 * Acts as PATCH /orders/:idx  { status }
 */
window.updateOrderStatus = function (idx, val) {
    if (!appState.customOrders[idx]) return;
    appState.customOrders[idx].status = val;
    saveGlobalState();
};
