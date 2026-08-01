import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Code, Check, Copy, RefreshCw } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  themeVariables: {
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    primaryColor: "#4f46e5",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#4338ca",
    lineColor: "#64748b",
    secondaryColor: "#f1f5f9",
    tertiaryColor: "#f8fafc",
  },
});

interface MermaidDiagramProps {
  code: string;
  title?: string;
  description?: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  code,
  title,
  description,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      if (!code || !containerRef.current) return;
      try {
        setHasError(false);
        const id = `mermaid-${Math.random().toString(36).substring(7)}`;
        const { svg } = await mermaid.render(id, code);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setHasError(true);
        }
      }
    };

    renderDiagram();
    return () => {
      isMounted = false;
    };
  }, [code]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs my-4">
      {title && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            {description && (
              <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Code className="w-3.5 h-3.5 text-indigo-600" />
              {showCode ? "Visual" : "Code"}
            </button>
            <button
              onClick={copyCode}
              className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
              title="Copy Mermaid Code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="p-4 bg-slate-50/50 flex justify-center overflow-x-auto min-h-[180px] items-center">
        {showCode ? (
          <pre className="text-xs text-emerald-400 font-mono w-full bg-slate-900 p-4 rounded-lg overflow-x-auto">
            {code}
          </pre>
        ) : hasError ? (
          <div className="text-center py-6 text-slate-500">
            <RefreshCw className="w-6 h-6 mx-auto mb-2 text-amber-500 animate-spin" />
            <p className="text-xs text-slate-700">Rendering visual workflow fallback...</p>
            <pre className="text-[11px] text-slate-600 font-mono mt-2 bg-slate-100 p-2 rounded border border-slate-200">
              {code}
            </pre>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="mermaid-output w-full flex justify-center text-slate-800"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
    </div>
  );
};
