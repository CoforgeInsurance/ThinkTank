// Learning Guides Data
const learningGuides = [
    {
        id: 'guide-1',
        title: 'Introduction to GitHub Copilot',
        description: 'Learn the basics of GitHub Copilot and how it can revolutionize your coding experience.',
        difficulty: 'beginner',
        duration: 10,
        content: `
            <h4>What is GitHub Copilot?</h4>
            <p>GitHub Copilot is an AI pair programmer that helps you write code faster and with less effort. It draws context from comments and code to suggest individual lines and whole functions instantly.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>AI-powered code completions</li>
                <li>Support for dozens of programming languages</li>
                <li>Contextual suggestions based on your code</li>
                <li>Comment-to-code conversion</li>
                <li>Test generation assistance</li>
            </ul>
            
            <h4>How It Works</h4>
            <p>Copilot uses OpenAI Codex, a generative pre-trained language model, to analyze your code and comments, then suggests completions that match your coding style and context.</p>
            
            <h4>Getting Started</h4>
            <p>1. Install the GitHub Copilot extension in your IDE</p>
            <p>2. Sign in with your GitHub account</p>
            <p>3. Start coding and watch Copilot suggest completions</p>
            <p>4. Press <code>Tab</code> to accept suggestions or keep typing to dismiss them</p>
        `
    },
    {
        id: 'guide-2',
        title: 'Setting Up GitHub Copilot',
        description: 'Step-by-step guide to installing and configuring GitHub Copilot in your development environment.',
        difficulty: 'beginner',
        duration: 15,
        content: `
            <h4>Prerequisites</h4>
            <ul>
                <li>Active GitHub account</li>
                <li>GitHub Copilot subscription</li>
                <li>Supported IDE (VS Code, JetBrains, Neovim, or Visual Studio)</li>
            </ul>
            
            <h4>Installation Steps for VS Code</h4>
            <p>1. Open VS Code</p>
            <p>2. Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)</p>
            <p>3. Search for "GitHub Copilot"</p>
            <p>4. Click Install</p>
            <p>5. Sign in when prompted</p>
            
            <h4>Configuration</h4>
            <p>After installation, you can customize Copilot's behavior:</p>
            <ul>
                <li>Enable/disable inline suggestions</li>
                <li>Configure keyboard shortcuts</li>
                <li>Set language preferences</li>
                <li>Manage telemetry settings</li>
            </ul>
            
            <h4>Verification</h4>
            <p>Create a new file and start typing a comment describing a function. If Copilot is working, you should see gray suggestion text appear.</p>
        `
    },
    {
        id: 'guide-3',
        title: 'Writing Effective Prompts',
        description: 'Master the art of prompt engineering to get the best suggestions from GitHub Copilot.',
        difficulty: 'intermediate',
        duration: 20,
        content: `
            <h4>The Importance of Good Prompts</h4>
            <p>The quality of Copilot's suggestions depends heavily on how you describe what you want. Clear, specific prompts lead to better code suggestions.</p>
            
            <h4>Best Practices</h4>
            <ul>
                <li><strong>Be Specific:</strong> Instead of "function to process data", write "function to sort array of users by registration date in descending order"</li>
                <li><strong>Use Context:</strong> Provide relevant variable names and types in your comments</li>
                <li><strong>Break Down Complex Tasks:</strong> Split large functions into smaller, well-described steps</li>
                <li><strong>Include Examples:</strong> Show input/output examples in comments</li>
            </ul>
            
            <h4>Example: Good vs. Bad Prompts</h4>
            <p><strong>Bad:</strong></p>
            <pre><code>// calculate price</code></pre>
            
            <p><strong>Good:</strong></p>
            <pre><code>// Calculate total price including tax
// Input: basePrice (number), taxRate (number, e.g., 0.08 for 8%)
// Output: total price rounded to 2 decimal places</code></pre>
            
            <h4>Advanced Techniques</h4>
            <ul>
                <li>Use consistent naming conventions</li>
                <li>Provide type hints and interfaces</li>
                <li>Reference existing functions in comments</li>
                <li>Describe edge cases and error handling</li>
            </ul>
        `
    },
    {
        id: 'guide-4',
        title: 'Language Support and Optimization',
        description: 'Understand how Copilot works across different programming languages and optimize for your stack.',
        difficulty: 'intermediate',
        duration: 15,
        content: `
            <h4>Supported Languages</h4>
            <p>GitHub Copilot works with a wide range of languages, with varying levels of support:</p>
            <ul>
                <li><strong>Excellent Support:</strong> Python, JavaScript, TypeScript, Ruby, Go, Java, C#</li>
                <li><strong>Good Support:</strong> C, C++, PHP, Swift, Kotlin, Rust</li>
                <li><strong>Basic Support:</strong> SQL, HTML, CSS, Shell scripts</li>
            </ul>
            
            <h4>Language-Specific Tips</h4>
            <p><strong>Python:</strong> Use docstrings and type hints for better suggestions</p>
            <pre><code>def calculate_discount(price: float, discount_percent: float) -> float:
    """Calculate final price after applying discount percentage."""
    # Copilot will suggest the implementation</code></pre>
            
            <p><strong>JavaScript/TypeScript:</strong> Leverage JSDoc comments</p>
            <pre><code>/**
 * Fetches user data from API
 * @param {string} userId - The user's unique identifier
 * @returns {Promise<User>} User object
 */</code></pre>
            
            <h4>Framework-Specific Optimization</h4>
            <ul>
                <li>React: Use component names and prop types</li>
                <li>Vue: Include template structure in comments</li>
                <li>Django/Flask: Mention models and views explicitly</li>
                <li>Express: Describe routes and middleware clearly</li>
            </ul>
        `
    },
    {
        id: 'guide-5',
        title: 'Advanced Features and Tips',
        description: 'Explore advanced capabilities of GitHub Copilot to maximize your productivity.',
        difficulty: 'advanced',
        duration: 25,
        content: `
            <h4>Copilot Labs Features</h4>
            <ul>
                <li><strong>Code Explanation:</strong> Get natural language explanations of complex code</li>
                <li><strong>Language Translation:</strong> Convert code between programming languages</li>
                <li><strong>Test Generation:</strong> Automatically generate unit tests</li>
                <li><strong>Custom Brushes:</strong> Apply transformations like "make more readable" or "add error handling"</li>
            </ul>
            
            <h4>Working with Multiple Files</h4>
            <p>Copilot can understand context across open files. Keep related files open for better suggestions:</p>
            <ul>
                <li>Interface/type definitions</li>
                <li>Related utility functions</li>
                <li>Test files when writing implementations</li>
            </ul>
            
            <h4>Keyboard Shortcuts (VS Code)</h4>
            <ul>
                <li><code>Tab</code> - Accept suggestion</li>
                <li><code>Esc</code> - Dismiss suggestion</li>
                <li><code>Alt+]</code> - Next suggestion</li>
                <li><code>Alt+[</code> - Previous suggestion</li>
                <li><code>Ctrl+Enter</code> - Open Copilot panel with all suggestions</li>
            </ul>
            
            <h4>Performance Optimization</h4>
            <ul>
                <li>Keep your code organized and well-structured</li>
                <li>Use meaningful variable and function names</li>
                <li>Maintain consistent coding style</li>
                <li>Provide clear function signatures</li>
            </ul>
        `
    },
    {
        id: 'guide-6',
        title: 'Best Practices and Ethics',
        description: 'Learn responsible and effective use of GitHub Copilot in professional development.',
        difficulty: 'intermediate',
        duration: 15,
        content: `
            <h4>Code Review is Essential</h4>
            <p>Always review Copilot suggestions before accepting them:</p>
            <ul>
                <li>Verify logic correctness</li>
                <li>Check for security vulnerabilities</li>
                <li>Ensure code meets your team's standards</li>
                <li>Test thoroughly</li>
            </ul>
            
            <h4>Licensing and Copyright</h4>
            <p>Be aware of potential licensing issues:</p>
            <ul>
                <li>Copilot may suggest code similar to publicly available code</li>
                <li>Review suggestions for potential copyright concerns</li>
                <li>Use the duplicate detection feature</li>
                <li>Understand your organization's policy on AI-generated code</li>
            </ul>
            
            <h4>Security Considerations</h4>
            <ul>
                <li>Don't blindly accept suggestions for security-critical code</li>
                <li>Verify input validation and sanitization</li>
                <li>Check for common vulnerabilities (SQL injection, XSS, etc.)</li>
                <li>Use security scanning tools on Copilot-generated code</li>
            </ul>
            
            <h4>Team Collaboration</h4>
            <ul>
                <li>Establish team guidelines for Copilot use</li>
                <li>Document when and how Copilot was used</li>
                <li>Share effective prompts with team members</li>
                <li>Maintain code quality standards</li>
            </ul>
        `
    },
    {
        id: 'guide-7',
        title: 'Troubleshooting Common Issues',
        description: 'Solutions to frequently encountered problems when using GitHub Copilot.',
        difficulty: 'beginner',
        duration: 10,
        content: `
            <h4>Copilot Not Suggesting Anything</h4>
            <p><strong>Solutions:</strong></p>
            <ul>
                <li>Check if Copilot is enabled in your IDE</li>
                <li>Verify your subscription is active</li>
                <li>Ensure you're signed in to GitHub</li>
                <li>Check your internet connection</li>
                <li>Restart your IDE</li>
            </ul>
            
            <h4>Poor Quality Suggestions</h4>
            <p><strong>Solutions:</strong></p>
            <ul>
                <li>Improve your prompt quality (be more specific)</li>
                <li>Provide more context in comments</li>
                <li>Open related files for additional context</li>
                <li>Use clear variable and function names</li>
            </ul>
            
            <h4>Slow Response Time</h4>
            <p><strong>Solutions:</strong></p>
            <ul>
                <li>Check your network speed</li>
                <li>Close unnecessary applications</li>
                <li>Reduce the number of open files</li>
                <li>Clear IDE cache</li>
            </ul>
            
            <h4>Suggestions in Wrong Language</h4>
            <p><strong>Solutions:</strong></p>
            <ul>
                <li>Verify file extension is correct</li>
                <li>Check IDE language mode setting</li>
                <li>Add language-specific comments at the top</li>
            </ul>
            
            <h4>Getting Help</h4>
            <ul>
                <li>Visit GitHub Copilot documentation</li>
                <li>Check GitHub Community forums</li>
                <li>Contact GitHub Support</li>
                <li>Review extension logs for errors</li>
            </ul>
        `
    }
];

