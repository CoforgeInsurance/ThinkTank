// DOM elements and state
let currentCardIndex = 0;
let currentCategory = 'all';
let filteredCards = [];
let currentQuizQuestion = 0;
let quizScore = 0;
let selectedAnswers = [];
let searchIndex = null;
let allContent = [];
let searchResults = [];
let activeFilters = {
    types: ['guides', 'cards', 'caselets', 'quiz', 'facts', 'ponder'],
    categories: [],
    difficulties: ['beginner', 'intermediate', 'advanced']
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    renderLearningGuides();
    initializeMemoryCards();
    renderCaselets();
    initializeQuiz();
    initializeFunFacts();
    renderPointsToPonder();
    initializeSearch();
});

// Navigation
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling and active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Learning Guides
function renderLearningGuides() {
    const container = document.getElementById('guides-container');
    if (!container) return;
    
    container.innerHTML = learningGuides.map(guide => `
        <div class="guide-card" data-guide-id="${guide.id}">
            <div class="guide-header">
                <span class="difficulty-badge difficulty-${guide.difficulty}">${guide.difficulty}</span>
                <span class="guide-duration">${guide.duration} min</span>
            </div>
            <h3 class="guide-title">${guide.title}</h3>
            <p class="guide-description">${guide.description}</p>
            <a href="#" class="guide-expand" onclick="toggleGuideContent('${guide.id}'); return false;">Read More →</a>
            <div class="guide-content" id="content-${guide.id}" style="display: none;">
                ${guide.content}
            </div>
        </div>
    `).join('');
}

function toggleGuideContent(guideId) {
    const content = document.getElementById(`content-${guideId}`);
    const link = event.target;
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        link.textContent = 'Show Less ↑';
    } else {
        content.style.display = 'none';
        link.textContent = 'Read More →';
    }
}

// Memory Cards
function initializeMemoryCards() {
    filteredCards = [...memoryCards];
    renderCurrentCard();
    
    const cardElement = document.getElementById('memory-card');
    const categorySelect = document.getElementById('card-category');
    const shuffleBtn = document.getElementById('shuffle-cards');
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');
    
    // Card flip
    if (cardElement) {
        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('flipped');
        });
    }
    
    // Category filter
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            filterCards();
        });
    }
    
    // Shuffle
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', shuffleCards);
    }
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateCard(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateCard(1));
    }
}

function filterCards() {
    if (currentCategory === 'all') {
        filteredCards = [...memoryCards];
    } else {
        filteredCards = memoryCards.filter(card => card.category === currentCategory);
    }
    currentCardIndex = 0;
    renderCurrentCard();
}

function shuffleCards() {
    filteredCards = filteredCards.sort(() => Math.random() - 0.5);
    currentCardIndex = 0;
    renderCurrentCard();
}

function navigateCard(direction) {
    const card = document.getElementById('memory-card');
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    }
    
    currentCardIndex = (currentCardIndex + direction + filteredCards.length) % filteredCards.length;
    renderCurrentCard();
}

function renderCurrentCard() {
    if (filteredCards.length === 0) return;
    
    const card = filteredCards[currentCardIndex];
    const cardElement = document.getElementById('memory-card');
    
    if (cardElement) {
        cardElement.classList.remove('flipped');
        cardElement.querySelector('.card-badge').textContent = card.category;
        cardElement.querySelector('.card-question').textContent = card.question;
        cardElement.querySelector('.card-answer').textContent = card.answer;
    }
    
    const counter = document.getElementById('card-counter');
    if (counter) {
        counter.textContent = `${currentCardIndex + 1} / ${filteredCards.length}`;
    }
}

