import React, { useState, useEffect } from 'react';
import { verifiedGitHubProjects } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { Interactive3DCard } from './Interactive3DCard';
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Gamepad2, 
  Sparkles, 
  Layers, 
  Search, 
  Star,
  RefreshCw
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(verifiedGitHubProjects);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [starredIds, setStarredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('samia_portfolio_starred_projects');
      return saved ? JSON.parse(saved) : ['car-racing', 'AI', 'Burger'];
    } catch {
      return ['car-racing', 'AI', 'Burger'];
    }
  });

  // Sync only the 3 specific projects from GitHub if available, maintaining exact 3 projects scope
  const allowedProjectKeys = ['car-racing', 'ai', 'burger'];

  const fetchGitHubRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/users/u3095749-png/repos?sort=updated&per_page=100');
      if (response.ok) {
        const liveRepos = await response.json();
        if (Array.isArray(liveRepos) && liveRepos.length > 0) {
          const matchingRepos = liveRepos.filter((repo: any) =>
            allowedProjectKeys.includes(repo.name.toLowerCase())
          );

          if (matchingRepos.length > 0) {
            const merged: Project[] = verifiedGitHubProjects.map((verified) => {
              const live = matchingRepos.find((r: any) => r.name.toLowerCase() === verified.name.toLowerCase());
              if (!live) return verified;
              return {
                ...verified,
                stars: live.stargazers_count ?? verified.stars,
                forks: live.forks_count ?? verified.forks,
                homepage: live.homepage || verified.homepage
              };
            });
            setProjects(merged);
          }
        }
      }
    } catch (err) {
      console.log('Using verified offline repository cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const toggleStar = (projectId: string) => {
    setStarredIds(prev => {
      const updated = prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId];
      try {
        localStorage.setItem('samia_portfolio_starred_projects', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'starred') return starredIds.includes(String(project.id));
    if (selectedFilter === 'demos') return Boolean(project.homepage);
    return project.category === selectedFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'games':
        return <Gamepad2 className="w-5 h-5 text-indigo-600" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-sky-600" />;
      default:
        return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/70">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Project Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Projects &amp; Creations
          </h2>
          <p className="text-base text-slate-600">
            Selected showcase of key featured projects directly from my GitHub (<a href="https://github.com/u3095749-png" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">@u3095749-png</a>) featuring interactive arcade gaming, artificial intelligence, and responsive web applications.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs w-full md:w-auto">
            {[
              { id: 'all', label: 'All 3 Projects' },
              { id: 'games', label: 'Car Racing Challenge' },
              { id: 'ai', label: 'AI Interactive Assistant' },
              { id: 'apps', label: "Samia's Burger Express" },
              { id: 'starred', label: `Favorites (${starredIds.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box & Sync */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={fetchGitHubRepos}
              disabled={loading}
              title="Refresh repositories from GitHub"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-xs disabled:opacity-50"
              aria-label="Refresh GitHub Repositories"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        {filteredProjects.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl border border-white">
            <p className="text-slate-500 text-sm">No project found matching your filter criteria.</p>
            <button
              onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const isStarred = starredIds.includes(String(project.id));
              return (
                <Interactive3DCard
                  key={project.name}
                  maxTilt={6}
                  className="glass-panel rounded-3xl p-6 border border-white/90 hover:border-blue-200 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group"
                >
                  <div>
                    {/* Card Top: Category Icon + Star Toggle */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-center">
                          {getCategoryIcon(project.category)}
                        </div>
                        {project.homepage && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live App</span>
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(String(project.id));
                        }}
                        className={`p-1.5 rounded-xl transition-colors ${
                          isStarred
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-slate-300 hover:text-amber-400 hover:bg-slate-50'
                        }`}
                        title={isStarred ? 'Remove from favorites' : 'Add to favorites'}
                        aria-label="Star Project"
                      >
                        <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display mb-1.5">
                      {project.title}
                    </h3>

                    {/* Repository Name as unboxed clean text */}
                    <div className="text-[11px] text-slate-400 font-mono mb-3">
                      u3095749-png/{project.name}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges as clean unboxed text with separators */}
                    <div className="py-2.5 border-t border-slate-100/80 mb-4 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={idx}>
                          <span className="font-medium text-slate-600">{tech}</span>
                          {idx < project.technologies.length - 1 && <span aria-hidden="true">&middot;</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Action Buttons: GitHub & Live Demo */}
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>

                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow-blue-200"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Interactive3DCard>
              );
            })}
          </div>
        )}

        {/* GitHub stats callout */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl text-center border border-white/80 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-900 font-display">Explore Full GitHub Profile</h4>
            <p className="text-xs text-slate-600 mt-1">Visit Samia Siddiqui's GitHub for all source repositories, commits, and experiments.</p>
          </div>
          <a
            href="https://github.com/u3095749-png"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Visit @u3095749-png</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
