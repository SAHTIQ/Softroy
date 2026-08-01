import React, { useState } from "react";
import { LayerStep } from "../types";
import { Cpu, CheckCircle2, Loader2, Layers, ChevronDown, ChevronUp, Sparkles, Activity, Search, ShieldCheck, Database, FileText } from "lucide-react";

interface AgentPipelineVisualizerProps {
  currentLayer: number;
  isExecuting: boolean;
  steps?: LayerStep[];
}

export const ARCHITECTURE_LAYERS = [
  { id: 1, name: "LAYER 1 — REQUEST UNDERSTANDING", agents: "Intent Detection • Query Optimization • Complexity Estimator • Research Director" },
  { id: 2, name: "LAYER 2 — MEMORY & CACHE", agents: "Session Manager • Project Memory • Answer & Embedding Caches • Bookmark Manager" },
  { id: 3, name: "LAYER 3 — PLANNING", agents: "Research Planning Agent • Dynamic Research Planner • Dependency Scheduler" },
  { id: 4, name: "LAYER 4 — SOURCE ROUTER", agents: "Paper Agent (arXiv, OpenAlex, CrossRef, PubMed) • GitHub Agent • Dataset Agent" },
  { id: 5, name: "LAYER 5 — DOCUMENT PIPELINE", agents: "Document Ingestion • OCR Agent • Section Detector • Vision Agent • Novelty Detector" },
  { id: 6, name: "LAYER 6 — RETRIEVAL FILTERING", agents: "Duplicate Removal • Reliability Scorer • Quality Reranker • Adaptive Retrieval" },
  { id: 7, name: "LAYER 7 — KNOWLEDGE BUILDING", agents: "Evidence Compression • Evidence Graph Builder • Timeline Builder • Gap Detector" },
  { id: 8, name: "LAYER 8 — SCIENTIFIC REVIEW", agents: "Methodology Review • Statistical Review • Claim Grounding • Fact Verification" },
  { id: 9, name: "LAYER 9 — REASONING", agents: "Scientific Reasoning Agent • Self-Reflection Agent • Verification Loop" },
  { id: 10, name: "LAYER 10 — REPORT GENERATION", agents: "Executive Summary • Detailed Analysis • Mermaid Diagram Agent • Citation Generator" },
  { id: 11, name: "LAYER 11 — OUTPUT WORKBENCH", agents: "Interactive Chat • Evidence Graph • Timeline • Scientific Dials • BibTeX Exports" },
];

export const AgentPipelineVisualizer: React.FC<AgentPipelineVisualizerProps> = ({
  currentLayer,
  isExecuting,
  steps,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs my-3 transition-all">
      {/* Top Banner */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 bg-slate-50/80 hover:bg-slate-100 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                SoftRoy AI 11-Layer Architecture Execution Engine
              </span>
              {isExecuting && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-semibold">
                  <Loader2 className="w-3 h-3 animate-spin" /> Active Pipeline Layer {currentLayer}/11
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Click to {isExpanded ? "collapse" : "view full multi-agent layer breakdown"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress Bar Mini */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[10px] text-slate-500 font-mono">
              {Math.round((currentLayer / 11) * 100)}%
            </span>
            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentLayer / 11) * 100}%` }}
              ></div>
            </div>
          </div>

          <button className="p-1 text-slate-400 hover:text-slate-700">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Layer Step Stepper horizontally */}
      <div className="px-3 py-2 bg-white overflow-x-auto flex items-center gap-1 text-[10px] scrollbar-thin">
        {ARCHITECTURE_LAYERS.map((layer) => {
          const isDone = currentLayer > layer.id;
          const isActive = currentLayer === layer.id && isExecuting;

          return (
            <div
              key={layer.id}
              className={`shrink-0 px-2 py-1 rounded-md border flex items-center gap-1 transition-all ${
                isDone
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
                  : isActive
                  ? "bg-indigo-50 text-indigo-700 border-indigo-300 font-bold animate-pulse"
                  : "bg-slate-50 text-slate-400 border-slate-200"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ) : isActive ? (
                <Loader2 className="w-3 h-3 text-indigo-600 animate-spin" />
              ) : (
                <span className="w-3 h-3 rounded-full bg-slate-200 text-center text-[9px] leading-3 font-mono text-slate-600">
                  {layer.id}
                </span>
              )}
              <span>L{layer.id}</span>
            </div>
          );
        })}
      </div>

      {/* Full Expanded Architecture Breakdown */}
      {isExpanded && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Multi-Agent 11-Layer Architecture Specifications
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {ARCHITECTURE_LAYERS.map((layer) => {
              const isDone = currentLayer > layer.id;
              const isActive = currentLayer === layer.id;

              return (
                <div
                  key={layer.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isDone
                      ? "bg-white border-emerald-200 text-slate-800 shadow-2xs"
                      : isActive
                      ? "bg-indigo-50/80 border-indigo-300 text-slate-900 shadow-2xs"
                      : "bg-white/60 border-slate-200 text-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[11px] text-indigo-600">
                      {layer.name}
                    </span>
                    {isDone ? (
                      <span className="text-[10px] text-emerald-600 font-medium">Completed</span>
                    ) : isActive ? (
                      <span className="text-[10px] text-indigo-600 font-medium animate-pulse">Running</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Standby</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{layer.agents}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
