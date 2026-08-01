export type ResearchMode = 'chat' | 'deep_research' | 'document_analysis' | 'compare_papers';

export type LayerStatusType = 'idle' | 'running' | 'completed' | 'failed';

export interface LayerStep {
  layerId: number;
  layerName: string;
  agentName: string;
  status: LayerStatusType;
  detail?: string;
  timestamp?: string;
}

export interface AcademicPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue?: string;
  doi?: string;
  abstract: string;
  url?: string;
  pdfUrl?: string;
  source: 'arXiv' | 'OpenAlex' | 'CrossRef' | 'PubMed' | 'IEEE' | 'ACL' | 'GitHub' | 'Uploaded Document';
  citationsCount?: number;
  qualityScore?: number;
  reliabilityScore?: number;
  noveltyScore?: number;
}

export interface EvidenceNode {
  id: string;
  label: string;
  type: 'paper' | 'claim' | 'methodology' | 'result' | 'gap' | 'dataset';
  details?: string;
  qualityScore?: number;
}

export interface EvidenceEdge {
  source: string;
  target: string;
  relationship: 'supports' | 'contradicts' | 'extends' | 'uses_dataset' | 'cites' | 'identifies_gap';
  confidence: number;
}

export interface EvidenceGraphData {
  nodes: EvidenceNode[];
  edges: EvidenceEdge[];
}

export interface ResearchTimelineEvent {
  year: number;
  title: string;
  paperTitle: string;
  authors: string;
  significance: string;
  category: 'Milestone' | 'Methodology Breakthrough' | 'Dataset Release' | 'Paradigm Shift';
}

export interface ScientificReview {
  methodologyScore: number; // 0 - 100
  statisticalValidity: number; // 0 - 100
  claimGroundingScore: number; // 0 - 100
  factVerificationScore: number; // 0 - 100
  missingEvidence: string[];
  contradictions: string[];
  confidenceScore: number; // 0 - 100
  summary: string;
}

export interface EvidenceTableRow {
  claim: string;
  sourcePaper: string;
  evidenceText: string;
  groundingScore: number;
  status: 'Verified' | 'Uncertain' | 'Contradicted';
}

export interface PaperComparisonRow {
  feature: string;
  paperA: string;
  paperB: string;
  analysis: string;
  winner?: string;
}

export interface MermaidDiagramItem {
  id: string;
  title: string;
  code: string;
  description: string;
}

export interface CitationFormats {
  bibtex: string;
  apa: string;
  ieee: string;
}

export interface ResearchReport {
  id: string;
  title: string;
  query: string;
  mode: ResearchMode;
  createdAt: string;
  executiveSummary: string;
  detailedAnalysis: string;
  paperComparisons?: PaperComparisonRow[];
  evidenceTable: EvidenceTableRow[];
  timeline: ResearchTimelineEvent[];
  evidenceGraph: EvidenceGraphData;
  scientificReview: ScientificReview;
  limitations: string[];
  futureWork: string[];
  mermaidDiagrams: MermaidDiagramItem[];
  sources: AcademicPaper[];
  citations: CitationFormats;
  confidenceScore: number;
  noveltyAnalysis?: string;
  similarityAnalysis?: string;
}

export interface UploadedDocInfo {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'pptx' | 'image' | 'text';
  size: number;
  parsedText?: string;
  extractedMetadata?: {
    title?: string;
    authors?: string[];
    sectionsCount?: number;
    figuresCount?: number;
    qualityScore?: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  reports: ResearchReport[];
  bookmarks: string[];
  uploadedFiles: UploadedDocInfo[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  mode?: ResearchMode;
  pipelineProgress?: LayerStep[];
  layerActive?: number;
  report?: ResearchReport;
  filesAttached?: UploadedDocInfo[];
  isThinking?: boolean;
}
