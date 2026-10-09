/**
 * EnergyWise - Modern Light Theme Charting Engine
 * 
 * Styled specifically for EnergyWise's clean light-color startup theme:
 * - Sky blue (#0284c7), White (#ffffff), Soft Green (#10b981), and Subtle Navy (#0f172a).
 * - Transparent area gradients, confidence range bands, and What-If comparison curves.
 */

class EnergyWiseChartManager {
    constructor() {
        this.charts = {};
    }

    createLightGradient(ctx, colorTop, colorBottom) {
        const grad = ctx.createLinearGradient(0, 0, 0, 320);
        grad.addColorStop(0, colorTop);
        grad.addColorStop(1, colorBottom);
        return grad;
    }

    /**
     * 1. Forecast Chart with Confidence Bounds (Forecast Page)
     */
    renderForecastChart(canvasId, forecastData) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const blueGrad = this.createLightGradient(ctx, 'rgba(2, 132, 199, 0.18)', 'rgba(2, 132, 199, 0.01)');
        const confGrad = this.createLightGradient(ctx, 'rgba(14, 165, 233, 0.12)', 'rgba(14, 165, 233, 0.03)');

        if (typeof Chart !== 'undefined') {
            this.charts[canvasId] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: forecastData.labels,
                    datasets: [
                        {
                            label: 'Upper 95% Confidence',
                            data: forecastData.confUpper,
                            borderColor: 'transparent',
                            backgroundColor: confGrad,
                            pointRadius: 0,
                            fill: '+1',
                            tension: 0.35
                        },
                        {
                            label: 'Lower 95% Confidence',
                            data: forecastData.confLower,
                            borderColor: 'transparent',
                            backgroundColor: 'transparent',
                            pointRadius: 0,
                            fill: false,
                            tension: 0.35
                        },
                        {
                            label: 'Actual Meter Reading (kW)',
                            data: forecastData.actual,
                            borderColor: '#0f172a',
                            backgroundColor: 'transparent',
                            borderWidth: 2.2,
                            pointBackgroundColor: '#0f172a',
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            tension: 0.35
                        },
                        {
                            label: 'AI Predicted Forecast (kW)',
                            data: forecastData.predicted,
                            borderColor: '#0284c7',
                            backgroundColor: blueGrad,
                            borderWidth: 2.5,
                            borderDash: [5, 4],
                            pointBackgroundColor: '#0284c7',
                            pointRadius: 4,
                            pointHoverRadius: 7,
                            fill: true,
                            tension: 0.35
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#334155',
                                font: { family: 'Outfit, sans-serif', size: 12, weight: '500' },
                                filter: item => !item.text.includes('Confidence'),
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            backgroundColor: '#ffffff',
                            titleColor: '#0f172a',
                            bodyColor: '#334155',
                            borderColor: 'rgba(2, 132, 199, 0.2)',
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            usePointStyle: true,
                            callbacks: {
                                label: ctx => ` ${ctx.dataset.label}: ${ctx.raw} kW`
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(0, 0, 0, 0.04)' },
                            ticks: { color: '#64748b', font: { family: 'Outfit, sans-serif', size: 11 } }
                        },
                        y: {
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            ticks: {
                                color: '#64748b',
                                font: { family: 'Outfit, sans-serif', size: 11 },
                                callback: v => `${v} kW`
                            }
                        }
                    }
                }
            });
        }
    }

    /**
     * 2. What-If Comparison Curve (Before vs After Load Shifting)
     */
    renderWhatIfChart(canvasId, simResult) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const greenGrad = this.createLightGradient(ctx, 'rgba(16, 185, 129, 0.24)', 'rgba(16, 185, 129, 0.02)');
        const redGrad = this.createLightGradient(ctx, 'rgba(244, 63, 94, 0.1)', 'rgba(244, 63, 94, 0.01)');

        if (typeof Chart !== 'undefined') {
            this.charts[canvasId] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: simResult.labels,
                    datasets: [
                        {
                            label: 'Before Optimization (Baseline Peak Stress)',
                            data: simResult.beforeCurve,
                            borderColor: '#f43f5e',
                            backgroundColor: redGrad,
                            borderWidth: 2,
                            borderDash: [4, 4],
                            fill: true,
                            tension: 0.38,
                            pointRadius: 3
                        },
                        {
                            label: 'After What-If Optimization (Flattened Curve)',
                            data: simResult.afterCurve,
                            borderColor: '#10b981',
                            backgroundColor: greenGrad,
                            borderWidth: 3,
                            fill: true,
                            tension: 0.38,
                            pointRadius: 5,
                            pointBackgroundColor: '#10b981',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#1e293b',
                                font: { family: 'Outfit, sans-serif', size: 12, weight: '600' },
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            backgroundColor: '#ffffff',
                            titleColor: '#0f172a',
                            bodyColor: '#334155',
                            borderColor: 'rgba(16, 185, 129, 0.3)',
                            borderWidth: 1,
                            padding: 12
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(0, 0, 0, 0.04)' },
                            ticks: { color: '#64748b' }
                        },
                        y: {
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            ticks: { color: '#64748b', callback: v => `${v} kW` }
                        }
                    }
                }
            });
        }
    }

    /**
     * 3. User Dashboard Sparkline / Mini Trend Chart
     */
    renderDashboardMiniChart(canvasId, dataPoints) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const greenGrad = this.createLightGradient(ctx, 'rgba(16, 185, 129, 0.25)', 'rgba(16, 185, 129, 0.01)');

        if (typeof Chart !== 'undefined') {
            this.charts[canvasId] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
                    datasets: [{
                        data: dataPoints || [1.8, 2.4, 3.1, 2.8, 3.4, 4.2, 5.8, 4.1],
                        borderColor: '#0284c7',
                        backgroundColor: greenGrad,
                        borderWidth: 2.2,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
    }

    /**
     * 4. Analytics Appliance Breakdown (Doughnut)
     */
    renderAnalyticsDoughnut(canvasId, buildingKey = 'home') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const building = ENERGYWISE_BUILDINGS[buildingKey] || ENERGYWISE_BUILDINGS.home;
        const labels = building.appliances.map(a => a.name);
        const data = building.appliances.map(a => a.powerKw);
        const palette = ['#0284c7', '#10b981', '#38bdf8', '#f59e0b', '#8b5cf6'];

        if (typeof Chart !== 'undefined') {
            this.charts[canvasId] = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels,
                    datasets: [{
                        data,
                        backgroundColor: palette.slice(0, labels.length),
                        borderColor: '#ffffff',
                        borderWidth: 2.5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#334155', font: { size: 11, family: 'Outfit, sans-serif' }, boxWidth: 10 }
                        }
                    }
                }
            });
        }
    }

    /**
     * 5. Analytics Time-of-Use Shift (Stacked Bar Chart)
     */
    renderAnalyticsToU(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        if (typeof Chart !== 'undefined') {
            this.charts[canvasId] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Off-Peak / Solar Hours (Cheap & Clean)',
                            data: [18.2, 19.5, 17.8, 20.4, 19.1, 22.0, 21.5],
                            backgroundColor: '#10b981',
                            borderRadius: 4
                        },
                        {
                            label: 'Peak Grid Surge Window ($0.32/kWh)',
                            data: [6.6, 7.7, 8.7, 10.8, 10.7, 12.5, 11.6],
                            backgroundColor: '#f59e0b',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { stacked: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#64748b' } },
                        y: { stacked: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#64748b', callback: v => `${v} kWh` } }
                    },
                    plugins: {
                        legend: { labels: { color: '#334155', font: { size: 11 }, usePointStyle: true } }
                    }
                }
            });
        }
    }

    /**
     * 6. Admin Aggregate Substation Fleet Load
     */
    renderAdminSubstationChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const navyGrad = this.createLightGradient(ctx, 'rgba(15, 23, 42, 0.15)', 'rgba(15, 23, 42, 0.01)');

        if (typeof Chart !== 'undefined') {
            this.charts[canvasId] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
                    datasets: [
                        {
                            label: 'Microgrid Substation Load (MW)',
                            data: [2.8, 2.4, 3.2, 4.6, 4.9, 5.8, 6.2, 4.5],
                            borderColor: '#0284c7',
                            backgroundColor: navyGrad,
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.35,
                            pointRadius: 4
                        },
                        {
                            label: 'Substation Safe Transformer Threshold (6.5 MW)',
                            data: [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5],
                            borderColor: '#f43f5e',
                            borderWidth: 2,
                            borderDash: [6, 4],
                            fill: false,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { color: '#334155', font: { size: 11 }, usePointStyle: true } }
                    },
                    scales: {
                        x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#64748b' } },
                        y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#64748b', callback: v => `${v} MW` } }
                    }
                }
            });
        }
    }
}

window.energyWiseChartManager = new EnergyWiseChartManager();
