/**
 * EnergyWise - Data Store & Multi-Building Telemetry Profiles
 * Based on ANVATION Hackathon 2026 project specifications.
 * 
 * Supports:
 * - Homes (Residential)
 * - Colleges / Campuses (Educational)
 * - Offices (Commercial)
 * - Industries (Manufacturing)
 */

const ENERGYWISE_BUILDINGS = {
    home: {
        id: 'bld-home',
        name: 'GreenWood Smart Residence',
        type: 'Home / Residential',
        icon: 'fa-house-chimney',
        occupants: 4,
        area: '2,200 sq.ft',
        currentKw: 3.42,
        todayKwh: 24.8,
        yesterdayKwh: 27.2,
        estimatedCost: 3.96, // $ / day
        peakDemandKw: 5.8,
        peakDemandTime: '7:15 PM',
        energySavedKwh: 5.6,
        co2ReductionKg: 2.35,
        weather: {
            temp: '28°C',
            condition: 'Sunny & Pleasant',
            icon: 'fa-sun',
            humidity: '48%',
            solarIrradiance: '840 W/m²',
            hvacImpact: 'Low Cooling Demand'
        },
        renewable: {
            solarGenerationKw: 3.6,
            solarSelfConsumptionPct: 82,
            gridSolarIndex: 'High (76% Clean Grid)'
        },
        appliances: [
            {
                id: 'app-hvac',
                name: 'Inverter HVAC (Living & Bed)',
                category: 'HVAC',
                powerKw: 2.2,
                currentSchedule: '5:30 PM – 9:30 PM (Peak Surge)',
                recommendedSchedule: 'Pre-cool 3:30 PM – 5:00 PM & Eco 24°C',
                peakShiftReductionKw: 1.4,
                expectedSavingPct: 22,
                expectedSavingKwh: 4.8,
                expectedSavingCost: 0.86,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-snowflake'
            },
            {
                id: 'app-ev',
                name: 'Level-2 EV Wallbox Charger',
                category: 'EV Charging',
                powerKw: 6.6,
                currentSchedule: '6:00 PM – 8:30 PM (Evening Peak)',
                recommendedSchedule: '11:30 PM – 2:30 AM (Super Off-Peak)',
                peakShiftReductionKw: 6.6,
                expectedSavingPct: 45,
                expectedSavingKwh: 16.5,
                expectedSavingCost: 2.45,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-car-battery'
            },
            {
                id: 'app-water',
                name: 'Digital Heat Pump Geyser',
                category: 'Water Heating',
                powerKw: 2.5,
                currentSchedule: '7:00 PM – 8:30 PM (Peak)',
                recommendedSchedule: '1:00 PM – 2:30 PM (Solar Peak Surplus)',
                peakShiftReductionKw: 2.5,
                expectedSavingPct: 35,
                expectedSavingKwh: 3.75,
                expectedSavingCost: 0.62,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-shower'
            },
            {
                id: 'app-wash',
                name: 'Smart Laundry & Dishwasher',
                category: 'Washing Machine',
                powerKw: 1.4,
                currentSchedule: '7:30 PM – 9:00 PM (Peak)',
                recommendedSchedule: '10:30 PM – 12:00 AM (Off-Peak)',
                peakShiftReductionKw: 1.4,
                expectedSavingPct: 28,
                expectedSavingKwh: 2.1,
                expectedSavingCost: 0.38,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-soap'
            }
        ]
    },

    campus: {
        id: 'bld-campus',
        name: 'Apex Institute of Technology Campus',
        type: 'Colleges / Campuses',
        icon: 'fa-graduation-cap',
        occupants: 3200,
        area: '185,000 sq.ft',
        currentKw: 142.5,
        todayKwh: 1240.0,
        yesterdayKwh: 1390.0,
        estimatedCost: 198.40,
        peakDemandKw: 185.0,
        peakDemandTime: '11:45 AM & 2:30 PM',
        energySavedKwh: 185.0,
        co2ReductionKg: 77.7,
        weather: {
            temp: '31°C',
            condition: 'Clear Sky',
            icon: 'fa-sun',
            humidity: '42%',
            solarIrradiance: '920 W/m²',
            hvacImpact: 'Moderate Thermal Load'
        },
        renewable: {
            solarGenerationKw: 95.0,
            solarSelfConsumptionPct: 94,
            gridSolarIndex: 'Very High (88% Clean)'
        },
        appliances: [
            {
                id: 'app-camp-chiller',
                name: 'Central Library & Lab Chiller Plant',
                category: 'HVAC',
                powerKw: 65.0,
                currentSchedule: '10:00 AM – 4:00 PM (Flat full blast)',
                recommendedSchedule: 'Chilled water thermal storage pre-chill 6 AM - 8 AM',
                peakShiftReductionKw: 24.0,
                expectedSavingPct: 18,
                expectedSavingKwh: 98.0,
                expectedSavingCost: 16.20,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-snowflake'
            },
            {
                id: 'app-camp-water',
                name: 'Hostel Block High-Capacity Geysers',
                category: 'Water Heating',
                powerKw: 35.0,
                currentSchedule: '6:30 AM – 9:00 AM (Morning surge)',
                recommendedSchedule: 'Solar thermal pre-heat with staged timer 5:00 AM',
                peakShiftReductionKw: 18.0,
                expectedSavingPct: 32,
                expectedSavingKwh: 45.0,
                expectedSavingCost: 7.80,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-shower'
            },
            {
                id: 'app-camp-pumps',
                name: 'Campus Water Distribution Hydro-Pumps',
                category: 'Pumping',
                powerKw: 22.0,
                currentSchedule: '11:00 AM – 2:00 PM (Peak tariff)',
                recommendedSchedule: 'Shift tank filling to 1:00 AM – 4:00 AM',
                peakShiftReductionKw: 22.0,
                expectedSavingPct: 40,
                expectedSavingKwh: 36.0,
                expectedSavingCost: 6.40,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-faucet-drip'
            }
        ]
    },

    office: {
        id: 'bld-office',
        name: 'Nexus Tech Tower (Floors 4-8)',
        type: 'Offices / Commercial',
        icon: 'fa-building',
        occupants: 450,
        area: '42,000 sq.ft',
        currentKw: 48.6,
        todayKwh: 412.0,
        yesterdayKwh: 468.0,
        estimatedCost: 69.80,
        peakDemandKw: 68.4,
        peakDemandTime: '2:15 PM',
        energySavedKwh: 48.0,
        co2ReductionKg: 20.1,
        weather: {
            temp: '29°C',
            condition: 'Mild Breeze',
            icon: 'fa-cloud-sun',
            humidity: '50%',
            solarIrradiance: '780 W/m²',
            hvacImpact: 'Moderate'
        },
        renewable: {
            solarGenerationKw: 28.0,
            solarSelfConsumptionPct: 90,
            gridSolarIndex: 'Moderate (65% Clean)'
        },
        appliances: [
            {
                id: 'app-off-vav',
                name: 'VRF Multi-Zone Air Handlers',
                category: 'HVAC',
                powerKw: 28.0,
                currentSchedule: '8:30 AM – 6:30 PM (Constant setpoint 21°C)',
                recommendedSchedule: 'Occupancy-based dynamic trim to 23.5°C & ramp at 1:30 PM',
                peakShiftReductionKw: 9.5,
                expectedSavingPct: 21,
                expectedSavingKwh: 38.0,
                expectedSavingCost: 6.80,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-snowflake'
            },
            {
                id: 'app-off-ev',
                name: 'Employee Fleet EV Chargers (8 Ports)',
                category: 'EV Charging',
                powerKw: 44.0,
                currentSchedule: '9:00 AM – 11:30 AM (Arrival simultaneous spike)',
                recommendedSchedule: 'Smart sequential round-robin load distribution',
                peakShiftReductionKw: 22.0,
                expectedSavingPct: 30,
                expectedSavingKwh: 52.0,
                expectedSavingCost: 9.10,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-car-battery'
            }
        ]
    },

    industry: {
        id: 'bld-industry',
        name: 'Precision Dynamics Fab Plant',
        type: 'Industries / Manufacturing',
        icon: 'fa-industry',
        occupants: 120,
        area: '65,000 sq.ft',
        currentKw: 310.0,
        todayKwh: 2850.0,
        yesterdayKwh: 3120.0,
        estimatedCost: 456.00,
        peakDemandKw: 380.0,
        peakDemandTime: '3:00 PM',
        energySavedKwh: 240.0,
        co2ReductionKg: 100.8,
        weather: {
            temp: '32°C',
            condition: 'Hot Afternoon',
            icon: 'fa-sun',
            humidity: '38%',
            solarIrradiance: '900 W/m²',
            hvacImpact: 'Heavy Process Cooling'
        },
        renewable: {
            solarGenerationKw: 120.0,
            solarSelfConsumptionPct: 98,
            gridSolarIndex: 'High'
        },
        appliances: [
            {
                id: 'app-ind-compressor',
                name: 'Rotary Screw Air Compressors (100 HP)',
                category: 'Heavy Equipment',
                powerKw: 75.0,
                currentSchedule: 'Continuous 8 AM - 6 PM with unmanaged leaks',
                recommendedSchedule: 'VFD pressure modulation & scheduled reservoir charging',
                peakShiftReductionKw: 22.0,
                expectedSavingPct: 16,
                expectedSavingKwh: 95.0,
                expectedSavingCost: 15.20,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-gears'
            },
            {
                id: 'app-ind-furnace',
                name: 'Thermal Induction Annealing Kiln',
                category: 'Thermal Process',
                powerKw: 140.0,
                currentSchedule: '2:00 PM – 5:00 PM (Peak utility grid window)',
                recommendedSchedule: 'Batch shift to night tariff shift (10 PM – 2 AM)',
                peakShiftReductionKw: 140.0,
                expectedSavingPct: 35,
                expectedSavingKwh: 210.0,
                expectedSavingCost: 38.50,
                isOptimized: false,
                manualOverride: false,
                icon: 'fa-fire'
            }
        ]
    }
};