// Memory Cards Data
const memoryCards = [
    { id: 1, category: 'basics', question: 'What is GitHub Copilot?', answer: 'GitHub Copilot is an AI pair programmer that helps you write code faster by suggesting whole lines or entire functions based on your comments and code context.' },
    { id: 2, category: 'basics', question: 'Which AI model powers GitHub Copilot?', answer: 'GitHub Copilot is powered by OpenAI Codex, a generative pre-trained language model created by OpenAI.' },
    { id: 3, category: 'shortcuts', question: 'What keyboard shortcut accepts a Copilot suggestion in VS Code?', answer: 'Press Tab to accept a suggestion from GitHub Copilot in VS Code.' },
    { id: 4, category: 'shortcuts', question: 'How do you dismiss a Copilot suggestion?', answer: 'Press Esc or simply keep typing to dismiss a Copilot suggestion.' },
    { id: 5, category: 'shortcuts', question: 'How do you see alternative suggestions in VS Code?', answer: 'Press Alt+] for next suggestion and Alt+[ for previous suggestion. Or press Ctrl+Enter to open the suggestions panel.' },
    { id: 6, category: 'prompts', question: 'What makes a good prompt for Copilot?', answer: 'A good prompt is specific, provides context, includes examples when possible, and clearly describes the desired functionality including inputs, outputs, and edge cases.' },
    { id: 7, category: 'prompts', question: 'Should you use complete sentences in Copilot prompts?', answer: 'Yes! Clear, complete sentences in comments help Copilot understand your intent better and generate more accurate code suggestions.' },
    { id: 8, category: 'best-practices', question: 'Should you always accept Copilot suggestions without review?', answer: 'No! Always review suggestions for correctness, security vulnerabilities, and alignment with your coding standards before accepting them.' },
    { id: 9, category: 'best-practices', question: 'How can you improve Copilot\'s context awareness?', answer: 'Keep related files open, use meaningful variable names, provide clear type definitions, and write descriptive comments.' },
    { id: 10, category: 'basics', question: 'Which IDEs support GitHub Copilot?', answer: 'GitHub Copilot supports Visual Studio Code, JetBrains IDEs, Neovim, and Visual Studio.' },
    { id: 11, category: 'prompts', question: 'How should you describe a function for Copilot?', answer: 'Describe the function purpose, inputs (with types), outputs, and any special handling or edge cases. Example: "Function to validate email address, returns boolean".' },
    { id: 12, category: 'best-practices', question: 'What should you check in Copilot suggestions for security?', answer: 'Check for input validation, SQL injection vulnerabilities, XSS risks, proper authentication/authorization, and secure data handling.' },
    { id: 13, category: 'shortcuts', question: 'What does Ctrl+Enter do in VS Code with Copilot?', answer: 'Ctrl+Enter opens the Copilot panel showing all available suggestions for the current context.' },
    { id: 14, category: 'basics', question: 'Can Copilot generate entire functions?', answer: 'Yes! Copilot can suggest entire functions based on a descriptive comment or function signature.' },
    { id: 15, category: 'basics', question: 'Does Copilot work offline?', answer: 'No, GitHub Copilot requires an internet connection as it processes requests using cloud-based AI models.' },
    { id: 16, category: 'prompts', question: 'Should you include type hints in your prompts?', answer: 'Yes! Type hints help Copilot understand the data structures you\'re working with and generate more accurate, type-safe code.' },
    { id: 17, category: 'best-practices', question: 'How should teams use Copilot collaboratively?', answer: 'Establish usage guidelines, share effective prompts, maintain code review standards, and document Copilot\'s role in development.' },
    { id: 18, category: 'basics', question: 'What languages does Copilot support best?', answer: 'Copilot has excellent support for Python, JavaScript, TypeScript, Ruby, Go, Java, and C#, with good support for many other languages.' },
    { id: 19, category: 'shortcuts', question: 'How do you temporarily disable Copilot?', answer: 'Click the Copilot icon in the status bar or use the command palette to disable Copilot globally or for specific languages.' },
    { id: 20, category: 'prompts', question: 'Should you break complex tasks into steps for Copilot?', answer: 'Yes! Breaking complex tasks into smaller, well-described steps helps Copilot generate better, more maintainable code.' },
    { id: 21, category: 'best-practices', question: 'What is the duplicate detection feature?', answer: 'Duplicate detection alerts you when Copilot suggestions match public code, helping you avoid potential licensing issues.' },
    { id: 22, category: 'basics', question: 'Can Copilot write tests?', answer: 'Yes! Copilot can help generate unit tests, integration tests, and test cases based on your code and comments.' },
    { id: 23, category: 'best-practices', question: 'Should you rely solely on Copilot for critical code?', answer: 'No! For security-critical or business-critical code, always thoroughly review, test, and validate Copilot suggestions.' },
    { id: 24, category: 'prompts', question: 'How do you help Copilot understand error handling?', answer: 'Explicitly mention error cases in comments, describe expected exceptions, and specify how errors should be handled.' },
    { id: 25, category: 'basics', question: 'What is Copilot Labs?', answer: 'Copilot Labs is an experimental feature set offering code explanations, language translation, test generation, and code transformations.' },
    { id: 26, category: 'best-practices', question: 'How can you verify Copilot suggestion quality?', answer: 'Run tests, perform code reviews, check for edge cases, verify logic, and ensure code meets your standards and requirements.' },
    { id: 27, category: 'shortcuts', question: 'Can you customize Copilot keyboard shortcuts?', answer: 'Yes! You can customize keyboard shortcuts in your IDE settings to match your preferences.' },
    { id: 28, category: 'prompts', question: 'Should you provide examples in your prompts?', answer: 'Yes! Including input/output examples in comments helps Copilot understand exactly what you want.' },
    { id: 29, category: 'best-practices', question: 'How do you handle licensing concerns with Copilot?', answer: 'Review suggestions for similarities to public code, use duplicate detection, understand your org\'s AI code policy, and maintain proper attribution.' },
    { id: 30, category: 'basics', question: 'Does Copilot learn from your code?', answer: 'No, Copilot doesn\'t learn from your individual code. However, it uses the context of your current file and open files to provide relevant suggestions.' }
];

