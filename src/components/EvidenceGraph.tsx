import React, { useState } from "react";
import { EvidenceGraphData, EvidenceNode } from "../types";
import { Network, FileText, CheckCircle2, AlertTriangle, Database, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface EvidenceGraphProps {
  data: EvidenceGraphData;
}

export const EvidenceGraph: React.FC<EvidenceGraphProps> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<EvidenceNode | null>(
    data?.nodes?.[0] || null
  );
  const [filterType, setFilterType] = useState<string>("all");

  const getNodeColor = (type: string) => {
    switch (type) {
      case "paper":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "claim":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "methodology":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "result":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "dataset":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "gap":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "paper":
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case "claim":
        return <CheckCircle2 className="w-4 h-4 text-purple-600" />;
      case "methodology":
        return <Network className="w-4 h-4 text-emerald-600" />;
      case "result":
        return <ShieldCheck className="w-4 h-4 text-amber-600" />;
      case "dataset":
        return <Database className="w-4 h-4 text-cyan-600" />;
      case "gap":
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const filteredNodes = data?.nodes
    ? filterType === "all"
      ? data.nodes
      : data.nodes.filter((n) => n.type === filterType)
    : [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Top Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-slate-900 text-sm">
            Interactive Knowledge & Evidence Graph
          </h3>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200 font-medium">
            {data?.nodes?.length || 0} Nodes • {data?.edges?.length || 0} Edges
          </span>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {["all", "paper", "claim", "methodology", "result", "dataset", "gap"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                filterType === type
                  ? "bg-indigo-600 text-white shadow-2xs font-semibold"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[420px]">
        {/* Interactive Node Matrix Canvas Visualizer */}
        <div className="lg:col-span-2 p-6 bg-slate-50/50 flex flex-col justify-between relative border-r border-slate-200">
          <div className="text-xs text-slate-500 mb-4 flex items-center justify-between font-medium">
            <span>Select a node to inspect its scientific grounding & cross-paper citations</span>
            <span className="text-slate-400">Layer 7: Evidence Graph Engine</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const nodeColorClass = getNodeColor(node.type);

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 relative group ${nodeColorClass} ${
                    isSelected
                      ? "ring-2 ring-indigo-600 shadow-md scale-[1.02] bg-white"
                      : "bg-white hover:bg-slate-50/80 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 shrink-0">
                    {getNodeIcon(node.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {node.label}
                      </span>
                      {node.qualityScore && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {node.qualityScore}%
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                      {node.details || "Academic entity node extracted by Layer 7 Evidence Graph Builder."}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-500 capitalize font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                      <span>Type: {node.type}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Relationship Edge Legend */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span className="text-slate-400 font-medium">Relationships:</span>
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <span className="w-2 h-0.5 bg-emerald-500"></span> Supports
            </span>
            <span className="inline-flex items-center gap-1 text-rose-700">
              <span className="w-2 h-0.5 bg-rose-500"></span> Contradicts
            </span>
            <span className="inline-flex items-center gap-1 text-indigo-700">
              <span className="w-2 h-0.5 bg-indigo-500"></span> Extends
            </span>
            <span className="inline-flex items-center gap-1 text-amber-700">
              <span className="w-2 h-0.5 bg-amber-500"></span> Identifies Gap
            </span>
          </div>
        </div>

        {/* Selected Node Details Inspector */}
        <div className="p-5 bg-white flex flex-col justify-between">
          {selectedNode ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-slate-100">
                  {getNodeIcon(selectedNode.type)}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    {selectedNode.type} Node Details
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {selectedNode.label}
                  </h4>
                </div>
              </div>

              <div className="space-y-3 my-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">
                    Description & Synthesis
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedNode.details || "No extended details available for this evidence node."}
                  </p>
                </div>

                {selectedNode.qualityScore && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Quality Score</span>
                      <span className="text-emerald-700 font-bold">{selectedNode.qualityScore}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${selectedNode.qualityScore}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Connected Edges */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-600 font-semibold block mb-2">
                    Connected Relationships ({data?.edges?.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id).length || 0})
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {data?.edges
                      ?.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                      .map((edge, idx) => {
                        const targetNode = data.nodes.find(
                          (n) => n.id === (edge.source === selectedNode.id ? edge.target : edge.source)
                        );
                        return (
                          <div
                            key={idx}
                            className="text-[11px] bg-white p-2 rounded border border-slate-200 flex items-center justify-between shadow-2xs"
                          >
                            <span className="text-slate-800 font-medium truncate max-w-[140px]">
                              {targetNode?.label || edge.target}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium capitalize">
                              {edge.relationship.replace("_", " ")}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 my-auto">
              <Network className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">Click any node on the left to inspect its scientific details.</p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>SoftRoy AI Evidence Graph</span>
            <span className="text-indigo-600 font-semibold">Layer 7</span>
          </div>
        </div>
      </div>
    </div>
  );
};
