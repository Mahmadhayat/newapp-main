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