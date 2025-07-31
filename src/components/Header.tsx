import React from 'react';
import { Search, Filter, ShoppingCart, LogOut } from 'lucide-react';
import TechEngineLogo from './TechEngineLogo';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterClick: () => void;
  shortlistCount: number;
  onLogout?: () => void;
}

export default function Header({ searchTerm, onSearchChange, onFilterClick, shortlistCount, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <TechEngineLogo size="sm" />
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4 flex-1 max-w-md ml-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates by name, domain, or skills..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent outline-none transition-colors"
              />
            </div>
            <button
              onClick={onFilterClick}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Shortlist Counter and Logout */}
          <div className="flex items-center gap-4 ml-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {shortlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#805da3] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {shortlistCount}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600 hidden sm:inline">
                Shortlisted
              </span>
            </div>
            
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}