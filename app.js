/**
 * EnergyWise - Master Application Controller
 * Based strictly on the ANVATION Hackathon 2026 PPT concept.
 * 
 * Manages:
 * - Authentication (Welcome/Login, User vs Admin roles, 1-Click demo access)
 * - Multi-Building Context (Homes, Campuses, Offices, Industries)
 * - Interactive What-If Simulation
 * - Smart Load Shifting & Optimization Engine
 * - Explainable AI Alerts (Root-cause reasoning & 1-tap approval)
 * - Admin Microgrid Substation & Fleet Management
 */

class EnergyWiseApp {
    constructor() {
        this.currentRole = 'User'; // 'User' | 'Admin'
        this.currentBuildingKey = 'home';
        this.currentTab = 'home';
        this.forecastHorizon = '24h';
        this.activeCurrency = 'USD';
        this.currencyRates = {
            USD: { symbol: '$', rate: 1.0 },
            INR: { symbol: '₹', rate: 83.5 },
            EUR: { symbol: '€', rate: 0.92 }
        };

        // Deep copy of building data to support live in-memory updates
        this.buildings = JSON.parse(JSON.stringify(typeof ENERGYWISE_BUILDINGS !== 'undefined' ? ENERGYWISE_BUILDINGS : {}));
        this.alerts = JSON.parse(JSON.stringify(typeof ENERGYWISE_ALERTS !== 'undefined' ? ENERGYWISE_ALERTS : []));
        this.adminFleet = JSON.parse(JSON.stringify(typeof ENERGYWISE_ADMIN_FLEET !== 'undefined' ? ENERGYWISE_ADMIN_FLEET : {}));
    }

    init() {
        console.log('⚡ EnergyWise Application Initializing...');
        this.bindGlobalEvents();
        this.renderAllViews();
        this.startLiveMeterSimulation();
    }

    bindGlobalEvents() {
        // Window resize re-renders charts
        window.addEventListener('resize', () => {
            if (this.currentTab === 'forecast') this.renderForecastView();
            else if (this.currentTab === 'simulation') this.triggerWhatIfRecalc();
            else if (this.currentTab === 'analytics') this.renderAnalyticsView();
            else if (this.currentTab === 'admin-dash') this.renderAdminDashboard();
        });
    }

    /**
     * Format currency helper
     */
    formatMoney(amountUsd) {
        const rateObj = this.currencyRates[this.activeCurrency] || this.currencyRates.USD;
        const val = amountUsd * rateObj.rate;
        return `${rateObj.symbol}${val.toFixed(2)}`;
    }

    /**
     * ========================================================================
     * AUTHENTICATION & LOGIN FLOW
     * ========================================================================
     */
    setLoginRole(role) {
        this.currentRole = role;
        const userTab = document.getElementById('tabLoginUser');
        const adminTab = document.getElementById('tabLoginAdmin');
        const emailInput = document.getElementById('loginEmail');

        if (role === 'User') {
            userTab?.classList.add('active');
            adminTab?.classList.remove('active');
            if (emailInput) emailInput.value = 'user@energywise.ai';
        } else {
            adminTab?.classList.add('active');
            userTab?.classList.remove('active');
            if (emailInput) emailInput.value = 'admin@energywise.ai';
        }
    }

    handleLogin() {
        this.hideAuthOverlay();
        this.applyRoleUI();
        this.showToast(`Welcome to EnergyWise! Logged in as ${this.currentRole}`);
    }

    quickLogin(role) {
        this.currentRole = role;
        this.setLoginRole(role);
        this.hideAuthOverlay();
        this.applyRoleUI();
        this.showToast(`1-Click Demo Access: Logged in as ${role}`);
    }

    hideAuthOverlay() {
        const overlay = document.getElementById('authOverlay');
        if (overlay) overlay.classList.add('hidden');
    }

    logout() {
        const overlay = document.getElementById('authOverlay');
        if (overlay) overlay.classList.remove('hidden');
        this.showToast('Logged out of EnergyWise');
    }

