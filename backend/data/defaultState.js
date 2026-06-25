/* ============================================
   BACKEND — Default Seed Data
   This is the factory-reset state of the app.
   In a real backend this would be a database
   seed file (SQL/JSON/migration).
   ============================================ */

const defaultState = {

    hero: {
        bgImage  : 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        mainText : 'Elevate Your <br> <i class="font-light italic text-maroon">Aesthetics.</i>',
        descText : 'Experience world-class nail artistry in a serene, luxurious environment. Your perfect set awaits.'
    },

    services: [
        {
            id   : 's1',
            name : 'Nail Extensions',
            desc : 'Premium acrylic or hard gel extensions sculpted to perfection.',
            price: '$85+',
            img  : 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500'
        },
        {
            id   : 's2',
            name : 'Soft Gel Extensions',
            desc : 'Lightweight, natural-feeling extensions applied with gel.',
            price: '$75+',
            img  : 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500'
        },
        {
            id   : 's3',
            name : 'Gel Polish Manicure',
            desc : 'Long-lasting, high-shine gel polish on natural nails.',
            price: '$55+',
            img  : 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=500'
        }
    ],

    catalogItems: [
        { id: 'c1', cat: 'Bridal',  img: 'https://images.unsplash.com/photo-1590159763121-7c913ad11eb1?w=600' },
        { id: 'c2', cat: 'Minimal', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600' },
        { id: 'c3', cat: 'Chrome',  img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600' }
    ],

    appointments: [
        {
            id     : 'APT-101',
            name   : 'Emma Watson',
            service: 'Gel Polish Manicure',
            date   : '2026-06-25',
            time   : '10:00',
            status : 'Pending'
        }
    ],

    customOrders: [
        {
            id    : 'TNC-2026-0001',
            name  : 'Priya Sharma',
            city  : 'Mumbai',
            shape : 'Almond',
            length: 'Medium',
            budget: '₹1000 - ₹2000',
            status: 'New',
            date  : '2026-06-22'
        }
    ],

    mediaLibrary: [
        {
            id      : 'm1',
            url     : 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=300',
            category: 'Banners',
            title   : 'Hero BG'
        },
        {
            id      : 'm2',
            url     : 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=300',
            category: 'Services',
            title   : 'Service Sample'
        }
    ]

};
