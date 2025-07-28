// SoilSense - Main JavaScript

// Global Variables
let currentSection = 'dashboard';
let isLoading = false;
let notifications = [];
let chatMessages = [];

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const app = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const notificationBtn = document.getElementById('notification-btn');
const notificationPanel = document.getElementById('notification-panel');
const closeNotifications = document.getElementById('close-notifications');
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatBody = document.getElementById('chat-body');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌾 SoilSense Platform Initializing...');
    
    // Initialize all modules
    initializeApp();
    initializeNavigation();
    initializeNotifications();
    initializeChat();
    initializeAnimations();
    initializePlaceholderData();
    
    // Hide loading screen after initialization
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});

// Initialize the main application
function initializeApp() {
    console.log('Initializing SoilSense application...');
    
    // Set up service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
    
    // Initialize real-time updates
    initializeRealTimeUpdates();
    
    // Set up periodic data refresh
    setInterval(refreshData, 30000); // Refresh every 30 seconds
}

// Initialize navigation
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
    
    // Set initial active section
    switchSection('dashboard');
}

// Switch between sections
function switchSection(sectionName) {
    // Remove active class from all sections and nav links
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to target section and nav link
    const targetSection = document.getElementById(sectionName);
    const targetNavLink = document.querySelector(`[data-section="${sectionName}"]`);
    
    if (targetSection && targetNavLink) {
        targetSection.classList.add('active');
        targetNavLink.classList.add('active');
        currentSection = sectionName;
        
        // Trigger section-specific animations
        animateSectionTransition(sectionName);
        
        // Load section-specific data
        loadSectionData(sectionName);
    }
}

// Animate section transitions
function animateSectionTransition(sectionName) {
    const section = document.getElementById(sectionName);
    if (section) {
        section.classList.add('animate-fade-in');
        
        // Add staggered animations to section children
        const children = section.querySelectorAll('.animate-on-load');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-fade-in-up');
            }, index * 100);
        });
    }
}

// Load section-specific data
function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'advisory':
            loadAdvisoryData();
            break;
        case 'market':
            loadMarketData();
            break;
        case 'weather':
            loadWeatherData();
            break;
        case 'insurance':
            loadInsuranceData();
            break;
    }
}

// Initialize notifications
function initializeNotifications() {
    notificationBtn.addEventListener('click', toggleNotificationPanel);
    closeNotifications.addEventListener('click', toggleNotificationPanel);
    
    // Close notification panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationPanel.classList.remove('open');
        }
    });
    
    // Load initial notifications
    loadNotifications();
}

// Toggle notification panel
function toggleNotificationPanel() {
    notificationPanel.classList.toggle('open');
    
    if (notificationPanel.classList.contains('open')) {
        notificationPanel.classList.add('animate-slide-in-right');
    } else {
        notificationPanel.classList.add('animate-slide-out-right');
    }
}

// Initialize chat functionality
function initializeChat() {
    chatToggle.addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Load initial chat messages
    loadChatMessages();
}

// Toggle chat widget
function toggleChat() {
    chatWidget.classList.toggle('minimized');
    
    if (chatWidget.classList.contains('minimized')) {
        chatBody.style.display = 'none';
    } else {
        chatBody.style.display = 'flex';
        chatInput.focus();
    }
}

// Send chat message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addChatMessage('user', message);
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            addChatMessage('bot', aiResponse);
        }, 1000);
    }
}