// User & Admin Accounts for Login Demo
const ENERGYWISE_ACCOUNTS = {
    users: [
        {
            id: 'usr-1',
            name: 'Sarah Jenkins',
            email: 'user@energywise.ai',
            role: 'User',
            buildingId: 'bld-home',
            avatar: 'SJ'
        },
        {
            id: 'usr-2',
            name: 'Prof. Arvind Sharma',
            email: 'campus@energywise.ai',
            role: 'User',
            buildingId: 'bld-campus',
            avatar: 'AS'
        }
    ],
    admin: {
        name: 'Dr. Michael Vance',
        email: 'admin@energywise.ai',
        role: 'Admin',
        title: 'Chief Grid Optimization Officer',
        avatar: 'MV'
    }
};

// AI Forecast Time-Series Data (24h - 48h Hourly Forecast with Confidence Intervals)
const ENERGYWISE_FORECAST_DATA = {
    hourly24: {
        labels: [
            '12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', 
            '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'
        ],
        actual: [1.1, 0.8, 0.7, 1.4, 3.2, 2.6, 2.9, 4.3, 4.8, 6.2, 5.4, 2.5],
        predicted: [1.0, 0.8, 0.7, 1.2, 3.0, 2.4, 2.8, 4.0, 4.5, 5.8, 5.0, 2.3],
        confUpper: [1.3, 1.0, 0.9, 1.6, 3.5, 2.9, 3.4, 4.7, 5.2, 6.7, 5.8, 2.8],
        confLower: [0.7, 0.6, 0.5, 0.8, 2.5, 1.9, 2.2, 3.3, 3.8, 4.9, 4.2, 1.8],
        peakThreshold: 4.8
    },
    hourly48: {
        labels: [
            'Day1 12A', 'Day1 4A', 'Day1 8A', 'Day1 12P', 'Day1 4P', 'Day1 8P',
            'Day2 12A', 'Day2 4A', 'Day2 8A', 'Day2 12P', 'Day2 4P', 'Day2 8P'
        ],
        actual: [1.1, 0.7, 3.2, 2.9, 4.8, 5.4, 1.0, 0.6, 3.1, 2.8, 4.5, 5.2],
        predicted: [1.0, 0.7, 3.0, 2.8, 4.5, 5.0, 0.9, 0.6, 2.9, 2.7, 4.2, 4.9],
        confUpper: [1.3, 0.9, 3.5, 3.3, 5.2, 5.8, 1.2, 0.8, 3.4, 3.2, 4.9, 5.6],
        confLower: [0.7, 0.5, 2.5, 2.3, 3.8, 4.2, 0.6, 0.4, 2.4, 2.2, 3.5, 4.1],
        peakThreshold: 4.8
    }
};

