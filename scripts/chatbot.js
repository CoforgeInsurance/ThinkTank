// Master GitHub Chatbot
// AI-powered chatbot for interactive learning Q&A

class MasterGitHubChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.knowledgeBase = null;
        this.currentContext = null;
        this.quickSuggestions = [
            "What is GitHub Copilot?",
            "How do I create a pull request?",
            "What are Copilot keyboard shortcuts?",
            "Explain branching in Git",
            "Best practices for using Copilot"
        ];
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready and data to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.buildKnowledgeBase();
        this.createChatbotUI();
        this.attachEventListeners();
        this.detectCurrentContext();
        this.loadChatHistory();
    }
    
    buildKnowledgeBase() {
        // Build comprehensive knowledge base from all learning content
        this.knowledgeBase = {
            guides: window.learningGuides || [],
            cards: window.memoryCards || [],
            caselets: window.caselets || [],
            quiz: window.mcqQuestions || [],
            facts: window.funFacts || [],
            ponder: window.pointsToPonder || []
        };
    }
    
    createChatbotUI() {
        const chatbotHTML = `
            <div id="master-github-chatbot" class="chatbot-container" aria-label="Master GitHub Chatbot">
                <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Toggle chatbot">
                    <svg class="chatbot-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.67-.31-3.83-.86l-.27-.14-2.83.48.48-2.83-.14-.27C4.31 14.67 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                        <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                        <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
                    </svg>
                    <span class="chatbot-badge" id="chatbot-badge">1</span>
                </button>
                
                <div id="chatbot-window" class="chatbot-window" style="display: none;">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <circle cx="16" cy="16" r="14" fill="#8B5CF6"/>
                                <path d="M16 6L19 12H22L18 17L19 24L16 21L13 24L14 17L10 12H13L16 6Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="chatbot-info">
                            <h3 class="chatbot-title">Master GitHub</h3>
                            <p class="chatbot-status">Online • Ready to help</p>
                        </div>
                        <button id="chatbot-close" class="chatbot-close" aria-label="Close chatbot">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="chatbot-message bot-message">
                            <div class="message-avatar">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#8B5CF6"/>
                                    <path d="M12 5L14 9H16L13 13L14 18L12 16L10 18L11 13L8 9H10L12 5Z" fill="white"/>
                                </svg>
                            </div>
                            <div class="message-content">
                                <p>Hi! I'm Master GitHub, your personal learning assistant. 👋</p>
                                <p>Ask me anything about GitHub, development practices, or our learning content!</p>
                            </div>
                        </div>
                        
                        <div class="quick-suggestions" id="quick-suggestions">
                            <p class="suggestions-label">Quick questions:</p>
                            ${this.quickSuggestions.map(suggestion => 
                                `<button class="suggestion-btn" data-suggestion="${suggestion}">${suggestion}</button>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="chatbot-typing" id="chatbot-typing" style="display: none;">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span class="typing-text">Master GitHub is thinking...</span>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input 
                            type="text" 
                            id="chatbot-input" 
                            class="chatbot-input" 
                            placeholder="Ask me anything about GitHub Copilot..."
                            aria-label="Chat message input"
                            autocomplete="off"
                        />
                        <button id="chatbot-send" class="chatbot-send" aria-label="Send message">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2 10l16-8-8 16-2-8-8-2z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    
    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const suggestions = document.querySelectorAll('.suggestion-btn');
        
        if (toggle) toggle.addEventListener('click', () => this.toggleChatbot());
        if (close) close.addEventListener('click', () => this.toggleChatbot());
        if (send) send.addEventListener('click', () => this.sendMessage());
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
        
        suggestions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const suggestion = e.target.getAttribute('data-suggestion');
                this.sendMessage(suggestion);
            });
        });
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.toggleChatbot();
            }
        });
    }
    
    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        
        if (!window || !toggle) return;
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.style.display = 'flex';
            window.classList.add('chatbot-open');
            toggle.classList.add('chatbot-active');
            this.hideBadge();
            
            // Focus input
            setTimeout(() => {
                const input = document.getElementById('chatbot-input');
                if (input) input.focus();
            }, 300);
        } else {
            window.classList.remove('chatbot-open');
            toggle.classList.remove('chatbot-active');
            setTimeout(() => {
                window.style.display = 'none';
            }, 300);
        }
    }
    
    sendMessage(messageText = null) {
        const input = document.getElementById('chatbot-input');
        const message = messageText || input?.value?.trim();
        
        if (!message) return;
        
        // Clear input
        if (input && !messageText) input.value = '';
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Hide quick suggestions after first message
        this.hideQuickSuggestions();
        
        // Show typing indicator
        this.showTyping();
        
        // Generate response with delay for realism
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
            this.saveChatHistory();
        }, 800 + Math.random() * 400);
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const messageHTML = sender === 'bot' ? `
            <div class="chatbot-message bot-message">
                <div class="message-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#8B5CF6"/>
                        <path d="M12 5L14 9H16L13 13L14 18L12 16L10 18L11 13L8 9H10L12 5Z" fill="white"/>
                    </svg>
                </div>
                <div class="message-content">
                    ${this.formatMessage(text)}
                </div>
            </div>
        ` : `
            <div class="chatbot-message user-message">
                <div class="message-content">
                    ${this.escapeHtml(text)}
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store in history
        this.conversationHistory.push({ sender, text, timestamp: Date.now() });
    }
    
    formatMessage(text) {
        // Support for formatted text, code blocks, and links
        let formatted = this.escapeHtml(text);
        
        // Convert **bold**
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert `code`
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Convert line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Convert links
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        return `<p>${formatted}</p>`;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    generateResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        // Check for greetings
        if (this.isGreeting(lowerQuery)) {
            return this.getGreetingResponse();
        }
        
        // Check for help/guidance
        if (this.isHelpQuery(lowerQuery)) {
            return this.getHelpResponse();
        }
        
        // Search knowledge base
        const searchResults = this.searchKnowledge(lowerQuery);
        
        if (searchResults.length > 0) {
            return this.formatKnowledgeResponse(searchResults[0], lowerQuery);
        }
        
        // Fallback response
        return this.getFallbackResponse(lowerQuery);
    }
    
    isGreeting(query) {
        const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => query.includes(greeting));
    }
    
    getGreetingResponse() {
        const responses = [
            "Hello! 👋 How can I help you learn about GitHub Copilot today?",
            "Hi there! 😊 Ready to explore some GitHub Copilot knowledge?",
            "Hey! I'm here to answer your questions about GitHub Copilot. What would you like to know?",
            "Greetings! 🚀 Let's dive into the world of GitHub Copilot together!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    isHelpQuery(query) {
        const helpKeywords = ['help', 'what can you do', 'how to use', 'guide', 'assist'];
        return helpKeywords.some(keyword => query.includes(keyword));
    }
    
    getHelpResponse() {
        return `I can help you with:\n
