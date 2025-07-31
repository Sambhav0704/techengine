import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle, 
  X, 
  Filter, 
  Code, 
  BookOpen, 
  Target, 
  Clock, 
  Star,
  ChevronDown,
  ChevronUp,
  Settings,
  Moon,
  Sun,
  RotateCcw,
  Download,
  Share2,
  Award
} from 'lucide-react';

interface PracticeQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  technology: string;
  category: string;
  problemStatement: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  starterCode: string;
  testCases: Array<{
    input: string;
    output: string;
    isHidden: boolean;
  }>;
  relatedTheoryQuestion?: TheoryQuestion;
}

interface TheoryQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface ProgressData {
  technology: string;
  completed: number;
  total: number;
  accuracy: number;
}

const PracticeQuestions: React.FC = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<PracticeQuestion | null>(null);
  const [code, setCode] = useState<string>('');
  const [testInput, setTestInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showTheoryModal, setShowTheoryModal] = useState<boolean>(false);
  const [currentTheoryQuestion, setCurrentTheoryQuestion] = useState<TheoryQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; input: string; expected: string; actual: string }>>([]);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(7);
  const [totalXP, setTotalXP] = useState<number>(1250);

  const technologies = [
    'Docker', 'Git', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 
    'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS', 'CI/CD', 'Flutter', 'TypeScript'
  ];

  const categories = ['DevOps', 'Web Development', 'Cybersecurity', 'App Development'];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  // Mock data for practice questions
  const practiceQuestions: PracticeQuestion[] = [
    // DevOps Questions
    {
      id: '1',
      title: 'Docker Container Management',
      description: 'Create and manage Docker containers for a web application',
      difficulty: 'Easy',
      technology: 'Docker',
      category: 'DevOps',
      problemStatement: `You need to create a Dockerfile for a Node.js web application. The application should:
1. Use Node.js 18 as the base image
2. Copy package.json and package-lock.json first
3. Install dependencies
4. Copy the rest of the application code
5. Expose port 3000
6. Start the application with 'npm start'

Write a Dockerfile that follows these requirements.`,
      examples: [
        {
          input: 'Dockerfile content',
          output: 'Successfully built and running container',
          explanation: 'The Dockerfile should use multi-stage build for optimization'
        }
      ],
      constraints: [
        'Must use Node.js 18 base image',
        'Must expose port 3000',
        'Must use npm start command'
      ],
      starterCode: `# Write your Dockerfile here
FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]`,
      testCases: [
        { input: 'docker build -t myapp .', output: 'Success', isHidden: false },
        { input: 'docker run -p 3000:3000 myapp', output: 'Container running', isHidden: false }
      ],
      relatedTheoryQuestion: {
        id: 't1',
        question: 'What is the difference between COPY and ADD in Docker?',
        options: [
          'COPY is faster than ADD',
          'ADD supports URL and tar extraction, COPY does not',
          'COPY is deprecated, ADD is the new standard',
          'There is no difference between them'
        ],
        correctAnswer: 1,
        explanation: 'ADD supports URL and tar extraction while COPY only copies files from the host to the container. COPY is generally preferred for simple file copying.',
        category: 'Docker'
      }
    },
    {
      id: '2',
      title: 'Git Branch Management',
      description: 'Create and manage Git branches for feature development',
      difficulty: 'Medium',
      technology: 'Git',
      category: 'DevOps',
      problemStatement: `You are working on a new feature and need to:
1. Create a new branch from main
2. Make some changes
3. Stage and commit the changes
4. Push the branch to remote
5. Create a pull request

Write the Git commands to accomplish this workflow.`,
      examples: [
        {
          input: 'git commands',
          output: 'Feature branch created and pushed',
          explanation: 'Use descriptive branch names and commit messages'
        }
      ],
      constraints: [
        'Must create branch from main',
        'Must include commit message',
        'Must push to remote'
      ],
      starterCode: `# Write your Git commands here
# 1. Create and switch to new branch
git checkout -b feature/new-feature

# 2. Make your changes (edit files)

# 3. Stage changes
git add .

# 4. Commit changes
git commit -m "Add new feature"

# 5. Push to remote
git push origin feature/new-feature`,
      testCases: [
        { input: 'git branch', output: 'feature/new-feature', isHidden: false },
        { input: 'git log --oneline -1', output: 'Add new feature', isHidden: false }
      ],
      relatedTheoryQuestion: {
        id: 't2',
        question: 'What is the difference between git merge and git rebase?',
        options: [
          'Merge creates a new commit, rebase moves commits',
          'Rebase is faster than merge',
          'Merge is safer than rebase',
          'They do exactly the same thing'
        ],
        correctAnswer: 0,
        explanation: 'Git merge creates a new merge commit that combines changes from both branches, while git rebase moves commits from one branch to another, creating a linear history.',
        category: 'Git'
      }
    },
    {
      id: '3',
      title: 'CI/CD Pipeline Setup',
      description: 'Create a GitHub Actions workflow for automated testing and deployment',
      difficulty: 'Hard',
      technology: 'CI/CD',
      category: 'DevOps',
      problemStatement: `Create a GitHub Actions workflow that:
1. Triggers on push to main branch
2. Runs tests for a Node.js application
3. Builds the application
4. Deploys to staging environment
5. Sends notification on success/failure

Write the YAML configuration for this workflow.`,
      examples: [
        {
          input: '.github/workflows/deploy.yml',
          output: 'Automated deployment pipeline',
          explanation: 'Use environment secrets for sensitive data'
        }
      ],
      constraints: [
        'Must use Node.js 18',
        'Must include testing step',
        'Must deploy to staging'
      ],
      starterCode: `name: Deploy to Staging

on:
  push:
    branches: [ main ]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to staging
      run: echo "Deploying to staging..."
      # Add your deployment commands here`,
      testCases: [
        { input: 'npm test', output: 'All tests passed', isHidden: false },
        { input: 'npm run build', output: 'Build successful', isHidden: false }
      ],
      relatedTheoryQuestion: {
        id: 't3',
        question: 'What is the main benefit of CI/CD pipelines?',
        options: [
          'They make code run faster',
          'They automate testing and deployment processes',
          'They reduce code complexity',
          'They eliminate the need for testing'
        ],
        correctAnswer: 1,
        explanation: 'CI/CD pipelines automate the process of testing, building, and deploying code, reducing human error and speeding up delivery.',
        category: 'CI/CD'
      }
    },
    // Web Development Questions
    {
      id: '4',
      title: 'React Component State Management',
      description: 'Create a React component with proper state management',
      difficulty: 'Easy',
      technology: 'React',
      category: 'Web Development',
      problemStatement: `Create a React functional component that:
1. Manages a counter state
2. Has increment and decrement buttons
3. Displays the current count
4. Uses useState hook
5. Includes proper TypeScript types

Write the complete component code.`,
      examples: [
        {
          input: 'Click increment button',
          output: 'Counter increases by 1',
          explanation: 'State updates trigger re-renders'
        }
      ],
      constraints: [
        'Must use functional component',
        'Must use useState hook',
        'Must include TypeScript'
      ],
      starterCode: `import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  // Write your state management here
  
  return (
    <div>
      {/* Write your JSX here */}
    </div>
  );
};

export default Counter;`,
      testCases: [
        { input: 'Initial render', output: 'Counter: 0', isHidden: false },
        { input: 'Click increment', output: 'Counter: 1', isHidden: false }
      ],
      relatedTheoryQuestion: {
        id: 't4',
        question: 'What is the difference between useState and useReducer?',
        options: [
          'useState is for simple state, useReducer for complex state logic',
          'useState is faster than useReducer',
          'useReducer is deprecated',
          'They are exactly the same'
        ],
        correctAnswer: 0,
        explanation: 'useState is ideal for simple state management, while useReducer is better for complex state logic with multiple sub-values.',
        category: 'React'
      }
    },
    {
      id: '5',
      title: 'MongoDB Aggregation Pipeline',
      description: 'Create complex MongoDB aggregation queries',
      difficulty: 'Medium',
      technology: 'MongoDB',
      category: 'Web Development',
      problemStatement: `Write a MongoDB aggregation pipeline that:
1. Groups users by their department
2. Calculates average salary per department
3. Filters departments with average salary > 50000
4. Sorts by average salary descending
5. Limits to top 5 results

Assume a users collection with fields: name, department, salary`,
      examples: [
        {
          input: 'Users collection data',
          output: 'Top 5 departments by average salary',
          explanation: 'Use $group, $match, $sort, and $limit stages'
        }
      ],
      constraints: [
        'Must use aggregation pipeline',
        'Must filter by salary threshold',
        'Must sort and limit results'
      ],
      starterCode: `db.users.aggregate([
  // Write your aggregation pipeline here
  // Stage 1: Group by department
  // Stage 2: Calculate average salary
  // Stage 3: Filter high-paying departments
  // Stage 4: Sort by average salary
  // Stage 5: Limit to top 5
]);`,
      testCases: [
        { input: 'Sample users data', output: '5 departments listed', isHidden: false },
        { input: 'Empty collection', output: 'Empty result', isHidden: false }
      ],
      relatedTheoryQuestion: {
        id: 't5',
        question: 'What is the purpose of the $lookup stage in MongoDB aggregation?',
        options: [
          'To perform left outer joins between collections',
          'To sort documents',
          'To limit results',
          'To group documents'
        ],
        correctAnswer: 0,
        explanation: '$lookup performs a left outer join to a collection in the same database to filter in documents from the "joined" collection.',
        category: 'MongoDB'
      }
    },
    // Cybersecurity Questions
    {
      id: '6',
      title: 'SQL Injection Prevention',
      description: 'Implement secure database queries to prevent SQL injection',
      difficulty: 'Medium',
      technology: 'Cybersecurity',
      category: 'Cybersecurity',
      problemStatement: `You need to create a secure user authentication function that:
1. Takes username and password as parameters
2. Validates input to prevent SQL injection
3. Uses parameterized queries
4. Returns user data if authentication succeeds
5. Handles errors securely

Write the secure authentication function.`,
      examples: [
        {
          input: "username: 'admin'; DROP TABLE users; --",
          output: 'Input rejected or safely handled',
          explanation: 'Malicious input should be prevented or escaped'
        }
      ],
      constraints: [
        'Must use parameterized queries',
        'Must validate input',
        'Must handle errors securely'
      ],
      starterCode: `async function authenticateUser(username: string, password: string) {
  // Write your secure authentication logic here
  // 1. Validate input
  // 2. Use parameterized queries
  // 3. Handle errors securely
  // 4. Return user data or null
}

// Example usage:
// const user = await authenticateUser('john_doe', 'password123');`,
      testCases: [
        { input: 'Valid credentials', output: 'User object returned', isHidden: false },
        { input: 'SQL injection attempt', output: 'Error or rejection', isHidden: false }
      ],
      relatedTheoryQuestion: {
        id: 't6',
        question: 'What is the most effective way to prevent SQL injection attacks?',
        options: [
          'Input validation only',
          'Using parameterized queries/prepared statements',
          'Escaping special characters',
          'Using stored procedures'
        ],
        correctAnswer: 1,
        explanation: 'Parameterized queries separate SQL logic from data, preventing malicious input from being executed as SQL code.',
        category: 'Cybersecurity'
      }
    },
    // App Development Questions
    {
      id: '7',
      title: 'Flutter State Management with Provider',
      description: 'Implement state management in a Flutter app using Provider pattern',
      difficulty: 'Easy',
      technology: 'Flutter',
      category: 'App Development',
      problemStatement: `Create a Flutter app that:
1. Uses Provider for state management
2. Manages a shopping cart state
3. Allows adding/removing items
4. Displays total price
5. Updates UI when state changes

Write the Provider class and main widget.`,
      examples: [
        {
          input: 'Add item to cart',
          output: 'Cart updates and total recalculates',
          explanation: 'Provider notifies listeners of state changes'
        }
      ],
      constraints: [
        'Must use Provider pattern',
        'Must manage cart state',
        'Must update UI automatically'
      ],
      starterCode: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CartItem {
  final String name;
  final double price;
  final int quantity;
  
  CartItem({required this.name, required this.price, this.quantity = 1});
}

class CartProvider extends ChangeNotifier {
  // Write your cart state management here
  
  void addItem(CartItem item) {
    // Implement add logic
  }
  
  void removeItem(String itemName) {
    // Implement remove logic
  }
  
  double get total => 0.0; // Calculate total
}

class ShoppingCartApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CartProvider(),
      child: MaterialApp(
        home: CartScreen(),
      ),
    );
  }
}`,
      testCases: [
        { input: 'Add item', output: 'Cart count increases', isHidden: false },
        { input: 'Remove item', output: 'Cart count decreases', isHidden: false }
      ],
      relatedTheoryQuestion: {
        id: 't7',
        question: 'What is the main advantage of using Provider over setState?',
        options: [
          'Provider is faster than setState',
          'Provider allows state sharing across widgets without prop drilling',
          'Provider reduces app size',
          'Provider is required for all Flutter apps'
        ],
        correctAnswer: 1,
        explanation: 'Provider allows you to share state across multiple widgets without passing data through constructors (prop drilling).',
        category: 'Flutter'
      }
    }
  ];

  // Progress tracking data
  const progressData: ProgressData[] = [
    { technology: 'Docker', completed: 3, total: 30, accuracy: 85 },
    { technology: 'Git', completed: 5, total: 30, accuracy: 92 },
    { technology: 'React', completed: 8, total: 30, accuracy: 78 },
    { technology: 'MongoDB', completed: 2, total: 30, accuracy: 65 },
    { technology: 'Flutter', completed: 6, total: 30, accuracy: 88 },
    { technology: 'Cybersecurity', completed: 4, total: 30, accuracy: 82 }
  ];

  const filteredQuestions = practiceQuestions.filter(q => 
    (!selectedTechnology || q.technology === selectedTechnology) &&
    (!selectedDifficulty || q.difficulty === selectedDifficulty) &&
    (!selectedCategory || q.category === selectedCategory)
  );

  const handleQuestionSelect = (question: PracticeQuestion) => {
    setSelectedQuestion(question);
    setCode(question.starterCode);
    setTestInput('');
    setOutput('');
    setShowResults(false);
    setTestResults([]);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput('Code executed successfully!\nOutput: Hello World');
      setIsRunning(false);
    }, 2000);
  };

  const handleTestCode = async () => {
    setIsRunning(true);
    setShowResults(true);
    
    // Simulate test execution
    setTimeout(() => {
      const results = selectedQuestion?.testCases.map((testCase, index) => ({
        passed: Math.random() > 0.3, // 70% pass rate for demo
        input: testCase.input,
        expected: testCase.output,
        actual: testCase.output
      })) || [];
      
      setTestResults(results);
      setIsRunning(false);
      
      // Show theory question if all tests pass
      if (results.every(r => r.passed) && selectedQuestion?.relatedTheoryQuestion) {
        setTimeout(() => {
          setCurrentTheoryQuestion(selectedQuestion.relatedTheoryQuestion);
          setShowTheoryModal(true);
        }, 1000);
      }
    }, 3000);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === currentTheoryQuestion?.correctAnswer) {
      alert('Correct! Great job!');
    } else {
      alert(`Incorrect. The correct answer is: ${currentTheoryQuestion?.options[currentTheoryQuestion.correctAnswer]}`);
    }
    setShowTheoryModal(false);
    setSelectedAnswer(null);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold">TechEngine</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm">AI-Integrated Learning</span>
            </div>
          </div>
          
          {/* Student Profile & Progress */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{currentStreak}</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{totalXP}</div>
                <div className="text-xs text-gray-500">Total XP</div>
              </div>
              <button
                onClick={() => setShowProgress(!showProgress)}
                className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
              >
                <Target className="w-4 h-4" />
                <span className="text-sm">Progress</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Settings className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Question List and Problem Statement */}
        <div className="w-1/3 flex flex-col border-r border-gray-200">
          {/* Filters */}
          <div className={`p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Technology</label>
                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">All Technologies</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">All Difficulties</option>
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Question List */}
          <div className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="p-4">
              <h3 className="font-medium mb-3">Questions ({filteredQuestions.length})</h3>
              <div className="space-y-2">
                {filteredQuestions.map(question => (
                  <div
                    key={question.id}
                    onClick={() => handleQuestionSelect(question)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedQuestion?.id === question.id
                        ? isDarkMode 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-purple-100 text-purple-900'
                        : isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{question.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="text-xs opacity-75">{question.technology}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor and Problem Statement */}
        <div className="flex-1 flex flex-col">
          {selectedQuestion ? (
            <>
              {/* Problem Statement */}
              <div className={`h-1/2 overflow-y-auto border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{selectedQuestion.title}</h2>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        selectedQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedQuestion.difficulty}
                      </span>
                      <span className="text-sm opacity-75">{selectedQuestion.technology}</span>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="mb-4">{selectedQuestion.problemStatement}</p>
                    
                    <h4 className="font-medium mb-2">Examples:</h4>
                    {selectedQuestion.examples.map((example, index) => (
                      <div key={index} className="mb-4 p-3 bg-gray-100 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <strong>Input:</strong>
                            <pre className="text-sm mt-1">{example.input}</pre>
                          </div>
                          <div>
                            <strong>Output:</strong>
                            <pre className="text-sm mt-1">{example.output}</pre>
                          </div>
                        </div>
                        {example.explanation && (
                          <div className="mt-2">
                            <strong>Explanation:</strong>
                            <p className="text-sm mt-1">{example.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <h4 className="font-medium mb-2">Constraints:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedQuestion.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm">{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Code Editor</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        <Play className="w-4 h-4" />
                        <span>Run</span>
                      </button>
                      <button
                        onClick={handleTestCode}
                        disabled={isRunning}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Test</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 flex">
                  {/* Code Editor */}
                  <div className="flex-1 p-4">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className={`w-full h-full p-4 font-mono text-sm rounded-lg border resize-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-gray-50 border-gray-300'
                      }`}
                      placeholder="Write your code here..."
                    />
                  </div>
                  
                  {/* Output Panel */}
                  <div className="w-1/3 border-l border-gray-200 p-4">
                    <h4 className="font-medium mb-2">Output</h4>
                    <div className={`h-32 p-3 rounded-lg font-mono text-sm overflow-y-auto ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      {output || 'No output yet...'}
                    </div>
                    
                    <h4 className="font-medium mb-2 mt-4">Test Input</h4>
                    <textarea
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      className={`w-full h-20 p-2 font-mono text-sm rounded-lg border resize-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-gray-50 border-gray-300'
                      }`}
                      placeholder="Enter test input..."
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={`flex-1 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="text-center">
                <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a Question</h3>
                <p className="text-sm opacity-75">Choose a question from the left panel to start practicing</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Theory Question Modal */}
      {showTheoryModal && currentTheoryQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-2xl mx-4 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Theory Question</h3>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="mb-4">{currentTheoryQuestion.question}</p>
              <div className="space-y-2">
                {currentTheoryQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 rounded-lg cursor-pointer border ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => setSelectedAnswer(index)}
                      className="mr-3"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowTheoryModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Skip
              </button>
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-2xl mx-4 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Test Results</h3>
              <button
                onClick={() => setShowResults(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.passed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Test Case {index + 1}</span>
                    <span className={`flex items-center space-x-1 ${
                      result.passed ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.passed ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      <span>{result.passed ? 'Passed' : 'Failed'}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Input:</strong>
                      <pre className="mt-1">{result.input}</pre>
                    </div>
                    <div>
                      <strong>Expected:</strong>
                      <pre className="mt-1">{result.expected}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowResults(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Dashboard Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-4xl mx-4 p-6 rounded-lg max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Your Progress Dashboard</h3>
              <button
                onClick={() => setShowProgress(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <div className="text-2xl font-bold text-purple-600">{currentStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="text-2xl font-bold text-green-600">{totalXP}</div>
                <div className="text-sm text-gray-600">Total XP</div>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="text-2xl font-bold text-blue-600">
                  {progressData.reduce((sum, p) => sum + p.completed, 0)}
                </div>
                <div className="text-sm text-gray-600">Questions Solved</div>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <div className="text-2xl font-bold text-yellow-600">
                  {Math.round(progressData.reduce((sum, p) => sum + p.accuracy, 0) / progressData.length)}%
                </div>
                <div className="text-sm text-gray-600">Average Accuracy</div>
              </div>
            </div>
            
            {/* Topic Progress */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Topic Progress</h4>
              <div className="space-y-3">
                {progressData.map((progress) => (
                  <div key={progress.technology} className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{progress.technology}</span>
                      <span className="text-sm text-gray-600">
                        {progress.completed}/{progress.total} ({Math.round((progress.completed / progress.total) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Accuracy: {progress.accuracy}%</span>
                      <span className="text-xs text-gray-500">
                        {progress.completed * 10} XP earned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Achievements */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Recent Achievements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">7-Day Streak</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Maintained a 7-day practice streak</p>
                </div>
                <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Docker Master</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Completed 10 Docker questions</p>
                </div>
                <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Theory Expert</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Answered 50 theory questions correctly</p>
                </div>
                <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'}`}>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Speed Coder</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Solved 5 questions in under 30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeQuestions; 