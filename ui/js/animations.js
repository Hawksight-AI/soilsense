// SoilSense - Animations JavaScript

// Animation Controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.intersectionObserver = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupClickAnimations();
        this.setupLoadingAnimations();
    }
    
    // Setup intersection observer for scroll animations
    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }
    
    // Setup scroll-triggered animations
    setupScrollAnimations() {
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });
    }
    
    // Setup hover animations
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('.hover-lift, .hover-glow, .hover-scale, .hover-rotate');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHoverEffect(element);
            });
        });
    }
    
    // Setup click animations
    setupClickAnimations() {
        const clickElements = document.querySelectorAll('button, .action-card, .crop-card');
        
        clickElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.addClickEffect(element, e);
            });
        });
    }
    
    // Setup loading animations
    setupLoadingAnimations() {
        // Progress bar animations
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            this.animateProgressBar(bar);
        });
        
        // Loading spinner animations
        const spinners = document.querySelectorAll('.loading-spinner');
        spinners.forEach(spinner => {
            this.animateSpinner(spinner);
        });
    }
    
    // Animate element when it comes into view
    animateElement(element) {
        const animationClasses = Array.from(element.classList)
            .filter(className => className.startsWith('animate-'));
        
        animationClasses.forEach(className => {
            element.classList.add(className);
            
            // Remove animation class after animation completes
            const animationDuration = this.getAnimationDuration(className);
            setTimeout(() => {
                element.classList.remove(className);
            }, animationDuration);
        });
    }
    
    // Handle scroll animations
    handleScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-animate');
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        scrollElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
                const progress = (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight);
                this.updateScrollAnimation(element, progress);
            }
        });
    }
    
    // Add hover effect
    addHoverEffect(element) {
        if (element.classList.contains('hover-lift')) {
            element.style.transform = 'translateY(-8px)';
        } else if (element.classList.contains('hover-glow')) {
            element.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
        } else if (element.classList.contains('hover-scale')) {
            element.style.transform = 'scale(1.05)';
        } else if (element.classList.contains('hover-rotate')) {
            element.style.transform = 'rotate(5deg)';
        }
    }
    
    // Remove hover effect
    removeHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    }
    
    // Add click effect
    addClickEffect(element, event) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(16, 185, 129, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add click animation class
        element.classList.add('animate-button-click');
        setTimeout(() => {
            element.classList.remove('animate-button-click');
        }, 200);
    }
    
    // Animate progress bar
    animateProgressBar(bar) {
        const targetWidth = bar.style.width || '0%';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
            bar.style.transition = 'width 2s ease-out';
        }, 500);
    }
    
    // Animate spinner
    animateSpinner(spinner) {
        spinner.style.animation = 'spin 1s linear infinite';
    }
    
    // Update scroll animation
    updateScrollAnimation(element, progress) {
        const translateY = (1 - progress) * 50;
        const opacity = progress;
        
        element.style.transform = `translateY(${translateY}px)`;
        element.style.opacity = opacity;
    }
    
    // Get animation duration
    getAnimationDuration(className) {
        const durations = {
            'animate-fade-in': 600,
            'animate-fade-in-up': 600,
            'animate-fade-in-down': 600,
            'animate-fade-in-left': 600,
            'animate-fade-in-right': 600,
            'animate-scale-in': 400,
            'animate-bounce-in': 600,
            'animate-slide-in-up': 600,
            'animate-slide-in-down': 600,
            'animate-slide-in-left': 600,
            'animate-slide-in-right': 600,
            'animate-rotate-in': 600
        };
        
        return durations[className] || 300;
    }
}