// Add chat message
function addChatMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${message}</p>`;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = 'Just now';
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeSpan);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store message
    chatMessages.push({
        sender: sender,
        message: message,
        timestamp: new Date()
    });
}

// Generate AI response (placeholder)
function generateAIResponse(userMessage) {
    const responses = [
        "I understand your concern about the crop. Let me check the latest advisory for you.",
        "Based on the weather forecast, I recommend adjusting your irrigation schedule.",
        "The market prices are favorable this week. Consider selling your produce.",
        "I've detected a potential pest issue. Here's what you should do...",
        "Your crop is looking healthy! Continue with the current practices."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Initialize animations
function initializeAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.action-card, .crop-card, .advisory-card');
    animatedElements.forEach((element, index) => {
        element.classList.add('animate-on-load');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover animations
    const hoverElements = document.querySelectorAll('.action-card, .crop-card, .market-card, .insurance-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
    
    // Add click animations
    const clickElements = document.querySelectorAll('button, .action-card');
    clickElements.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('animate-button-click');
            setTimeout(() => {
                this.classList.remove('animate-button-click');
            }, 200);
        });
    });
}

// Initialize placeholder data
function initializePlaceholderData() {
    // Load dashboard data
    loadDashboardData();
    
    // Set up real-time data simulation
    simulateRealTimeData();
}

// Load dashboard data
function loadDashboardData() {
    console.log('Loading dashboard data...');
    
    // Simulate loading
    const dashboardElements = document.querySelectorAll('.crop-card, .advisory-card');
    dashboardElements.forEach(element => {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.remove('loading');
        }, 1000);
    });
    
    // Update crop progress bars
    updateCropProgress();
    
    // Update weather summary
    updateWeatherSummary();
}

// Load advisory data
function loadAdvisoryData() {
    console.log('Loading advisory data...');
    
    // Initialize image upload functionality
    initializeImageUpload();
    
    // Load analysis results
    loadAnalysisResults();
}

// Load market data
function loadMarketData() {
    console.log('Loading market data...');
    
    // Initialize charts
    initializeCharts();
    
    // Update market prices
    updateMarketPrices();
}

// Load weather data
function loadWeatherData() {
    console.log('Loading weather data...');
    
    // Update current weather
    updateCurrentWeather();
    
    // Update forecast
    updateWeatherForecast();
}

// Load insurance data
function loadInsuranceData() {
    console.log('Loading insurance data...');
    
    // Update coverage information
    updateCoverageInfo();
    
    // Update claims status
    updateClaimsStatus();
}

// Initialize image upload
function initializeImageUpload() {
    const uploadArea = document.getElementById('upload-area');
    const uploadBtn = document.getElementById('upload-image-btn');
    const analysisResults = document.getElementById('analysis-results');
    
    if (uploadArea && uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            // Simulate file selection
            simulateImageUpload();
        });
        
        uploadArea.addEventListener('click', function() {
            simulateImageUpload();
        });
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--primary-color)';
            this.style.background = 'var(--gray-50)';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--gray-300)';
            this.style.background = 'transparent';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--gray-300)';
            this.style.background = 'transparent';
            simulateImageUpload();
        });
    }
}

// Simulate image upload
function simulateImageUpload() {
    const uploadArea = document.getElementById('upload-area');
    const analysisResults = document.getElementById('analysis-results');
    
    if (uploadArea && analysisResults) {
        // Show loading state
        uploadArea.innerHTML = `
            <div class="upload-placeholder">
                <div class="loading-spinner"></div>
                <h3>Analyzing Image...</h3>
                <p>Please wait while we process your crop image</p>
            </div>
        `;
        
        // Simulate analysis delay
        setTimeout(() => {
            uploadArea.style.display = 'none';
            analysisResults.style.display = 'block';
            analysisResults.classList.add('animate-fade-in');
        }, 2000);
    }
}

// Initialize charts
function initializeCharts() {
    // Wheat price chart
    const wheatChart = document.getElementById('wheat-chart');
    if (wheatChart) {
        createPriceChart(wheatChart, 'Wheat Prices', [2400, 2450, 2420, 2480, 2450, 2500, 2450]);
    }
    
    // Mustard price chart
    const mustardChart = document.getElementById('mustard-chart');
    if (mustardChart) {
        createPriceChart(mustardChart, 'Mustard Prices', [5200, 5150, 5100, 5050, 5000, 4950, 4900]);
    }
}

// Create price chart
function createPriceChart(canvas, label, data) {
    const ctx = canvas.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
    
    // Draw chart
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, 200);
    
    const step = canvas.width / (data.length - 1);
    data.forEach((value, index) => {
        const x = index * step;
        const y = 200 - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 150;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(canvas.width, 200);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.strokeStyle = 'var(--primary-color)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = index * step;
        const y = 200 - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 150;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

// Update crop progress
function updateCropProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
}

// Update weather summary
function updateWeatherSummary() {
    const weatherSummary = document.querySelector('.weather-summary');
    if (weatherSummary) {
        const temperature = Math.floor(Math.random() * 10) + 25;
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        weatherSummary.innerHTML = `
            <i class="fas fa-cloud-sun"></i>
            <span>${temperature}°C, ${condition}</span>
        `;
    }
}

// Update market prices
function updateMarketPrices() {
    const priceElements = document.querySelectorAll('.current-price');
    priceElements.forEach(element => {
        const currentPrice = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const change = Math.floor(Math.random() * 200) - 100;
        const newPrice = currentPrice + change;
        
        element.textContent = `₹${newPrice}`;
        
        const trendElement = element.closest('.market-card').querySelector('.trend');
        if (trendElement) {
            if (change > 0) {
                trendElement.textContent = `+₹${change}`;
                trendElement.className = 'trend up';
            } else {
                trendElement.textContent = `-₹${Math.abs(change)}`;
                trendElement.className = 'trend down';
            }
        }
    });
}

// Update current weather
function updateCurrentWeather() {
    const weatherInfo = document.querySelector('.weather-info h2');
    if (weatherInfo) {
        const temperature = Math.floor(Math.random() * 10) + 25;
        weatherInfo.textContent = `${temperature}°C`;
    }
}

// Update weather forecast
function updateWeatherForecast() {
    const forecastDays = document.querySelectorAll('.forecast-day');
    forecastDays.forEach(day => {
        const tempElement = day.querySelector('.temp');
        const tempNightElement = day.querySelector('.temp-night');
        
        if (tempElement && tempNightElement) {
            const dayTemp = Math.floor(Math.random() * 10) + 25;
            const nightTemp = dayTemp - 8;
            
            tempElement.textContent = `${dayTemp}°`;
            tempNightElement.textContent = `${nightTemp}°`;
        }
    });
}

// Update coverage info
function updateCoverageInfo() {
    const coverageItems = document.querySelectorAll('.coverage-item');
    coverageItems.forEach(item => {
        const amountElement = item.querySelector('span:last-child');
        if (amountElement && !amountElement.textContent.includes('Total')) {
            const amount = Math.floor(Math.random() * 10000) + 15000;
            amountElement.textContent = `₹${amount.toLocaleString()}`;
        }
    });
}

// Update claims status
function updateClaimsStatus() {
    const claimItems = document.querySelectorAll('.claim-item');
    claimItems.forEach(item => {
        const statusElement = item.querySelector('.claim-status');
        if (statusElement) {
            const statuses = ['pending', 'approved', 'rejected'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            statusElement.className = `claim-status ${randomStatus}`;
            statusElement.textContent = randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1);
        }
    });
}

// Initialize real-time updates
function initializeRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        updateWeatherSummary();
        updateMarketPrices();
    }, 60000); // Update every minute
}

// Simulate real-time data
function simulateRealTimeData() {
    // Simulate weather updates
    setInterval(() => {
        const weatherSummary = document.querySelector('.weather-summary');
        if (weatherSummary) {
            const temperature = Math.floor(Math.random() * 10) + 25;
            weatherSummary.querySelector('span').textContent = `${temperature}°C, Partly Cloudy`;
        }
    }, 30000);
    
    // Simulate market price updates
    setInterval(() => {
        const priceElements = document.querySelectorAll('.current-price');
        priceElements.forEach(element => {
            const currentPrice = parseInt(element.textContent.replace(/[^\d]/g, ''));
            const change = Math.floor(Math.random() * 100) - 50;
            const newPrice = currentPrice + change;
            element.textContent = `₹${newPrice}`;
        });
    }, 45000);
}

// Refresh data periodically
function refreshData() {
    if (currentSection === 'dashboard') {
        loadDashboardData();
    } else if (currentSection === 'market') {
        loadMarketData();
    } else if (currentSection === 'weather') {
        loadWeatherData();
    }
}

// Load notifications
function loadNotifications() {
    notifications = [
        {
            type: 'urgent',
            title: 'Pest Alert',
            message: 'Wheat rust detected in your field',
            time: '2 hours ago',
            icon: 'fas fa-exclamation-triangle'
        },
        {
            type: 'normal',
            title: 'Weather Update',
            message: 'Rain expected tomorrow',
            time: '1 day ago',
            icon: 'fas fa-cloud-rain'
        },
        {
            type: 'normal',
            title: 'Price Alert',
            message: 'Wheat prices up by ₹150',
            time: '2 days ago',
            icon: 'fas fa-chart-line'
        }
    ];
    
    updateNotificationBadge();
}

// Update notification badge
function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        const urgentCount = notifications.filter(n => n.type === 'urgent').length;
        badge.textContent = urgentCount > 0 ? urgentCount : notifications.length;
        badge.style.display = urgentCount > 0 ? 'block' : 'none';
    }
}

// Load chat messages
function loadChatMessages() {
    chatMessages = [
        {
            sender: 'bot',
            message: 'Namaste! How can I help you today?',
            timestamp: new Date()
        }
    ];
}

// Hide loading screen
function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Export functions for use in other modules
window.SoilSense = {
    switchSection,
    showNotification,
    addChatMessage,
    updateNotificationBadge
}; 