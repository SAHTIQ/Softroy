import React from "react";
import { Project, ResearchReport } from "../types";
import {
  Folder,
  FileText,
  Bookmark,
  Plus,
  Trash2,
  X,
  BookOpen,
  Sparkles,
  ChevronRight,
  Upload,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  activeProject: Project;
  onSelectProject: (p: Project) => void;
  onSelectReport: (r: ResearchReport) => void;
  onCreateProject: () => void;
  onDeleteProject: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  projects,
  activeProject,
  onSelectProject,
  onSelectReport,
  onCreateProject,
  onDeleteProject,
}) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 left-0 w-80 bg-white border-r border-slate-200 z-50 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm">Research Workspace</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Research Projects ({projects.length})
            </span>
            <button
              onClick={onCreateProject}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> New
            </button>
          </div>

          <div className="space-y-1">
            {projects.map((p) => {
              const isActive = p.id === activeProject.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isActive
                      ? "bg-indigo-50 border-indigo-200 text-indigo-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Folder className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold truncate">{p.name}</h4>
                      <p className="text-[10px] text-slate-500">
                        {p.reports.length} report{p.reports.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  {projects.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(p.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reports in Active Project */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Reports in "{activeProject.name}" ({activeProject.reports.length})
          </span>

          {activeProject.reports.length > 0 ? (
            <div className="space-y-1.5">
              {activeProject.reports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => onSelectReport(report)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex items-start justify-between gap-2 group shadow-2xs"
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {report.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span className="capitalize">{report.mode.replace("_", " ")}</span>
                      <span>• {new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 mt-1" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic py-2">
              No reports generated in this project yet. Execute a research query to generate one.
            </p>
          )}
        </div>

        {/* Uploaded Documents */}
        {activeProject.uploadedFiles.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Uploaded Documents ({activeProject.uploadedFiles.length})
            </span>
            <div className="space-y-1.5">
              {activeProject.uploadedFiles.map((f) => (
                <div
                  key={f.id}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center gap-2 text-slate-700"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span>SoftRoy AI v2026.7</span>
        <span className="text-indigo-600 font-semibold">11-Layer Core</span>
      </div>
    </aside>
  );
};