// Weather Animations
class WeatherAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupWeatherIcons();
        this.setupRainAnimation();
        this.setupLightningAnimation();
        this.setupWindAnimation();
    }
    
    // Setup weather icon animations
    setupWeatherIcons() {
        const weatherIcons = document.querySelectorAll('.weather-icon i, .forecast-day i');
        
        weatherIcons.forEach(icon => {
            const weatherType = this.getWeatherType(icon);
            this.applyWeatherAnimation(icon, weatherType);
        });
    }
    
    // Get weather type from icon class
    getWeatherType(icon) {
        const className = icon.className;
        
        if (className.includes('sun')) return 'sunny';
        if (className.includes('cloud-sun')) return 'partly-cloudy';
        if (className.includes('cloud')) return 'cloudy';
        if (className.includes('cloud-rain')) return 'rainy';
        if (className.includes('bolt')) return 'stormy';
        if (className.includes('wind')) return 'windy';
        
        return 'default';
    }
    
    // Apply weather-specific animation
    applyWeatherAnimation(icon, weatherType) {
        switch (weatherType) {
            case 'sunny':
                icon.style.animation = 'sunRays 10s linear infinite';
                break;
            case 'partly-cloudy':
                icon.style.animation = 'weatherFloat 4s ease-in-out infinite';
                break;
            case 'cloudy':
                icon.style.animation = 'float 3s ease-in-out infinite';
                break;
            case 'rainy':
                icon.style.animation = 'weatherFloat 4s ease-in-out infinite';
                this.addRainEffect(icon);
                break;
            case 'stormy':
                icon.style.animation = 'shake 0.5s ease-in-out infinite';
                this.addLightningEffect(icon);
                break;
            case 'windy':
                icon.style.animation = 'wind 3s linear infinite';
                break;
            default:
                icon.style.animation = 'float 3s ease-in-out infinite';
        }
    }
    
    // Add rain effect
    addRainEffect(icon) {
        const container = icon.closest('.weather-icon, .forecast-day');
        if (container) {
            for (let i = 0; i < 5; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 10px;
                    background: rgba(59, 130, 246, 0.6);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    animation: rain 1s linear infinite;
                    animation-delay: ${Math.random() * 1}s;
                `;
                container.appendChild(drop);
            }
        }
    }
    
    // Add lightning effect
    addLightningEffect(icon) {
        const container = icon.closest('.weather-icon, .forecast-day');
        if (container) {
            const lightning = document.createElement('div');
            lightning.className = 'lightning-effect';
            lightning.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 0, 0.3);
                animation: lightning 2s ease-in-out infinite;
                pointer-events: none;
            `;
            container.appendChild(lightning);
        }
    }
    
    // Setup rain animation
    setupRainAnimation() {
        const rainContainer = document.querySelector('.rain-container');
        if (rainContainer) {
            this.createRainDrops(rainContainer);
        }
    }
    
    // Create rain drops
    createRainDrops(container) {
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.cssText = `
                position: absolute;
                width: 2px;
                height: 10px;
                background: rgba(59, 130, 246, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: rain 1s linear infinite;
                animation-delay: ${Math.random() * 1}s;
            `;
            container.appendChild(drop);
        }
    }
    
    // Setup lightning animation
    setupLightningAnimation() {
        const lightningContainer = document.querySelector('.lightning-container');
        if (lightningContainer) {
            this.createLightning(lightningContainer);
        }
    }
    
    // Create lightning
    createLightning(container) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 0, 0.3);
            animation: lightning 3s ease-in-out infinite;
        `;
        container.appendChild(lightning);
    }
    
    // Setup wind animation
    setupWindAnimation() {
        const windContainer = document.querySelector('.wind-container');
        if (windContainer) {
            this.createWind(windContainer);
        }
    }
    
    // Create wind
    createWind(container) {
        for (let i = 0; i < 5; i++) {
            const wind = document.createElement('div');
            wind.className = 'wind-particle';
            wind.style.cssText = `
                position: absolute;
                width: 20px;
                height: 2px;
                background: rgba(156, 163, 175, 0.6);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                animation: wind 3s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            container.appendChild(wind);
        }
    }
}

