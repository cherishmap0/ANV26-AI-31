# ⚡ EnergyWise: AI-Powered Energy Usage Prediction & Optimization
### ANVATION Hackathon 2026 Project Prototype

> **"Predict smarter. Optimize better."**

**EnergyWise** is an intelligent, modern, startup-ready mobile and web platform that transforms raw smart-meter data into predictive forecasts, autonomous load shifting, and human-in-the-loop optimization across **Homes, Colleges / Campuses, Offices, and Industries**.

---

## 🎯 Core Concept & Methodology

EnergyWise adheres strictly to the ANVATION Hackathon 2026 project methodology:

$$\text{Data} \longrightarrow \text{Forecast} \longrightarrow \text{Optimize} \longrightarrow \text{Recommend} \longrightarrow \text{Measure} \longrightarrow \text{Learn}$$

1. **Data**: Continuous ingestion of 15-minute smart meter readings, weather telemetry (temperature, humidity, solar irradiance), and occupancy patterns.
2. **Forecast**: Multi-variable machine learning forecasting using **XGBoost Regressors & Temporal Fusion Transformers** with 95% confidence interval envelopes.
3. **Optimize**: Intelligent load shifting of flexible heavy consumers (HVAC, EV chargers, water heaters, and washing machines) away from peak-demand windows.
4. **Recommend**: Explainable AI alerts detailing **Root Cause / Why**, **Expected Impact**, and **Cost & Carbon Savings** with 1-tap approval.
5. **Measure**: Side-by-side What-If simulations and real-time verification of peak demand shaving ($kW$) and shifted load ($kWh$).
6. **Learn**: Continuous retraining and edge adaptation without concept drift.

---

## 🎨 Design System & Visual Identity

- **Theme**: Clean, modern, startup light-colour theme (inspired by modern climate-tech SaaS).
- **Color Palette**:
  - **Light Blue / Sky**: `#0284c7`, `#0ea5e9`, `#e0f2fe` (Tech & prediction)
  - **Clean White**: `#ffffff`, `#f8fafc` (Background & glass surfaces)
  - **Soft Green**: `#10b981`, `#ecfdf5` (Clean energy & confirmed savings)
  - **Subtle Navy**: `#0f172a`, `#1e293b` (Typography & contrast)
  - **Subtle Accents**: Soft Amber (`#f59e0b`) & Soft Rose (`#f43f5e`) for peak warnings.
