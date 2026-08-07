// Photo data - Update this with your actual photo information
const photoData = {
    1: {
        image: 'images/TAT-5349.jpg',
        quote: '"Sometimes it\'s important to take a pause and rest to comprehend what is actually happening in this rapidly moving world where every human soul is competing with each other - never pausing to contemplate and understand the real meaning of life."',
        location: 'Kolkata - Maidan, West Bengal, India',
        date: '21st June 2024',
        story: 'This photograph captures a moment of scilence and a subtle pause. The interplay of light and shadow creates a sense of depth and emotion, inviting the viewer to pause and contemplate the beauty found in everyday moments. I have tried to make the still cinematic, with warm tones in portions of highlights and cool tones in portions of shadows, creating a sense of depth and emotion and contrast.'
    },
    2: {
        image: 'images/TAT--14.jpg',
        quote: '"She carries the weight of the day with a silence louder than traffic."',
        location: 'Kolkata - Maidan, West Bengal, India',
        date: '21st June 2024',
        story: 'Morning traffic roars past, impatient and unaware. She pauses between tasks, broom resting lightly in her hands, watching a city that rarely looks back. By the time the road forgets her presence, the dust will be gone, and the day will move on — cleaner, quieter, unchanged.'
    },
    3: {
        image: 'images/TAT-5354.jpg',
        quote: '"The city changes. The ride remains."',
        location: 'Kolkata - Maidan, West Bengal, India',
        date: '21st June 2024',
        story: 'The Ambassador moves at its own pace, unbothered by urgency. While newer machines rush past, this one carries memory instead of speed — routes learned by habit, stories exchanged in silence, and a city that still trusts what has endured. Unfortunately, this symbol of heritage and aesthetic of Kolkata, now discontunued, slowly being forgotten, fading away into the past.'
    },
    4: {
        image: 'images/TAT-3.jpg',
        quote: '"Not every moment is meant to be seen. Some are meant to be carried."',
        location: 'Kolkata - Esplanade, West Bengal, India',
        date: '2nd January 2025',
        story: 'Amid the cluttered noise of the street, he stands still for a moment that belongs only to him. Conversations pass, bodies move, transactions continue — but this pause remains untouched, heavy with years that don\'t need to be explained.'
    },
    5: {
        image: 'images/TAT-3_1.jpg',
        quote: '"What was asked has already been heard. "',
        location: 'Kolkata - Lake Kalibari, West Bengal, India',
        date: '6th July 2025',
        story: 'The flames are small, almost hesitant, but the smoke rises without doubt. Prayers have already been offered — some spoken, some left unfinished. What remains is not belief itself, but its trace, suspended briefly before the city absorbs it.'
    },
    6: {
        image: 'images/TAT-11.jpg',
        quote: '"Some work is done with heat, not haste."',
        location: 'Kolkata - Salt Lake, Karunamoyee, West Bengal, India',
        date: '1st January 2025',
        story: 'Steam lifts slowly as practiced hands move without hesitation. No instructions are needed here — only memory, rhythm, and attention shaped by repetition. In this small exchange of heat and care, the day is prepared one vessel at a time.'
    }
};

// ============================
// Gallery Modal
// ============================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalQuote = document.getElementById('modalQuote');
    const modalLocation = document.getElementById('modalLocation');
    const modalDate = document.getElementById('modalDate');
    const modalStory = document.getElementById('modalStory');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Open gallery modal
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const photoId = this.getAttribute('data-photo-id');
            const photo = photoData[photoId];

            if (photo) {
                modalImage.src = photo.image;
                modalImage.alt = `Photo ${photoId}`;
                modalQuote.textContent = photo.quote;

                const encodedLocation = encodeURIComponent(photo.location);
                modalLocation.href = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
                modalLocation.textContent = photo.location;

                modalDate.textContent = photo.date;
                modalStory.innerHTML = `<p>${photo.story}</p>`;

                modal.classList.remove('active');
                void modal.offsetHeight;
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => { document.body.style.overflow = ''; }, 300);
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target.closest('.modal-content a') || e.target.closest('.modal-content button')) return;
        if (e.target === modal || e.target.classList.contains('modal-overlay')) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const isMobile = window.innerWidth <= 768;
                    window.scrollTo({ top: target.offsetTop - (isMobile ? 70 : 80), behavior: 'smooth' });
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.style.boxShadow = window.pageYOffset > 100
            ? '0 2px 20px rgba(0,0,0,0.1)'
            : '0 2px 20px rgba(0,0,0,0.05)';
    });

    // Intersection observer fade-in
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.gallery-item, .gear-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Back to top
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        function toggleBackToTop() {
            const pos = window.pageYOffset || document.documentElement.scrollTop;
            backToTopButton.classList.toggle('visible', pos > 300);
        }
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        backToTopButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();
    }
});

