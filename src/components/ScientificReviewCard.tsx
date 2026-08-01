import React from "react";
import { ScientificReview } from "../types";
import { ShieldCheck, AlertCircle, FileX, CheckCircle, BarChart3, HelpCircle } from "lucide-react";

interface ScientificReviewCardProps {
  review: ScientificReview;
}

export const ScientificReviewCard: React.FC<ScientificReviewCardProps> = ({ review }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-700 border-emerald-200 bg-emerald-50";
    if (score >= 75) return "text-indigo-700 border-indigo-200 bg-indigo-50";
    if (score >= 60) return "text-amber-700 border-amber-200 bg-amber-50";
    return "text-rose-700 border-rose-200 bg-rose-50";
  };

  const getGaugeColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 75) return "bg-indigo-600";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Layer 8 Scientific Review & Confidence Assessment
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated multi-agent verification across methodology, statistics, claim grounding, and fact consistency
            </p>
          </div>
        </div>

        {/* Overall Confidence Badge */}
        <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${getScoreColor(review.confidenceScore)}`}>
          <ShieldCheck className="w-4 h-4" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block -mb-0.5">Overall Confidence</span>
            <span className="text-sm font-bold">{review.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Dials & Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Methodology Score", value: review.methodologyScore, icon: BarChart3 },
          { label: "Statistical Validity", value: review.statisticalValidity, icon: CheckCircle },
          { label: "Claim Grounding", value: review.claimGroundingScore, icon: ShieldCheck },
          { label: "Fact Verification", value: review.factVerificationScore, icon: CheckCircle },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-600 font-medium">{item.label}</span>
              <item.icon className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-lg font-bold text-slate-900">{item.value}%</span>
              <span className="text-[10px] text-slate-400 font-medium">verifiable</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getGaugeColor(item.value)}`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          Review Director Synthesis
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">{review.summary}</p>
      </div>

      {/* Contradictions & Missing Evidence Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Missing Evidence */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-amber-700 mb-2.5 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            Missing Evidence & Unaddressed Gaps ({review.missingEvidence?.length || 0})
          </h4>
          {review.missingEvidence && review.missingEvidence.length > 0 ? (
            <ul className="space-y-2">
              {review.missingEvidence.map((gap, i) => (
                <li key={i} className="text-xs text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">No critical missing evidence flagged by Layer 8 review agents.</p>
          )}
        </div>

        {/* Contradictions */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-rose-700 mb-2.5 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            Literature Contradictions & Conflicts ({review.contradictions?.length || 0})
          </h4>
          {review.contradictions && review.contradictions.length > 0 ? (
            <ul className="space-y-2">
              {review.contradictions.map((item, i) => (
                <li key={i} className="text-xs text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">No direct literature contradictions detected in claims.</p>
          )}
        </div>
      </div>
    </div>
  );
};
