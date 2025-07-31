import React, { useState, useMemo } from 'react';
import { Mail } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import StudentTable from './components/StudentTable';
import ShortlistSidebar from './components/ShortlistSidebar';
import StudentModal from './components/StudentModal';
import EmailModal from './components/EmailModal';
import ErrorBoundary from './components/ErrorBoundary';
import { Student } from './types';

function AppContent() {
  const { currentUser, userType, logout, loading, error } = useAuth();
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState<Student[]>([]);

  // Mock data - in real app, this would come from Firebase
  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      domain: 'Frontend Development',
      experience: '2-3 years',
      location: 'New York, NY',
      assessmentType: 'Technical',
      education: 'Bachelor\'s',
      skills: ['React', 'JavaScript', 'TypeScript'],
      availability: 'Immediate',
      assessmentScore: 85,
      shortlisted: false
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      domain: 'Backend Development',
      experience: '3-5 years',
      location: 'San Francisco, CA',
      assessmentType: 'Technical',
      education: 'Master\'s',
      skills: ['Node.js', 'Python', 'MongoDB'],
      availability: '2 weeks notice',
      assessmentScore: 92,
      shortlisted: false
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      domain: 'Full Stack',
      experience: '1-2 years',
      location: 'Austin, TX',
      assessmentType: 'Technical',
      education: 'Bachelor\'s',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      availability: 'Immediate',
      assessmentScore: 78,
      shortlisted: false
    }
  ];

  const [shortlistedStudents, setShortlistedStudents] = useState<Student[]>([]);
  const [filters, setFilters] = useState({
    domain: 'All',
    experience: 'All',
    location: 'All',
    assessmentType: 'All',
    education: 'All',
    skills: [] as string[],
    availability: 'All'
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDomain = filters.domain === 'All' || student.domain === filters.domain;
      const matchesExperience = filters.experience === 'All' || student.experience === filters.experience;
      const matchesLocation = filters.location === 'All' || student.location === filters.location;
      const matchesAssessmentType = filters.assessmentType === 'All' || student.assessmentType === filters.assessmentType;
      const matchesEducation = filters.education === 'All' || student.education === filters.education;
      const matchesAvailability = filters.availability === 'All' || student.availability === filters.availability;
      
      const matchesSkills = filters.skills.length === 0 || 
                           filters.skills.some(skill => student.skills.includes(skill));

      return matchesSearch && matchesDomain && matchesExperience && matchesLocation && 
             matchesAssessmentType && matchesEducation && matchesAvailability && matchesSkills;
    });
  }, [students, searchTerm, filters]);

  const handleShortlist = (student: Student) => {
    setShortlistedStudents(prev => {
      const isAlreadyShortlisted = prev.some(s => s.id === student.id);
      if (isAlreadyShortlisted) {
        return prev.filter(s => s.id !== student.id);
      } else {
        return [...prev, { ...student, shortlisted: true }];
      }
    });
  };

  const handleRemoveFromShortlist = (studentId: string) => {
    setShortlistedStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const handleSendEmail = (recipients: Student[]) => {
    setEmailRecipients(recipients);
    setShowEmailModal(true);
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#805da3] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page if not logged in and landing page is active
  if (!currentUser && showLandingPage) {
    console.log('Showing landing page');
    return <LandingPage onNavigateToLogin={() => setShowLandingPage(false)} />;
  }

  // Show login page if not logged in and landing page is not active
  if (!currentUser && !showLandingPage) {
    console.log('No user logged in, showing login page');
    return <LoginPage onBackToHome={() => setShowLandingPage(true)} />;
  }

  // Show Student Dashboard if student is logged in
  if (userType === 'student') {
    console.log('User is student, showing student dashboard');
    return <StudentDashboard onLogout={logout} currentUser={currentUser} />;
  }

  // Show original HR Dashboard (with student table and filters) if HR is logged in
  if (userType === 'hr') {
    console.log('User is HR, showing HR dashboard');
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterClick={() => setShowFilterPanel(true)}
          shortlistCount={shortlistedStudents.length}
          onLogout={logout}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Top {filteredStudents.length} Candidates
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on assessment scores and domain match
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {shortlistedStudents.length} shortlisted
                      </span>
                      {shortlistedStudents.length > 0 && (
                        <button
                          onClick={() => handleSendEmail(shortlistedStudents)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Mail All
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <StudentTable
                  students={filteredStudents}
                  shortlistedIds={shortlistedStudents.map(s => s.id)}
                  onShortlist={handleShortlist}
                  onViewProfile={handleViewProfile}
                  onSendEmail={(student) => handleSendEmail([student])}
                />
              </div>
            </div>

            {/* Shortlist Sidebar */}
            <ShortlistSidebar
              students={shortlistedStudents}
              onRemove={handleRemoveFromShortlist}
              onSendEmail={() => handleSendEmail(shortlistedStudents)}
              onViewProfile={handleViewProfile}
            />
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilterPanel(false)}
          />
        )}

        {/* Student Profile Modal */}
        {selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
            onShortlist={handleShortlist}
            onSendEmail={(student) => handleSendEmail([student])}
            isShortlisted={shortlistedStudents.some(s => s.id === selectedStudent.id)}
          />
        )}

        {/* Email Modal */}
        {showEmailModal && (
          <EmailModal
            recipients={emailRecipients}
            onClose={() => setShowEmailModal(false)}
            onSend={(emailData) => {
              console.log('Sending email:', emailData);
              setShowEmailModal(false);
            }}
          />
        )}
      </div>
    );
  }

  // Fallback - should not reach here
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-4">Unable to determine user type</p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin-login" element={<AdminLoginWrapper />} />
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboardWrapper /></ProtectedAdminRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Wrapper components to handle props
const AdminLoginWrapper = () => {
  return <AdminLogin />;
};

const AdminDashboardWrapper = () => {
  const { adminData, logout } = useAdmin();
  if (!adminData) return null;
  return <AdminDashboard onLogout={logout} adminData={adminData} />;
};

export default App;