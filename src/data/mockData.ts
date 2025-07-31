import { Student } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    rank: 1,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    domain: 'Full Stack Developer',
    score: 95,
    status: 'Available',
    experience: '1-3 years',
    locationPreference: 'Remote',
    education: 'B.Tech',
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
    availability: 'Immediate',
    resumeLink: 'https://example.com/resume1.pdf',
    githubLink: 'https://github.com/arjunsharma',
    portfolioLink: 'https://arjunsharma.dev',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    projects: [
      {
        title: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce application with React, Node.js, and MongoDB',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
        link: 'https://github.com/arjunsharma/ecommerce'
      },
      {
        title: 'Task Management App',
        description: 'Developed a collaborative task management application with real-time updates',
        technologies: ['React', 'Socket.io', 'PostgreSQL', 'Redux'],
        link: 'https://github.com/arjunsharma/taskapp'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 92,
        maxScore: 100,
        date: '2024-01-15',
        feedback: 'Excellent problem-solving skills and clean code'
      },
      {
        type: 'Hackathon',
        score: 98,
        maxScore: 100,
        date: '2024-01-10',
        feedback: 'Outstanding performance in team collaboration'
      }
    ],
    badges: ['Top Performer', 'Hackathon Winner']
  },
  {
    id: '2',
    rank: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    domain: 'UI/UX Designer',
    score: 92,
    status: 'Available',
    experience: '0-1 years',
    locationPreference: 'Hybrid',
    education: 'BCA',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    availability: '15 days',
    resumeLink: 'https://example.com/resume2.pdf',
    portfolioLink: 'https://priyapatel.design',
    phone: '+91 9876543211',
    location: 'Bangalore, India',
    projects: [
      {
        title: 'Mobile Banking App',
        description: 'Designed complete UI/UX for a mobile banking application',
        technologies: ['Figma', 'Prototyping', 'User Research'],
        link: 'https://dribbble.com/priyapatel/banking'
      },
      {
        title: 'Travel Booking Platform',
        description: 'Created user-centered design for travel booking website',
        technologies: ['Adobe XD', 'Wireframing', 'User Testing'],
        link: 'https://behance.net/priyapatel/travel'
      }
    ],
    assessments: [
      {
        type: 'Design Challenge',
        score: 90,
        maxScore: 100,
        date: '2024-01-12',
        feedback: 'Creative solutions and excellent attention to detail'
      },
      {
        type: 'Portfolio Review',
        score: 94,
        maxScore: 100,
        date: '2024-01-08',
        feedback: 'Strong portfolio showcasing diverse projects'
      }
    ],
    badges: ['Creative Excellence']
  },
  {
    id: '3',
    rank: 3,
    name: 'Rahul Singh',
    email: 'rahul.singh@email.com',
    domain: 'Python Developer',
    score: 89,
    status: 'Interviewed',
    experience: '1-3 years',
    locationPreference: 'Onsite',
    education: 'M.Tech',
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
    availability: '30 days',
    resumeLink: 'https://example.com/resume3.pdf',
    githubLink: 'https://github.com/rahulsingh',
    phone: '+91 9876543212',
    location: 'Delhi, India',
    projects: [
      {
        title: 'Analytics Dashboard',
        description: 'Built a comprehensive analytics dashboard using Django and React',
        technologies: ['Django', 'React', 'PostgreSQL', 'Chart.js'],
        link: 'https://github.com/rahulsingh/analytics'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 87,
        maxScore: 100,
        date: '2024-01-14',
        feedback: 'Strong backend development skills'
      },
      {
        type: 'Interview Round',
        score: 91,
        maxScore: 100,
        date: '2024-01-18',
        feedback: 'Excellent communication and technical knowledge'
      }
    ],
    badges: ['Interview Success']
  },
  {
    id: '4',
    rank: 4,
    name: 'Sneha Gupta',
    email: 'sneha.gupta@email.com',
    domain: 'Frontend Developer',
    score: 87,
    status: 'Available',
    experience: 'Fresher',
    locationPreference: 'Remote',
    education: 'B.Tech',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux'],
    availability: 'Immediate',
    resumeLink: 'https://example.com/resume4.pdf',
    githubLink: 'https://github.com/snehagupta',
    portfolioLink: 'https://snehagupta.dev',
    phone: '+91 9876543213',
    location: 'Pune, India',
    projects: [
      {
        title: 'Weather App',
        description: 'Created a responsive weather application with React and API integration',
        technologies: ['React', 'JavaScript', 'CSS', 'Weather API'],
        link: 'https://github.com/snehagupta/weather'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 85,
        maxScore: 100,
        date: '2024-01-13',
        feedback: 'Good grasp of frontend fundamentals'
      }
    ],
    badges: ['Fresh Talent']
  },
  {
    id: '5',
    rank: 5,
    name: 'Vikram Reddy',
    email: 'vikram.reddy@email.com',
    domain: 'DevOps Engineer',
    score: 85,
    status: 'Available',
    experience: '3+ years',
    locationPreference: 'Hybrid',
    education: 'B.Tech',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
    availability: '15 days',
    resumeLink: 'https://example.com/resume5.pdf',
    githubLink: 'https://github.com/vikramreddy',
    phone: '+91 9876543214',
    location: 'Hyderabad, India',
    projects: [
      {
        title: 'CI/CD Pipeline',
        description: 'Implemented automated CI/CD pipeline for microservices architecture',
        technologies: ['Jenkins', 'Docker', 'Kubernetes', 'AWS'],
        link: 'https://github.com/vikramreddy/cicd'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 83,
        maxScore: 100,
        date: '2024-01-11',
        feedback: 'Strong DevOps practices and automation skills'
      }
    ],
    badges: ['DevOps Expert']
  },
  // Add more mock students to reach 50...
  {
    id: '6',
    rank: 6,
    name: 'Ananya Krishnan',
    email: 'ananya.krishnan@email.com',
    domain: 'Data Scientist',
    score: 84,
    status: 'Available',
    experience: '1-3 years',
    locationPreference: 'Remote',
    education: 'M.Tech',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'],
    availability: 'Immediate',
    resumeLink: 'https://example.com/resume6.pdf',
    githubLink: 'https://github.com/ananyakrishnan',
    phone: '+91 9876543215',
    location: 'Chennai, India',
    projects: [
      {
        title: 'Customer Churn Prediction',
        description: 'Built ML model to predict customer churn with 92% accuracy',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
        link: 'https://github.com/ananyakrishnan/churn-prediction'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 82,
        maxScore: 100,
        date: '2024-01-09',
        feedback: 'Strong analytical and ML skills'
      }
    ],
    badges: ['Data Science Pro']
  },
  {
    id: '7',
    rank: 7,
    name: 'Karthik Nair',
    email: 'karthik.nair@email.com',
    domain: 'Backend Developer',
    score: 82,
    status: 'In Process',
    experience: '1-3 years',
    locationPreference: 'Onsite',
    education: 'B.Tech',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Microservices'],
    availability: '30 days',
    resumeLink: 'https://example.com/resume7.pdf',
    githubLink: 'https://github.com/kartiknair',
    phone: '+91 9876543216',
    location: 'Kochi, India',
    projects: [
      {
        title: 'Order Management System',
        description: 'Developed scalable order management system using Spring Boot',
        technologies: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
        link: 'https://github.com/kartiknair/order-system'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 80,
        maxScore: 100,
        date: '2024-01-07',
        feedback: 'Good backend architecture understanding'
      }
    ],
    badges: ['Backend Specialist']
  },
  {
    id: '8',
    rank: 8,
    name: 'Meera Joshi',
    email: 'meera.joshi@email.com',
    domain: 'QA Tester',
    score: 81,
    status: 'Available',
    experience: '0-1 years',
    locationPreference: 'Hybrid',
    education: 'BCA',
    skills: ['Selenium', 'TestNG', 'Java', 'API Testing', 'Manual Testing'],
    availability: '15 days',
    resumeLink: 'https://example.com/resume8.pdf',
    phone: '+91 9876543217',
    location: 'Indore, India',
    projects: [
      {
        title: 'Test Automation Framework',
        description: 'Created comprehensive test automation framework using Selenium',
        technologies: ['Selenium', 'TestNG', 'Java', 'Maven'],
        link: 'https://github.com/meerajoshi/test-framework'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 79,
        maxScore: 100,
        date: '2024-01-06',
        feedback: 'Good testing methodology and attention to detail'
      }
    ],
    badges: ['Quality Assurance']
  },
  // Continue with more students to reach 50 total
  {
    id: '9',
    rank: 9,
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    domain: 'Full Stack Developer',
    score: 80,
    status: 'Available',
    experience: '1-3 years',
    locationPreference: 'Remote',
    education: 'B.Tech',
    skills: ['Vue.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'],
    availability: 'Immediate',
    resumeLink: 'https://example.com/resume9.pdf',
    githubLink: 'https://github.com/amitkumar',
    phone: '+91 9876543218',
    location: 'Jaipur, India',
    projects: [
      {
        title: 'Blog Platform',
        description: 'Built a blog platform with Vue.js frontend and Node.js backend',
        technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express.js'],
        link: 'https://github.com/amitkumar/blog-platform'
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: 78,
        maxScore: 100,
        date: '2024-01-05',
        feedback: 'Good full-stack development skills'
      }
    ],
    badges: ['Full Stack']
  },
  {
    id: '10',
    rank: 10,
    name: 'Roshni Shah',
    email: 'roshni.shah@email.com',
    domain: 'UI/UX Designer',
    score: 79,
    status: 'Available',
    experience: 'Fresher',
    locationPreference: 'Onsite',
    education: 'Diploma',
    skills: ['Figma', 'Adobe Illustrator', 'Prototyping', 'Wireframing', 'User Research'],
    availability: '30 days',
    resumeLink: 'https://example.com/resume10.pdf',
    portfolioLink: 'https://roshnishah.design',
    phone: '+91 9876543219',
    location: 'Ahmedabad, India',
    projects: [
      {
        title: 'Food Delivery App',
        description: 'Designed UI/UX for food delivery mobile application',
        technologies: ['Figma', 'Prototyping', 'User Research'],
        link: 'https://dribbble.com/roshnishah/food-app'
      }
    ],
    assessments: [
      {
        type: 'Design Challenge',
        score: 77,
        maxScore: 100,
        date: '2024-01-04',
        feedback: 'Creative approach with room for improvement in user research'
      }
    ],
    badges: ['Rising Designer']
  }
  // Continue adding more students up to 50...
];

