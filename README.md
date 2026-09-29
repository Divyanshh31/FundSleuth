# 📊 FundSleuth — AI Portfolio Intelligence & Mutual Fund X-Ray

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**FundSleuth** is a premium wealth management analytics platform designed to analyze mutual fund portfolios, uncover hidden stock-level overlap, detect toxic/loss-making underlying stock holdings, and eliminate 10-year distributor commission drag.

---

## ✨ Key Features

- **🔍 Portfolio Overlap Engine:** Graph-based node analytics (JGraphT) mapping mutual fund schemes to stock holdings to detect true diversification risk.
- **🏥 Portfolio Health Scorecard:** Automated 0–100 portfolio health rating algorithm penalizing overlap percentage, expense ratios, and toxic stock exposure.
- **⚠️ Sector Risk Concentration:** Alerts when any single sector exceeds 35% portfolio concentration.
- **🛡️ Stock Profitability & Health Inspector:** Categorizes underlying stock holdings into 🟢 Profitable & Growing, 🟡 Stagnant / High Valuation, or 🔴 Loss-Making / High Risk.
- **💰 5-Yr & 10-Yr Cost Drag Calculator:** Compounded interest math estimating returns lost to regular plan distributor commissions.
- **📋 Step-by-Step Restructuring Action Plan:** Generates prioritized optimization steps to save fees and exit toxic assets.
- **📄 CAS PDF & Screenshot Support:** Parses CAMS/KFintech PDFs and Groww/Zerodha Coin portfolio screenshots.
- **🎨 Premium White Gradient UI:** Vis.js interactive network graph, Chart.js visualizations, voice summary player, and one-click PDF report export.

---

## 🛠️ Tech Stack

- **Backend:** Java 21, Spring Boot 3.2.4, JGraphT (Graph Analytics), Apache PDFBox (PDF Text Extraction)
- **Frontend:** HTML5, Bootstrap 5.3, Custom CSS Design System, Chart.js, Vis.js Network, FontAwesome 6, Plus Jakarta Sans
- **Build System:** Apache Maven

---

## 🚀 Getting Started

### Prerequisites
- **JDK 17 or 21** installed
- **Apache Maven 3.8+** installed

### Run Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/FundSleuth.git
cd FundSleuth

# Build the project
mvn clean compile

# Start the Spring Boot Application
mvn spring-boot:run
```

Open your browser at **`http://localhost:8080`**.

---

## 📜 License
This project is licensed under the MIT License.
