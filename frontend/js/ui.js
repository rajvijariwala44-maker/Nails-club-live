/* ============================================
   FRONTEND — UI Interactions
   Cursor, magnetic buttons, modal, animations,
   smooth scroll, mobile menu, catalog filters.
   ============================================ */

// ── Modal ─────────────────────────────────────

function showModal(title, body, hideBtn = false) {
    document.getElementById('modal-title').innerText            = title;
    document.getElementById('modal-body').innerHTML             = body;
    document.getElementById('modal-default-btn').style.display = hideBtn ? 'none' : 'block';

    const modal   = document.getElementById('custom-modal');
    const content = document.getElementById('modal-content');
    modal.classList.remove('hidden');
    void modal.offsetWidth;                       // force reflow
    modal.classList.add('opacity-100');
    content.classList.replace('scale-95', 'scale-100');
}

function closeModal() {
    const modal   = document.getElementById('custom-modal');
    const content = document.getElementById('modal-content');
    modal.classList.remove('opacity-100');
    content.classList.replace('scale-100', 'scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// ── Custom Cursor ─────────────────────────────

function initCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

    document.querySelectorAll('a, button, .cursor-hover').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ── Magnetic Buttons ──────────────────────────

function initMagneticButtons() {
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
        wrap.addEventListener('mousemove', e => {
            const rect = wrap.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width  / 2) * 0.2;
            const y = (e.clientY - rect.top  - rect.height / 2) * 0.2;
            wrap.style.transform  = `translate(${x}px, ${y}px)`;
            wrap.style.transition = 'transform 0.1s ease';
        });
        wrap.addEventListener('mouseleave', () => {
            wrap.style.transform  = 'translate(0, 0)';
            wrap.style.transition = 'transform 0.3s ease';
        });
    });
}

// ── Mobile Menu ───────────────────────────────

function initMobileMenu() {
    document.getElementById('mobile-menu-btn')
        ?.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

    document.querySelectorAll('.mobile-link').forEach(l =>
        l.addEventListener('click', () =>
            document.getElementById('mobile-menu').classList.add('hidden')
        )
    );
}

// ── Catalog Filter Buttons ────────────────────

function initCatalogFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-maroon', 'text-white', 'border-maroon');
                b.classList.add('border-gray-300');
            });
            e.target.classList.add('bg-maroon', 'text-white', 'border-maroon');
            e.target.classList.remove('border-gray-300');
            filterCatalog(e.target.dataset.filter);
        });
    });
}

// ── Admin Tab Switching ───────────────────────

function initAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', e => {
            document.querySelectorAll('.admin-tab').forEach(t => {
                t.classList.remove('border-maroon', 'text-maroon', 'active');
                t.classList.add('border-transparent', 'text-gray-500');
            });
            e.target.classList.add('border-maroon', 'text-maroon', 'active');
            e.target.classList.remove('border-transparent', 'text-gray-500');
            document.querySelectorAll('.admin-pane').forEach(p => p.classList.add('hidden'));
            document.getElementById(e.target.dataset.target)?.classList.remove('hidden');
        });
    });
}

// ── Smooth Scroll (Lenis) ─────────────────────

function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ duration: 1.2, smooth: true });

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => lenis.raf(time * 1000));
    }
}

// ── GSAP Animations ───────────────────────────

function initGSAP() {
    if (typeof gsap === 'undefined') return;

    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        document.getElementById('navbar')
            ?.classList.toggle('shadow-lg', window.scrollY > 50);
    });

    // Hero entrance animation
    gsap.from('.gsap-hero', {
        y: 50, opacity: 0, duration: 1,
        stagger: 0.2, ease: 'power3.out', delay: 0.2
    });

    // Scroll-triggered fade-ups
    if (typeof ScrollTrigger !== 'undefined') {
        document.querySelectorAll('.gsap-fade-up').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
            });
        });
    }
}