// Caselets Data
const caselets = [
    {
        id: 1,
        title: 'Refactoring Legacy JavaScript to TypeScript',
        scenario: 'A development team inherited a large JavaScript codebase that needed to be converted to TypeScript for better type safety and maintainability.',
        problem: 'Manual conversion would take weeks and be error-prone. The team needed to maintain functionality while adding type definitions.',
        solution: 'Using GitHub Copilot, the team: 1) Added TypeScript file extensions, 2) Wrote comments describing expected types, 3) Let Copilot suggest type definitions and interfaces, 4) Reviewed and adjusted suggestions for accuracy.',
        learnings: [
            'Copilot can significantly speed up type conversion tasks',
            'Provide clear type hints in comments for better suggestions',
            'Always verify generated types against runtime behavior',
            'Keep related type definition files open for better context'
        ]
    },
    {
        id: 2,
        title: 'Building a REST API with Express',
        scenario: 'A developer needed to quickly create a REST API for a new microservice with standard CRUD operations.',
        problem: 'Writing boilerplate code for routes, controllers, and middleware was time-consuming.',
        solution: 'The developer used Copilot by: 1) Writing descriptive comments for each endpoint, 2) Defining route handlers with clear input/output descriptions, 3) Using Copilot to generate middleware for validation and authentication, 4) Letting Copilot suggest error handling patterns.',
        learnings: [
            'Copilot excels at generating standard API patterns',
            'Describe HTTP methods, paths, and expected responses clearly',
            'Review generated error handling carefully',
            'Copilot can suggest consistent middleware patterns'
        ]
    },
    {
        id: 3,
        title: 'Test Generation for React Components',
        scenario: 'A team needed comprehensive test coverage for their React component library but writing tests was taking too much time.',
        problem: 'Creating test cases for various props, states, and user interactions was repetitive and time-consuming.',
        solution: 'Using Copilot, they: 1) Opened component and test files side-by-side, 2) Wrote descriptive test names as comments, 3) Let Copilot suggest test implementations, 4) Used Copilot to generate edge case tests, 5) Reviewed and enhanced suggestions.',
        learnings: [
            'Copilot can generate comprehensive test suites',
            'Keep component files open for better context',
            'Write clear test descriptions in comments',
            'Verify test assertions match expected behavior'
        ]
    },
    {
        id: 4,
        title: 'Data Processing Pipeline in Python',
        scenario: 'A data engineer needed to build a pipeline to process and transform large datasets from multiple sources.',
        problem: 'Writing data transformation logic and handling various edge cases was complex and error-prone.',
        solution: 'The engineer: 1) Wrote detailed docstrings describing each transformation step, 2) Included sample input/output data in comments, 3) Used Copilot to generate transformation functions, 4) Let Copilot suggest error handling for data quality issues.',
        learnings: [
            'Provide sample data in comments for better suggestions',
            'Use descriptive function names that indicate transformations',
            'Copilot can suggest appropriate pandas/numpy operations',
            'Always validate generated code with actual data'
        ]
    },
    {
        id: 5,
        title: 'Database Query Optimization',
        scenario: 'An application was experiencing slow database queries that needed optimization.',
        problem: 'Identifying and rewriting inefficient queries required deep SQL knowledge and understanding of the schema.',
        solution: 'The developer: 1) Added comments describing the query purpose and performance issues, 2) Opened schema definition files for context, 3) Asked Copilot for optimized versions with proper indexing hints, 4) Used Copilot to suggest query refactoring strategies.',
        learnings: [
            'Describe performance requirements in comments',
            'Provide schema context for better query suggestions',
            'Copilot can suggest index usage and JOIN optimizations',
            'Always test optimized queries with production-like data'
        ]
    },
    {
        id: 6,
        title: 'Implementing Authentication System',
        scenario: 'A startup needed to implement secure user authentication for their web application.',
        problem: 'Security best practices for password hashing, token management, and session handling are complex and critical to get right.',
        solution: 'The team: 1) Clearly documented security requirements in comments, 2) Specified use of established libraries (bcrypt, JWT), 3) Let Copilot suggest implementation patterns, 4) Conducted thorough security review of all suggestions.',
        learnings: [
            'Always specify security libraries to use',
            'Copilot can suggest secure patterns but review is critical',
            'Include security requirements in prompts',
            'Never blindly trust authentication code - always review and test'
        ]
    },
    {
        id: 7,
        title: 'Code Documentation Generation',
        scenario: 'A large codebase lacked proper documentation, making onboarding and maintenance difficult.',
        problem: 'Writing comprehensive documentation for hundreds of functions was time-consuming.',
        solution: 'Using Copilot: 1) Position cursor in docstring location, 2) Write opening comment syntax, 3) Let Copilot generate documentation based on function signature and implementation, 4) Review and enhance generated docs.',
        learnings: [
            'Copilot can generate quality documentation from code context',
            'Use consistent documentation format for better results',
            'Verify technical accuracy of generated docs',
            'Add examples and edge cases manually for completeness'
        ]
    },
    {
        id: 8,
        title: 'Migrating from Class Components to Hooks',
        scenario: 'A React application needed to modernize by converting class components to functional components with hooks.',
        problem: 'Converting lifecycle methods and state management to hooks patterns required careful refactoring.',
        solution: 'The developer: 1) Created new functional component structure, 2) Commented on which lifecycle methods to convert, 3) Used Copilot to suggest appropriate hooks (useState, useEffect), 4) Verified behavior matches original component.',
        learnings: [
            'Describe the original component behavior in comments',
            'Copilot understands React patterns and hook usage',
            'Always test converted components thoroughly',
            'Keep original component open for reference context'
        ]
    },
    {
        id: 9,
        title: 'Building CLI Tool with Argument Parsing',
        scenario: 'A team needed to create a command-line tool with complex argument parsing and subcommands.',
        problem: 'Setting up argument parsing, help messages, and command structure is boilerplate-heavy.',
        solution: 'Using Copilot: 1) Wrote comments describing CLI structure and commands, 2) Specified argument parser library (argparse/commander), 3) Let Copilot generate parser configuration, 4) Used Copilot for help text generation.',
        learnings: [
            'Copilot is excellent for CLI boilerplate',
            'Describe command structure clearly in comments',
            'Specify the argument parsing library you prefer',
            'Copilot can generate helpful error messages and help text'
        ]
    },
    {
        id: 10,
        title: 'Error Handling and Logging Enhancement',
        scenario: 'An application lacked proper error handling and logging, making debugging difficult in production.',
        problem: 'Adding comprehensive error handling and structured logging throughout the codebase was tedious.',
        solution: 'The developer: 1) Established logging patterns in comments, 2) Described error scenarios to handle, 3) Used Copilot to suggest try-catch blocks and logging statements, 4) Created consistent error handling patterns across codebase.',
        learnings: [
            'Define error handling patterns early',
            'Copilot can suggest appropriate log levels',
            'Describe expected errors and edge cases',
            'Ensure consistent error handling across the application'
        ]
    }
];

