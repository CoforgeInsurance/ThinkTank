// DOM elements and state
let currentCardIndex = 0;
let currentCategory = 'all';
let filteredCards = [];
let currentQuizQuestion = 0;
let quizScore = 0;
let selectedAnswers = [];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    renderLearningGuides();
    initializeMemoryCards();
    renderCaselets();
    initializeQuiz();
    initializeFunFacts();
    renderPointsToPonder();
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
