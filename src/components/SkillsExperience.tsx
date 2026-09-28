import React, { useState } from 'react';
import { skillsData, teachingExperience } from '../data/portfolioData';
import { SkillVisualizer3D } from './SkillVisualizer3D';
import { Interactive3DCard } from './Interactive3DCard';
import { 
  Code2, 
  Layers, 
  Gamepad2, 
  Palette, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  GitBranch, 
  Calendar,
  CheckCircle,
  Award,
  Users,
  Compass
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layers,
  Gamepad2,
  Palette,
  GraduationCap,
  BookOpen,
  Sparkles,
  GitBranch
};

export const SkillsExperience: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/80">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Competencies &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Skills &amp; Teaching Experience
          </h2>
          <p className="text-base text-slate-600">
            A balanced synergy of technical engineering capabilities and hands-on instructional leadership.
          </p>
        </div>

        {/* 3D Visualizer & Technical Overview Banner */}
        <div className="mb-20 glass-panel rounded-3xl p-6 sm:p-10 border border-white/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visualizer column */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="text-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Interactive 3D Matrix</span>
                <h4 className="text-lg font-bold text-slate-900 font-display">Competency Topology</h4>
              </div>
              <SkillVisualizer3D />
            </div>

            {/* Explanation and pedagogy focus */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>1 Year of Active Teaching</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Connecting Classroom Mentorship With Code Excellence
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                As a teacher for 1 year, my primary objective has been turning intimidating coding concepts into enjoyable, hands-on discoveries. I break down algorithmic thinking, coordinate systems for games, and DOM interactions so junior students build confidence rapidly.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/80">
                  <div className="text-2xl font-black text-blue-600 font-display">100%</div>
                  <div className="text-xs font-medium text-slate-600 mt-0.5">Practical Hands-on Projects</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/80">
                  <div className="text-2xl font-black text-indigo-600 font-display">17+</div>
                  <div className="text-xs font-medium text-slate-600 mt-0.5">Games &amp; Web Apps Built</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'programming', label: 'Programming & Logic' },
            { id: 'frontend', label: 'Frontend & Web' },
            { id: 'teaching', label: 'Teaching & Pedagogy' },
            { id: 'creative', label: 'Creative & UI/UX' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white/80 text-slate-600 hover:text-blue-600 hover:bg-white border border-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Animated Skill Cards Grid with Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {filteredSkills.map((skill, index) => {
            const Icon = iconMap[skill.iconName] || Code2;
            return (
              <Interactive3DCard
                key={index}
                maxTilt={4}
                className="glass-panel p-5 sm:p-6 rounded-2xl border border-white hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-display">{skill.name}</h4>
                      <div className="text-xs text-slate-500">{skill.experience}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-blue-600 font-mono tabular-nums">
                    {skill.level}%
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </Interactive3DCard>
            );
          })}
        </div>

        {/* Teaching Experience Timeline */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/90 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Teaching Career</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Teaching Experience Timeline
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>1 Year Total Duration (2025 – Present)</span>
            </div>
          </div>

          {teachingExperience.map((exp, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-blue-500/40 space-y-4">
              {/* Timeline marker */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-xs" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                <span className="text-xs font-semibold text-slate-500">{exp.period} &middot; {exp.organization}</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-white/60 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Skills taught as clean unboxed text with separators */}
              <div className="pt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Subjects Instructed:</span>
                {exp.skillsTaught.map((item, i) => (
                  <React.Fragment key={i}>
                    <span>{item}</span>
                    {i < exp.skillsTaught.length - 1 && <span aria-hidden="true">&middot;</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