// Crop Animations
class CropAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCropGrowth();
        this.setupHarvestAnimation();
        this.setupSoilParticles();
    }
    
    // Setup crop growth animation
    setupCropGrowth() {
        const cropCards = document.querySelectorAll('.crop-card');
        
        cropCards.forEach(card => {
            const progressBar = card.querySelector('.progress-fill');
            if (progressBar) {
                this.animateCropGrowth(progressBar);
            }
        });
    }
    
    // Animate crop growth
    animateCropGrowth(progressBar) {
        const targetWidth = progressBar.style.width || '0%';
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
            progressBar.style.transition = 'width 3s ease-out';
            
            // Add growth effect
            progressBar.style.background = 'linear-gradient(90deg, #10B981, #34D399)';
        }, 1000);
    }
    
    // Setup harvest animation
    setupHarvestAnimation() {
        const harvestButtons = document.querySelectorAll('[data-action="harvest"]');
        
        harvestButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.animateHarvest(button);
            });
        });
    }
    
    // Animate harvest
    animateHarvest(button) {
        button.classList.add('animate-harvest');
        
        // Create harvest particles
        this.createHarvestParticles(button);
        
        setTimeout(() => {
            button.classList.remove('animate-harvest');
        }, 1000);
    }
    
    // Create harvest particles
    createHarvestParticles(button) {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'harvest-particle';
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: #F59E0B;
                border-radius: 50%;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: soilParticles 1s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
    
    // Setup soil particles
    setupSoilParticles() {
        const soilElements = document.querySelectorAll('.soil-indicator');
        
        soilElements.forEach(element => {
            element.addEventListener('click', () => {
                this.animateSoilParticles(element);
            });
        });
    }
    
    // Animate soil particles
    animateSoilParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'soil-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #8B4513;
                border-radius: 50%;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: soilParticles 1s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
}

// Market Animations
class MarketAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupPriceAnimations();
        this.setupChartAnimations();
        this.setupTrendAnimations();
    }
    
    // Setup price animations
    setupPriceAnimations() {
        const priceElements = document.querySelectorAll('.current-price');
        
        priceElements.forEach(element => {
            this.observePriceChanges(element);
        });
    }
    
    // Observe price changes
    observePriceChanges(element) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    this.animatePriceChange(element);
                }
            });
        });
        
        observer.observe(element, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }
    
    // Animate price change
    animatePriceChange(element) {
        element.classList.add('animate-pulse');
        
        setTimeout(() => {
            element.classList.remove('animate-pulse');
        }, 1000);
    }
    
    // Setup chart animations
    setupChartAnimations() {
        const charts = document.querySelectorAll('canvas');
        
        charts.forEach(chart => {
            this.animateChart(chart);
        });
    }
    
    // Animate chart
    animateChart(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Animate chart drawing
        let progress = 0;
        const animate = () => {
            progress += 0.02;
            
            if (progress <= 1) {
                this.drawChartProgress(ctx, width, height, progress);
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    // Draw chart progress
    drawChartProgress(ctx, width, height, progress) {
        const data = [2400, 2450, 2420, 2480, 2450, 2500, 2450];
        const step = width / (data.length - 1);
        
        ctx.strokeStyle = 'var(--primary-color)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = index * step * progress;
            const y = height - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * height * 0.8;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    }
    
    // Setup trend animations
    setupTrendAnimations() {
        const trendElements = document.querySelectorAll('.trend');
        
        trendElements.forEach(element => {
            this.observeTrendChanges(element);
        });
    }
    
    // Observe trend changes
    observeTrendChanges(element) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    this.animateTrendChange(element);
                }
            });
        });
        
        observer.observe(element, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }
    
    // Animate trend change
    animateTrendChange(element) {
        element.classList.add('animate-bounce');
        
        setTimeout(() => {
            element.classList.remove('animate-bounce');
        }, 1000);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation controllers
    window.animationController = new AnimationController();
    window.weatherAnimations = new WeatherAnimations();
    window.cropAnimations = new CropAnimations();
    window.marketAnimations = new MarketAnimations();
    
    console.log('🎬 SoilSense animations initialized');
});

// Export animation classes for use in other modules
window.SoilSenseAnimations = {
    AnimationController,
    WeatherAnimations,
    CropAnimations,
    MarketAnimations
}; 