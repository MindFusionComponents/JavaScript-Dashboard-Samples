# JavaScript Dashboard Samples — MindFusion JsPack

[![MindFusion JsPack](https://img.shields.io/badge/MindFusion-JsPack-blue.svg)](https://mindfusion.dev/javascript-pack.html)
[![JavaScript](https://img.shields.io/badge/Language-Pure%20JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MindFusion%20Trial%20%2F%20Commercial-brightgreen.svg)](https://mindfusion.eu/buy-javascript-pack.html)

A curated collection of modern, high-performance web dashboard samples built with pure client-side JavaScript using the **[MindFusion JavaScript Pack (JsPack)](https://mindfusion.eu/javascript-pack.html)**.

This repository demonstrates how to integrate **virtualized data grids**, **interactive data charts**, **executive KPI gauges**, and **diagramming controls** into unified, real-time analytics consoles. All samples run entirely in the browser with **zero backend dependencies**, rendering datasets of 10,000+ rows smoothly at 60fps.


![MindFusion Dashboard](https://mindfusion.dev/samples/javascript/dashboard_javascript.jpeg)

---

## 📊 Dashboard Samples Catalog

| Sample | Category | Key Components | Highlights |
| :--- | :--- | :--- | :--- |
| **[Operations Dashboard](#1-operations--inventory-dashboard)** | Supply Chain / Inventory | DataViews (Grid), Charting (BarChart), Gauges (OvalGauge) | 10,000 live rows, multi-column sorting, inplace editing, category valuation chart, live fulfillment gauge 

---

## 🌟 Featured Sample: Operations Dashboard

The **Operations Dashboard** (`OperationsDashboard.html`) demonstrates an executive command center for inventory management, warehouse stock levels, and order fulfillment tracking.

```
+--------------------------------------------------------------------------------+
|  SEARCH & FILTER TOOLBAR                                                       |
|  [Search product...]  [Category: All v]  [Stock: All v]  | 10k Items | $2.5M Val|
+--------------------------------------------------------------------------------+
|                                                                                |
|  MINDFUSION.DATAVIEWS (GRID) — 10,000 ROWS                                     |
|  #   Product Name        Category     Price     Stock    Rating   Restocked    |
|  ----------------------------------------------------------------------------  |
|  1   Garden Hose 503     Office       $336.52   87       3.1      04/17/2026   |
|  2   Desk Lamp 891       Electronics  $124.10   240      4.8      08/12/2026   |
|  ... (Virtual scrolling renders only visible viewport rows at 60fps)           |
|                                                                                |
+----------------------------------------------------+---------------------------+
|  MINDFUSION.CHARTING (BAR CHART)                   |  MINDFUSION.GAUGES        |
|  Inventory Stock & Valuation by Category           |  Fulfillment Health (KPI) |
|  [ Stock Units ]  [ Valuation ($) ]                |                           |
|                                                    |         /---\             |
|   |==|   |==|   |==|   |==|   |==|                 |       (  /85%\ )          |
|  Elect.  Home  Garden  Sports Office               |        \-------/          |
|  (Click a bar to filter grid to that category)     |  Fulfillment | Avg Stock  |
+----------------------------------------------------+---------------------------+
```

### Core Features
* **High-Volume Virtualized Grid**: Handles 10,000 generated records with DOM virtualization, keeping memory usage minimal and rendering lightning-fast.
* **Multi-Column Sorting & Filtering**: Instant search across text, numeric, and date fields using non-destructive functional predicates.
* **Inline Inplace Editing**: Full inline editing across data types (text inputs, dropdown menus, and datepickers).
* **Dual-Metric Bar Chart**: Instant toggle between physical inventory units and dollar valuations, with automatic headroom for labels and click-to-filter interaction.
* **Operational KPI Dial**: Oval gauge with color-coded operational zones (Critical, Warning, Optimal) tracking real-time fulfillment capacity.
* **Bi-Directional Reactivity**: Edits, row selections, or filter adjustments automatically propagate across the grid, chart, and gauge simultaneously.

---

## 🛠️ Reusable Architecture Patterns

All dashboard samples in this repository follow shared architectural principles:

### 1. Zero Backend Requirement
Data can be generated on the fly (e.g., using lightweight PRNG algorithms like `mulberry32`) or loaded from client-side JSON files. No database or server setup is required to run the samples.

### 2. DOM Virtualization for Large Datasets
Data grids built with **MindFusion.DataViews** render only visible rows inside the viewport. Whether displaying 500 rows or 50,000 rows, scrolling remains responsive and fluid.

### 3. Responsive, Non-Clipping Layouts
Dashboards use full-viewport flex column architectures (`display: flex; flex-direction: column; height: 100%;`) combined with dynamic canvas buffer synchronization (`handleResize()`, `clientWidth`/`clientHeight`), ensuring charts and gauges adapt to any screen resolution or aspect ratio without clipping.

### 4. Cross-Component Event Bus
Every component communicates through standard event dispatchers:
* `grid.rowSelected` &rarr; Highlights related data points on charts and gauges.
* `grid.rowUpdated` &rarr; Recalculates aggregate metrics and refreshes visualizations in real time.
* `chart.dataItemClicked` &rarr; Filters or drills down into grid records.

---

## 🏁 Quick Start & Running Locally

Because these dashboard samples are **100% pure client-side JavaScript**, no Node.js build process, npm installs, or backend runtimes are required.

### Option 1: VS Code Live Server
1. Clone the repository:
   ```bash
   git clone https://github.com/MindFusion/JavaScript-Dashboard-Samples.git
   cd JavaScript-Dashboard-Samples
   ```
2. Open the project folder in **VS Code**.
3. Right-click any dashboard HTML file (e.g., `OperationsDashboard.html`) and double-click the HTML file.

### Option 2: Any Static Web Server
```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```
Open `http://localhost:8080/OperationsDashboard.html` in your browser.

---

## 🧩 About MindFusion JsPack

**[MindFusion JavaScript Pack](https://mindfusion.eu/javascript-pack.html)** provides enterprise-grade UI components for complex data visualization and interaction:

* **[DataViews for JavaScript](https://mindfusion.dev/javascript-grid.html)**: High-speed virtualized data grids with sorting, filtering, editing, and grouping.
* **[Charting for JavaScript](https://mindfusion.dev/javascript-chart.html)**: Interactive bar, line, pie, radar, financial, area, and 3D charts.
* **[Gauges for JavaScript](https://mindfusion.dev/javascript-chart.html)**: Customizable circular, oval, and linear gauges with multi-scale dials and animated needles.
* **[Diagramming for JavaScript](https://mindfusion.dev/javascript-diagram.html)**: Flowcharts, network diagrams, process trees, and schematic layouts.
* **[Scheduling for JavaScript](https://mindfusion.dev/javascript-scheduler.html)**: Interactive appointment calendars, resource planners, and timetables.
* **[Mapping for JavaScript](https://mindfusion.dev/javascript-map.html)**: Geographic map controls with shapefile and tile layer support.
* **[Virtual Keyboard for JavaScript](https://mindfusion.dev/javascript-keyboard.html)**: On-screen touch and virtual keyboards for web applications.

---

## 🔗 Links & Resources

* 🌐 **MindFusion Website**: [mindfusion.dev](https://mindfusion.dev)
* 📦 **Download Free Trial**: [MindFusion JsPack Download](https://mindfusion.dev/javascript-pack.html)
* 📖 **Documentation**: [JsPack Online Help & Guides](https://mindfusion.dev/docs/javascript/pack/Introduction_19.htm)
* 💬 **Support Forum**: [Community Discussion Forum](https://mindfusion.dev/Forum/YaBB.pl)
* 📧 **Contact Support**: [support@mindfusion.eu](mailto:support@mindfusion.eu)

---

## 📄 License
These dashboard samples are provided under the [MindFusion End User License Agreement](https://mindfusion.dev/eula.html). Free trial and evaluation versions of all MindFusion components are available for download.
