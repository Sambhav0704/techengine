import React from 'react';
import { X, Mail, Plus, ExternalLink, Phone, MapPin, Award, Github, Globe, Download } from 'lucide-react';
import { Student } from '../types';

interface StudentModalProps {
  student: Student;
  onClose: () => void;
  onShortlist: (student: Student) => void;
  onSendEmail: (student: Student) => void;
  isShortlisted: boolean;
}

export default function StudentModal({ student, onClose, onShortlist, onSendEmail, isShortlisted }: StudentModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Interviewed': return 'bg-blue-100 text-blue-800';
      case 'Hired': return 'bg-purple-100 text-purple-800';
      case 'In Process': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-[#805da3] to-[#c1bec4] text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl font-bold">
              {student.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  Rank #{student.rank || 'N/A'}
                </span>
              </div>
              
              <p className="text-lg opacity-90 mb-3">{student.domain}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {student.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {student.phone || 'N/A'}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {student.location}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{student.score}</div>
              <div className="text-sm opacity-75">Assessment Score</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status || 'Available')}`}>
                      {student.status || 'Available'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</label>
                  <div className="mt-1 text-sm font-medium text-gray-900">{student.experience}</div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location Pref</label>
                  <div className="mt-1 text-sm font-medium text-gray-900">{student.locationPreference}</div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</label>
                  <div className="mt-1 text-sm font-medium text-gray-900">{student.availability}</div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map(skill => (
                    <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#805da3] bg-opacity-10 text-[#805da3] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Projects</h3>
                <div className="space-y-4">
                  {student.projects?.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{project.title}</h4>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#805da3] hover:text-[#6d4d8c]"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map(tech => (
                          <span key={tech} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Assessment History</h3>
                <div className="space-y-3">
                  {student.assessments?.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{assessment.type}</div>
                        <div className="text-sm text-gray-500">{new Date(assessment.date).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#805da3]">
                          {assessment.score}/{assessment.maxScore}
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.round((assessment.score / assessment.maxScore) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => onSendEmail(student)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </button>
                
                <button
                  onClick={() => onShortlist(student)}
                  disabled={isShortlisted}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                    isShortlisted
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#805da3] text-white hover:bg-[#6d4d8c]'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  {isShortlisted ? 'Already Shortlisted' : 'Add to Shortlist'}
                </button>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Links & Resources</h4>
                <div className="space-y-2">
                  <a
                    href={student.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-[#805da3] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                  
                  {student.githubLink && (
                    <a
                      href={student.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-[#805da3] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Profile
                    </a>
                  )}
                  
                  {student.portfolioLink && (
                    <a
                      href={student.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-[#805da3] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Portfolio Website
                    </a>
                  )}
                </div>
              </div>

              {/* Badges */}
              {student.badges && student.badges.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {student.badges.map((badge, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Education</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">{student.education}</div>
                  <div className="text-sm text-gray-500 mt-1">Computer Science Engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}