// MCQ Data
const mcqQuestions = [
    {
        id: 1,
        question: 'What keyboard shortcut accepts a GitHub Copilot suggestion in VS Code?',
        options: ['Ctrl + Space', 'Alt + \\', 'Tab', 'Enter'],
        correctAnswer: 2,
        explanation: 'Tab is the default keyboard shortcut to accept a GitHub Copilot suggestion in VS Code.'
    },
    {
        id: 2,
        question: 'Which AI model powers GitHub Copilot?',
        options: ['GPT-3', 'OpenAI Codex', 'BERT', 'AlphaCode'],
        correctAnswer: 1,
        explanation: 'GitHub Copilot is powered by OpenAI Codex, a generative pre-trained language model.'
    },
    {
        id: 3,
        question: 'What is the most important practice when using Copilot suggestions?',
        options: ['Accept all suggestions immediately', 'Always review suggestions before accepting', 'Only use suggestions for simple code', 'Disable Copilot for production code'],
        correctAnswer: 1,
        explanation: 'You should always review suggestions for correctness, security, and alignment with your coding standards.'
    },
    {
        id: 4,
        question: 'Which of these makes a good prompt for Copilot?',
        options: ['// function', '// TODO', '// Function to validate email address and return boolean', '// code here'],
        correctAnswer: 2,
        explanation: 'Specific, descriptive prompts that include the purpose, inputs, and expected outputs help Copilot generate better code.'
    },
    {
        id: 5,
        question: 'Does GitHub Copilot require an internet connection?',
        options: ['No, it works offline', 'Yes, it requires internet connection', 'Only for initial setup', 'Only for certain languages'],
        correctAnswer: 1,
        explanation: 'GitHub Copilot requires an internet connection as it uses cloud-based AI models to process requests.'
    },
    {
        id: 6,
        question: 'What should you check in Copilot-generated code for security-critical applications?',
        options: ['Only syntax errors', 'Input validation, SQL injection, and XSS vulnerabilities', 'Only variable names', 'Nothing, Copilot code is always secure'],
        correctAnswer: 1,
        explanation: 'Always check for input validation, SQL injection, XSS risks, and other security vulnerabilities in Copilot suggestions.'
    },
    {
        id: 7,
        question: 'How can you see alternative suggestions in VS Code?',
        options: ['Tab repeatedly', 'Alt+] and Alt+[', 'Ctrl+Alt+Space', 'F12'],
        correctAnswer: 1,
        explanation: 'Alt+] shows the next suggestion and Alt+[ shows the previous suggestion. You can also use Ctrl+Enter to see all suggestions.'
    },
    {
        id: 8,
        question: 'Which IDE is NOT officially supported by GitHub Copilot?',
        options: ['Visual Studio Code', 'JetBrains IDEs', 'Sublime Text', 'Visual Studio'],
        correctAnswer: 2,
        explanation: 'GitHub Copilot officially supports VS Code, JetBrains IDEs, Neovim, and Visual Studio. Sublime Text is not officially supported.'
    },
    {
        id: 9,
        question: 'What is Copilot Labs?',
        options: ['A testing environment', 'Experimental features like code explanation and translation', 'A separate IDE', 'A training program'],
        correctAnswer: 1,
        explanation: 'Copilot Labs offers experimental features including code explanations, language translation, test generation, and code transformations.'
    },
    {
        id: 10,
        question: 'How does providing context help Copilot?',
        options: ['It doesn\'t help', 'It slows down suggestions', 'It helps generate more accurate and relevant code', 'It only helps with comments'],
        correctAnswer: 2,
        explanation: 'Providing context through open files, clear variable names, and descriptive comments helps Copilot generate more accurate suggestions.'
    },
    {
        id: 11,
        question: 'Can Copilot generate entire functions?',
        options: ['No, only single lines', 'Yes, based on comments or signatures', 'Only for Python', 'Only for simple functions'],
        correctAnswer: 1,
        explanation: 'Copilot can generate entire functions based on descriptive comments or function signatures in many programming languages.'
    },
    {
        id: 12,
        question: 'What is the duplicate detection feature?',
        options: ['Finds duplicate variables', 'Alerts when suggestions match public code', 'Removes duplicate lines', 'Checks for repeated functions'],
        correctAnswer: 1,
        explanation: 'Duplicate detection alerts you when Copilot suggestions closely match publicly available code, helping avoid licensing issues.'
    },
    {
        id: 13,
        question: 'Which language has the BEST support in GitHub Copilot?',
        options: ['Assembly', 'COBOL', 'Python', 'Fortran'],
        correctAnswer: 2,
        explanation: 'Python has excellent support in GitHub Copilot, along with JavaScript, TypeScript, Ruby, Go, Java, and C#.'
    },
    {
        id: 14,
        question: 'How should you write prompts for complex tasks?',
        options: ['One long comment', 'Break into smaller, well-described steps', 'Don\'t use comments', 'Use only variable names'],
        correctAnswer: 1,
        explanation: 'Breaking complex tasks into smaller, well-described steps helps Copilot generate better, more maintainable code.'
    },
    {
        id: 15,
        question: 'Does Copilot learn from your personal code?',
        options: ['Yes, always', 'No, but it uses current file context', 'Only with permission', 'Only in private repos'],
        correctAnswer: 1,
        explanation: 'Copilot doesn\'t learn from your individual code, but it uses the context of your current file and open files for suggestions.'
    }
];

