// SoilSense - Chat JavaScript

// Chat Configuration
const chatConfig = {
    // AI response templates
    responses: {
        greeting: [
            "Namaste! How can I help you today?",
            "Hello! I'm here to assist with your farming needs.",
            "Welcome! What would you like to know about your crops?"
        ],
        weather: [
            "The weather forecast shows {condition} with temperatures around {temp}°C. {advice}",
            "Based on the current weather, I recommend {advice}",
            "The weather conditions are {condition}. {advice}"
        ],
        pest: [
            "I've detected {pest} in your {crop}. Here's what you should do: {treatment}",
            "There's a {pest} infestation. Apply {treatment} within 24 hours.",
            "Your {crop} shows signs of {pest}. {treatment}"
        ],
        market: [
            "Current {crop} prices are ₹{price}/quintal. {trend}",
            "Market prices for {crop} are {trend}. {advice}",
            "The {crop} market is {trend}. {advice}"
        ],
        irrigation: [
            "Your {crop} needs irrigation {timing}. {method}",
            "Based on soil moisture, water your {crop} {timing}.",
            "Irrigation reminder: {crop} requires {method} {timing}."
        ],
        insurance: [
            "Your {crop} insurance claim status is {status}. {details}",
            "Insurance coverage for {crop}: ₹{amount}. {status}",
            "Claim processing for {crop}: {status}. {details}"
        ],
        general: [
            "I understand your concern. Let me check the latest information for you.",
            "That's a good question. Here's what I found:",
            "Based on your query, here's my recommendation:"
        ]
    },
    
    // Quick action buttons
    quickActions: [
        { text: "Weather Check", icon: "fas fa-cloud-sun", action: "weather" },
        { text: "Pest Detection", icon: "fas fa-bug", action: "pest" },
        { text: "Market Prices", icon: "fas fa-chart-line", action: "market" },
        { text: "Irrigation", icon: "fas fa-tint", action: "irrigation" },
        { text: "Insurance", icon: "fas fa-shield-alt", action: "insurance" }
    ],
    
    // Typing indicators
    typingIndicators: [
        "SoilSense AI is typing...",
        "Analyzing your request...",
        "Checking latest data...",
        "Processing your query..."
    ]
};

