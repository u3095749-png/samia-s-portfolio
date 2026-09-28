import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';
import { 
  User, 
  Calendar, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Download,
  BookOpen,
  Sparkles
} from 'lucide-react';

export const About: React.FC = () => {
  const profileImage = '/src/assets/images/samia_profile_portrait_1790595352387.jpg';

  const infoItems = [
    {
      label: 'Full Name',
      value: personalInfo.name,
      icon: User,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Age',
      value: `${personalInfo.age} Years Old`,
      icon: Calendar,
      color: 'text-sky-600',
      bg: 'bg-sky-50'
    },
    {
      label: 'Qualification',
      value: personalInfo.qualification,
      icon: Award,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      label: 'Experience',
      value: personalInfo.experience,
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Phone Contact',
      value: personalInfo.phone,
      icon: Phone,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Email Address',
      value: personalInfo.email,
      icon: Mail,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50'
    }
  ];

  const highlights = [
    "1 Year of teaching experience guiding students through computer fundamentals and coding",
    "Completed Intermediate (Inter) in Science & Computer disciplines with analytical focus",
    "Developed interactive applications including Car Racing Challenge, AI Assistant, and Burger Express",
    "Passionate about pedagogical innovation, UI clarity, and hands-on project mentoring"
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white/70">
      {/* Background soft elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Biography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            About Me
          </h2>
          <p className="text-base text-slate-600">
            A snapshot of my background, academic credentials, teaching journey, and passion for technology.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Modern Profile Portrait Card with 3D Tilt */}
          <div className="lg:col-span-5 flex justify-center">
            <Interactive3DCard className="w-full max-w-sm rounded-3xl p-3 glass-panel border border-white shadow-xl relative group">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-sky-50 shadow-inner">
                <img
                  src={profileImage}
                  alt="Samia Siddiqui - Educator and Web Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to avatar container if image is blocked
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('flex', 'items-center', 'justify-center', 'p-6');
                      const fallback = document.createElement('div');
                      fallback.className = 'text-center';
                      fallback.innerHTML = `
                        <div class="w-24 h-24 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center text-4xl font-black mb-3">S</div>
                        <div class="font-bold text-slate-800 text-lg">Samia Siddiqui</div>
                        <div class="text-xs text-blue-600 font-medium">Educator & Web Developer</div>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />

                {/* Subtle Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Status</div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Available for Projects &amp; Mentorship</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-medium">Location</div>
                    <div className="text-xs font-semibold text-slate-800">Pakistan</div>
                  </div>
                </div>
              </div>

              {/* Bio summary caption */}
              <div className="mt-4 px-2 pb-2 text-center">
                <h3 className="text-lg font-bold text-slate-900 font-display">Samia Siddiqui</h3>
                <p className="text-xs text-blue-600 font-medium">Educator &middot; Creative Designer &middot; Web Developer</p>
              </div>
            </Interactive3DCard>
          </div>

          {/* Right Column: Bio Narrative & Information Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 font-display">
                Passionate Educator &amp; Enthusiastic Web Developer
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                Hello! I am <span className="font-semibold text-slate-800">Samia Siddiqui</span>, an 18-year-old developer and teacher. Over the past year, I have had the privilege of instructing eager students in fundamental computer programming, logical problem solving, and interactive web creation.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                My teaching journey directly fuels my engineering craft: to explain code clearly to learners, one must master clean design, accessible structure, and intuitive user experiences. My featured portfolio showcases key projects including the <strong>Car Racing Challenge</strong>, an <strong>AI Interactive Assistant</strong>, and <strong>Samia's Burger Express</strong>.
              </p>

              {/* Core Strengths Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Information Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {infoItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Interactive3DCard
                    key={index}
                    maxTilt={5}
                    className="glass-panel p-3.5 rounded-2xl border border-white/80 hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-7 h-7 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={item.value}>
                      {item.value}
                    </div>
                  </Interactive3DCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