// Add 40 more students to complete the dataset
for (let i = 11; i <= 50; i++) {
  const domains = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Python Developer', 'UI/UX Designer', 'Data Scientist', 'DevOps Engineer', 'QA Tester'];
  const statuses = ['Available', 'Interviewed', 'In Process', 'Available', 'Available']; // More available candidates
  const experiences = ['Fresher', '0-1 years', '1-3 years', '3+ years'];
  const locations = ['Remote', 'Onsite', 'Hybrid'];
  const educations = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'Diploma'];
  const availabilities = ['Immediate', '15 days', '30 days'];
  
  const skillSets = {
    'Frontend Developer': ['React', 'JavaScript', 'CSS', 'HTML', 'Vue.js'],
    'Backend Developer': ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB'],
    'Full Stack Developer': ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
    'Python Developer': ['Python', 'Django', 'Flask', 'PostgreSQL', 'Redis'],
    'UI/UX Designer': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    'Data Scientist': ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'],
    'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
    'QA Tester': ['Selenium', 'TestNG', 'Java', 'API Testing', 'Manual Testing']
  };
  
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const score = Math.floor(Math.random() * 30) + 60; // Scores between 60-89
  
  mockStudents.push({
    id: i.toString(),
    rank: i,
    name: `Student ${i}`,
    email: `student${i}@email.com`,
    domain,
    score,
    status: statuses[Math.floor(Math.random() * statuses.length)] as any,
    experience: experiences[Math.floor(Math.random() * experiences.length)],
    locationPreference: locations[Math.floor(Math.random() * locations.length)],
    education: educations[Math.floor(Math.random() * educations.length)],
    skills: skillSets[domain as keyof typeof skillSets] || ['JavaScript', 'Python'],
    availability: availabilities[Math.floor(Math.random() * availabilities.length)],
    resumeLink: `https://example.com/resume${i}.pdf`,
    githubLink: `https://github.com/student${i}`,
    portfolioLink: domain === 'UI/UX Designer' ? `https://student${i}.design` : undefined,
    phone: `+91 987654${i.toString().padStart(4, '0')}`,
    location: 'India',
    projects: [
      {
        title: `Project ${i}`,
        description: `Sample project description for student ${i}`,
        technologies: skillSets[domain as keyof typeof skillSets]?.slice(0, 3) || ['JavaScript'],
        link: `https://github.com/student${i}/project`
      }
    ],
    assessments: [
      {
        type: 'Technical Test',
        score: score - 5,
        maxScore: 100,
        date: '2024-01-01',
        feedback: 'Good performance overall'
      }
    ],
    badges: score > 80 ? ['High Performer'] : []
  });
}