// Chat Manager Class
class ChatManager {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.currentContext = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.setupQuickActions();
        this.setupAutoComplete();
        this.setupVoiceInput();
    }
    
    // Setup event listeners
    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const chatToggle = document.getElementById('chat-toggle');
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            chatInput.addEventListener('input', () => {
                this.handleInputChange();
            });
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }
        
        if (chatToggle) {
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });
        }
    }
    
    // Send message
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (message) {
            // Add user message
            this.addMessage('user', message);
            chatInput.value = '';
            
            // Process message and generate response
            this.processMessage(message);
        }
    }
    
    // Add message to chat
    addMessage(sender, content, type = 'text', metadata = {}) {
        const message = {
            id: Date.now(),
            sender: sender,
            content: content,
            type: type,
            timestamp: new Date(),
            metadata: metadata
        };
        
        this.messages.push(message);
        this.displayMessage(message);
        this.saveChatHistory();
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    // Display message in chat
    displayMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}`;
        messageDiv.setAttribute('data-message-id', message.id);
        
        let content = '';
        
        switch (message.type) {
            case 'text':
                content = this.formatTextMessage(message.content);
                break;
            case 'image':
                content = this.formatImageMessage(message.content);
                break;
            case 'location':
                content = this.formatLocationMessage(message.content);
                break;
            case 'quick_action':
                content = this.formatQuickActionMessage(message.content);
                break;
            case 'system':
                content = this.formatSystemMessage(message.content);
                break;
        }
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
            <span class="message-time">${this.formatTime(message.timestamp)}</span>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // Add animation
        messageDiv.classList.add('animate-fade-in');
    }
    
    // Format text message
    formatTextMessage(content) {
        // Convert URLs to links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const linkedContent = content.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
        
        // Convert line breaks to HTML
        const formattedContent = linkedContent.replace(/\n/g, '<br>');
        
        return `<p>${formattedContent}</p>`;
    }
    
    // Format image message
    formatImageMessage(content) {
        return `
            <div class="message-image">
                <img src="${content}" alt="Uploaded image" onclick="openImageModal('${content}')">
            </div>
        `;
    }
    
    // Format location message
    formatLocationMessage(content) {
        const { lat, lng, address } = content;
        return `
            <div class="message-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${address}</span>
                <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
    }
    
    // Format quick action message
    formatQuickActionMessage(content) {
        return `
            <div class="message-quick-action">
                <i class="${content.icon}"></i>
                <span>${content.text}</span>
            </div>
        `;
    }
    
    // Format system message
    formatSystemMessage(content) {
        return `
            <div class="message-system">
                <i class="fas fa-info-circle"></i>
                <span>${content}</span>
            </div>
        `;
    }
    
    // Process user message
    async processMessage(message) {
        // Show typing indicator
        this.showTypingIndicator();
        
        // Analyze message intent
        const intent = this.analyzeIntent(message);
        
        // Generate response based on intent
        const response = await this.generateResponse(intent, message);
        
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Add AI response
        this.addMessage('bot', response);
        
        // Update context
        this.updateContext(intent, message);
    }
    
    // Analyze message intent
    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('weather') || lowerMessage.includes('temperature') || lowerMessage.includes('rain')) {
            return 'weather';
        } else if (lowerMessage.includes('pest') || lowerMessage.includes('disease') || lowerMessage.includes('bug')) {
            return 'pest';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('sell')) {
            return 'market';
        } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigation') || lowerMessage.includes('moisture')) {
            return 'irrigation';
        } else if (lowerMessage.includes('insurance') || lowerMessage.includes('claim') || lowerMessage.includes('coverage')) {
            return 'insurance';
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
            return 'greeting';
        } else {
            return 'general';
        }
    }
    
    // Generate AI response
    async generateResponse(intent, userMessage) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        switch (intent) {
            case 'weather':
                return this.generateWeatherResponse(userMessage);
            case 'pest':
                return this.generatePestResponse(userMessage);
            case 'market':
                return this.generateMarketResponse(userMessage);
            case 'irrigation':
                return this.generateIrrigationResponse(userMessage);
            case 'insurance':
                return this.generateInsuranceResponse(userMessage);
            case 'greeting':
                return this.getRandomResponse('greeting');
            default:
                return this.generateGeneralResponse(userMessage);
        }
    }
    
    // Generate weather response
    generateWeatherResponse(userMessage) {
        const conditions = ['sunny', 'partly cloudy', 'cloudy', 'rainy'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const temp = Math.floor(Math.random() * 10) + 25;
        
        let advice = '';
        switch (condition) {
            case 'sunny':
                advice = 'Consider irrigation if soil moisture is low.';
                break;
            case 'rainy':
                advice = 'Hold off on irrigation. Check for waterlogging.';
                break;
            case 'cloudy':
                advice = 'Monitor soil moisture levels.';
                break;
            default:
                advice = 'Continue with regular farming practices.';
        }
        
        return this.getRandomResponse('weather')
            .replace('{condition}', condition)
            .replace('{temp}', temp)
            .replace('{advice}', advice);
    }
    
    // Generate pest response
    generatePestResponse(userMessage) {
        const pests = ['wheat rust', 'aphids', 'borers', 'leaf miners'];
        const crops = ['wheat', 'mustard', 'rice', 'cotton'];
        const treatments = [
            'Apply fungicide (Mancozeb 75% WP) at 2.5 kg/ha',
            'Spray neem oil solution (2%)',
            'Use recommended pesticide as per label instructions',
            'Implement integrated pest management practices'
        ];
        
        const pest = pests[Math.floor(Math.random() * pests.length)];
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const treatment = treatments[Math.floor(Math.random() * treatments.length)];
        
        return this.getRandomResponse('pest')
            .replace('{pest}', pest)
            .replace('{crop}', crop)
            .replace('{treatment}', treatment);
    }
    
    // Generate market response
    generateMarketResponse(userMessage) {
        const crops = ['wheat', 'mustard', 'rice'];
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const price = Math.floor(Math.random() * 2000) + 2000;
        const trends = ['rising', 'stable', 'declining'];
        const trend = trends[Math.floor(Math.random() * trends.length)];
        
        let advice = '';
        switch (trend) {
            case 'rising':
                advice = 'Consider holding your produce for better prices.';
                break;
            case 'declining':
                advice = 'Consider selling soon to maximize returns.';
                break;
            default:
                advice = 'Monitor market trends for optimal selling time.';
        }
        
        return this.getRandomResponse('market')
            .replace('{crop}', crop)
            .replace('{price}', price)
            .replace('{trend}', trend)
            .replace('{advice}', advice);
    }
    
    // Generate irrigation response
    generateIrrigationResponse(userMessage) {
        const crops = ['wheat', 'mustard', 'rice'];
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const timings = ['tomorrow morning', 'in 2 days', 'this evening'];
        const methods = ['drip irrigation', 'flood irrigation', 'sprinkler irrigation'];
        
        const timing = timings[Math.floor(Math.random() * timings.length)];
        const method = methods[Math.floor(Math.random() * methods.length)];
        
        return this.getRandomResponse('irrigation')
            .replace('{crop}', crop)
            .replace('{timing}', timing)
            .replace('{method}', method);
    }
    
    // Generate insurance response
    generateInsuranceResponse(userMessage) {
        const crops = ['wheat', 'mustard', 'rice'];
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const statuses = ['pending', 'approved', 'under review'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const amount = Math.floor(Math.random() * 50000) + 20000;
        
        let details = '';
        switch (status) {
            case 'pending':
                details = 'Your claim is being processed. Expected completion in 5-7 days.';
                break;
            case 'approved':
                details = 'Your claim has been approved. Payment will be processed within 3 days.';
                break;
            default:
                details = 'Your claim is under review. We will update you soon.';
        }
        
        return this.getRandomResponse('insurance')
            .replace('{crop}', crop)
            .replace('{status}', status)
            .replace('{amount}', amount)
            .replace('{details}', details);
    }
    
    // Generate general response
    generateGeneralResponse(userMessage) {
        return this.getRandomResponse('general') + ' ' + this.getContextualAdvice(userMessage);
    }
    
    // Get contextual advice
    getContextualAdvice(userMessage) {
        const advice = [
            "Based on your farming profile, I recommend checking soil moisture levels regularly.",
            "Consider implementing crop rotation to improve soil health.",
            "Monitor weather forecasts for optimal farming decisions.",
            "Stay updated with market prices for better selling decisions.",
            "Regular pest monitoring can prevent crop damage."
        ];
        
        return advice[Math.floor(Math.random() * advice.length)];
    }
    
    // Get random response from template
    getRandomResponse(type) {
        const responses = chatConfig.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Show typing indicator
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="typing-text">${this.getRandomTypingText()}</span>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        this.isTyping = true;
    }
    
    // Hide typing indicator
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }
    
    // Get random typing text
    getRandomTypingText() {
        const texts = chatConfig.typingIndicators;
        return texts[Math.floor(Math.random() * texts.length)];
    }
    
    // Setup quick actions
    setupQuickActions() {
        const quickActions = chatConfig.quickActions;
        
        // Add quick action buttons to chat
        this.addQuickActionButtons(quickActions);
    }
    
    // Add quick action buttons
    addQuickActionButtons(actions) {
        const chatBody = document.getElementById('chat-body');
        if (!chatBody) return;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'quick-actions';
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'quick-action-btn';
            button.innerHTML = `
                <i class="${action.icon}"></i>
                <span>${action.text}</span>
            `;
            button.addEventListener('click', () => {
                this.handleQuickAction(action);
            });
            actionsDiv.appendChild(button);
        });
        
        chatBody.appendChild(actionsDiv);
    }
    
    // Handle quick action
    handleQuickAction(action) {
        this.addMessage('user', action.text, 'quick_action', { action: action.action });
        this.processMessage(action.text);
    }
    
    // Setup auto complete
    setupAutoComplete() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput) return;
        
        const suggestions = [
            'What is the weather forecast?',
            'Check crop prices',
            'Pest detection help',
            'Irrigation schedule',
            'Insurance claim status'
        ];
        
        chatInput.addEventListener('input', () => {
            const value = chatInput.value.toLowerCase();
            const matchingSuggestions = suggestions.filter(s => 
                s.toLowerCase().includes(value) && value.length > 0
            );
            
            this.showSuggestions(matchingSuggestions);
        });
    }
    
    // Show suggestions
    showSuggestions(suggestions) {
        let suggestionsDiv = document.querySelector('.chat-suggestions');
        if (!suggestionsDiv) {
            suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'chat-suggestions';
            document.getElementById('chat-body').appendChild(suggestionsDiv);
        }
        
        if (suggestions.length > 0) {
            suggestionsDiv.innerHTML = suggestions.map(suggestion => 
                `<div class="suggestion" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`
            ).join('');
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.style.display = 'none';
        }
    }
    
    // Setup voice input
    setupVoiceInput() {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'voice-btn';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.addEventListener('click', () => {
            this.startVoiceInput();
        });
        
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.parentNode.insertBefore(voiceBtn, chatInput.nextSibling);
        }
    }
    
    // Start voice input
    startVoiceInput() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-IN';
            
            recognition.onstart = () => {
                this.showVoiceIndicator();
            };
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chat-input').value = transcript;
            };
            
            recognition.onend = () => {
                this.hideVoiceIndicator();
            };
            
            recognition.start();
        } else {
            alert('Voice input is not supported in this browser.');
        }
    }
    
    // Show voice indicator
    showVoiceIndicator() {
        const voiceBtn = document.querySelector('.voice-btn');
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceBtn.classList.add('recording');
        }
    }
    
    // Hide voice indicator
    hideVoiceIndicator() {
        const voiceBtn = document.querySelector('.voice-btn');
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.classList.remove('recording');
        }
    }
    
    // Handle input change
    handleInputChange() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        if (chatInput && sendBtn) {
            if (chatInput.value.trim()) {
                sendBtn.classList.add('active');
            } else {
                sendBtn.classList.remove('active');
            }
        }
    }
    
    // Toggle chat
    toggleChat() {
        const chatWidget = document.getElementById('chat-widget');
        const chatBody = document.getElementById('chat-body');
        
        if (chatWidget && chatBody) {
            chatWidget.classList.toggle('minimized');
            
            if (chatWidget.classList.contains('minimized')) {
                chatBody.style.display = 'none';
            } else {
                chatBody.style.display = 'flex';
                document.getElementById('chat-input').focus();
            }
        }
    }
    
    // Scroll to bottom
    scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Update context
    updateContext(intent, message) {
        this.currentContext = {
            intent: intent,
            lastMessage: message,
            timestamp: new Date()
        };
    }
    
    // Load chat history
    loadChatHistory() {
        const savedMessages = localStorage.getItem('soilsense_chat_history');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
            this.messages.forEach(message => {
                this.displayMessage(message);
            });
        } else {
            // Add welcome message
            this.addMessage('bot', 'Namaste! How can I help you today?');
        }
    }
    
    // Save chat history
    saveChatHistory() {
        localStorage.setItem('soilsense_chat_history', JSON.stringify(this.messages));
    }
    
    // Format time
    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        
        if (diff < 60000) { // Less than 1 minute
            return 'Just now';
        } else if (diff < 3600000) { // Less than 1 hour
            const minutes = Math.floor(diff / 60000);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diff < 86400000) { // Less than 1 day
            const hours = Math.floor(diff / 3600000);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            return timestamp.toLocaleDateString();
        }
    }
}

// Global functions for chat
window.selectSuggestion = function(suggestion) {
    document.getElementById('chat-input').value = suggestion;
    document.querySelector('.chat-suggestions').style.display = 'none';
    window.chatManager.sendMessage();
};

window.openImageModal = function(imageSrc) {
    // Create modal for image viewing
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="Full size image">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').onclick = () => {
        modal.remove();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
};

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat manager
    window.chatManager = new ChatManager();
    
    console.log('💬 SoilSense chat initialized');
});

// Export chat manager for use in other modules
window.SoilSenseChat = {
    ChatManager,
    chatConfig
}; 