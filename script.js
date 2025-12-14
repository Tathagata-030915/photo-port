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

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalInfo = document.querySelector('.modal-info');
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
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Open modal when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const photoId = this.getAttribute('data-photo-id');
            const photo = photoData[photoId];

            if (photo) {
                // Set content first
                modalImage.src = photo.image;
                modalImage.alt = `Photo ${photoId}`;
                modalQuote.textContent = photo.quote;
                modalLocation.textContent = photo.location;
                modalDate.textContent = photo.date;
                modalStory.innerHTML = `<p>${photo.story}</p>`;

                // Remove active class if it exists (for reset)
                modal.classList.remove('active');
                
                // Force reflow to ensure reset is applied
                void modal.offsetHeight;
                
                // Show modal and trigger animations
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
        });
    });

    // Close modal with fade-out animation
    function closeModal() {
        // Remove active class to trigger fade-out
        modal.classList.remove('active');
        
        // Reset body overflow after animation completes
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    }

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Responsive offset based on screen size
                const isMobile = window.innerWidth <= 768;
                const offsetTop = target.offsetTop - (isMobile ? 70 : 80);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe gallery items and gear items
    document.querySelectorAll('.gallery-item, .gear-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        function toggleBackToTop() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const showThreshold = 300; // Show after scrolling 300px
            
            if (scrollPosition > showThreshold) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        // Smooth scroll to top
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Keyboard support (Enter and Space)
        backToTopButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });

        // Check scroll position on scroll and on load
        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop(); // Check initial state
    }
});

