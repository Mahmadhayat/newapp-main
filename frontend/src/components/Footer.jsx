import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-teal-400 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Automation Hub</span>
            </Link>
            <p className="text-slate-300 max-w-md mb-6">
              Your central hub for ready-made n8n automation workflows and custom solutions. 
              From marketing automation to data syncing, streamline your business with powerful workflows.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@automationhub.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/workflows" className="text-slate-300 hover:text-white transition-colors">
                  Browse Workflows
                </Link>
              </li>
              <li>
                <Link to="/custom-request" className="text-slate-300 hover:text-white transition-colors">
                  Custom Request
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-slate-400 hover:text-slate-300 transition-colors text-sm">
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Automation Hub. All rights reserved. Powered by n8n workflows.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;