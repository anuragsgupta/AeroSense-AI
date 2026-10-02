# AeroSense AI

> **Explainable Anomaly Intelligence for Automatic Weather Stations**

A high-fidelity, demo-ready prototype built for **Smart India Hackathon 2026**
Problem Statement **SIH26073** — AI/ML-Based Intelligent Anomaly Detection for Automatic Weather Stations (AWS)

**Domain:** Disaster Management / Meteorological Observation Quality
**Ministry:** Ministry of Earth Sciences (MoES)

---

> ⚠️ **This is a prototype / demonstration UI.**
> All displayed ML predictions, confidence scores, anomaly classifications, station counts and sensor readings are **SIMULATED DEMO DATA** for presentation purposes.
> No fabricated accuracy claims (e.g. "95% accuracy achieved") are made anywhere in this project.

---

## Problem Statement

Automatic Weather Stations (AWS) across India continuously transmit temperature, pressure, and humidity observations. However, sensor faults — spikes, frozen readings, drift — can corrupt data and trigger false alerts, undermining the reliability of meteorological intelligence used for disaster management.

A key challenge is distinguishing:

- **Sensor fault** → data should be flagged and rejected
- **Genuine weather extreme** → data should be retained and escalated for expert review

Threshold-only detection systems cannot make this distinction, leading to high false-positive rates and alert fatigue.

---

## Solution — AeroSense AI

AeroSense AI is a **hybrid, explainable anomaly-detection platform** that combines multiple detection mechanisms and provides human-readable reasoning for every flag.

### Core Workflow

```
OBSERVE → DETECT → DISTINGUISH → EXPLAIN → ALERT → REVIEW
```

### Detection Architecture

| Layer | Method | Purpose |
|---|---|---|
| Statistical | **Isolation Forest** | Point / statistical anomaly detection |
| Temporal | **LSTM Autoencoder** | Sequence / temporal anomaly detection |
| Physical | **Domain Rules** | Atmospheric consistency, rate-of-change, persistence checks |
| Contextual | **Station Baseline** | Station-specific learned normal behaviour (local + seasonal) |
| Fusion | **Anomaly Fusion** | Weighted multi-evidence combination |

### Anomaly Classifications

- `Normal`
- `Probable Sensor Spike`
- `Probable Frozen / Stuck Sensor`
- `Probable Sensor Drift`
- `Probable Sensor Malfunction`
- `Probable Genuine Weather Extreme` ← *critical innovation — not all anomalies are faults*

### Explainability

Every flagged observation includes:
- Feature-level evidence contributions (SHAP-style)
- Rule-based evidence summary
- Human-readable explanation
- Detection engine agreement scores

### Human-in-the-Loop

Operators retain full decision authority:
- **Confirm Sensor Fault**
- **Mark as Genuine Weather Event**
- **Escalate for Investigation**

All decisions are timestamped and stored in an audit trail.

---

## Demo Scenarios

The prototype includes four interactive demo scenarios that update the entire dashboard dynamically:

| Scenario | Pattern | Classification |
|---|---|---|
| **A — Sensor Spike** | 32°C → 47°C → 32°C (1 min) | Probable Sensor Spike |
| **B — Frozen Sensor** | 27.4°C × 30 min (zero variance) | Probable Frozen Sensor |
| **C — Sensor Drift** | +0.35°C / 20 min over 2 hours | Probable Sensor Drift |
| **D — Genuine Heatwave** | 32°C → 42°C, coherent P + RH | Probable Genuine Weather Extreme |

Scenario D is the **key innovation demonstration** — showing that an extreme temperature observation with coherent atmospheric context is identified as a probable genuine event rather than a sensor fault.

---

## Application Screens

| Screen | Description |
|---|---|
| **Command Center** | National overview, KPI cards, India station map, live anomaly table |
| **Station Monitoring** | Filterable station list with live sensor readings |
| **Station Detail** | Time-series chart with anomaly highlighting, detection evidence |
| **Anomaly Investigation** | ⭐ Core screen — fusion gauge, evidence, HITL review |
| **Anomaly History** | Historical analytics, trend charts, operator decision log |
| **Detection Engine** | Hybrid pipeline detail with per-engine scores |
| **System Architecture** | Full processing pipeline diagram, technology stack |

---

## Technology Stack

### Frontend (This Prototype)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Recharts** — time-series and bar charts
- **Lucide React** — icons
- **Vite** — build tooling
- Mock data layer (no backend required for demo)

### Planned Production Stack
- **Python 3.11** · Pandas · NumPy
- **scikit-learn** — Isolation Forest
- **PyTorch** — LSTM Autoencoder
- **SHAP** — Explainability
- **FastAPI** — API gateway
- **PostgreSQL / TimescaleDB** — time-series storage
- **Redis** — caching
- **Docker** — containerisation
- **MQTT / REST** — AWS data ingestion

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/anuragsgupta/AeroSense-AI.git
cd AeroSense-AI
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── types.ts                    # Shared TypeScript types
├── data/
│   └── mockData.ts             # Simulated demo data layer
├── components/
│   ├── Sidebar.tsx             # Collapsible navigation sidebar
│   ├── TopBar.tsx              # Header with live clock and status
│   ├── Toast.tsx               # Notification toasts
│   ├── UIElements.tsx          # Shared badges, gauges, progress bars
│   ├── IndiaMap.tsx            # SVG India station map
│   └── ScenarioSwitcher.tsx    # Demo scenario selector
└── pages/
    ├── CommandCenter.tsx        # Dashboard overview
    ├── StationMonitoring.tsx    # Station list and filters
    ├── StationDetail.tsx        # Per-station time-series view
    ├── AnomalyInvestigation.tsx # Core investigation screen
    ├── AnomalyHistory.tsx       # Historical records
    ├── DetectionInsights.tsx    # Model & engine insights
    └── SystemArchitecture.tsx   # Architecture diagram
```

---

## Data Disclaimer

All values displayed in this application — including station counts, sensor readings, anomaly scores, confidence percentages, model evidence values, and operator decisions — are **simulated demo data** created for prototype demonstration purposes.

The following are **real, source-based concepts** implemented in the prototype design:
- AWS observation monitoring (Temperature, Pressure, Relative Humidity)
- Isolation Forest algorithm (scikit-learn)
- LSTM Autoencoder architecture
- Domain-informed atmospheric consistency rules
- Station-specific baseline modelling
- SHAP-based explainability
- Human-in-the-loop review workflows

**Pilot target** (not a measured result): ≥30% false-positive reduction versus threshold-only detection — subject to validation during pilot deployment.

---

## Team

Built for **Smart India Hackathon 2026**
Problem: **SIH26073**

---

## License

This project is developed for the Smart India Hackathon 2026 competition.
