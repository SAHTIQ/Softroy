# 🚀 Softroy Agent
### Multi-Agent Academic Research Assistant

<p align="center">

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)
![LangGraph](https://img.shields.io/badge/LangGraph-Orchestration-orange)
![NextJS](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Neo4j](https://img.shields.io/badge/Neo4j-Graph_DB-blue)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

# 📖 Project Overview

Softroy Agent is a production-ready Multi-Agent Academic Research Platform that automates scientific research using 20 specialized AI agents coordinated through LangGraph.

Unlike conventional AI assistants, Softroy Agent enables collaborative reasoning where each agent performs a dedicated research task—including literature search, evidence retrieval, citation verification, contradiction detection, hypothesis generation, scientific writing, and peer-review simulation.

The platform integrates Retrieval-Augmented Generation (RAG), Neo4j Knowledge Graphs, Crossref citation verification, and multiple academic databases to provide accurate, explainable, and evidence-backed research outputs while minimizing hallucinations.

---

# 🏗 System Architecture

<p align="center">

<img src="docs/images/system_architecture.png" width="100%">

</p>

---

# 🤖 Multi-Agent Architecture

<p align="center">

<img src="docs/images/agent_architecture.png" width="100%">

</p>

---

# 🔄 AI Pipeline

User Query
↓
Intent Analysis
↓
Planner Agent
↓
Task Distribution
↓
Academic Search
↓
Parallel Research Agents
↓
Vector Retrieval (BGE-M3)
↓
Knowledge Graph Reasoning
↓
Evidence Ranking
↓
Citation Verification
↓
Debate & Consensus
↓
Scientific Writing
↓
Final Report

---

# 🧠 RAG Pipeline

PDFs
Research Papers
Academic Databases
↓
Document Loader
↓
Chunking
↓
BGE-M3 Embeddings
↓
Qdrant / Chroma
↓
Retriever
↓
Context Builder
↓
LLM
↓
Answer Generation

---

# 🌐 Tech Stack

Backend
- FastAPI
- Python
- LangGraph
- LangChain
- Celery
- Redis

AI
- OpenRouter
- Gemini
- GPT-4.1
- Claude
- DeepSeek
- BGE-M3
- CrossEncoder

Database
- PostgreSQL
- Neo4j
- Qdrant
- Redis

Frontend
- Next.js
- React
- TailwindCSS
- TypeScript
- shadcn/ui
- Framer Motion

Infrastructure
- Docker
- GitHub Actions
- Nginx
- Prometheus
- Grafana

---

# 📂 Project Structure

backend/
frontend/
agents/
memory/
rag/
knowledge_graph/
database/
docker/
docs/
tests/

---

# 📸 Screenshots

Dashboard

docs/images/dashboard.png

Research Workspace

docs/images/workspace.png

Agent Monitor

docs/images/agents.png

Knowledge Graph

docs/images/knowledge_graph.png

---

# 🚀 Features

✅ 20 Specialized AI Agents

✅ Multi-Agent Collaboration

✅ LangGraph Orchestration

✅ Hybrid RAG

✅ Knowledge Graph Reasoning

✅ Academic Search

✅ Citation Verification

✅ Hallucination Detection

✅ Consensus-based Decision Making

✅ Scientific Report Generation

✅ Plugin Architecture

✅ Real-Time Monitoring

---

# 📜 License

MIT License