// Explainable Alerts & Recommendations
const ENERGYWISE_ALERTS = [
    {
        id: 'alt-101',
        type: 'Peak Demand Warning',
        severity: 'warning',
        icon: 'fa-bolt-lightning',
        title: 'Projected Peak Surge (5.8 kW) at 6:30 PM',
        rootCause: 'HVAC scheduled cycle overlaps with EV charger plug-in and dinner induction cooktop during Tier-2 tariff ($0.32/kWh).',
        expectedImpact: 'Reduces peak demand by 2.8 kW and avoids $1.42 surge tariff surcharge today.',
        savings: 'Save $42.60 / month & 18.2 kg CO₂',
        recommendedAction: 'Shift EV Wallbox charging to 11:30 PM and pre-cool living room to 22°C between 4:00 PM – 5:30 PM.',
        status: 'pending',
        timestamp: '12 mins ago'
    },
    {
        id: 'alt-102',
        type: 'High Energy Usage Alert',
        severity: 'critical',
        icon: 'fa-triangle-exclamation',
        title: 'Water Heater Continuous Standby Draw',
        rootCause: 'Geyser thermostat idle for 3.5 hours maintaining 65°C water while home is unoccupied (Zero Wi-Fi occupants detected).',
        expectedImpact: 'Stops 2.5 kW standby heat dissipation.',
        savings: 'Save $14.20 / month & 6.8 kg CO₂',
        recommendedAction: 'Engage Smart Off timer immediately; reheat 20 minutes prior to scheduled return at 6:30 PM.',
        status: 'pending',
        timestamp: '25 mins ago'
    },
    {
        id: 'alt-103',
        type: 'Weather-Related Recommendation',
        severity: 'info',
        icon: 'fa-sun',
        title: 'Solar Surplus Opportunity: 3.8 kW Generation Peak',
        rootCause: 'Clear sky solar irradiance exceeding 880 W/m² between 12:30 PM – 3:30 PM. Grid solar index is 84% clean.',
        expectedImpact: '100% solar self-consumption, zero grid tariff purchase.',
        savings: 'Save $0.85 per heavy appliance cycle',
        recommendedAction: 'Trigger delayed laundry wash cycle and pre-charge battery storage now.',
        status: 'pending',
        timestamp: '1 hour ago'
    },
    {
        id: 'alt-104',
        type: 'Energy-Saving Tip',
        severity: 'info',
        icon: 'fa-lightbulb',
        title: 'Vampire Load Mitigation Active',
        rootCause: 'Smart entertainment strip automatically severed 95W of idle AV receiver and gaming console power.',
        expectedImpact: 'Conserves 2.28 kWh per day of passive drain.',
        savings: 'Saving $10.95 / month',
        recommendedAction: 'Keep scheduled cutoff rule enabled.',
        status: 'approved',
        timestamp: '3 hours ago'
    }
];

