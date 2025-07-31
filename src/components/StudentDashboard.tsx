import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Settings, Bell, Github, Briefcase, Award, Code, ExternalLink, Plus, Edit, Trash2, Camera, Save, X, Menu, Star, CheckSquare, Clock, Lock, Shield } from 'lucide-react';
import PracticeQuestions from './PracticeQuestions';

// Onboarding Form Component
interface OnboardingFormProps {
  onSubmit: (data: Partial<ProfileData>) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    githubUrl: '',
    university: '',
    degree: '',
    graduationYear: '',
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            placeholder="City, State/Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            placeholder="https://github.com/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">University *</label>
          <input
            type="text"
            required
            value={formData.university}
            onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            placeholder="Enter your university name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
          <input
            type="text"
            required
            value={formData.degree}
            onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            placeholder="e.g., Computer Science"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
          <input
            type="text"
            value={formData.graduationYear}
            onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            placeholder="e.g., 2024"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
          placeholder="Tell us about yourself, your interests, and career goals..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="px-6 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] transition-colors"
        >
          Complete Profile
        </button>
      </div>
    </form>
  );
};

interface StudentDashboardProps {
  onLogout: () => void;
  currentUser?: any;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  rating: number; // 1-5 stars
}

interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  technology: string;
  solution?: string;
}

interface Notification {
  id: string;
  type: 'recruiter_interest' | 'profile_view' | 'skill_endorsement';
  message: string;
  timestamp: string;
  read: boolean;
}