**📚 Learning Content** - Questions about our guides, memory cards, and caselets
**💡 GitHub Copilot** - How to use Copilot, best practices, and features
**⌨️ Shortcuts & Tips** - Keyboard shortcuts and productivity tips
**🎯 Quiz Help** - Explanations for quiz questions and concepts
**🤔 Discussion** - Insights on points to ponder

Try asking me things like:
• "What is GitHub Copilot?"
• "How do I create a pull request?"
• "What are the keyboard shortcuts?"
• "Explain prompt engineering"`;
    }
    
    searchKnowledge(query) {
        const results = [];
        const queryWords = query.split(/\s+/).filter(w => w.length > 2);
        
        // Search memory cards
        this.knowledgeBase.cards.forEach(card => {
            const score = this.calculateMatchScore(query, queryWords, 
                `${card.question} ${card.answer}`.toLowerCase());
            if (score > 0) {
                results.push({ type: 'card', data: card, score });
            }
        });
        
        // Search guides
        this.knowledgeBase.guides.forEach(guide => {
            const score = this.calculateMatchScore(query, queryWords,
                `${guide.title} ${guide.description} ${this.stripHtml(guide.content)}`.toLowerCase());
            if (score > 0) {
                results.push({ type: 'guide', data: guide, score });
            }
        });
        
        // Search caselets
        this.knowledgeBase.caselets.forEach(caselet => {
            const score = this.calculateMatchScore(query, queryWords,
                `${caselet.title} ${caselet.scenario} ${caselet.solution}`.toLowerCase());
            if (score > 0) {
                results.push({ type: 'caselet', data: caselet, score });
            }
        });
        
        // Search quiz
        this.knowledgeBase.quiz.forEach(q => {
            const score = this.calculateMatchScore(query, queryWords,
                `${q.question} ${q.explanation}`.toLowerCase());
            if (score > 0) {
                results.push({ type: 'quiz', data: q, score });
            }
        });
        
        // Search fun facts
        this.knowledgeBase.facts.forEach(fact => {
            const score = this.calculateMatchScore(query, queryWords,
                fact.fact.toLowerCase());
            if (score > 0) {
                results.push({ type: 'fact', data: fact, score });
            }
        });
        
        // Sort by score
        results.sort((a, b) => b.score - a.score);
        
        return results;
    }
    
    calculateMatchScore(fullQuery, queryWords, content) {
        let score = 0;
        
        // Exact phrase match (highest priority)
        if (content.includes(fullQuery)) {
            score += 100;
        }
        
        // Individual word matches
        queryWords.forEach(word => {
            if (content.includes(word)) {
                score += 10;
            }
        });
        
        return score;
    }
    
    formatKnowledgeResponse(result, query) {
        const { type, data } = result;
        
        switch (type) {
            case 'card':
                return `**${data.question}**\n\n${data.answer}\n\n📚 This is from our Memory Cards section (${data.category}).`;
                
            case 'guide':
                const excerpt = this.getRelevantExcerpt(this.stripHtml(data.content), query);
                return `**${data.title}**\n\n${excerpt}\n\n📖 [View full guide](#guides)`;
                
            case 'caselet':
                return `**${data.title}**\n\n**Scenario:** ${data.scenario}\n\n**Solution:** ${data.solution}\n\n💼 [View full caselet](#caselets)`;
                
            case 'quiz':
                return `**${data.question}**\n\n${data.explanation}\n\n✅ This is from our quiz section. [Take the quiz](#mcq)`;
                
            case 'fact':
                return `💡 **Fun Fact:**\n\n${data.fact}\n\n🎉 Category: ${data.category}`;
                
            default:
                return this.getFallbackResponse(query);
        }
    }
    
    getRelevantExcerpt(content, query, maxLength = 200) {
        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase();
        
        // Find position of query in content
        const position = lowerContent.indexOf(lowerQuery);
        
        if (position !== -1) {
            const start = Math.max(0, position - 50);
            const end = Math.min(content.length, position + maxLength);
            let excerpt = content.substring(start, end);
            
            if (start > 0) excerpt = '...' + excerpt;
            if (end < content.length) excerpt = excerpt + '...';
            
            return excerpt;
        }
        
        // Return first part if no match
        return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    }
    
    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    
    getFallbackResponse(query) {
        // Try to identify topic and provide helpful guidance
        const topicResponses = {
            'git': "I'd recommend checking out our learning guides on Git and GitHub basics. Git is a version control system that tracks changes in your code. Would you like to know about specific Git commands or concepts?",
            'branch': "Branching in Git allows you to create separate lines of development. Our learning guides cover branching strategies in detail. [View guides](#guides)",
            'pull request': "A pull request is how you propose changes to a codebase. It's a way to tell others about changes you've pushed to a branch. Check our guides for best practices!",
            'commit': "A commit is like a snapshot of your code at a specific point in time. Each commit has a unique identifier and includes your changes plus a message. Want to learn more about commit best practices?",
            'copilot': "GitHub Copilot is an AI pair programmer that helps you write code faster! Check out our comprehensive guides covering setup, usage, and best practices. [Start learning](#guides)"
        };
        
        for (const [keyword, response] of Object.entries(topicResponses)) {
            if (query.includes(keyword)) {
                return response;
            }
        }
        
        return `I'm not sure I have specific information about that, but I'm here to help! 🤔\n\nYou can explore:\n• [Learning Guides](#guides) for comprehensive tutorials\n• [Memory Cards](#memory-cards) for quick facts\n• [Quiz](#mcq) to test your knowledge\n• [Caselets](#caselets) for real-world examples\n\nTry rephrasing your question or ask me about GitHub Copilot features, shortcuts, or best practices!`;
    }
    
    showTyping() {
        const typing = document.getElementById('chatbot-typing');
        if (typing) typing.style.display = 'flex';
    }
    
    hideTyping() {
        const typing = document.getElementById('chatbot-typing');
        if (typing) typing.style.display = 'none';
    }
    
    hideQuickSuggestions() {
        const suggestions = document.getElementById('quick-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }
    
    hideBadge() {
        const badge = document.getElementById('chatbot-badge');
        if (badge) badge.style.display = 'none';
    }
    
    detectCurrentContext() {
        // Detect which section user is viewing
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentContext = entry.target.id;
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    saveChatHistory() {
        try {
            sessionStorage.setItem('chatHistory', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.error('Failed to save chat history:', e);
        }
    }
    
    loadChatHistory() {
        try {
            const saved = sessionStorage.getItem('chatHistory');
            if (saved) {
                const history = JSON.parse(saved);
                // Only restore recent messages (last 10)
                const recentHistory = history.slice(-10);
                
                recentHistory.forEach(msg => {
                    if (msg.sender !== 'bot' || !msg.text.includes("I'm Master GitHub")) {
                        this.addMessage(msg.text, msg.sender);
                    }
                });
                
                this.conversationHistory = recentHistory;
            }
        } catch (e) {
            console.error('Failed to load chat history:', e);
        }
    }
}

// Initialize chatbot when page loads
let masterGitHubChatbot;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        masterGitHubChatbot = new MasterGitHubChatbot();
    });
} else {
    masterGitHubChatbot = new MasterGitHubChatbot();
}

// Make available globally
window.MasterGitHubChatbot = MasterGitHubChatbot;