// Caselets
function renderCaselets() {
    const container = document.getElementById('caselets-container');
    if (!container) return;
    
    container.innerHTML = caselets.map(caselet => `
        <div class="caselet-card">
            <h3 class="caselet-title">${caselet.title}</h3>
            <div class="caselet-section">
                <h4>Scenario</h4>
                <p>${caselet.scenario}</p>
            </div>
            <div class="caselet-section">
                <h4>Problem</h4>
                <p>${caselet.problem}</p>
            </div>
            <div class="caselet-section">
                <h4>Solution</h4>
                <p>${caselet.solution}</p>
            </div>
            <div class="caselet-section">
                <h4>Key Learnings</h4>
                <ul>
                    ${caselet.learnings.map(learning => `<li>${learning}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Quiz
function initializeQuiz() {
    const startBtn = document.getElementById('start-quiz');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
}

function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    selectedAnswers = [];
    
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-question').style.display = 'block';
    
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const question = mcqQuestions[currentQuizQuestion];
    const container = document.getElementById('quiz-question');
    
    container.innerHTML = `
        <div class="question-header">
            <span class="question-number">Question ${currentQuizQuestion + 1} of ${mcqQuestions.length}</span>
            <span class="question-score">Score: ${quizScore} / ${currentQuizQuestion}</span>
        </div>
        <p class="question-text">${question.question}</p>
        <ul class="options-list">
            ${question.options.map((option, index) => `
                <li class="option-item">
                    <label class="option-label" id="option-${index}">
                        <input type="radio" name="answer" value="${index}" class="option-input">
                        ${option}
                    </label>
                </li>
            `).join('')}
        </ul>
        <div class="explanation" id="explanation" style="display: none;"></div>
        <div class="quiz-nav">
            <button class="btn btn-primary" id="submit-answer" onclick="checkAnswer()">Submit Answer</button>
        </div>
    `;
}

function checkAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert('Please select an answer');
        return;
    }
    
    const question = mcqQuestions[currentQuizQuestion];
    const selectedIndex = parseInt(selected.value);
    const isCorrect = selectedIndex === question.correctAnswer;
    
    if (isCorrect) {
        quizScore++;
    }
    
    // Show feedback
    question.options.forEach((option, index) => {
        const label = document.getElementById(`option-${index}`);
        if (index === question.correctAnswer) {
            label.classList.add('correct');
        } else if (index === selectedIndex) {
            label.classList.add('incorrect');
        }
        label.querySelector('input').disabled = true;
    });
    
    // Show explanation
    const explanation = document.getElementById('explanation');
    explanation.style.display = 'block';
    explanation.innerHTML = `<strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${question.explanation}`;
    
    // Update button
    const submitBtn = document.getElementById('submit-answer');
    submitBtn.textContent = currentQuizQuestion < mcqQuestions.length - 1 ? 'Next Question' : 'View Results';
    submitBtn.onclick = nextQuestion;
}

function nextQuestion() {
    currentQuizQuestion++;
    
    if (currentQuizQuestion >= mcqQuestions.length) {
        showQuizResults();
    } else {
        renderQuizQuestion();
    }
}

function showQuizResults() {
    const container = document.getElementById('quiz-question');
    container.style.display = 'none';
    
    const resultsContainer = document.getElementById('quiz-results');
    resultsContainer.style.display = 'block';
    
    const percentage = Math.round((quizScore / mcqQuestions.length) * 100);
    let message = '';
    if (percentage >= 90) message = 'Outstanding! You\'re a Copilot expert!';
    else if (percentage >= 70) message = 'Great job! You have a solid understanding!';
    else if (percentage >= 50) message = 'Good effort! Keep learning!';
    else message = 'Keep practicing! Review the guides for better results.';
    
    resultsContainer.innerHTML = `
        <h3>Quiz Complete!</h3>
        <div class="results-score">${percentage}%</div>
        <p class="results-message">${message}</p>
        <div class="results-details">
            <div class="result-stat">
                <div class="result-stat-number">${quizScore}</div>
                <div class="result-stat-label">Correct</div>
            </div>
            <div class="result-stat">
                <div class="result-stat-number">${mcqQuestions.length - quizScore}</div>
                <div class="result-stat-label">Incorrect</div>
            </div>
            <div class="result-stat">
                <div class="result-stat-number">${mcqQuestions.length}</div>
                <div class="result-stat-label">Total Questions</div>
            </div>
        </div>
        <button class="btn btn-primary" onclick="restartQuiz()">Take Quiz Again</button>
        <button class="btn btn-secondary" onclick="returnToQuizStart()">Back to Start</button>
    `;
}

function restartQuiz() {
    document.getElementById('quiz-results').style.display = 'none';
    startQuiz();
}

function returnToQuizStart() {
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
}

// Fun Facts
function initializeFunFacts() {
    const newFactBtn = document.getElementById('new-fact');
    if (newFactBtn) {
        newFactBtn.addEventListener('click', showRandomFact);
    }
}

