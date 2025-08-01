import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import { 
  Shield, 
  Eye, 
  EyeOff,
  Lock,
  User
} from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple admin credentials check (in production, this should be handled by a proper authentication system)
    const adminCredentials = {
      username: 'admin',
      password: 'admin123'
    };

    setTimeout(() => {
      if (formData.username === adminCredentials.username && 
          formData.password === adminCredentials.password) {
        
        // Store admin session (in production, use proper JWT tokens)
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        
        toast({
          title: "Login Successful!",
          description: "Welcome to the Admin Dashboard.",
          className: "bg-green-50 border-green-200 text-green-800"
        });
        
        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
        
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-800 p-4 rounded-2xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Admin Login
          </h1>
          <p className="text-slate-600">
            Access the Automation Hub admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-slate-800">
              Administrator Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter admin username"
                    className="pl-10 text-base h-12"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter admin password"
                    className="pl-10 pr-10 text-base h-12"
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

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg"
                disabled={isLoading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Demo Credentials</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLogin;