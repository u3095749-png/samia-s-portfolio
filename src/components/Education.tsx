import React from 'react';
import { educationData } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Building2,
  Atom,
  Binary,
  Calculator
} from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white/70">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Education
          </h2>
          <p className="text-base text-slate-600">
            Solid foundations in mathematics, algorithmic problem-solving, and computational logic.
          </p>
        </div>

        {/* Education Timeline / Cards */}
        <div className="space-y-8">
          {educationData.map((edu, idx) => (
            <Interactive3DCard
              key={idx}
              maxTilt={4}
              className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/90 shadow-md relative overflow-hidden"
            >
              {/* Subtle blue accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {edu.status}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-medium text-slate-600 flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>{edu.institution}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="text-blue-600 font-semibold">{edu.field}</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold self-start">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Qualification Completed</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                {edu.description}
              </p>

              {/* Core Academic Modules */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Key Subject Disciplines &amp; Areas of Study</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {edu.modules.map((mod, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-100/80 text-xs sm:text-sm text-slate-700"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        {i === 0 && <Binary className="w-3.5 h-3.5" />}
                        {i === 1 && <Calculator className="w-3.5 h-3.5" />}
                        {i === 2 && <Atom className="w-3.5 h-3.5" />}
                        {i === 3 && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-medium">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Interactive3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