// Fun Facts Data
const funFacts = [
    { id: 1, category: 'History', fact: 'GitHub Copilot was first announced in June 2021 and became generally available in June 2022.' },
    { id: 2, category: 'Performance', fact: 'According to GitHub research, developers using Copilot complete tasks up to 55% faster than those without it.' },
    { id: 3, category: 'Usage', fact: 'GitHub Copilot supports over 60 programming languages, though quality varies by language popularity.' },
    { id: 4, category: 'Technology', fact: 'Copilot was trained on billions of lines of public code from GitHub repositories.' },
    { id: 5, category: 'Features', fact: 'Copilot can convert comments into code in over a dozen natural languages, not just English!' },
    { id: 6, category: 'Productivity', fact: 'Developers report that nearly 40% of their code is now written by GitHub Copilot in files where it\'s enabled.' },
    { id: 7, category: 'AI', fact: 'OpenAI Codex, which powers Copilot, is a descendant of GPT-3 specifically fine-tuned for code generation.' },
    { id: 8, category: 'Usage', fact: 'GitHub Copilot suggests an average of 10 different completions for each coding context.' },
    { id: 9, category: 'Community', fact: 'Over 1 million developers used Copilot in its first year of general availability.' },
    { id: 10, category: 'Features', fact: 'Copilot can generate unit tests, documentation, and even SQL queries based on natural language descriptions.' },
    { id: 11, category: 'Education', fact: 'GitHub Copilot is free for verified students and maintainers of popular open source projects.' },
    { id: 12, category: 'Technology', fact: 'Copilot uses the surrounding code context, including other files you have open, to make better suggestions.' },
    { id: 13, category: 'Performance', fact: 'The average acceptance rate for Copilot suggestions is around 26-30%, varying by programming language.' },
    { id: 14, category: 'Features', fact: 'Copilot can translate code between different programming languages through Copilot Labs.' },
    { id: 15, category: 'Usage', fact: 'The most common use cases for Copilot are writing boilerplate code, tests, and documentation.' },
    { id: 16, category: 'AI', fact: 'Copilot\'s AI model was trained on terabytes of publicly available source code, mostly from GitHub.' },
    { id: 17, category: 'Productivity', fact: 'Developers spend 55% less time searching for code examples online when using Copilot.' },
    { id: 18, category: 'Features', fact: 'Copilot can explain complex code in plain English through the Copilot Labs extension.' },
    { id: 19, category: 'Community', fact: 'GitHub Copilot has been integrated into popular IDEs including VS Code, JetBrains, and Neovim.' },
    { id: 20, category: 'Technology', fact: 'Copilot\'s suggestions are generated in real-time, typically appearing within milliseconds of you typing.' }
];

