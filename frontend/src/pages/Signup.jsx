import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  Zap,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      return 'Please fill in all fields';
    }
    
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    
    if (!acceptTerms) {
      return 'Please accept the Terms of Service';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: Date.now(),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'user',
        registrationDate: new Date().toISOString(),
        isVerified: false
      };
      
      localStorage.setItem('userAuth', JSON.stringify(userData));
      localStorage.setItem('userToken', 'mock-jwt-token-new-user');
      
      alert('Account created successfully! Welcome to Automation Hub!');
      navigate('/dashboard');
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Weak', color: 'text-red-500' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: 'text-yellow-500' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 4, text: 'Strong', color: 'text-green-500' };
    }
    return { strength: 3, text: 'Good', color: 'text-blue-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="bg-teal-100 p-3 rounded-full">
              <Zap className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h2>
          <p className="text-slate-600">
            Join Automation Hub and start automating your workflows
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="First name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.strength === 1 ? 'bg-red-500 w-1/4' :
                          passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/4' :
                          passwordStrength.strength === 3 ? 'bg-blue-500 w-3/4' :
                          passwordStrength.strength === 4 ? 'bg-green-500 w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center space-x-2">
                    {formData.password === formData.confirmPassword ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">Passwords match</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">Passwords don't match</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="accept-terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded mt-1"
                />
                <label htmlFor="accept-terms" className="text-sm text-slate-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-teal-600 hover:text-teal-500 font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-teal-600 hover:text-teal-500 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;