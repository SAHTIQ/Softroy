import React from "react";
import { PaperComparisonRow } from "../types";
import { GitCompare, Trophy, CheckCircle, HelpCircle } from "lucide-react";

interface PaperComparisonProps {
  comparisons: PaperComparisonRow[];
}

export const PaperComparison: React.FC<PaperComparisonProps> = ({ comparisons }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-4 p-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Layer 10 Multi-Paper Comparative Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Side-by-side methodological, dataset, and performance trade-off analysis
            </p>
          </div>
        </div>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200 font-medium">
          {comparisons?.length || 0} Evaluated Dimensions
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px] font-bold">
            <tr>
              <th className="py-3 px-4 w-1/5">Comparison Feature</th>
              <th className="py-3 px-4 w-1/4 text-indigo-600">Approach / Paper A</th>
              <th className="py-3 px-4 w-1/4 text-emerald-700">Approach / Paper B</th>
              <th className="py-3 px-4">Comparative Synthesis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {comparisons && comparisons.length > 0 ? (
              comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                      {row.feature}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50/50 font-mono text-[11px] text-slate-800 border-r border-slate-200">
                    {row.paperA}
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50/50 font-mono text-[11px] text-slate-800 border-r border-slate-200">
                    {row.paperB}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 leading-relaxed font-medium">
                    <p className="mb-1">{row.analysis}</p>
                    {row.winner && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Trophy className="w-3 h-3 text-amber-600" /> Edge: {row.winner}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400 italic">
                  No direct paper comparison matrix available for this query. Select "Compare Papers" mode to compare specific publications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