    applyRoleUI() {
        const userTabs = document.getElementById('userNavTabs');
        const adminTabs = document.getElementById('adminNavTabs');
        const roleBadge = document.getElementById('headerRoleBadge');
        const roleText = document.getElementById('headerRoleText');
        const buildingWrap = document.getElementById('buildingSelectorWrap');

        if (this.currentRole === 'Admin') {
            if (userTabs) userTabs.style.display = 'none';
            if (adminTabs) adminTabs.style.display = 'flex';
            if (roleBadge) { roleBadge.className = 'role-badge admin'; }
            if (roleText) roleText.innerText = 'System Admin';
            if (buildingWrap) buildingWrap.style.display = 'none';
            this.navigateToTab('admin-dash');
        } else {
            if (adminTabs) adminTabs.style.display = 'none';
            if (userTabs) userTabs.style.display = 'flex';
            if (roleBadge) { roleBadge.className = 'role-badge user'; }
            if (roleText) roleText.innerText = 'Resident User';
            if (buildingWrap) buildingWrap.style.display = 'flex';
            this.navigateToTab('home');
        }
    }

    /**
     * ========================================================================
     * NAVIGATION ROUTER
     * ========================================================================
     */
    navigateToTab(tabId) {
        this.currentTab = tabId;

        // Update Desktop Tabs
        document.querySelectorAll('.nav-tab-link').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        // Update Mobile Bottom Nav
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            const spanText = btn.querySelector('span')?.innerText.toLowerCase();
            btn.classList.toggle('active', spanText && tabId.includes(spanText));
        });

        // Show View Section
        document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `view-${tabId}`);
        });

        // Trigger view-specific rendering
        if (tabId === 'home') {
            this.renderUserDashboard();
        } else if (tabId === 'forecast') {
            this.renderForecastView();
        } else if (tabId === 'optimize') {
            this.renderOptimizationCards();
        } else if (tabId === 'simulation') {
            this.triggerWhatIfRecalc();
        } else if (tabId === 'analytics') {
            this.renderAnalyticsView();
        } else if (tabId === 'alerts') {
            this.renderAlertsView();
        } else if (tabId === 'admin-dash' || tabId === 'admin-substation') {
            this.renderAdminDashboard();
        } else if (tabId === 'admin-users') {
            this.renderAdminUsersTable();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * ========================================================================
     * MULTI-BUILDING CONTEXT SWITCHER
     * ========================================================================
     */
    handleBuildingChange(buildingKey) {
        this.currentBuildingKey = buildingKey;
        const building = this.buildings[buildingKey];
        if (!building) return;

        // Update Header Titles
        const titleEl = document.getElementById('dashBuildingTitle');
        const subEl = document.getElementById('dashBuildingSubtitle');
        if (titleEl) {
            titleEl.innerHTML = `<i class="fa-solid ${building.icon}" style="color: var(--brand-blue);"></i> ${building.name}`;
        }
        if (subEl) {
            subEl.innerText = `${building.type} | Area: ${building.area} | Occupants: ${building.occupants}`;
        }

        this.renderAllViews();
        this.showToast(`Switched active context to: ${building.name}`);
    }

    handleCurrencyChange(currency) {
        this.activeCurrency = currency;
        this.renderAllViews();
        this.showToast(`Currency updated to ${currency}`);
    }

    /**
     * Master Render
     */
    renderAllViews() {
        this.renderUserDashboard();
        this.renderOptimizationCards();
        this.renderAlertsView();
        this.renderAdminUsersTable();
    }

    /**
     * ========================================================================
     * USER VIEW 1: HOME DASHBOARD
     * ========================================================================
     */
    renderUserDashboard() {
        const building = this.buildings[this.currentBuildingKey];
        if (!building) return;

        // Calculate active load and savings from appliances
        const optimizedSavingsKwh = building.appliances
            .filter(a => a.isOptimized && !a.manualOverride)
            .reduce((sum, a) => sum + a.expectedSavingKwh, 0);

        const currentKw = Math.max(0.5, Math.round((building.currentKw - (optimizedSavingsKwh > 0 ? 0.8 : 0)) * 100) / 100);
        const todayKwh = Math.round((building.todayKwh - optimizedSavingsKwh) * 10) / 10;
        const savedKwh = Math.round((building.energySavedKwh + optimizedSavingsKwh) * 10) / 10;
        const co2Avoided = Math.round(savedKwh * 0.42 * 100) / 100;
        const costVal = this.formatMoney(todayKwh * 0.16);

        // Update KPI tiles
        this.setEl('kpiCurrentKw', currentKw);
        this.setEl('kpiTodayKwh', todayKwh);
        this.setEl('kpiEstCost', costVal);
        this.setEl('kpiPeakDemand', building.peakDemandKw);
        this.setEl('kpiPeakTime', `At ${building.peakDemandTime}`);
        this.setEl('kpiEnergySaved', savedKwh);
        this.setEl('kpiCo2Reduction', co2Avoided);

        // Weather & Solar Widgets
        this.setEl('envWeatherTemp', `${building.weather.temp} ${building.weather.condition}`);
        this.setEl('envWeatherSub', `Humidity: ${building.weather.humidity} | Solar: ${building.weather.solarIrradiance} (${building.weather.hvacImpact})`);
        this.setEl('envSolarTitle', `Rooftop Solar: ${building.renewable.solarGenerationKw} kW Active`);
        this.setEl('envSolarSub', `${building.renewable.solarSelfConsumptionPct}% Self-Consumption | Grid Solar Index: ${building.renewable.gridSolarIndex}`);

        // Mini Chart
        window.energyWiseChartManager.renderDashboardMiniChart('dashboardMiniChart');
    }

    /**
     * ========================================================================
     * USER VIEW 2: AI FORECAST
     * ========================================================================
     */
    async renderForecastView() {
        const forecast = await window.energyWiseMLEngine.generateForecast(this.currentBuildingKey, this.forecastHorizon);
        window.energyWiseChartManager.renderForecastChart('forecastMainChart', forecast);

        const riskBadge = document.getElementById('forecastRiskBadge');
        if (riskBadge) {
            riskBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Peak Surge Risk: ${forecast.peakHourEstimate}`;
        }
    }

    switchForecastHorizon(horizon) {
        this.forecastHorizon = horizon;
        document.getElementById('btnForecast24')?.classList.toggle('active', horizon === '24h');
        document.getElementById('btnForecast48')?.classList.toggle('active', horizon === '48h');
        this.renderForecastView();
    }

    /**
     * ========================================================================
     * USER VIEW 3: SMART OPTIMIZATION
     * ========================================================================
     */
    renderOptimizationCards() {
        const container = document.getElementById('optimizationCardsGrid');
        if (!container) return;

        const building = this.buildings[this.currentBuildingKey];
        if (!building) return;

        container.innerHTML = building.appliances.map(app => `
            <div class="appliance-opt-card ${app.isOptimized ? 'optimized' : ''}">
                <div>
                    <div class="appliance-card-top">
                        <div class="appliance-title-box">
                            <div class="app-icon-badge"><i class="fa-solid ${app.icon}"></i></div>
                            <div>
                                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-navy);">${app.name}</h3>
                                <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${app.category} • ${app.powerKw} kW Power</span>
                            </div>
                        </div>
                        <span class="badge-status ${app.isOptimized ? 'badge-eff' : 'badge-mod'}">
                            ${app.isOptimized ? '✓ Optimized' : 'Flexible Load'}
                        </span>
                    </div>

                    <div class="schedule-comparison-box">
                        <div class="schedule-row">
                            <span class="schedule-label">Current Schedule:</span>
                            <span class="schedule-val current"><i class="fa-solid fa-triangle-exclamation"></i> ${app.currentSchedule}</span>
                        </div>
                        <div class="schedule-row">
                            <span class="schedule-label">AI Recommended:</span>
                            <span class="schedule-val recommended"><i class="fa-solid fa-wand-magic-sparkles"></i> ${app.recommendedSchedule}</span>
                        </div>
                    </div>

                    <div class="savings-tag-strip">
                        <div class="saving-tag-item">
                            <div class="saving-tag-lbl">Peak Shave</div>
                            <div class="saving-tag-num font-mono" style="color: var(--brand-rose);">-${app.peakShiftReductionKw} kW</div>
                        </div>
                        <div class="saving-tag-item">
                            <div class="saving-tag-lbl">Energy Saved</div>
                            <div class="saving-tag-num font-mono" style="color: var(--brand-green);">${app.expectedSavingPct}%</div>
                        </div>
                        <div class="saving-tag-item">
                            <div class="saving-tag-lbl">Cost Saved</div>
                            <div class="saving-tag-num font-mono" style="color: var(--brand-blue);">${this.formatMoney(app.expectedSavingCost)}/cyc</div>
                        </div>
                    </div>
                </div>

                <div class="appliance-action-footer">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <label class="switch">
                            <input type="checkbox" ${app.manualOverride ? 'checked' : ''} onchange="app.toggleManualOverride('${app.id}', this.checked)">
                            <span class="slider-round"></span>
                        </label>
                        <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-secondary);">Manual Override</span>
                    </div>

                    <button class="btn ${app.isOptimized ? 'btn-outline' : 'btn-green'} btn-sm" onclick="app.toggleApplianceOptimization('${app.id}')">
                        <i class="fa-solid ${app.isOptimized ? 'fa-rotate-left' : 'fa-check'}"></i>
                        ${app.isOptimized ? 'Revert Schedule' : 'Apply Recommendation'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    toggleApplianceOptimization(appId) {
        const building = this.buildings[this.currentBuildingKey];
        const app = building.appliances.find(a => a.id === appId);
        if (!app) return;

        app.isOptimized = !app.isOptimized;
        this.renderOptimizationCards();
        this.renderUserDashboard();

        if (app.isOptimized) {
            this.showToast(`Applied schedule for ${app.name}! Shaving ${app.peakShiftReductionKw} kW during peak.`);
        } else {
            this.showToast(`Reverted schedule for ${app.name}`);
        }
    }

    toggleManualOverride(appId, isChecked) {
        const building = this.buildings[this.currentBuildingKey];
        const app = building.appliances.find(a => a.id === appId);
        if (!app) return;

        app.manualOverride = isChecked;
        this.renderOptimizationCards();
        this.showToast(isChecked ? `Manual override activated for ${app.name} (Human in the loop)` : `Autonomous AI control restored for ${app.name}`);
    }

    applyAllBuildingOptimizations() {
        const building = this.buildings[this.currentBuildingKey];
        building.appliances.forEach(a => {
            a.isOptimized = true;
            a.manualOverride = false;
        });
        this.renderOptimizationCards();
        this.renderUserDashboard();
        this.showToast(`All flexible appliance optimizations applied for ${building.name}!`);
    }

    /**
     * ========================================================================
     * USER VIEW 4: WHAT-IF SIMULATION
     * ========================================================================
     */
    triggerWhatIfRecalc() {
        const hvacShift = parseFloat(document.getElementById('slideHvacShift')?.value || 2);
        const evShift = document.getElementById('toggleEvShift')?.checked ?? true;
        const waterShift = document.getElementById('toggleWaterShift')?.checked ?? true;
        const effBoost = parseFloat(document.getElementById('slideEffBoost')?.value || 15);

        // Update Slider Readout Badges
        this.setEl('valHvacShift', `${hvacShift.toFixed(1)} Hours`);
        this.setEl('valEffBoost', `${effBoost}%`);

        const simResult = window.energyWiseMLEngine.simulateWhatIf({
            hvacShiftHours: hvacShift,
            evShiftToNight: evShift,
            waterHeaterSolar: waterShift,
            efficiencyBoost: effBoost
        });

        // Update Comparison Stats
        this.setEl('simPeakCompare', `${simResult.beforePeakKw} kW → ${simResult.afterPeakKw} kW`);
        this.setEl('simPeakReductionBadge', `-${simResult.peakReductionPct}% Peak Shaved`);
        this.setEl('simCostCompare', `${this.formatMoney(simResult.costSavings)} Saved`);
        this.setEl('simShiftedKwh', `${simResult.shiftedLoadKwh} kWh`);

        // Render Animated What-If Comparison Curve
        window.energyWiseChartManager.renderWhatIfChart('whatIfChartCanvas', simResult);
    }

    resetWhatIfSimulation() {
        const s1 = document.getElementById('slideHvacShift');
        const s2 = document.getElementById('slideEffBoost');
        const t1 = document.getElementById('toggleEvShift');
        const t2 = document.getElementById('toggleWaterShift');

        if (s1) s1.value = 2;
        if (s2) s2.value = 15;
        if (t1) t1.checked = true;
        if (t2) t2.checked = true;

        this.triggerWhatIfRecalc();
        this.showToast('What-If simulation reset to default baseline');
    }

    /**
     * ========================================================================
     * USER VIEW 5: ALERTS & RECOMMENDATIONS (EXPLAINABLE AI)
     * ========================================================================
     */
    renderAlertsView() {
        const container = document.getElementById('alertsContainerClean');
        if (!container) return;

        const countBadge = document.getElementById('alertsCountBadge');
        if (countBadge) {
            const pendingCount = this.alerts.filter(a => a.status === 'pending').length;
            countBadge.innerText = pendingCount;
        }

        container.innerHTML = this.alerts.map(alt => `
            <div class="alert-card-clean ${alt.severity} ${alt.status === 'approved' ? 'approved' : ''}">
                <div class="alert-header-row">
                    <span class="alert-badge ${alt.severity}">
                        <i class="fa-solid ${alt.icon}"></i> ${alt.type}
                    </span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${alt.timestamp}</span>
                </div>

                <div class="alert-title-text">${alt.title}</div>

                <div class="alert-explain-box">
                    <div class="explain-line">
                        <span class="explain-lbl"><i class="fa-solid fa-circle-question"></i> Root Cause / Why:</span>
                        <span style="color: var(--text-secondary);">${alt.rootCause}</span>
                    </div>
                    <div class="explain-line">
                        <span class="explain-lbl"><i class="fa-solid fa-chart-line-down"></i> Expected Impact:</span>
                        <span style="color: var(--brand-blue); font-weight: 600;">${alt.expectedImpact}</span>
                    </div>
                    <div class="explain-line">
                        <span class="explain-lbl"><i class="fa-solid fa-leaf"></i> Projected Savings:</span>
                        <span style="color: var(--brand-green); font-weight: 700;">${alt.savings}</span>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.82rem; color: var(--text-navy); font-weight: 600;">
                        <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--brand-blue);"></i> Action: ${alt.recommendedAction}
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        ${alt.status !== 'approved' ? `
                            <button class="btn btn-green btn-sm" onclick="app.approveAlert('${alt.id}')">
                                <i class="fa-solid fa-check"></i> Approve & Apply
                            </button>
                        ` : `
                            <span class="badge-status badge-eff">✓ Applied & Active</span>
                        `}
                        <button class="btn btn-outline btn-sm" onclick="app.dismissAlert('${alt.id}')">
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    approveAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = 'approved';
            this.renderAlertsView();
            this.showToast(`Approved recommendation: "${alert.title}"`);
        }
    }

    dismissAlert(alertId) {
        this.alerts = this.alerts.filter(a => a.id !== alertId);
        this.renderAlertsView();
        this.showToast('Alert dismissed');
    }

    /**
     * ========================================================================
     * USER VIEW 6: ENERGY ANALYTICS
     * ========================================================================
     */
    renderAnalyticsView() {
        window.energyWiseChartManager.renderAnalyticsDoughnut('analyticsDoughnutCanvas', this.currentBuildingKey);
        window.energyWiseChartManager.renderAnalyticsToU('analyticsTouCanvas');
    }

    /**
     * ========================================================================
     * ADMIN PORTAL VIEWS
     * ========================================================================
     */
    renderAdminDashboard() {
        window.energyWiseChartManager.renderAdminSubstationChart('adminSubstationChartCanvas');
    }

    renderAdminUsersTable() {
        const tbody = document.getElementById('adminBuildingsTableBody');
        if (!tbody) return;

        const summary = (this.adminFleet && this.adminFleet.buildingsSummary) ? this.adminFleet.buildingsSummary : [];
        tbody.innerHTML = summary.map(b => `
            <tr>
                <td><strong>${b.name}</strong></td>
                <td><span class="badge-status badge-eff" style="background: var(--bg-card-subtle); color: var(--text-secondary); border: none;">${b.type}</span></td>
                <td class="font-mono">${b.meters} Sub-Meters</td>
                <td class="font-mono font-bold" style="color: var(--brand-blue);">${b.currentKw} kW</td>
                <td>
                    <span class="badge-status ${b.peakRisk.includes('High') ? 'badge-high' : 'badge-eff'}">${b.peakRisk}</span>
                </td>
                <td><span style="color: var(--brand-green); font-weight: 700;">● ${b.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="app.inspectBuildingFromAdmin('${b.type.toLowerCase()}')">
                        Inspect
                    </button>
                </td>
            </tr>
        `).join('');
    }

    inspectBuildingFromAdmin(typeKey) {
        const mappedKey = typeKey.includes('home') ? 'home' : typeKey.includes('campus') ? 'campus' : typeKey.includes('office') ? 'office' : 'industry';
        this.currentRole = 'User';
        this.applyRoleUI();
        this.handleBuildingChange(mappedKey);
    }

    exportAdminReport() {
        const fleet = this.adminFleet || {};
        const report = {
            generatedAt: new Date().toISOString(),
            organization: 'EnergyWise Autonomous Microgrid Management',
            targetSectors: ['Homes', 'Campuses', 'Offices', 'Industries'],
            monitoredFacilities: fleet.totalBuildings || 148,
            activeIoTMeters: fleet.activeMeters || 620,
            aggregateDemandMw: fleet.aggregateCurrentMw || 4.82,
            substationSafeCapacityPct: fleet.substationLoadPct || 68.4,
            modelMetrics: {
                model: 'XGBoost + Temporal Fusion Transformer',
                mape: fleet.aiForecastAccuracyMape || '3.8%',
                r2Score: fleet.r2Score || 0.958,
                latency: fleet.modelLatencyMs || '42 ms'
            }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
        const anchor = document.createElement('a');
        anchor.setAttribute("href", dataStr);
        anchor.setAttribute("download", `EnergyWise_Executive_Report_${Date.now()}.json`);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        this.showToast('EnergyWise Executive Audit Report downloaded (JSON)');
    }

    /**
     * Subtle live smart meter IoT simulation for realistic hackathon presentation
     */
    startLiveMeterSimulation() {
        setInterval(() => {
            const meterEl = document.getElementById('kpiCurrentKw');
            if (meterEl && this.currentRole === 'User') {
                const bld = this.buildings[this.currentBuildingKey];
                const jitter = (Math.random() - 0.5) * 0.12;
                const newKw = Math.max(0.5, Math.round((bld.currentKw + jitter) * 100) / 100);
                meterEl.innerText = newKw.toFixed(2);
            }
        }, 3500);
    }

    /**
     * Toast notifications
     */
    showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--brand-green);"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            toast.style.transition = '0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    setEl(id, val) {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    }
}

// Global Singleton Application
window.app = new EnergyWiseApp();
document.addEventListener('DOMContentLoaded', () => {
    window.app.init();
});
