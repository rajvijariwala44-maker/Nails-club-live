/* ============================================
   BACKEND — Appointments API
   Handles booking form submission and
   appointment CRUD operations.
   In a real backend: these become POST/GET/PATCH
   handlers in Express / FastAPI / etc.
   ============================================ */

/**
 * Create a new appointment from the booking form.
 * Called on form submit — acts as POST /appointments
 */
function handleBookingSubmit(e) {
    e.preventDefault();

    const name    = document.getElementById('bf-name').value.trim();
    const service = document.getElementById('bf-service').value;
    const date    = document.getElementById('bf-date').value;
    const time    = document.getElementById('bf-time').value;

    // Basic validation
    if (!name || !service || !date || !time) {
        showModal('Missing Fields', 'Please fill in all fields before confirming.');
        return;
    }

    const appt = {
        id     : 'APT-' + Math.floor(Math.random() * 9000 + 1000),
        name,
        service,
        date,
        time,
        status : 'Pending'
    };

    // "INSERT INTO appointments"
    appState.appointments.unshift(appt);
    saveGlobalState();
    e.target.reset();

    showModal('Booking Received!', `
        <div class="text-center py-2">
            <i class="ph ph-calendar-check text-5xl text-maroon mb-3 block"></i>
            <p class="text-gray-600">
                Your appointment for <strong>${appt.service}</strong>
                on <strong>${appt.date}</strong> at <strong>${appt.time}</strong>
                has been requested.
            </p>
            <p class="text-xs text-gray-400 mt-3">We'll confirm within 24 hours.</p>
        </div>
    `);
    window.location.hash = '#home';
}
