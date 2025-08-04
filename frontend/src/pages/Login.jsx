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
  Zap,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        const userData = {
          id: 1,
          email: formData.email,
          name: 'John Doe',
          role: 'user',
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('userAuth', JSON.stringify(userData));
        localStorage.setItem('userToken', 'mock-jwt-token-user');
        
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
            Welcome Back
          </h2>
          <p className="text-slate-600">
            Sign in to your Automation Hub account
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
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
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-teal-600 hover:text-teal-500">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-700">Email: user@example.com</p>
              <p className="text-xs text-blue-700">Password: password</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-xs text-slate-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-teal-600 hover:text-teal-500">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-teal-600 hover:text-teal-500">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;