// ============================
// Project Folder Lightbox Logic
// ============================
document.addEventListener('DOMContentLoaded', function () {

    // Open: click on .project-folder opens #lightbox-{data-project}
    document.querySelectorAll('.project-folder').forEach(function (folder) {
        folder.addEventListener('click', function () {
            const projectId = folder.getAttribute('data-project');
            const lightbox = document.getElementById('lightbox-' + projectId);
            if (!lightbox) return;

            lightbox.style.display = 'flex';
            void lightbox.offsetHeight; // force reflow so transition fires
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close a lightbox panel
    function closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(function () {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 350);
    }

    // Close button inside each lightbox
    document.querySelectorAll('.lightbox-close').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const lightbox = btn.closest('.project-lightbox');
            if (lightbox) closeLightbox(lightbox);
        });
    });

    // Click backdrop to close
    document.querySelectorAll('.project-lightbox').forEach(function (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
                closeLightbox(lightbox);
            }
        });
    });

    // Escape closes lightbox only if viewer is NOT open
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const viewer = document.getElementById('projViewer');
            if (viewer && viewer.classList.contains('active')) return; // viewer handles its own Escape
            document.querySelectorAll('.project-lightbox.active').forEach(closeLightbox);
        }
    });
});

// ============================
// Project Image Viewer
// (opens when a photo inside a lightbox grid is clicked)
// ============================
document.addEventListener('DOMContentLoaded', function () {
    const viewer        = document.getElementById('projViewer');
    const viewerImg     = document.getElementById('projViewerImg');
    const viewerClose   = document.getElementById('projViewerClose');
    const viewerPrev    = document.getElementById('projViewerPrev');
    const viewerNext    = document.getElementById('projViewerNext');
    const viewerCounter = document.getElementById('projViewerCounter');
    const backdrop      = document.getElementById('projViewerBackdrop');

    let images  = [];
    let current = 0;

    // Update nav button states + counter
    function updateNav() {
        viewerPrev.disabled = (current === 0);
        viewerNext.disabled = (current === images.length - 1);
        viewerCounter.textContent = (current + 1) + ' / ' + images.length;
    }

    // Cross-fade to a new image src
    function fadeImage(src, alt) {
        viewerImg.style.transition = 'opacity 0.18s ease';
        viewerImg.style.opacity = '0';
        setTimeout(function () {
            viewerImg.src = src;
            viewerImg.alt = alt;
            viewerImg.style.transition = 'opacity 0.3s ease';
            viewerImg.style.opacity = '1';
        }, 200);
    }

    // Open viewer at a specific index within an image list
    function openViewer(imgList, index) {
        images  = imgList;
        current = index;

        // Load image first with no transition
        viewerImg.style.transition = 'none';
        viewerImg.style.opacity    = '1';
        viewerImg.src = images[current].src;
        viewerImg.alt = images[current].alt;
        updateNav();

        // Adding .active triggers the CSS opacity/visibility transition
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close viewer — lightbox stays open underneath
    function closeViewer() {
        viewer.classList.remove('active');
        // body stays overflow:hidden because lightbox is still open
    }

    // Wire every lightbox-item inside every project-lightbox
    document.querySelectorAll('.project-lightbox').forEach(function (lightbox) {
        const items = lightbox.querySelectorAll('.lightbox-item');
        items.forEach(function (item, idx) {
            item.addEventListener('click', function (e) {
                e.stopPropagation(); // stop backdrop-close from firing
                const imgList = Array.from(items).map(function (el) {
                    const img = el.querySelector('.lightbox-img');
                    return { src: img.src, alt: img.alt };
                });
                openViewer(imgList, idx);
            });
        });
    });

    // Controls
    viewerClose.addEventListener('click', closeViewer);
    backdrop.addEventListener('click', closeViewer);

    viewerPrev.addEventListener('click', function () {
        if (current > 0) {
            current--;
            updateNav();
            fadeImage(images[current].src, images[current].alt);
        }
    });

    viewerNext.addEventListener('click', function () {
        if (current < images.length - 1) {
            current++;
            updateNav();
            fadeImage(images[current].src, images[current].alt);
        }
    });

    // Keyboard: Escape closes viewer, arrows navigate
    document.addEventListener('keydown', function (e) {
        if (!viewer.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeViewer();
        } else if (e.key === 'ArrowLeft' && current > 0) {
            current--;
            updateNav();
            fadeImage(images[current].src, images[current].alt);
        } else if (e.key === 'ArrowRight' && current < images.length - 1) {
            current++;
            updateNav();
            fadeImage(images[current].src, images[current].alt);
        }
    });
});

// ============================
// Visitor Counter
// ============================
(function initVisitorCounter() {
    var NAMESPACE   = 'photo-port-tathagata';
    var KEY         = 'visitors';
    var SEED        = 5;          // starting count (represents visits before this feature)
    var LS_KEY      = 'vc_local'; // localStorage fallback key
    var display     = document.getElementById('visitorCountDisplay');

    if (!display) return;

    // Animate the number rolling up from 0 → target
    function animateCount(target) {
        var start    = 0;
        var duration = 1200; // ms
        var startTs  = null;

        // Use easeOutExpo for a premium feel
        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function step(ts) {
            if (!startTs) startTs = ts;
            var progress = Math.min((ts - startTs) / duration, 1);
            var current  = Math.floor(easeOutExpo(progress) * target);
            display.textContent = current.toLocaleString();
            display.classList.add('counting');

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                display.textContent = target.toLocaleString();
                display.classList.remove('counting');
            }
        }

        requestAnimationFrame(step);
    }

    // localStorage fallback: increment locally and show that value
    function localFallback() {
        var stored = parseInt(localStorage.getItem(LS_KEY), 10);
        var count  = isNaN(stored) ? SEED : stored + 1;
        localStorage.setItem(LS_KEY, count);
        animateCount(count);
    }

    // --- Primary path: CountAPI ---
    // Step 1: try to SET the initial seed (will only work once; subsequent calls no-op or fail gracefully)
    // Step 2: hit the counter endpoint to increment + retrieve the live count.
    //
    // CountAPI free tier: https://api.countapi.xyz
    // We use /set to seed on first-ever call, then /hit for every page load.
    // If the namespace+key already exists the /set call will return an error which we ignore.

    var baseUrl  = 'https://api.countapi.xyz';
    var hitUrl   = baseUrl + '/hit/' + NAMESPACE + '/' + KEY;
    var setUrl   = baseUrl + '/set/' + NAMESPACE + '/' + KEY + '?value=' + SEED;

    // Try to hit the counter directly (fastest path for returning visitors)
    fetch(hitUrl, { mode: 'cors' })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data && typeof data.value === 'number') {
                animateCount(data.value);
                localStorage.setItem(LS_KEY, data.value); // keep local in sync
            } else {
                localFallback();
            }
        })
        .catch(function () {
            // CountAPI unavailable — seed it first, then try again; else fall back to local
            fetch(setUrl, { mode: 'cors' })
                .then(function (r) { return r.json(); })
                .then(function () {
                    return fetch(hitUrl, { mode: 'cors' });
                })
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    if (data && typeof data.value === 'number') {
                        animateCount(data.value);
                        localStorage.setItem(LS_KEY, data.value);
                    } else {
                        localFallback();
                    }
                })
                .catch(localFallback);
        });
})();
