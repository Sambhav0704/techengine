import React from 'react';
import { X, Mail, Eye, Users, Award } from 'lucide-react';
import { Student } from '../types';

interface ShortlistSidebarProps {
  students: Student[];
  onRemove: (studentId: string) => void;
  onSendEmail: () => void;
  onViewProfile: (student: Student) => void;
}

export default function ShortlistSidebar({ students, onRemove, onSendEmail, onViewProfile }: ShortlistSidebarProps) {
  if (students.length === 0) {
    return (
      <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#805da3]" />
          <h3 className="text-lg font-semibold text-gray-900">Shortlisted Candidates</h3>
        </div>
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No candidates shortlisted yet</p>
          <p className="text-gray-400 text-xs mt-1">Click the shortlist button to add candidates</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#805da3]" />
            <h3 className="text-lg font-semibold text-gray-900">Shortlisted</h3>
          </div>
          <span className="bg-[#805da3] text-white text-sm px-2 py-1 rounded-full">
            {students.length}
          </span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {students.map((student) => (
          <div key={student.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#805da3] to-[#c1bec4] flex items-center justify-center text-white font-medium flex-shrink-0">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{student.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{student.domain}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-[#805da3]">
                      Score: {student.score}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      Rank #{student.rank}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemove(student.id)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                title="Remove from shortlist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onViewProfile(student)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-[#805da3] hover:bg-gray-100 rounded transition-colors"
              >
                <Eye className="w-3 h-3" />
                View
              </button>
              <button
                onClick={() => {}} // Individual email handled in parent
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <Mail className="w-3 h-3" />
                Email
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onSendEmail}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] transition-colors font-medium"
        >
          <Mail className="w-4 h-4" />
          Send Email to All ({students.length})
        </button>
      </div>
    </div>
  );
}