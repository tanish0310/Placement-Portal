import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 text-sm font-semibold">PP</span>
              </div>
              <span className="text-lg font-medium text-white">
                Placement Portal
              </span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              Connecting exceptional talent with leading organizations through
              intuitive technology and seamless experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors font-light"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors font-light"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-slate-400 hover:text-white transition-colors font-light"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-slate-400 hover:text-white transition-colors font-light"
                >
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                <a
                  href="mailto:placementportal.help@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors font-light text-sm"
                >
                  placementportal.help@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-slate-400 hover:text-white transition-colors font-light text-sm"
                >
                  +91 9876543210
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                <span className="text-slate-400 font-light text-sm">
                  IIIT Allahabad
                  <br />
                  Prayagraj, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm font-light">
              © {new Date().getFullYear()} Placement Portal. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm font-light"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm font-light"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;