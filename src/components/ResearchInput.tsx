import React, { useState, useRef } from "react";
import { ResearchMode, UploadedDocInfo } from "../types";
import { Search, Sparkles, Upload, FileText, X, ArrowRight, BookOpen, Layers, GitCompare, MessageSquare } from "lucide-react";

interface ResearchInputProps {
  onSearch: (query: string, mode: ResearchMode, files: UploadedDocInfo[]) => void;
  isExecuting: boolean;
  onFileUpload: (file: File) => Promise<UploadedDocInfo | null>;
}

export const ResearchInput: React.FC<ResearchInputProps> = ({
  onSearch,
  isExecuting,
  onFileUpload,
}) => {
  const [query, setQuery] = useState<string>("");
  const [mode, setMode] = useState<ResearchMode>("deep_research");
  const [attachedFiles, setAttachedFiles] = useState<UploadedDocInfo[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!query.trim() && attachedFiles.length === 0) || isExecuting) return;
    onSearch(query.trim() || `Analyze uploaded documents: ${attachedFiles.map(f => f.name).join(", ")}`, mode, attachedFiles);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadedDoc = await onFileUpload(file);
      if (uploadedDoc) {
        setAttachedFiles((prev) => [...prev, uploadedDoc]);
      }
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const examplePrompts = [
    { title: "Deep Research on Quantum Error Correction in Surface Codes", mode: "deep_research" as const },
    { title: "Compare Transformer vs Mamba State Space Models Architecture", mode: "compare_papers" as const },
    { title: "Analyze novelty of Graph Neural Networks for Drug Discovery", mode: "document_analysis" as const },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Mode Selector Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {[
            { id: "deep_research", label: "Deep Research", icon: Sparkles },
            { id: "chat", label: "Academic Chat", icon: MessageSquare },
            { id: "document_analysis", label: "Document Analysis", icon: FileText },
            { id: "compare_papers", label: "Compare Papers", icon: GitCompare },
          ].map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id as ResearchMode)}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm font-semibold"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-slate-500 font-medium">
          Layer 1 Intent: <strong className="text-indigo-600 capitalize">{mode.replace("_", " ")}</strong>
        </span>
      </div>

      {/* Primary Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === "deep_research"
                ? "Enter research question, topic, or hypothesis (e.g. 'Synthesize 2024-2026 breakthroughs in LLM reasoning & test-time compute')..."
                : mode === "compare_papers"
                ? "Enter paper titles or topics to compare (e.g. 'Compare Transformer vs Mamba vs Hyena architectures')..."
                : mode === "document_analysis"
                ? "Upload paper (PDF/DOCX) or describe document analysis goal..."
                : "Ask SoftRoy AI anything about academic papers, proofs, datasets, or code..."
            }
            className="w-full bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-none transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {/* Upload Button Trigger */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.pptx"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Upload PDF, DOCX, PPTX, or Images"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline text-[11px] font-medium">Attach Docs</span>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={(!query.trim() && attachedFiles.length === 0) || isExecuting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              {isExecuting ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  Run SoftRoy AI
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Attached Files List */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500 font-medium">Attached Documents:</span>
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg text-xs"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="text-slate-400 hover:text-slate-700 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </form>

      {/* Example Prompts */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-slate-400 font-medium">Try Research Example:</span>
        {examplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(p.title);
              setMode(p.mode);
            }}
            className="text-[11px] text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors font-medium"
          >
            "{p.title.slice(0, 45)}..."
          </button>
        ))}
      </div>
    </div>
  );
};