// Points to Ponder Data
const pointsToPonder = [
    {
        id: 1,
        question: 'How will AI pair programmers like Copilot change the role of software developers in the next decade?',
        context: 'As AI becomes better at generating code, will developers focus more on architecture, problem-solving, and code review rather than writing boilerplate?',
        relatedTopics: ['AI Ethics', 'Future of Work', 'Software Architecture']
    },
    {
        id: 2,
        question: 'What are the ethical implications of training AI models on public code repositories?',
        context: 'Copilot was trained on billions of lines of public code. What responsibilities do AI creators have regarding licensing and attribution?',
        relatedTopics: ['Copyright', 'Open Source', 'AI Ethics']
    },
    {
        id: 3,
        question: 'Could over-reliance on Copilot hinder the development of programming skills in junior developers?',
        context: 'If developers rely too heavily on AI suggestions, might they miss out on learning fundamental programming concepts and problem-solving skills?',
        relatedTopics: ['Education', 'Skill Development', 'Best Practices']
    },
    {
        id: 4,
        question: 'How should teams balance the productivity gains of Copilot with code quality and security concerns?',
        context: 'While Copilot increases speed, it may introduce security vulnerabilities or lower-quality code if not properly reviewed.',
        relatedTopics: ['Security', 'Code Quality', 'Team Collaboration']
    },
    {
        id: 5,
        question: 'What new skills will developers need to effectively collaborate with AI coding assistants?',
        context: 'Prompt engineering and AI collaboration are emerging skills. What else will developers need to learn?',
        relatedTopics: ['Prompt Engineering', 'AI Collaboration', 'Professional Development']
    },
    {
        id: 6,
        question: 'How might Copilot affect the diversity and creativity of code solutions?',
        context: 'If many developers use the same AI assistant, could we see more homogeneous code patterns across the industry?',
        relatedTopics: ['Code Diversity', 'Innovation', 'Best Practices']
    },
    {
        id: 7,
        question: 'What responsibility do developers have when using AI-generated code in production systems?',
        context: 'When code is AI-generated, who is accountable for bugs or security issues - the developer, the AI creator, or both?',
        relatedTopics: ['Accountability', 'Professional Ethics', 'Quality Assurance']
    },
    {
        id: 8,
        question: 'How can organizations ensure AI coding tools like Copilot don\'t compromise proprietary code?',
        context: 'While Copilot doesn\'t share your code, there are concerns about data privacy and intellectual property.',
        relatedTopics: ['Data Privacy', 'IP Protection', 'Enterprise Security']
    },
    {
        id: 9,
        question: 'Will AI coding assistants democratize programming or create a new digital divide?',
        context: 'Copilot requires a paid subscription. Could this create inequality between developers with and without access?',
        relatedTopics: ['Accessibility', 'Equity', 'Technology Access']
    },
    {
        id: 10,
        question: 'How should code review processes evolve in the age of AI-assisted development?',
        context: 'Traditional code reviews assume human-written code. What new considerations arise with AI-generated code?',
        relatedTopics: ['Code Review', 'Quality Assurance', 'Team Processes']
    }
];

// Make data available globally
window.learningGuides = learningGuides;
window.memoryCards = memoryCards;
window.caselets = caselets;
window.mcqQuestions = mcqQuestions;
window.funFacts = funFacts;
window.pointsToPonder = pointsToPonder;
