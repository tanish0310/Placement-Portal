import React, { useState } from "react";
import { Menu, X, User, Building2, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">PP</span>
            </div>
            <span className="text-lg font-medium text-slate-900">
              Placement Portal
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              Home
            </a>
            <a
              href="/about"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              About
            </a>
            <a
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              Contact
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              <a
                href="/"
                className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
              >
                Home
              </a>
              <a
                href="/about"
                className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
              >
                About
              </a>
              <a
                href="/contact"
                className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
              >
                Contact
              </a>
              <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                <a
                  href="/login"
                  className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="block px-4 py-3 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;