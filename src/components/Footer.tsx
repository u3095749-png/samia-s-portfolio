import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Github, Mail, Phone, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </span>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Samia Siddiqui
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Educator &middot; Creative Designer &middot; Web Developer. Intermediate qualified with 1 year of teaching experience.
          </p>
        </div>

        {/* Social / Direct Links */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <span aria-hidden="true">&middot;</span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
          <span aria-hidden="true">&middot;</span>
          <a
            href={`tel:${personalInfo.phone}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Phone</span>
          </a>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold"
            aria-label="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Samia Siddiqui. All rights reserved.
      </div>
    </footer>
  );
};
