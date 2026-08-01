import React, { useState } from "react";
import { ResearchReport } from "../types";
import { EvidenceGraph } from "./EvidenceGraph";
import { ScientificReviewCard } from "./ScientificReviewCard";
import { EvidenceTable } from "./EvidenceTable";
import { TimelineViewer } from "./TimelineViewer";
import { PaperComparison } from "./PaperComparison";
import { MermaidDiagram } from "./MermaidDiagram";
import { CitationsExportModal } from "./CitationsExportModal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FileText,
  Network,
  ShieldCheck,
  Table,
  Clock,
  GitCompare,
  Workflow,
  Share2,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  Check,
  Download,
} from "lucide-react";

interface ReportViewerProps {
  report: ResearchReport;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<
    "analysis" | "graph" | "review" | "evidence" | "timeline" | "diagrams" | "compare"
  >("analysis");
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-4">
      {/* Report Header Bar */}
      <div className="p-5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              {report.mode.replace("_", " ")} Report
            </span>
            <span className="text-xs text-slate-500">
              • Created {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">{report.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Confidence Badge */}
          <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                Confidence Score
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {report.confidenceScore}% Verified
              </span>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={() => setShowExportModal(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-xl font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> Export & Citations
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/50 px-3 scrollbar-thin text-xs">
        {[
          { id: "analysis", label: "Synthesis & Analysis", icon: FileText },
          { id: "graph", label: "Evidence Graph", icon: Network, badge: report.evidenceGraph?.nodes?.length },
          { id: "review", label: "Scientific Review", icon: ShieldCheck, badge: `${report.confidenceScore}%` },
          { id: "evidence", label: "Claim Grounding Table", icon: Table, badge: report.evidenceTable?.length },
          { id: "timeline", label: "Research Timeline", icon: Clock, badge: report.timeline?.length },
          { id: "diagrams", label: "Mermaid Flowcharts", icon: Workflow, badge: report.mermaidDiagrams?.length },
          { id: "compare", label: "Paper Comparisons", icon: GitCompare, badge: report.paperComparisons?.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? "border-indigo-600 text-indigo-700 bg-white shadow-2xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/80 text-slate-700 font-mono font-medium">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="p-6 bg-white">
        {activeTab === "analysis" && (
          <div className="space-y-6">
            {/* Executive Summary Callout */}
            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Executive Research Synthesis
              </h3>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {report.executiveSummary}
              </p>
            </div>

            {/* Markdown Detailed Analysis */}
            <div className="prose prose-slate prose-xs max-w-none text-slate-700 leading-relaxed space-y-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report.detailedAnalysis}
              </ReactMarkdown>
            </div>

            {/* Limitations & Future Work Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-amber-700 mb-2">Research Limitations</h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {report.limitations?.map((lim, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-emerald-700 mb-2">Future Directions & Gaps</h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {report.futureWork?.map((fw, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{fw}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sources List */}
            {report.sources && report.sources.length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Retrieved Academic Sources ({report.sources.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {report.sources.map((paper) => (
                    <div
                      key={paper.id}
                      className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            {paper.source}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {paper.year}
                          </span>
                        </div>
                        <h5 className="text-xs font-semibold text-slate-900 line-clamp-2">
                          {paper.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1 truncate">
                          {paper.authors.join(", ")}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">
                          Citations: <strong className="text-slate-800">{paper.citationsCount}</strong>
                        </span>
                        {paper.url && (
                          <a
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                          >
                            View Paper <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "graph" && <EvidenceGraph data={report.evidenceGraph} />}

        {activeTab === "review" && <ScientificReviewCard review={report.scientificReview} />}

        {activeTab === "evidence" && <EvidenceTable rows={report.evidenceTable} />}

        {activeTab === "timeline" && <TimelineViewer timeline={report.timeline} />}

        {activeTab === "diagrams" && (
          <div className="space-y-4">
            {report.mermaidDiagrams && report.mermaidDiagrams.length > 0 ? (
              report.mermaidDiagrams.map((diag) => (
                <MermaidDiagram
                  key={diag.id || diag.title}
                  code={diag.code}
                  title={diag.title}
                  description={diag.description}
                />
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Workflow className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">No flowcharts generated for this query.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "compare" && <PaperComparison comparisons={report.paperComparisons || []} />}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <CitationsExportModal report={report} onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
};
