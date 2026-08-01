import React from "react";
import { ResearchTimelineEvent } from "../types";
import { Clock, Calendar, Sparkles, Award, Layers, Milestone } from "lucide-react";

interface TimelineViewerProps {
  timeline: ResearchTimelineEvent[];
}

export const TimelineViewer: React.FC<TimelineViewerProps> = ({ timeline }) => {
  const sortedTimeline = [...(timeline || [])].sort((a, b) => a.year - b.year);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Milestone":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Methodology Breakthrough":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Dataset Release":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "Paradigm Shift":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Layer 7 Research Paradigm & Historical Timeline
            </h3>
            <p className="text-xs text-slate-500">
              Evolution of key methodologies, seminal publications, and domain milestones
            </p>
          </div>
        </div>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200 font-medium">
          {sortedTimeline.length} Breakthrough Events
        </span>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 my-4">
        {sortedTimeline.map((event, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 group-hover:bg-indigo-600 transition-colors flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>

            {/* Content Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {event.year}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900">{event.title}</h4>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border capitalize ${getCategoryBadge(event.category)}`}>
                  {event.category}
                </span>
              </div>

              <p className="text-xs text-indigo-600 font-semibold mb-1.5">
                Paper: {event.paperTitle} <span className="text-slate-500 text-[11px] font-normal">({event.authors})</span>
              </p>

              <p className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200 font-medium">
                {event.significance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