// Admin Dashboard Fleet Overview Data
const ENERGYWISE_ADMIN_FLEET = {
    totalBuildings: 148,
    activeMeters: 620,
    aggregateCurrentMw: 4.82,
    todayTotalMwh: 48.6,
    substationLoadPct: 68.4,
    aiForecastAccuracyMape: '3.8%',
    r2Score: 0.958,
    modelLatencyMs: '42 ms',
    modelStatus: 'Optimal (No Concept Drift)',
    buildingsSummary: [
        { name: 'GreenWood Residences (Cluster A)', type: 'Home', meters: 42, currentKw: 144.2, peakRisk: 'Normal', status: 'Online' },
        { name: 'Apex Institute Science Campus', type: 'Campus', meters: 18, currentKw: 142.5, peakRisk: 'Moderate', status: 'Online' },
        { name: 'Nexus Tech Tower Commercial', type: 'Office', meters: 34, currentKw: 48.6, peakRisk: 'Normal', status: 'Online' },
        { name: 'Precision Dynamics Heavy Fab', type: 'Industry', meters: 8, currentKw: 310.0, peakRisk: 'High Peak Demand', status: 'Optimizing' },
        { name: 'Metro Civic Health Center', type: 'Office', meters: 12, currentKw: 62.4, peakRisk: 'Normal', status: 'Online' }
    ]
};
