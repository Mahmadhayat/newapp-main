import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Zap, Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/workflows', label: 'Ready-Made Workflows' },
    { path: '/custom-request', label: 'Custom Request' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-slate-800 to-slate-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Automation Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search & CTA Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <button
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              aria-label="Search workflows"
              onClick={() => {
                // You can implement search functionality here
                // For now, redirect to workflows page
                window.location.href = '/workflows';
              }}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Button 
              asChild
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Link to="/custom-request">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <button
                className="mx-4 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors flex items-center space-x-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = '/workflows';
                }}
              >
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">Search Workflows</span>
              </button>
              
              <div className="px-4 pt-2">
                <Button 
                  asChild
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Link to="/custom-request" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;