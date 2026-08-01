import React, { useState } from "react";
import { EvidenceTableRow } from "../types";
import { Table, Search, CheckCircle, AlertTriangle, XCircle, Download, FileText } from "lucide-react";

interface EvidenceTableProps {
  rows: EvidenceTableRow[];
}

export const EvidenceTable: React.FC<EvidenceTableProps> = ({ rows }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRows = (rows || []).filter((row) => {
    const matchesSearch =
      row.claim.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.sourcePaper.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.evidenceText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || row.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle className="w-3 h-3" /> Verified
          </span>
        );
      case "Uncertain":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <AlertTriangle className="w-3 h-3" /> Uncertain
          </span>
        );
      case "Contradicted":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
            <XCircle className="w-3 h-3" /> Contradicted
          </span>
        );
      default:
        return null;
    }
  };

  const exportCSV = () => {
    const headers = ["Claim", "Source Paper", "Evidence Snippet", "Grounding Score", "Status"];
    const csvRows = [
      headers.join(","),
      ...filteredRows.map((r) =>
        [
          `"${r.claim.replace(/"/g, '""')}"`,
          `"${r.sourcePaper.replace(/"/g, '""')}"`,
          `"${r.evidenceText.replace(/"/g, '""')}"`,
          r.groundingScore,
          r.status,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `softroy_evidence_table_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header controls */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Layer 8 Claim Grounding & Evidence Table
            </h3>
            <p className="text-xs text-slate-500">
              Verified claims extracted from peer-reviewed literature with exact quote citations
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter claims or sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 text-xs text-slate-900 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-48 sm:w-56"
            />
          </div>

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 text-xs text-slate-800 px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="uncertain">Uncertain</option>
            <option value="contradicted">Contradicted</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-colors border border-slate-200 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" /> Export CSV
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px] font-bold">
            <tr>
              <th className="py-3 px-4 w-1/4">Scientific Claim</th>
              <th className="py-3 px-4 w-1/5">Source Paper</th>
              <th className="py-3 px-4 w-1/3">Supporting Evidence Snippet</th>
              <th className="py-3 px-4 text-center">Score</th>
              <th className="py-3 px-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredRows.length > 0 ? (
              filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{row.claim}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 font-medium">{row.sourcePaper}</td>
                  <td className="py-3.5 px-4 text-slate-700 italic font-mono text-[11px] bg-slate-50 rounded p-2 border border-slate-200">
                    "{row.evidenceText}"
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">
                      {row.groundingScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">{getStatusBadge(row.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 italic">
                  No evidence claims matching filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
