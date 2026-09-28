import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';
import { 
  ArrowRight, 
  Mail, 
  Code2, 
  GraduationCap, 
  Sparkles, 
  Gamepad2, 
  Github, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(130);

  const words = personalInfo.taglines; // Teacher, Creative Designer, Web Developer, Programmer

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      
      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(110 + Math.random() * 40); // Natural typing variance
        
        // If finished word, wait before deleting
        if (currentText === fullWord) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting characters
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(55);
        
        // If deleted completely, move to next word
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* Soft Blue Atmospheric Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/15 via-sky-300/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Floating Animated Ambient Icons */}
      <div className="hidden lg:block absolute top-28 left-[10%] p-3.5 rounded-2xl glass-panel text-blue-600 shadow-lg animate-float-slow">
        <Code2 className="w-6 h-6" />
      </div>
      <div 
        className="hidden lg:block absolute bottom-36 left-[8%] p-3.5 rounded-2xl glass-panel text-sky-600 shadow-lg animate-float-slow"
        style={{ animationDelay: '1.5s' }}
      >
        <GraduationCap className="w-6 h-6" />
      </div>
      <div 
        className="hidden lg:block absolute top-36 right-[12%] p-3.5 rounded-2xl glass-panel text-indigo-600 shadow-lg animate-float-slow"
        style={{ animationDelay: '2.5s' }}
      >
        <Gamepad2 className="w-6 h-6" />
      </div>
      <div 
        className="hidden lg:block absolute bottom-28 right-[10%] p-3.5 rounded-2xl glass-panel text-blue-500 shadow-lg animate-float-slow"
        style={{ animationDelay: '3.5s' }}
      >
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        {/* Editorial Sub-Headline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Educator &middot; Creative Designer &middot; Web Developer</span>
        </div>

        {/* Large Elegant Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 font-display">
          Samia Siddiqui
        </h1>

        {/* Animated Typing & Realistic Cursor Effect */}
        <div className="h-14 sm:h-16 flex items-center justify-center mb-6">
          <div className="inline-flex items-center text-xl sm:text-3xl md:text-4xl font-semibold text-slate-700">
            <span className="text-slate-400 font-normal mr-2">I am a</span>
            <span className="text-blue-600 font-bold tracking-tight">
              {currentText}
            </span>
            <span className="inline-block w-0.5 sm:w-1 h-7 sm:h-9 bg-blue-600 ml-1.5 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Professional Introduction */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-10 text-balance font-normal">
          18-year-old passionate educator and web developer with 1 year of teaching experience. 
          Dedicated to building interactive browser games, intuitive web applications, and inspiring students with computer science fundamentals.
        </p>

        {/* Smooth Animated CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="group w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-blue-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-panel text-slate-800 font-semibold text-sm hover:bg-white active:scale-95 transition-all shadow-sm hover:border-blue-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Contact Me</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl glass-panel text-slate-700 font-medium text-sm hover:bg-white active:scale-95 transition-all shadow-sm hover:text-blue-600 flex items-center justify-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Premium Glassmorphism Stat Cards with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Interactive3DCard className="glass-panel p-5 rounded-2xl text-left border border-white/80 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 font-display">1 Year</div>
                <div className="text-xs text-slate-500 font-medium">Teaching Experience</div>
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard className="glass-panel p-5 rounded-2xl text-left border border-white/80 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-sky-700 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 font-display">Featured</div>
                <div className="text-xs text-slate-500 font-medium">Core Web &amp; Game Projects</div>
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard className="glass-panel p-5 rounded-2xl text-left border border-white/80 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 font-display">18 Years</div>
                <div className="text-xs text-slate-500 font-medium">Age &amp; Inter Qualified</div>
              </div>
            </div>
          </Interactive3DCard>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors animate-bounce"
            aria-label="Scroll to About section"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
