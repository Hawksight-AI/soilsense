// Modern JavaScript with Latest Libraries and Animations

// Initialize all modern features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeModernFeatures();
});

function initializeModernFeatures() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Particles.js
    initializeParticles();

    // Initialize GSAP Animations
    initializeGSAP();

    // Initialize Lottie Loading Animation
    initializeLottie();

    // Initialize Enhanced Loading Screen
    initializeLoadingScreen();

    // Initialize Enhanced Interactions
    initializeEnhancedInteractions();

    // Initialize Three.js Background (if needed)
    // initializeThreeJS();

    // Initialize Swiper for carousels
    initializeSwiper();

    // Initialize Enhanced Charts
    initializeEnhancedCharts();

    // Initialize Voice Recognition
    initializeVoiceRecognition();

    // Initialize Gesture Controls
    initializeGestureControls();
}

// Particles.js Configuration
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#10B981'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#10B981',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// GSAP Animations
function initializeGSAP() {
    if (typeof gsap !== 'undefined') {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

        // Header scroll effect
        gsap.to('.header', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top -100',
                end: '+=100',
                scrub: true
            },
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        });

        // Floating elements animation
        gsap.to('.floating-icon', {
            y: -20,
            rotation: 360,
            duration: 6,
            ease: 'power2.inOut',
            stagger: 2,
            repeat: -1,
            yoyo: true
        });

        // Welcome card entrance
        gsap.from('.welcome-card', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            scale: 0.8,
            ease: 'power3.out',
            delay: 0.5
        });

        // Action cards stagger
        gsap.from('.action-card', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 1
        });

        // Crop cards entrance
        gsap.from('.crop-card', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.2,
            delay: 1.5
        });

        // Progress bars animation
        gsap.to('.progress-fill', {
            width: '100%',
            duration: 2,
            ease: 'power2.out',
            delay: 2
        });

        // Weather icon floating
        gsap.to('.weather-icon', {
            y: -10,
            rotation: 5,
            duration: 4,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
        });

        // Chat widget entrance
        gsap.from('.chat-widget', {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 3
        });
    }
}

// Lottie Loading Animation
function initializeLottie() {
    if (typeof lottie !== 'undefined') {
        const loadingAnimation = lottie.loadAnimation({
            container: document.getElementById('lottie-loading'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets2.lottiefiles.com/packages/lf20_UJNc2t.json' // Farming animation
        });
    }
}

// Enhanced Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.getElementById('loading-progress');
    const loadingText = document.getElementById('loading-text');
    const app = document.getElementById('app');

    if (loadingScreen && loadingProgress && loadingText) {
        let progress = 0;
        const loadingSteps = [
            'Initializing your farming assistant...',
            'Loading crop data...',
            'Connecting to weather services...',
            'Setting up market intelligence...',
            'Preparing AI chat...',
            'Ready to help!'
        ];

        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;

            loadingProgress.style.width = progress + '%';
            loadingText.textContent = loadingSteps[Math.floor((progress / 100) * (loadingSteps.length - 1))];

            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            loadingScreen.style.display = 'none';
                            app.style.display = 'block';
                            gsap.from(app, {
                                opacity: 0,
                                duration: 0.5
                            });
                        }
                    });
                }, 500);
            }
        }, 200);
    }
}

// Enhanced Interactions
function initializeEnhancedInteractions() {
    // Enhanced hover effects
    const cards = document.querySelectorAll('.glass-effect');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Enhanced button clicks
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced scroll effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.particles-background');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Enhanced drag and drop
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            handleFileUpload(e.dataTransfer.files[0]);
        });
    }
}

// Swiper Initialization
function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
        // Initialize any carousels if needed
        const swiperContainers = document.querySelectorAll('.swiper-container');
        swiperContainers.forEach(container => {
            new Swiper(container, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });
        });
    }
}

// Enhanced Charts
function initializeEnhancedCharts() {
    if (typeof Chart !== 'undefined') {
        // Enhanced wheat chart
        const wheatCtx = document.getElementById('wheat-chart');
        if (wheatCtx) {
            new Chart(wheatCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Wheat Price',
                        data: [2200, 2350, 2400, 2450, 2500, 2450],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#6B7280'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#6B7280'
                            }
                        }
                    }
                }
            });
        }

        // Enhanced mustard chart
        const mustardCtx = document.getElementById('mustard-chart');
        if (mustardCtx) {
            new Chart(mustardCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Mustard Price',
                        data: [5200, 5150, 5100, 5050, 5000, 5200],
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#6B7280'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#6B7280'
                            }
                        }
                    }
                }
            });
        }
    }
}

// Voice Recognition
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        // Add voice input button to chat
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            const voiceBtn = document.createElement('button');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.className = 'voice-btn';
            voiceBtn.style.cssText = `
                position: absolute;
                right: 50px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: #10B981;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
            `;

            voiceBtn.addEventListener('click', () => {
                recognition.start();
                voiceBtn.style.background = 'rgba(16, 185, 129, 0.1)';
                voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                chatInput.value = transcript;
                voiceBtn.style.background = 'none';
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            };

            recognition.onerror = () => {
                voiceBtn.style.background = 'none';
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            };

            chatInput.parentNode.style.position = 'relative';
            chatInput.parentNode.appendChild(voiceBtn);
        }
    }
}

// Gesture Controls
function initializeGestureControls() {
    let startX, startY, startTime;
    let isGesture = false;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
        isGesture = false;
    });

    document.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;

        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        const deltaTime = Date.now() - startTime;

        if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
            isGesture = true;
        }
    });

    document.addEventListener('touchend', (e) => {
        if (!isGesture) return;

        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;
        const deltaTime = Date.now() - startTime;

        // Swipe right to go back
        if (deltaX > 100 && Math.abs(deltaY) < 50) {
            history.back();
        }

        // Swipe left to go forward
        if (deltaX < -100 && Math.abs(deltaY) < 50) {
            history.forward();
        }

        // Swipe up to refresh
        if (deltaY < -100 && Math.abs(deltaX) < 50) {
            location.reload();
        }

        startX = startY = null;
        isGesture = false;
    });
}

// File Upload Handler
function handleFileUpload(file) {
    if (!file) return;

    const uploadArea = document.getElementById('upload-area');
    const analysisResults = document.getElementById('analysis-results');

    // Show loading state
    uploadArea.innerHTML = `
        <div class="upload-loading">
            <div class="loading-spinner"></div>
            <p>Analyzing your crop image...</p>
        </div>
    `;

    // Simulate analysis
    setTimeout(() => {
        uploadArea.style.display = 'none';
        analysisResults.style.display = 'block';

        // Animate results entrance
        gsap.from(analysisResults, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: 'power2.out'
        });
    }, 2000);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(400px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    gsap.to(notification, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out'
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        gsap.to(notification, {
            x: 400,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        gsap.to(notification, {
            x: 400,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    });
}

// Export functions for global use
window.SoilSense = {
    showNotification,
    handleFileUpload,
    initializeModernFeatures
}; 