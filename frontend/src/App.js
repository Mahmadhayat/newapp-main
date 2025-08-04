import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CustomRequest from './pages/CustomRequest';
import WorkflowList from './pages/WorkflowList';
import WorkflowDetails from './pages/WorkflowDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import WorkflowModificationRequest from './components/WorkflowModificationRequest';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import UserProtectedRoute from './components/UserProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Routes (without header/footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes (with header/footer) */}
          <Route 
            path="/*" 
            element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/custom-request" element={<CustomRequest />} />
                    <Route path="/workflows" element={<WorkflowList />} />
                    <Route path="/workflow/:id" element={<WorkflowDetails />} />
                    <Route path="/workflow/:id/request-changes" element={<WorkflowModificationRequest />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route 
                      path="/dashboard" 
                      element={
                        <UserProtectedRoute>
                          <UserDashboard />
                        </UserProtectedRoute>
                      } 
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;