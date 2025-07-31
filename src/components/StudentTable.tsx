import React from 'react';
import { Mail, Plus, Eye, Award, MapPin, Clock } from 'lucide-react';
import { Student } from '../types';

interface StudentTableProps {
  students: Student[];
  shortlistedIds: string[];
  onShortlist: (student: Student) => void;
  onViewProfile: (student: Student) => void;
  onSendEmail: (student: Student) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available': return 'bg-green-100 text-green-800';
    case 'Interviewed': return 'bg-blue-100 text-blue-800';
    case 'Hired': return 'bg-purple-100 text-purple-800';
    case 'In Process': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600 font-semibold';
  if (score >= 75) return 'text-blue-600 font-semibold';
  if (score >= 60) return 'text-yellow-600 font-semibold';
  return 'text-red-600 font-semibold';
};

export default function StudentTable({ students, shortlistedIds, onShortlist, onViewProfile, onSendEmail }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-gray-400 mb-2">
          <Award className="w-12 h-12 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
        <p className="text-gray-500">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#805da3] text-white text-sm font-medium rounded-full">
                    {student.rank}
                  </span>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#805da3] to-[#c1bec4] flex items-center justify-center text-white font-medium">
                      {student.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.domain}</div>
                <div className="text-sm text-gray-500">{student.experience}</div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-2xl font-bold ${getScoreColor(student.score)}`}>
                  {student.score}
                </div>
                <div className="text-xs text-gray-500">/ 100</div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {student.locationPreference}
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {student.availability}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.slice(0, 2).map(skill => (
                      <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                        {skill}
                      </span>
                    ))}
                    {student.skills.length > 2 && (
                      <span className="text-xs text-gray-500">+{student.skills.length - 2}</span>
                    )}
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewProfile(student)}
                    className="p-2 text-gray-400 hover:text-[#805da3] hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onSendEmail(student)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onShortlist(student)}
                    disabled={shortlistedIds.includes(student.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      shortlistedIds.includes(student.id)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#805da3] text-white hover:bg-[#6d4d8c]'
                    }`}
                    title={shortlistedIds.includes(student.id) ? 'Already shortlisted' : 'Add to shortlist'}
                  >
                    <Plus className="w-3 h-3" />
                    {shortlistedIds.includes(student.id) ? 'Added' : 'Shortlist'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}