- **Glassmorphism & Cards**: Translucent frosted panels, rounded corners (`16px - 24px`), gentle drop shadows, and modern typography (`Outfit` + `JetBrains Mono`).
- **Illustrations**: Custom high-resolution vector startup graphics in [`assets/`](file:///c:/Users/Cheri/Downloads/Energy%20usage%20prediction%20and%20optimization/assets/):
  - [`assets/energywise_hero.jpg`](file:///c:/Users/Cheri/Downloads/Energy%20usage%20prediction%20and%20optimization/assets/energywise_hero.jpg) (Smart Home, EV & Solar Ecosystem)
  - [`assets/smart_campus_iot.jpg`](file:///c:/Users/Cheri/Downloads/Energy%20usage%20prediction%20and%20optimization/assets/smart_campus_iot.jpg) (Commercial Campus & Microgrid Substation)

---

## 🚀 Key Modules & Interactive Features

### 1. 🌟 Welcome & Authentication Screen
- EnergyWise logo, tagline, and startup product hero panel.
- **User Login** (`user@energywise.ai`) vs **Admin Login** (`admin@energywise.ai`).
- **1-Click Hackathon Demo Access Buttons**: Instantly enter as Resident User or System Admin with zero typing.

### 2. 🏠 User Dashboard
- **6 Real-Time Energy KPI Cards**:
  - Live Current Demand ($kW$) with simulated smart meter jitter.
  - Today's Cumulative Usage ($kWh$).
  - Estimated Energy Cost ($) with Time-of-Use pricing.
  - Peak Demand ($kW$) with exact timestamp.
  - Confirmed Energy Saved ($kWh$).
  - $\text{CO}_2$ Emissions Avoided ($kg$).
- **Environmental Telemetry Strip**:
  - Current Weather (Temperature, Condition, Humidity, HVAC thermal load impact).
  - Renewable Availability (Rooftop Solar $kW$ generation, self-consumption %, Grid clean index).
- **Mini Daily Trend Sparkline**.

### 3. 🔮 AI Energy Forecast
- Hourly consumption forecast for **Next 24 Hours** and **Next 48 Hours**.
- Interactive Chart.js line graph displaying:
  - Actual smart meter readings.
  - AI predicted load curve.
  - **95% Confidence Interval Uncertainty Envelope** (shaded upper and lower bands).
  - Peak-demand threshold alert indicators.
- **Transparent AI Model Card**:
  - Algorithm: XGBoost Regressor + Temporal Fusion Transformer ($R^2 = 0.958$, $\text{MAPE} = 3.8\%$).
  - Feature weights breakdown: Lagged smart meter data ($38\%$), Weather ($28\%$), Time context ($20\%$), Occupancy ($14\%$).

### 4. ⚙️ Smart Optimization
- Categorized flexible appliances:
  - ❄️ **HVAC (Smart Climate Control)**
  - 🚗 **Level-2 EV Wallbox Charger**
  - ♨️ **Digital Heat Pump Geyser**
  - 🧺 **Smart Laundry & Dishwasher**
- Side-by-side comparison: **Current Schedule vs Recommended Optimized Schedule**.
- Metrics: Peak Shave ($-kW$), Energy Saved ($\%$) and Cost Saved ($\$$).
- Prominent **“Apply Recommendation”** button.
- **Manual Override Toggle**: Realizes the ANVATION PPT's core principle of **Human-in-the-Loop Control**.

### 5. 🧪 Interactive What-If Simulation
- Interactive adjustment sliders:
  - HVAC Pre-Cooling Shift ($0 - 4\text{ hours}$).
  - EV Charger Shift to Super Off-Peak ($11:30\text{ PM}$).
  - Water Heater Shift to Solar Peak ($12:00\text{ PM}$).
  - Efficiency Conservation Factor ($0 - 30\%$).
- Real-time animated **Before vs After Optimization Load Curve** demonstrating peak shaving and valley filling.
- Direct before/after comparison stats cards.

### 6. 🚨 Explainable Alerts & Recommendations
- Explainable AI cards with structured reasoning:
  - **Root Cause / Why Generated**
  - **Expected Impact**
  - **Projected Financial & Environmental Savings**
- **One-Tap Approval ("Approve & Apply")** and dismiss controls.

### 7. 📊 Energy Analytics
- Multi-horizon tracking: Daily, Weekly, Monthly.
- Metrics: Peak $kW$, Shifted $kWh$, Cost saved, $\text{CO}_2$ avoided, Forecast accuracy.
- **Appliance Load Contribution Doughnut Chart**.
- **Time-of-Use Peak vs Off-Peak Stacked Bar Chart**.

### 8. 🛡️ Admin Management Center
- Dedicated Admin navigation: `Dashboard | Users & Buildings | Substation Data | Reports & ML Specs`.
- **Microgrid Substation Load Profile vs Safe Thermal Capacity** ($MW$ line chart).
- Fleet KPIs: 148 Monitored Facilities, 620 IoT Sub-Meters, 4.82 MW aggregate load.
- **Connected Facilities Table**: Homes, Campuses, Offices, and Industries with 1-click inspection.
- **Executive Audit Report Exporter** (JSON & printable summary).

### 9. 🏢 Multi-Sector Building Support
Switch between target sectors via the top bar selector:
- 🏠 **Homes** (*GreenWood Smart Residence*)
- 🎓 **Colleges / Campuses** (*Apex Institute Science Campus*)
- 🏢 **Offices** (*Nexus Tech Commercial Tower*)
- 🏭 **Industries** (*Precision Dynamics Fab Plant*)

---

## 🛠️ Technical Architecture & Stack

Aligned with the ANVATION Hackathon 2026 proposed tech stack:

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | HTML5, Vanilla CSS3 (Light Glassmorphism), Modular ES6 JS, Chart.js 4.4 |
| **Backend API (Ready)** | Python 3.11, FastAPI, Uvicorn, REST & WebSocket endpoints |
| **Machine Learning** | Pandas, NumPy, scikit-learn, XGBoost Regressor, Temporal Fusion Transformers |
| **Data Storage** | SQLite (local edge cache) & Firebase Realtime DB / PostgreSQL |
| **Optimization** | Linear Programming / Constraint Satisfaction for load shifting |

---

## 💻 How to Run the Prototype

1. Navigate to the project directory:
   ```
   c:\Users\Cheri\Downloads\Energy usage prediction and optimization
   ```
2. Double-click **[`index.html`](file:///c:/Users/Cheri/Downloads/Energy%20usage%20prediction%20and%20optimization/index.html)** in Google Chrome, Microsoft Edge, or any modern web browser.
3. On the Welcome Screen:
   - Click **"Demo User"** to explore the Resident / Campus experience.
   - Click **"Demo Admin"** to access the Fleet Substation portal.
