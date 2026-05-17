/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {

    // ── Past Events Filter ──────────────────────────────
    const filterPills = document.querySelectorAll('.filter-pill');
    const pastCards = document.querySelectorAll('.past-event-card');
    const noResultsMsg = document.getElementById('noResultsMsg');

    filterPills.forEach(pill => {
        pill.addEventListener('click', function () {
            // Update active pill
            filterPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            let visibleCount = 0;

            pastCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (noResultsMsg) {
                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    });

    // ── Scroll-reveal animation for event cards ─────────
    const animatables = document.querySelectorAll('.event-card, .past-event-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${(i % 3) * 0.1}s`;
                    entry.target.classList.add('card-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animatables.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

});

// Add CSS for the card-visible state via JS so it doesn't depend on a separate rule
const style = document.createElement('style');
style.textContent = `.card-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// Lee Promotions — Past Events Page JS

document.addEventListener('DOMContentLoaded', function () {

    const cards       = document.querySelectorAll('.pe-card');
    const filterPills = document.querySelectorAll('.filter-pill');
    const searchInput = document.getElementById('peSearch');
    const clearBtn    = document.getElementById('peSearchClear');
    const noResults   = document.getElementById('peNoResults');
    const resetBtn    = document.getElementById('peResetBtn');
    const countEl     = document.getElementById('peResultsCount');

    let activeFilter = 'all';
    let searchQuery  = '';

    // ── Scroll-reveal on load ──────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('pe-visible');
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => revealObserver.observe(card));

    // ── Filter logic ───────────────────────────────────
    function applyFilters() {
        let visible = 0;

        cards.forEach(card => {
            const category = card.dataset.category || '';
            const title    = (card.dataset.title || '').toLowerCase();
            const desc     = (card.querySelector('.pe-card-desc')?.textContent || '').toLowerCase();
            const venue    = (card.querySelector('.pe-card-venue')?.textContent || '').toLowerCase();

            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = searchQuery === '' ||
                title.includes(searchQuery) ||
                desc.includes(searchQuery)  ||
                venue.includes(searchQuery);

            if (matchesFilter && matchesSearch) {
                card.classList.remove('pe-hidden');
                // Re-trigger reveal if not already visible
                if (!card.classList.contains('pe-visible')) {
                    card.classList.add('pe-visible');
                }
                visible++;
            } else {
                card.classList.add('pe-hidden');
            }
        });

        // Update count
        if (countEl) countEl.textContent = visible;

        // Show/hide no results
        if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    // ── Filter pills ───────────────────────────────────
    filterPills.forEach(pill => {
        pill.addEventListener('click', function () {
            filterPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.dataset.filter;
            applyFilters();
        });
    });

    // ── Search input ───────────────────────────────────
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            searchQuery = this.value.trim().toLowerCase();
            if (clearBtn) clearBtn.classList.toggle('visible', searchQuery.length > 0);
            applyFilters();
        });
    }

    // ── Clear search ───────────────────────────────────
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            searchQuery = '';
            this.classList.remove('visible');
            applyFilters();
            searchInput.focus();
        });
    }

    // ── Reset button (no results state) ───────────────
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            // Reset filter
            filterPills.forEach(p => p.classList.remove('active'));
            document.querySelector('[data-filter="all"]')?.classList.add('active');
            activeFilter = 'all';
            // Reset search
            if (searchInput) searchInput.value = '';
            if (clearBtn) clearBtn.classList.remove('visible');
            searchQuery = '';
            applyFilters();
        });
    }

});