function showRandomFact() {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const factText = document.getElementById('fact-text');
    const factCategory = document.getElementById('fact-category');
    
    if (factText) {
        factText.textContent = randomFact.fact;
    }
    if (factCategory) {
        factCategory.textContent = randomFact.category;
    }
}

// Points to Ponder
function renderPointsToPonder() {
    const container = document.getElementById('ponder-container');
    if (!container) return;
    
    container.innerHTML = pointsToPonder.map(item => `
        <div class="ponder-card">
            <p class="ponder-question">${item.question}</p>
            <p class="ponder-context">${item.context}</p>
            <div class="ponder-topics">
                ${item.relatedTopics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Utility function to make toggleGuideContent globally available
window.toggleGuideContent = toggleGuideContent;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;
window.returnToQuizStart = returnToQuizStart;

// Search and Filter Functionality
function initializeSearch() {
    // Build search index
    buildSearchIndex();
    
    const searchInput = document.getElementById('global-search');
    const searchToggle = document.getElementById('search-toggle');
    const searchClear = document.getElementById('search-clear');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const filterTypeCheckboxes = document.querySelectorAll('.filter-type');
    const filterDifficultyCheckboxes = document.querySelectorAll('.filter-difficulty');
    
    // Initialize category filters dynamically
    initializeCategoryFilters();
    
    // Search input handler with debounce
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
        
        // Show clear button when there's text
        searchInput.addEventListener('input', (e) => {
            if (searchClear) {
                searchClear.style.display = e.target.value ? 'block' : 'none';
            }
        });
    }
    
    // Mobile search toggle
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            if (searchInput) {
                searchInput.classList.toggle('active');
                if (searchInput.classList.contains('active')) {
                    searchInput.focus();
                }
            }
        });
    }
    
    // Clear search
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            clearSearch();
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            clearSearch();
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+F or Cmd+F
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
        // Forward slash
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
        // Escape to clear
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            clearSearch();
        }
    });
    
    // Filter handlers
    filterTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateTypeFilters();
            applyFilters();
        });
    });
    
    filterDifficultyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateDifficultyFilters();
            applyFilters();
        });
    });
}

function buildSearchIndex() {
    allContent = [];
    
    // Add learning guides
    learningGuides.forEach(guide => {
        allContent.push({
            id: `guide-${guide.id}`,
            type: 'guides',
            title: guide.title,
            description: guide.description,
            content: stripHtml(guide.content),
            difficulty: guide.difficulty,
            category: 'Learning',
            duration: guide.duration,
            originalData: guide
        });
    });
    
    // Add memory cards
    memoryCards.forEach(card => {
        allContent.push({
            id: `card-${card.id}`,
            type: 'cards',
            title: card.question,
            description: card.answer,
            content: `${card.question} ${card.answer}`,
            category: card.category,
            difficulty: null,
            originalData: card
        });
    });
    
    // Add caselets
    caselets.forEach(caselet => {
        allContent.push({
            id: `caselet-${caselet.id}`,
            type: 'caselets',
            title: caselet.title,
            description: caselet.scenario,
            content: `${caselet.scenario} ${caselet.problem} ${caselet.solution} ${caselet.learnings.join(' ')}`,
            category: 'Case Study',
            difficulty: null,
            originalData: caselet
        });
    });
    
    // Add quiz questions
    mcqQuestions.forEach((question, index) => {
        allContent.push({
            id: `quiz-${index}`,
            type: 'quiz',
            title: question.question,
            description: question.explanation,
            content: `${question.question} ${question.options.join(' ')} ${question.explanation}`,
            category: 'Quiz',
            difficulty: null,
            originalData: question
        });
    });
    
    // Add fun facts
    funFacts.forEach(fact => {
        allContent.push({
            id: `fact-${fact.id}`,
            type: 'facts',
            title: `${fact.category} Fact`,
            description: fact.fact,
            content: fact.fact,
            category: fact.category,
            difficulty: null,
            originalData: fact
        });
    });
    
    // Add points to ponder
    pointsToPonder.forEach(item => {
        allContent.push({
            id: `ponder-${item.id}`,
            type: 'ponder',
            title: item.question,
            description: item.context,
            content: `${item.question} ${item.context} ${item.relatedTopics.join(' ')}`,
            category: item.relatedTopics[0] || 'General',
            difficulty: null,
            originalData: item
        });
    });
    
    // No longer need Fuse.js initialization
}

function initializeCategoryFilters() {
    const categoryFiltersContainer = document.getElementById('category-filters');
    if (!categoryFiltersContainer) return;
    
    // Get unique categories
    const categories = new Set();
    allContent.forEach(item => {
        if (item.category) {
            categories.add(item.category);
        }
    });
    
    // Create category filter checkboxes
    const categoryArray = Array.from(categories).sort();
    activeFilters.categories = categoryArray;
    
    const filterHTML = categoryArray.map(category => `
        <label class="filter-checkbox">
            <input type="checkbox" value="${category}" class="filter-category" checked>
            <span>${category}</span>
        </label>
    `).join('');
    
    categoryFiltersContainer.innerHTML = '<h3>Categories</h3>' + filterHTML;
    
    // Add event listeners
    document.querySelectorAll('.filter-category').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCategoryFilters();
            applyFilters();
        });
    });
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function simpleSearch(query, items) {
    const lowerQuery = query.toLowerCase().trim();
    const queryWords = lowerQuery.split(/\s+/);
    
    return items.map(item => {
        const searchableText = `${item.title} ${item.description} ${item.content} ${item.category}`.toLowerCase();
        
        // Calculate score based on matches
        let score = 0;
        
        // Exact phrase match (highest priority)
        if (searchableText.includes(lowerQuery)) {
            score += 100;
        }
        
        // Individual word matches
        queryWords.forEach(word => {
            if (searchableText.includes(word)) {
                score += 10;
            }
            // Bonus for title matches
            if (item.title.toLowerCase().includes(word)) {
                score += 20;
            }
            // Bonus for category matches
            if (item.category && item.category.toLowerCase().includes(word)) {
                score += 15;
            }
        });
        
        return { item, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
}

function performSearch(query) {
    const searchInput = document.getElementById('global-search');
    const searchResultsSection = document.getElementById('search-results');
    
    if (!query || query.trim().length === 0) {
        // Hide search results if query is empty
        if (searchResultsSection) {
            searchResultsSection.style.display = 'none';
        }
        return;
    }
    
    // Perform simple search
    const results = simpleSearch(query, allContent);
    searchResults = results.map(result => result.item);
    
    // Show search results section
    if (searchResultsSection) {
        searchResultsSection.style.display = 'block';
        searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Apply filters
    applyFilters();
}

function updateTypeFilters() {
    const checkboxes = document.querySelectorAll('.filter-type:checked');
    activeFilters.types = Array.from(checkboxes).map(cb => cb.value);
}

function updateCategoryFilters() {
    const checkboxes = document.querySelectorAll('.filter-category:checked');
    activeFilters.categories = Array.from(checkboxes).map(cb => cb.value);
}

function updateDifficultyFilters() {
    const checkboxes = document.querySelectorAll('.filter-difficulty:checked');
    activeFilters.difficulties = Array.from(checkboxes).map(cb => cb.value);
}

function applyFilters() {
    let filtered = [...searchResults];
    
    // Apply type filters
    if (activeFilters.types.length > 0) {
        filtered = filtered.filter(item => activeFilters.types.includes(item.type));
    }
    
    // Apply category filters
    if (activeFilters.categories.length > 0) {
        filtered = filtered.filter(item => !item.category || activeFilters.categories.includes(item.category));
    }
    
    // Apply difficulty filters
    if (activeFilters.difficulties.length > 0) {
        filtered = filtered.filter(item => !item.difficulty || activeFilters.difficulties.includes(item.difficulty));
    }
    
    displaySearchResults(filtered);
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results-container');
    const countElement = document.getElementById('results-count');
    
    if (!container) return;
    
    // Update count
    if (countElement) {
        countElement.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;
    }
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results"><p>No results found. Try adjusting your search or filters.</p></div>';
        return;
    }
    
    // Group results by type
    const grouped = {
        guides: [],
        cards: [],
        caselets: [],
        quiz: [],
        facts: [],
        ponder: []
    };
    
    results.forEach(item => {
        if (grouped[item.type]) {
            grouped[item.type].push(item);
        }
    });
    
    // Render results
    let html = '';
    
    if (grouped.guides.length > 0) {
        html += '<div class="results-section"><h3>Learning Guides</h3><div class="results-group">';
        grouped.guides.forEach(item => {
            html += `
                <div class="result-card" data-type="guides">
                    <div class="result-header">
                        <span class="result-type-badge">Guide</span>
                        ${item.difficulty ? `<span class="difficulty-badge difficulty-${item.difficulty}">${item.difficulty}</span>` : ''}
                    </div>
                    <h4 class="result-title">${highlightMatch(item.title)}</h4>
                    <p class="result-description">${highlightMatch(truncate(item.description, 150))}</p>
                    <a href="#guides" class="result-link">View Guide →</a>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    if (grouped.cards.length > 0) {
        html += '<div class="results-section"><h3>Memory Cards</h3><div class="results-group">';
        grouped.cards.forEach(item => {
            html += `
                <div class="result-card" data-type="cards">
                    <div class="result-header">
                        <span class="result-type-badge">Card</span>
                        <span class="category-badge">${item.category}</span>
                    </div>
                    <h4 class="result-title">${highlightMatch(item.title)}</h4>
                    <p class="result-description">${highlightMatch(truncate(item.description, 150))}</p>
                    <a href="#memory-cards" class="result-link">View Card →</a>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    if (grouped.caselets.length > 0) {
        html += '<div class="results-section"><h3>Caselets</h3><div class="results-group">';
        grouped.caselets.forEach(item => {
            html += `
                <div class="result-card" data-type="caselets">
                    <div class="result-header">
                        <span class="result-type-badge">Caselet</span>
                    </div>
                    <h4 class="result-title">${highlightMatch(item.title)}</h4>
                    <p class="result-description">${highlightMatch(truncate(item.description, 150))}</p>
                    <a href="#caselets" class="result-link">View Caselet →</a>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    if (grouped.quiz.length > 0) {
        html += '<div class="results-section"><h3>Quiz Questions</h3><div class="results-group">';
        grouped.quiz.forEach(item => {
            html += `
                <div class="result-card" data-type="quiz">
                    <div class="result-header">
                        <span class="result-type-badge">Quiz</span>
                    </div>
                    <h4 class="result-title">${highlightMatch(item.title)}</h4>
                    <p class="result-description">${highlightMatch(truncate(item.description, 150))}</p>
                    <a href="#mcq" class="result-link">View Quiz →</a>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    if (grouped.facts.length > 0) {
        html += '<div class="results-section"><h3>Fun Facts</h3><div class="results-group">';
        grouped.facts.forEach(item => {
            html += `
                <div class="result-card" data-type="facts">
                    <div class="result-header">
                        <span class="result-type-badge">Fact</span>
                        <span class="category-badge">${item.category}</span>
                    </div>
                    <p class="result-description">${highlightMatch(item.description)}</p>
                    <a href="#fun-facts" class="result-link">View Facts →</a>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    if (grouped.ponder.length > 0) {
        html += '<div class="results-section"><h3>Points to Ponder</h3><div class="results-group">';
        grouped.ponder.forEach(item => {
            html += `
                <div class="result-card" data-type="ponder">
                    <div class="result-header">
                        <span class="result-type-badge">Ponder</span>
                    </div>
                    <h4 class="result-title">${highlightMatch(item.title)}</h4>
                    <p class="result-description">${highlightMatch(truncate(item.description, 150))}</p>
                    <a href="#ponder" class="result-link">View Point to Ponder →</a>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    container.innerHTML = html;
}

function highlightMatch(text) {
    const searchInput = document.getElementById('global-search');
    if (!searchInput || !searchInput.value) return text;
    
    const query = searchInput.value.trim();
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

function clearSearch() {
    const searchInput = document.getElementById('global-search');
    const searchClear = document.getElementById('search-clear');
    const searchResultsSection = document.getElementById('search-results');
    
    if (searchInput) {
        searchInput.value = '';
        searchInput.blur();
    }
    
    if (searchClear) {
        searchClear.style.display = 'none';
    }
    
    if (searchResultsSection) {
        searchResultsSection.style.display = 'none';
    }
    
    searchResults = [];
}
