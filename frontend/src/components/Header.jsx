import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Zap, Search, User, LogOut, Settings } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userAuth');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userToken');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
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

          {/* Search & User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <button
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              aria-label="Search workflows"
              onClick={() => {
                window.location.href = '/workflows';
              }}
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                >
                  <div className="bg-teal-100 p-1 rounded-full">
                    <User className="h-4 w-4 text-teal-600" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}
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
              
              {/* Mobile User Authentication */}
              {user ? (
                <div className="px-4 pt-2 space-y-2">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-md">
                    <div className="bg-teal-100 p-1 rounded-full">
                      <User className="h-4 w-4 text-teal-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{user.name}</span>
                  </div>
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-4 pt-2 space-y-2">
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;