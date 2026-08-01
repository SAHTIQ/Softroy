import React from "react";
import { Project } from "../types";
import { Cpu, Plus, Folder, BookOpen, Settings, ShieldCheck, Sparkles, Layers } from "lucide-react";

interface HeaderProps {
  activeProject: Project;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onCreateProject: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeProject,
  projects,
  onSelectProject,
  onCreateProject,
  onToggleSidebar,
}) => {
  return (
    <header className="bg-white/95 border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-xs">
      {/* Left Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          title="Toggle Projects Sidebar"
        >
          <Layers className="w-4 h-4 text-indigo-600" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm font-black text-sm">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-900 text-base tracking-tight">
                SoftRoy <span className="text-indigo-600">AI</span>
              </h1>
              <span className="text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                11-Layer Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Multi-Agent Academic Research Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Middle Project Switcher */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <Folder className="w-3.5 h-3.5 text-indigo-600" />
          <select
            value={activeProject.id}
            onChange={(e) => {
              const selected = projects.find((p) => p.id === e.target.value);
              if (selected) onSelectProject(selected);
            }}
            className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id} className="bg-white text-slate-900">
                {p.name} ({p.reports.length} reports)
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onCreateProject}
          className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition-colors"
          title="Create New Project Workspace"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Right Stats & Badges */}
      <div className="hidden md:flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>arXiv & OpenAlex Connected</span>
        </div>
      </div>
    </header>
  );
};