interface ProfileData {
  fullName: string;
  email: string;
  location: string;
  githubUrl: string;
  university: string;
  degree: string;
  graduationYear: string;
  bio: string;
  profilePicture?: string;
  posts: number;
  followers: number;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, currentUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | ''>('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  
  // Settings menu states
  const [showAccountCenter, setShowAccountCenter] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showTimeManagement, setShowTimeManagement] = useState(false);
  const [showSecurityPrivacy, setShowSecurityPrivacy] = useState(false);
  const [showAccountStatus, setShowAccountStatus] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Home page states
  const [showJobAlerts, setShowJobAlerts] = useState(false);
  const [showStudyPlanner, setShowStudyPlanner] = useState(false);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [showResourceLibrary, setShowResourceLibrary] = useState(false);
  const [selectedJobAlert, setSelectedJobAlert] = useState<any>(null);
  const [studyGoals, setStudyGoals] = useState([
    { id: '1', title: 'Complete React Course', completed: false, deadline: '2024-02-15' },
    { id: '2', title: 'Build Portfolio Project', completed: false, deadline: '2024-02-20' },
    { id: '3', title: 'Practice Coding Problems', completed: true, deadline: '2024-02-10' }
  ]);
  const [newGoal, setNewGoal] = useState({ title: '', deadline: '' });
  
  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });

  // New skill form state
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Beginner' as Skill['level']
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    location: '',
    githubUrl: '',
    university: '',
    degree: '',
    graduationYear: '',
    bio: '',
    profilePicture: '',
    posts: 0,
    followers: 0
  });

  // Check if profile is complete
  const isProfileComplete = profileData.fullName && profileData.university && profileData.degree;

  // Check if user is new (no saved profile data)
  const isNewUser = (() => {
    try {
      return !localStorage.getItem('studentProfile');
    } catch (error) {
      console.warn('localStorage not available, treating as new user');
      return true;
    }
  })();

  // Show onboarding form only for new users with incomplete profiles
  useEffect(() => {
    if (isNewUser && !isProfileComplete) {
      setShowOnboardingForm(true);
    }
  }, [isNewUser, isProfileComplete]);

  // Mock data with skills including ratings
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'Python', level: 'Advanced', rating: 4 },
    { id: '2', name: 'Java', level: 'Expert', rating: 5 },
    { id: '3', name: 'React', level: 'Advanced', rating: 4 },
    { id: '4', name: 'Node.js', level: 'Intermediate', rating: 3 },
    { id: '5', name: 'TypeScript', level: 'Advanced', rating: 4 },
    { id: '6', name: 'MongoDB', level: 'Intermediate', rating: 3 }
  ]);

  // Mock data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      githubUrl: 'https://github.com/student/ecommerce',
      liveUrl: 'https://ecommerce-demo.com'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A React-based task management application with drag-and-drop functionality',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/student/task-manager'
    }
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'recruiter_interest',
      message: 'Tech Corp HR viewed your profile and showed interest',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'profile_view',
      message: 'Startup Inc viewed your profile',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: '3',
      type: 'skill_endorsement',
      message: 'John Doe endorsed your React skill',
      timestamp: '3 days ago',
      read: true
    }
  ]);

  // Mock job alerts data
  const [jobAlerts] = useState([
    {
      id: '1',
      company: 'Google',
      position: 'Frontend Developer',
      location: 'Mountain View, CA',
      salary: '$120k - $150k',
      type: 'Full-time',
      posted: '2 hours ago',
      description: 'We are looking for a talented Frontend Developer to join our team...',
      requirements: ['React', 'TypeScript', '3+ years experience'],
      logo: 'https://logo.clearbit.com/google.com'
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Software Engineer',
      location: 'Seattle, WA',
      salary: '$110k - $140k',
      type: 'Full-time',
      posted: '1 day ago',
      description: 'Join Microsoft as a Software Engineer and work on cutting-edge projects...',
      requirements: ['JavaScript', 'Node.js', '2+ years experience'],
      logo: 'https://logo.clearbit.com/microsoft.com'
    },
    {
      id: '3',
      company: 'Apple',
      position: 'iOS Developer',
      location: 'Cupertino, CA',
      salary: '$130k - $160k',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Help us build the next generation of iOS applications...',
      requirements: ['Swift', 'iOS', '4+ years experience'],
      logo: 'https://logo.clearbit.com/apple.com'
    }
  ]);

  // Mock resources data
  const [resources] = useState([
    {
      id: '1',
      title: 'React Complete Guide',
      type: 'Course',
      duration: '40 hours',
      difficulty: 'Intermediate',
      rating: 4.8,
      url: 'https://udemy.com/react-complete-guide',
      category: 'Frontend'
    },
    {
      id: '2',
      title: 'JavaScript Algorithms',
      type: 'Book',
      duration: '300 pages',
      difficulty: 'Advanced',
      rating: 4.9,
      url: 'https://github.com/javascript-algorithms',
      category: 'Algorithms'
    },
    {
      id: '3',
      title: 'Node.js Best Practices',
      type: 'Article',
      duration: '15 min read',
      difficulty: 'Intermediate',
      rating: 4.7,
      url: 'https://medium.com/nodejs-best-practices',
      category: 'Backend'
    }
  ]);

  const technologies = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Angular', 'Vue.js', 'MongoDB', 'PostgreSQL'
  ];

  const questions: Question[] = [
    // JavaScript Questions
    { id: '1', title: 'Two Sum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', difficulty: 'Easy', technology: 'JavaScript' },
    { id: '2', title: 'Valid Parentheses', description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.', difficulty: 'Easy', technology: 'JavaScript' },
    { id: '3', title: 'Merge Two Sorted Lists', description: 'Merge two sorted linked lists and return it as a sorted list.', difficulty: 'Medium', technology: 'JavaScript' },
    { id: '4', title: 'Longest Substring Without Repeating Characters', description: 'Find the length of the longest substring without repeating characters.', difficulty: 'Medium', technology: 'JavaScript' },
    { id: '5', title: 'Regular Expression Matching', description: 'Implement regular expression matching with support for "." and "*".', difficulty: 'Hard', technology: 'JavaScript' },
    
    // Python Questions
    { id: '6', title: 'Palindrome Number', description: 'Determine whether an integer is a palindrome.', difficulty: 'Easy', technology: 'Python' },
    { id: '7', title: 'Valid Anagram', description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.', difficulty: 'Easy', technology: 'Python' },
    { id: '8', title: 'Group Anagrams', description: 'Given an array of strings strs, group the anagrams together.', difficulty: 'Medium', technology: 'Python' },
    { id: '9', title: 'Longest Palindromic Substring', description: 'Find the longest palindromic substring in s.', difficulty: 'Medium', technology: 'Python' },
    { id: '10', title: 'Median of Two Sorted Arrays', description: 'Find the median of the two sorted arrays.', difficulty: 'Hard', technology: 'Python' },
    
    // React Questions
    { id: '11', title: 'Component Lifecycle', description: 'Explain the React component lifecycle methods and their use cases.', difficulty: 'Easy', technology: 'React' },
    { id: '12', title: 'State Management', description: 'Compare useState and useReducer hooks with examples.', difficulty: 'Easy', technology: 'React' },
    { id: '13', title: 'Custom Hooks', description: 'Create a custom hook for handling form validation.', difficulty: 'Medium', technology: 'React' },
    { id: '14', title: 'Performance Optimization', description: 'Implement React.memo and useMemo for performance optimization.', difficulty: 'Medium', technology: 'React' },
    { id: '15', title: 'Context API vs Redux', description: 'Design a complex state management solution using Context API.', difficulty: 'Hard', technology: 'React' }
  ];

  const filteredQuestions = questions.filter(q => 
    q.technology === selectedTechnology && 
    (selectedDifficulty === '' || q.difficulty === selectedDifficulty)
  );



  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    setShowProfileEdit(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profileData);
  };

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  // Project management handlers
  const handleAddProject = () => {
    if (newProject.title && newProject.description && newProject.githubUrl) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        githubUrl: newProject.githubUrl,
        liveUrl: newProject.liveUrl || undefined
      };
      setProjects(prev => [...prev, project]);
      setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
      setShowAddProject(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl || ''
    });
    setShowAddProject(true);
  };

  const handleUpdateProject = () => {
    if (editingProject && newProject.title && newProject.description && newProject.githubUrl) {
      const updatedProject: Project = {
        ...editingProject,
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        githubUrl: newProject.githubUrl,
        liveUrl: newProject.liveUrl || undefined
      };
      setProjects(prev => prev.map(p => p.id === editingProject.id ? updatedProject : p));
      setEditingProject(null);
      setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
      setShowAddProject(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  // Skill management handlers
  const handleAddSkill = () => {
    if (newSkill.name) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name,
        level: newSkill.level,
        rating: 3 // Default rating
      };
      setSkills(prev => [...prev, skill]);
      setNewSkill({ name: '', level: 'Beginner' });
      setShowAddSkill(false);
    }
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill.name, level: skill.level });
    setShowAddSkill(true);
  };

  const handleUpdateSkill = () => {
    if (editingSkill && newSkill.name) {
      const updatedSkill: Skill = {
        ...editingSkill,
        name: newSkill.name,
        level: newSkill.level,
        rating: editingSkill.rating // Keep existing rating
      };
      setSkills(prev => prev.map(s => s.id === editingSkill.id ? updatedSkill : s));
      setEditingSkill(null);
      setNewSkill({ name: '', level: 'Beginner' });
      setShowAddSkill(false);
    }
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills(prev => prev.filter(s => s.id !== skillId));
  };

  const handleOnboardingSubmit = (formData: Partial<ProfileData>) => {
    setProfileData(prev => ({
      ...prev,
      ...formData,
      posts: 0,
      followers: 0
    }));
    setShowOnboardingForm(false);
    
    // Save to localStorage to persist the data
    try {
      localStorage.setItem('studentProfile', JSON.stringify({
        ...profileData,
        ...formData,
        posts: 0,
        followers: 0
      }));
    } catch (error) {
      console.warn('localStorage not available, profile data not saved');
    }
  };

  // Load profile data from localStorage on component mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('studentProfile');
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData(parsedProfile);
      } else if (currentUser?.email) {
        // Pre-fill email if no saved profile exists
        setProfileData(prev => ({
          ...prev,
          email: currentUser.email || ''
        }));
      }
    } catch (error) {
      console.warn('localStorage not available, using default profile data');
      if (currentUser?.email) {
        setProfileData(prev => ({
          ...prev,
          email: currentUser.email || ''
        }));
      }
    }
  }, [currentUser?.email]);

  const stats = [
    { title: 'Projects', value: projects.length, icon: Briefcase, color: 'bg-blue-500' },
    { title: 'Skills', value: skills.length, icon: Award, color: 'bg-green-500' },
    { title: 'Questions Solved', value: '15', icon: Code, color: 'bg-yellow-500' },
    { title: 'Profile Views', value: '247', icon: User, color: 'bg-purple-500' }
  ];

  // Home page handlers
  const handleAddGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        completed: false,
        deadline: newGoal.deadline
      };
      setStudyGoals(prev => [...prev, goal]);
      setNewGoal({ title: '', deadline: '' });
    }
  };

  const handleToggleGoal = (goalId: string) => {
    setStudyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const handleDeleteGoal = (goalId: string) => {
    setStudyGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleApplyJob = (jobId: string) => {
    console.log('Applied for job:', jobId);
    // Here you would typically send application to backend
    alert('Application submitted successfully!');
  };

  const handleViewJob = (job: any) => {
    setSelectedJobAlert(job);
    setShowJobAlerts(true);
  };

  const handleViewResource = (resource: any) => {
    window.open(resource.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell size={20} />
                </button>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#805da3] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings size={20} />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Home' },
              { id: 'profile', label: 'Profile' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'questions', label: 'Practice Questions' },
              { id: 'notifications', label: 'Notifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#805da3] text-[#805da3]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#805da3] to-[#6d4d8c] rounded-lg shadow-sm p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {profileData.fullName || 'Student'}! 👋</h1>
                  <p className="text-[#805da3]/90">Ready to continue your learning journey? Here's what's happening today.</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Job Alerts */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Job Alerts</h3>
                    <span className="text-sm text-gray-500">{jobAlerts.length} new opportunities</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {jobAlerts.slice(0, 3).map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <img src={job.logo} alt={job.company} className="w-8 h-8 rounded" />
                              <div>
                                <h4 className="font-medium text-gray-900">{job.position}</h4>
                                <p className="text-sm text-gray-600">{job.company}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <span>{job.location}</span>
                              <span>{job.salary}</span>
                              <span>{job.type}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{job.description.substring(0, 100)}...</p>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewJob(job)}
                                className="text-sm text-[#805da3] hover:underline"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleApplyJob(job.id)}
                                className="text-sm bg-[#805da3] text-white px-3 py-1 rounded hover:bg-[#6d4d8c]"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Study Goals */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Study Goals</h3>
                    <button
                      onClick={() => setShowStudyPlanner(true)}
                      className="text-sm text-[#805da3] hover:underline"
                    >
                      Manage Goals
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {studyGoals.slice(0, 4).map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={goal.completed}
                          onChange={() => handleToggleGoal(goal.id)}
                          className="rounded text-[#805da3] focus:ring-[#805da3]"
                        />
                        <div className="flex-1">
                          <p className={`text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {goal.title}
                          </p>
                          <p className="text-xs text-gray-500">Due: {goal.deadline}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="New goal..."
                        value={newGoal.title}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                      />
                      <button
                        onClick={handleAddGoal}
                        className="px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Learning Resources</h3>
                  <button
                    onClick={() => setShowResourceLibrary(true)}
                    className="text-sm text-[#805da3] hover:underline"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {resources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{resource.type}</span>
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{resource.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-500 mb-2">{resource.duration} • {resource.difficulty}</p>
                      <button
                        onClick={() => handleViewResource(resource)}
                        className="w-full text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
                      >
                        View Resource
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className={`flex items-center space-x-3 p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-[#805da3]/10'}`}>
                      <div className={`w-2 h-2 rounded-full ${notification.read ? 'bg-gray-400' : 'bg-[#805da3]'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#805da3] hover:bg-[#805da3]/5 transition-all"
                  >
                    <div className="text-center">
                      <User className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Update Profile</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#805da3] hover:bg-[#805da3]/5 transition-all"
                  >
                    <div className="text-center">
                      <Briefcase className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Add Project</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('skills')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#805da3] hover:bg-[#805da3]/5 transition-all"
                  >
                    <div className="text-center">
                      <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Add Skills</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('questions')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#805da3] hover:bg-[#805da3]/5 transition-all"
                  >
                    <div className="text-center">
                      <Code className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Practice Questions</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Header Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                {/* Profile Info */}
                <div className="flex items-center space-x-6">
                  {/* Profile Photo */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {profileData.profilePicture ? (
                        <img 
                          src={profileData.profilePicture} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <button 
                      onClick={() => triggerFileInput(fileInputRef)}
                      className="absolute bottom-0 right-0 bg-[#805da3] text-white p-2 rounded-full hover:bg-[#6d4d8c]"
                    >
                      <Camera size={16} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Name and Stats */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
                    <p className="text-gray-600 text-sm mb-2">{profileData.degree} Student</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>{profileData.posts} posts</span>
                      <span>{profileData.followers} followers</span>
                    </div>
                  </div>
                </div>
                
                {/* Edit and Hamburger Menu */}
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setShowProfileEdit(true)}
                    className="flex items-center gap-2 px-3 py-2 text-[#805da3] hover:bg-[#805da3]/10 rounded-lg"
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Menu size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Achievement Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement</h3>
                  <div className="space-y-4">
                    {skills.slice(0, 5).map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= skill.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{skill.rating}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600">Full Name</label>
                          <p className="text-gray-900">{profileData.fullName}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Email</label>
                          <p className="text-gray-900">{profileData.email}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Location</label>
                          <p className="text-gray-900">{profileData.location}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">GitHub</label>
                          <a href={profileData.githubUrl} className="text-[#805da3] hover:underline flex items-center gap-1">
                            {profileData.githubUrl.replace('https://', '')}
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Education</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600">University</label>
                          <p className="text-gray-900">{profileData.university}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Degree</label>
                          <p className="text-gray-900">{profileData.degree}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Graduation Year</label>
                          <p className="text-gray-900">{profileData.graduationYear}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bio Section */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                    <p className="text-gray-600">{profileData.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
              <div className="grid grid-cols-8 gap-2">
                {Array.from({ length: 40 }, (_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Projects</h3>
                <button 
                  onClick={() => {
                    setEditingProject(null);
                    setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
                    setShowAddProject(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditProject(project)}
                          className="text-gray-400 hover:text-[#805da3] p-1"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-[#805da3]/10 text-[#805da3] text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#805da3] hover:underline text-sm">
                        <Github size={14} />
                        GitHub
                      </a>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#805da3] hover:underline text-sm">
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                <button 
                  onClick={() => {
                    setEditingSkill(null);
                    setNewSkill({ name: '', level: 'Beginner' });
                    setShowAddSkill(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
                >
                  <Plus size={16} />
                  Add Skill
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditSkill(skill)}
                          className="text-gray-400 hover:text-[#805da3] p-1"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                      skill.level === 'Advanced' ? 'bg-[#805da3]/20 text-[#805da3]' :
                      skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <PracticeQuestions />
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`flex items-start space-x-3 p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-[#805da3]/10'}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-400' : 'bg-[#805da3]'}`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                    </div>
                    {!notification.read && (
                      <button className="text-xs text-[#805da3] hover:text-[#6d4d8c]">
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Menu */}
        {showSettingsMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-sm">
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setShowAccountCenter(true);
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <span className="text-gray-900">Account center</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowActivity(true);
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckSquare size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-900">Your Activity</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowTimeManagement(true);
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-yellow-600" />
                  </div>
                  <span className="text-gray-900">Time Management</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowSecurityPrivacy(true);
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Lock size={16} className="text-red-600" />
                  </div>
                  <span className="text-gray-900">Security, Privacy</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowAccountStatus(true);
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield size={16} className="text-purple-600" />
                  </div>
                  <span className="text-gray-900">Account Status</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowSettings(true);
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Settings size={16} className="text-gray-600" />
                  </div>
                  <span className="text-gray-900">Setting</span>
                </button>
              </div>
              
              {/* Logout Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-left text-red-600"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <LogOut size={16} />
                  </div>
                  <span>Logout</span>
                </button>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setShowSettingsMenu(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Settings Modals */}
        {showAccountCenter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Center</h3>
                <button onClick={() => setShowAccountCenter(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Account Information</h4>
                  <p className="text-sm text-blue-700">Email: {profileData.email}</p>
                  <p className="text-sm text-blue-700">Member since: January 2024</p>
                  <p className="text-sm text-blue-700">Account type: Student</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Profile Completion</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <p className="text-sm text-green-700">85% Complete</p>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Update Account Details
                </button>
              </div>
            </div>
          </div>
        )}

        {showActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Activity</h3>
                <button onClick={() => setShowActivity(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Recent Activity</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-700">• Updated profile picture - 2 hours ago</p>
                    <p className="text-green-700">• Added new project - 1 day ago</p>
                    <p className="text-green-700">• Completed skill assessment - 3 days ago</p>
                    <p className="text-green-700">• Applied for internship - 1 week ago</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700 font-medium">Profile Views</p>
                      <p className="text-blue-900">247</p>
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium">Applications</p>
                      <p className="text-blue-900">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showTimeManagement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Time Management</h3>
                <button onClick={() => setShowTimeManagement(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Study Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-yellow-700">• Daily coding practice: 2 hours</p>
                    <p className="text-yellow-700">• Project work: 3 hours/week</p>
                    <p className="text-yellow-700">• Skill assessment: 1 hour/week</p>
                    <p className="text-yellow-700">• Profile updates: 30 min/week</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Progress Tracking</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-700">• This week: 15 hours logged</p>
                    <p className="text-green-700">• Monthly goal: 60 hours</p>
                    <p className="text-green-700">• Completion rate: 75%</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  Set Study Goals
                </button>
              </div>
            </div>
          </div>
        )}

        {showSecurityPrivacy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Security & Privacy</h3>
                <button onClick={() => setShowSecurityPrivacy(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Security Status</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-red-700">• Two-factor authentication: Disabled</p>
                    <p className="text-red-700">• Last password change: 30 days ago</p>
                    <p className="text-red-700">• Login sessions: 3 active</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Privacy Settings</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-blue-700">• Profile visibility: Public</p>
                    <p className="text-blue-700">• Contact information: Visible to HR</p>
                    <p className="text-blue-700">• Activity status: Online</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Enable 2FA
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Update Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAccountStatus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
                <button onClick={() => setShowAccountStatus(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Account Health</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-700">• Status: Active</p>
                    <p className="text-green-700">• Verification: Complete</p>
                    <p className="text-green-700">• Reputation: Excellent</p>
                    <p className="text-green-700">• Trust Score: 95/100</p>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Membership</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-purple-700">• Plan: Student Free</p>
                    <p className="text-purple-700">• Features: Basic</p>
                    <p className="text-purple-700">• Expires: Never</p>
                    <p className="text-purple-700">• Upgrades: Available</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Upgrade Account
                </button>
              </div>
            </div>
          </div>
        )}

        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">General Settings</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Push Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Dark Mode</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Language & Region</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-blue-700">• Language: English</p>
                    <p className="text-blue-700">• Timezone: UTC-5 (EST)</p>
                    <p className="text-blue-700">• Date format: MM/DD/YYYY</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Onboarding Form Modal */}
        {showOnboardingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Complete Your Profile</h2>
                <p className="text-sm text-gray-600">Please provide your details to get started</p>
              </div>
              
              <OnboardingForm onSubmit={handleOnboardingSubmit} />
            </div>
          </div>
        )}

        {/* Job Alert Modal */}
        {showJobAlerts && selectedJobAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
                <button onClick={() => setShowJobAlerts(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img src={selectedJobAlert.logo} alt={selectedJobAlert.company} className="w-16 h-16 rounded" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedJobAlert.position}</h3>
                    <p className="text-lg text-gray-600">{selectedJobAlert.company}</p>
                    <p className="text-gray-500">{selectedJobAlert.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Salary</p>
                    <p className="font-medium">{selectedJobAlert.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{selectedJobAlert.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posted</p>
                    <p className="font-medium">{selectedJobAlert.posted}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedJobAlert.description}</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedJobAlert.requirements.map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowJobAlerts(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleApplyJob(selectedJobAlert.id)}
                    className="px-6 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Study Planner Modal */}
        {showStudyPlanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Study Planner</h2>
                <button onClick={() => setShowStudyPlanner(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {studyGoals.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => handleToggleGoal(goal.id)}
                        className="rounded text-[#805da3] focus:ring-[#805da3]"
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {goal.title}
                        </p>
                        <p className="text-sm text-gray-500">Due: {goal.deadline}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Add New Goal</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Goal title..."
                      value={newGoal.title}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                    />
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                    />
                    <button
                      onClick={handleAddGoal}
                      className="w-full px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
                    >
                      Add Goal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resource Library Modal */}
        {showResourceLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Learning Resources</h2>
                <button onClick={() => setShowResourceLibrary(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{resource.type}</span>
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{resource.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{resource.title}</h4>
                      <p className="text-sm text-gray-500 mb-3">{resource.duration} • {resource.difficulty}</p>
                      <p className="text-xs text-gray-600 mb-3">Category: {resource.category}</p>
                      <button
                        onClick={() => handleViewResource(resource)}
                        className="w-full text-sm bg-[#805da3] text-white px-3 py-2 rounded hover:bg-[#6d4d8c] transition-colors"
                      >
                        View Resource
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setShowProfileEdit(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profileData.profilePicture ? (
                      <img 
                        src={profileData.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <button 
                    onClick={() => triggerFileInput(modalFileInputRef)}
                    className="absolute bottom-0 right-0 bg-[#805da3] text-white p-2 rounded-full hover:bg-[#6d4d8c] cursor-pointer"
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    ref={modalFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Click camera icon to upload photo</p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={profileData.githubUrl}
                    onChange={(e) => setProfileData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                  <input
                    type="text"
                    value={profileData.university}
                    onChange={(e) => setProfileData(prev => ({ ...prev, university: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    value={profileData.degree}
                    onChange={(e) => setProfileData(prev => ({ ...prev, degree: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <input
                    type="text"
                    value={profileData.graduationYear}
                    onChange={(e) => setProfileData(prev => ({ ...prev, graduationYear: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowProfileEdit(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileSave}
                className="flex items-center gap-2 px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => {
                  setShowAddProject(false);
                  setEditingProject(null);
                  setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent resize-none"
                  placeholder="Describe your project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                <input
                  type="text"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL *</label>
                <input
                  type="url"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL (Optional)</label>
                <input
                  type="url"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  placeholder="https://your-project.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddProject(false);
                  setEditingProject(null);
                  setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={editingProject ? handleUpdateProject : handleAddProject}
                className="flex items-center gap-2 px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
              >
                <Save size={16} />
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Skill Modal */}
      {showAddSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button
                onClick={() => {
                  setShowAddSkill(false);
                  setEditingSkill(null);
                  setNewSkill({ name: '', level: 'Beginner' });
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name *</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                  placeholder="e.g., JavaScript, React, Python"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value as Skill['level'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddSkill(false);
                  setEditingSkill(null);
                  setNewSkill({ name: '', level: 'Beginner' });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={editingSkill ? handleUpdateSkill : handleAddSkill}
                className="flex items-center gap-2 px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
              >
                <Save size={16} />
                {editingSkill ? 'Update Skill' : 'Add Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard; 