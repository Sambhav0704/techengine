import React from 'react';
import { X } from 'lucide-react';
import { Filters } from '../types';

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClose: () => void;
}

const filterOptions = {
  domains: ['All', 'UI/UX Designer', 'Backend Developer', 'Frontend Developer', 'Full Stack Developer', 'Python Developer', 'DevOps Engineer', 'Data Scientist', 'QA Tester'],
  experiences: ['All', 'Fresher', '0-1 years', '1-3 years', '3+ years'],
  locations: ['All', 'Remote', 'Onsite', 'Hybrid'],
  assessmentTypes: ['All', 'Hackathon Score', 'Technical Test', 'Interview Round'],
  educations: ['All', 'B.Tech', 'M.Tech', 'BCA', 'MCA', 'Diploma'],
  availabilities: ['All', 'Immediate', '15 days', '30 days'],
  skills: ['React', 'Node.js', 'Python', 'Django', 'SQL', 'Docker', 'Figma', 'JavaScript', 'TypeScript', 'AWS', 'MongoDB', 'PostgreSQL', 'Vue.js', 'Angular', 'Express.js', 'Redis', 'Kubernetes']
};

export default function FilterPanel({ filters, onFiltersChange, onClose }: FilterPanelProps) {
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    handleFilterChange('skills', newSkills);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      domain: 'All',
      experience: 'All',
      location: 'All',
      assessmentType: 'All',
      education: 'All',
      skills: [],
      availability: 'All'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Filter Candidates</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#805da3] hover:text-[#6d4d8c] font-medium"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Job Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Domain</label>
            <select
              value={filters.domain}
              onChange={(e) => handleFilterChange('domain', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            >
              {filterOptions.domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            >
              {filterOptions.experiences.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          {/* Location Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location Preference</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            >
              {filterOptions.locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
            <select
              value={filters.education}
              onChange={(e) => handleFilterChange('education', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            >
              {filterOptions.educations.map(education => (
                <option key={education} value={education}>{education}</option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent"
            >
              {filterOptions.availabilities.map(availability => (
                <option key={availability} value={availability}>{availability}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Skills */}
        <div className="px-6 pb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filterOptions.skills.map(skill => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  filters.skills.includes(skill)
                    ? 'bg-[#805da3] text-white border-[#805da3]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}