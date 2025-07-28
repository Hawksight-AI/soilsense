// Main JavaScript for SoilSense UI

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen and show app
    const loadingScreen = document.getElementById('loading-screen');
    const app = document.getElementById('app');
    
    if (loadingScreen && app) {
        app.style.display = 'none';
        
        // Show loading screen for 3 seconds
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
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
            } else {
                loadingScreen.style.display = 'none';
                app.style.display = 'block';
            }
        }, 3000);
    }

    // Initialize navigation
    initializeNavigation();
    
    // Initialize chat widget
    initializeChatWidget();
    
    // Initialize notification panel
    initializeNotificationPanel();
    
    // Initialize action buttons
    initializeActionButtons();
    
    // Initialize upload functionality
    initializeUpload();
    
    // Initialize weather updates
    initializeWeatherUpdates();
    
    // Initialize market data updates
    initializeMarketUpdates();
    
    // Initialize crop status updates
    initializeCropUpdates();
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Animate section entrance
                if (typeof gsap !== 'undefined') {
                    gsap.from(targetElement, {
                        opacity: 0,
                        y: 30,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });
}

// Chat widget functionality
function initializeChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const chatBody = document.getElementById('chat-body');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', function() {
            chatWidget.classList.toggle('expanded');
            chatWidget.classList.toggle('collapsed');
            
            if (chatWidget.classList.contains('expanded')) {
                chatBody.style.display = 'block';
                chatInput.focus();
            } else {
                chatBody.style.display = 'none';
            }
        });
    }
    
    if (sendBtn && chatInput && chatMessages) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatInput && chatMessages && chatInput.value.trim()) {
        const message = chatInput.value.trim();
        
        // Add user message
        addMessageToChat('user', message);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I can help you with crop management. What specific issue are you facing?",
                "Based on your location, I recommend checking the weather forecast for the next few days.",
                "Your wheat crop looks healthy. Consider harvesting in the next 3-5 days for optimal yield.",
                "I've detected some pest activity in your field. Would you like me to provide treatment recommendations?",
                "The market prices for wheat are currently favorable. Consider selling within the next week."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat('bot', randomResponse);
        }, 1000);
    }
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatMessages) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate message entrance
        if (typeof gsap !== 'undefined') {
            gsap.from(messageDiv, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }
}

// Notification panel functionality
function initializeNotificationPanel() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const closeNotifications = document.getElementById('close-notifications');
    
    if (notificationBtn && notificationPanel) {
        notificationBtn.addEventListener('click', function() {
            notificationPanel.classList.toggle('active');
            
            if (notificationPanel.classList.contains('active')) {
                if (typeof gsap !== 'undefined') {
                    gsap.from(notificationPanel, {
                        opacity: 0,
                        x: 100,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        });
    }
    
    if (closeNotifications && notificationPanel) {
        closeNotifications.addEventListener('click', function() {
            notificationPanel.classList.remove('active');
        });
    }
}

// Action buttons functionality
function initializeActionButtons() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            // Show notification based on action
            let message = '';
            let type = 'info';
            
            switch(action) {
                case 'pest-detection':
                    message = 'Opening pest detection camera...';
                    type = 'info';
                    break;
                case 'weather-check':
                    message = 'Fetching latest weather data...';
                    type = 'info';
                    break;
                case 'market-prices':
                    message = 'Loading current market prices...';
                    type = 'info';
                    break;
                case 'insurance-claim':
                    message = 'Opening insurance claim form...';
                    type = 'info';
                    break;
            }
            
            if (window.SoilSense && window.SoilSense.showNotification) {
                window.SoilSense.showNotification(message, type);
            }
            
            // Animate button click
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    });
}

// Upload functionality
function initializeUpload() {
    const uploadBtn = document.getElementById('upload-image-btn');
    const uploadArea = document.getElementById('upload-area');
    const analysisResults = document.getElementById('analysis-results');
    
    if (uploadBtn && uploadArea) {
        uploadBtn.addEventListener('click', function() {
            // Create file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file && window.SoilSense && window.SoilSense.handleFileUpload) {
                    window.SoilSense.handleFileUpload(file);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
    }
}

// Weather updates
function initializeWeatherUpdates() {
    // Simulate real-time weather updates
    setInterval(() => {
        const weatherSummary = document.querySelector('.weather-summary span');
        if (weatherSummary) {
            const temperatures = ['28°C', '29°C', '27°C', '26°C'];
            const conditions = ['Partly Cloudy', 'Sunny', 'Cloudy', 'Light Rain'];
            
            const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            
            weatherSummary.textContent = `${randomTemp}, ${randomCondition}`;
            
            // Animate update
            if (typeof gsap !== 'undefined') {
                gsap.to(weatherSummary, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        }
    }, 30000); // Update every 30 seconds
}

// Market updates
function initializeMarketUpdates() {
    // Simulate real-time market updates
    setInterval(() => {
        const priceElements = document.querySelectorAll('.current-price');
        priceElements.forEach(element => {
            const currentPrice = parseInt(element.textContent.replace('₹', ''));
            const change = Math.floor(Math.random() * 100) - 50; // Random change between -50 and +50
            const newPrice = currentPrice + change;
            
            element.textContent = `₹${newPrice}`;
            
            // Animate price change
            if (typeof gsap !== 'undefined') {
                gsap.to(element, {
                    scale: 1.05,
                    color: change > 0 ? '#10B981' : '#EF4444',
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    }, 60000); // Update every minute
}

// Crop updates
function initializeCropUpdates() {
    // Simulate real-time crop status updates
    setInterval(() => {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width) || 0;
            const increment = Math.random() * 2; // Random increment up to 2%
            
            if (currentWidth < 100) {
                const newWidth = Math.min(currentWidth + increment, 100);
                bar.style.width = newWidth + '%';
                
                // Update progress text
                const progressText = bar.parentElement.nextElementSibling;
                if (progressText) {
                    progressText.textContent = Math.round(newWidth) + '% ' + (newWidth >= 100 ? 'Ready' : 'Growth');
                }
            }
        });
    }, 120000); // Update every 2 minutes
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

// Export functions for global use
window.SoilSenseApp = {
    sendMessage,
    addMessageToChat,
    formatCurrency,
    formatDate
}; 