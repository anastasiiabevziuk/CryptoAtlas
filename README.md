# CryptoAtlas Analytics Dashboard

CryptoAtlas is a real-time cryptocurrency market analytics dashboard designed to provide comprehensive insights into market trends, global regulatory landscapes, and investor sentiment.

## 🚀 Key Features

* **Global Crypto Regulatory Landscape:** An interactive map visualizing the legal status of cryptocurrencies across different countries.
* **Top Assets by Market Cap:** A comparative view of leading cryptocurrencies based on their total market capitalization.
* **Fear & Greed Index:** A real-time sentiment gauge to track investor psychology.
* **Bitcoin Transaction Volume:** A high-performance interactive volume chart built with D3.js, featuring a brush tool for custom time-range selection.
* **Crypto Market Ecosystem Network:** An interactive graph tracking liquidity flows and regulatory pressure (SEC, CFTC, MiCA) across key cryptocurrency assets, featuring real-time node search and filter controls.

## 🛠 Tech Stack

* **Framework:** Next.js (React)
* **Visualization:** D3.js for custom SVG-based charting
* **Styling:** CSS Modules for component-level encapsulation
* **Data Layer:** CoinGecko API integration
* **Language:** TypeScript for robust type safety
* **Graph Visualization:** `react-force-graph-2d` for interactive force-directed network rendering.

## 📂 Architecture

* **Modular Charts:** Rendering logic is decoupled from UI components for better maintainability.
* **Centralized Config:** A shared configuration file manages dimensions, margins, and color palettes, ensuring visual consistency across all charts.
* **Responsive Design:** Utilizes CSS Grid and Flexbox for fluid layouts across various screen sizes.

## ⚙️ Core Implementation Highlights

* **D3.js Synchronization:** Precise alignment between the main volume chart and the brush tool by synchronizing scale ranges and coordinate systems.
* **Custom Chart Containers:** A reusable UI wrapper component ensuring standardized padding, typography, and backdrop blur effects for all analytical modules.
* **Optimized Rendering:** Clean SVG implementation using `defs` for gradients and efficient DOM management during chart updates.

## 📦 Getting Started

1. Clone the repository:
   `git clone https://github.com/anastasiiabevziuk/CryptoAtlas.git`
2. Install dependencies:
   `npm install`
3. Run the development server:
   `npm run dev`
