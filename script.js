// Photo data - Update this with your actual photo information
const photoData = {
    1: {
        image: 'images/TAT-5349.jpg',
        quote: '"In every moment, there is a story waiting to be told."',
        location: 'Location Name',
        date: 'Month Year',
        story: 'This photograph captures a moment of quiet reflection. The interplay of light and shadow creates a sense of depth and emotion, inviting the viewer to pause and contemplate the beauty found in everyday moments.'
    },
    2: {
        image: 'images/TAT--14.jpg',
        quote: '"Photography is the art of making memories tangible."',
        location: 'Location Name',
        date: 'Month Year',
        story: 'Every frame tells a story, and this one speaks of the delicate balance between nature and human presence. The composition guides the eye through the scene, revealing details that might otherwise go unnoticed.'
    },
    3: {
        image: 'images/TAT-5354.jpg',
        quote: '"The best camera is the one that\'s with you when inspiration strikes."',
        location: 'Location Name',
        date: 'Month Year',
        story: 'Captured during golden hour, this image embodies the warmth and tranquility of the moment. The soft, diffused light creates an atmosphere that feels both timeless and immediate.'
    },
    4: {
        image: 'images/TAT-3.jpg',
        quote: '"Photography is a way of feeling, of touching, of loving."',
        location: 'Location Name',
        date: 'Month Year',
        story: 'This photograph represents the beauty found in simplicity. Through careful composition and attention to detail, ordinary subjects are transformed into something extraordinary.'
    },
    5: {
        image: 'images/TAT-3_1.jpg',
        quote: '"A photograph is memory in the raw."',
        location: 'Location Name',
        date: 'Month Year',
        story: 'The story behind this image is one of patience and observation. Waiting for the perfect moment when all elements align—light, composition, and emotion—creates a photograph that resonates beyond the visual.'
    },
    6: {
        image: 'images/TAT-11.jpg',
        quote: '"Photography takes an instant out of time, altering life by holding it still."',
        location: 'Location Name',
        date: 'Month Year',
        story: 'This frame captures the essence of a fleeting moment, preserved forever through the lens. The details, the atmosphere, and the emotion all come together to tell a story that words alone cannot convey.'
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
});

