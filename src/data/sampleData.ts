import { Hotspot, KpiMetric, TemperatureTrendPoint, MonthlyHeatPoint, CorrelationPoint } from '../types';

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'delhi',
    city: 'Delhi',
    state: 'National Capital Territory',
    lat: 28.6139,
    lng: 77.2090,
    temperature: 44.8,
    heatIndex: 51.2,
    riskLevel: 'Critical',
    population: '33.8 Million',
    recommendedAction: 'Mandatory Cool Roofs & Miyawaki Urban Forests',
    concretePercent: 78.4,
    treeCoverPercent: 11.2,
    trafficDensity: 'Very High (4,200 vehicles/hr)',
    humidity: 42,
    windSpeed: 8.5,
    heatScore: 92,
    lastSatellitePass: '2026-04-12 10:32 IST',
    satelliteSensor: 'ISRO Bhuvan / Landsat 9 TIRS-2',
    shapFactors: [
      { factor: 'Impervious Concrete Surface (78.4%)', contribution: 38, impact: 'negative' },
      { factor: 'Low Urban Tree Canopy (11.2%)', contribution: 26, impact: 'negative' },
      { factor: 'Vehicular & Industrial Exhaust', contribution: 18, impact: 'negative' },
      { factor: 'Yamuna River Corridor Cooling', contribution: 10, impact: 'positive' }
    ],
    rootCauses: [
      'Dense high-rise concrete structures trapping longwave daytime thermal radiation',
      'Severe deficit of permeable soil and urban green canopy in central zones',
      'High anthropogenic heat discharge from air conditioning units and vehicular traffic',
      'Low surface albedo asphalt roadways absorbing extreme solar insolation'
    ],
    recommendations: [
      {
        id: 'del-1',
        action: 'Increase urban tree cover by 20% along arterial corridors & industrial clusters',
        category: 'Vegetation',
        expectedTempReduction: '1.8 - 2.5°C',
        costEstimate: '₹45 Crore',
        timeline: '18 Months',
        feasibilityScore: 88
      },
      {
        id: 'del-2',
        action: 'Implement high-albedo reflective cool roofs across 60% of commercial zones',
        category: 'Albedo',
        expectedTempReduction: '2.1 - 3.0°C',
        costEstimate: '₹28 Crore',
        timeline: '9 Months',
        feasibilityScore: 95
      },
      {
        id: 'del-3',
        action: 'Install solar-reflective titanium dioxide pavement coatings on major junctions',
        category: 'Infrastructure',
        expectedTempReduction: '1.2 - 1.7°C',
        costEstimate: '₹32 Crore',
        timeline: '12 Months',
        feasibilityScore: 82
      },
      {
        id: 'del-4',
        action: 'Rejuvenate 14 decentralized urban water bodies & micro-wetland buffers',
        category: 'Water',
        expectedTempReduction: '0.9 - 1.4°C',
        costEstimate: '₹19 Crore',
        timeline: '14 Months',
        feasibilityScore: 90
      }
    ]
  },
  {
    id: 'ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    lat: 23.0225,
    lng: 72.5714,
    temperature: 43.5,
    heatIndex: 49.8,
    riskLevel: 'Critical',
    population: '8.8 Million',
    recommendedAction: 'Scale Ahmedabad Heat Action Plan (HAP) Cool Roofs',
    concretePercent: 74.1,
    treeCoverPercent: 12.8,
    trafficDensity: 'High (3,100 vehicles/hr)',
    humidity: 38,
    windSpeed: 11.2,
    heatScore: 88,
    lastSatellitePass: '2026-04-12 10:45 IST',
    satelliteSensor: 'ISRO Bhuvan / Resourcesat-2A',
    shapFactors: [
      { factor: 'Arid Climatology & Low Soil Moisture', contribution: 32, impact: 'negative' },
      { factor: 'High Built-up Density (74.1%)', contribution: 30, impact: 'negative' },
      { factor: 'Existing HAP Cool Roof Pilot (15%)', contribution: 12, impact: 'positive' },
      { factor: 'Industrial Corridor Thermal Emissions', contribution: 16, impact: 'negative' }
    ],
    rootCauses: [
      'Semi-arid climate compounded by rapid urban expansion converting agricultural buffers',
      'High thermal mass building materials (dark brick & unpainted RCC concrete)',
      'Heat retention in dense commercial zones (Relief Road & Ashram Road pockets)'
    ],
    recommendations: [
      {
        id: 'ahm-1',
        action: 'Mandate white lime-reflective coating on all slum & low-income housing rooftops',
        category: 'Albedo',
        expectedTempReduction: '2.5 - 3.2°C',
        costEstimate: '₹18 Crore',
        timeline: '6 Months',
        feasibilityScore: 98
      },
      {
        id: 'ahm-2',
        action: 'Increase Sabarmati Riverfront green buffer belt by planting 50,000 native neem trees',
        category: 'Vegetation',
        expectedTempReduction: '1.5 - 2.2°C',
        costEstimate: '₹22 Crore',
        timeline: '12 Months',
        feasibilityScore: 91
      },
      {
        id: 'ahm-3',
        action: 'Deploy automated misting stations at transit hubs during peak heatwave alerts',
        category: 'Water',
        expectedTempReduction: '1.0 - 1.5°C',
        costEstimate: '₹8 Crore',
        timeline: '4 Months',
        feasibilityScore: 94
      }
    ]
  },
  {
    id: 'nagpur',
    city: 'Nagpur',
    state: 'Maharashtra',
    lat: 21.1458,
    lng: 79.0882,
    temperature: 43.1,
    heatIndex: 48.9,
    riskLevel: 'High',
    population: '3.2 Million',
    recommendedAction: 'Urban Lakes Restoration & Permeable Green Corridors',
    concretePercent: 68.5,
    treeCoverPercent: 18.4,
    trafficDensity: 'Moderate (2,400 vehicles/hr)',
    humidity: 35,
    windSpeed: 9.0,
    heatScore: 83,
    lastSatellitePass: '2026-04-12 10:52 IST',
    satelliteSensor: 'Sentinel-3 SLSTR Thermal',
    shapFactors: [
      { factor: 'Geographical Center Continental Heat', contribution: 34, impact: 'negative' },
      { factor: 'Urban Sprawl over Natural Drainage', contribution: 24, impact: 'negative' },
      { factor: 'Ambazari & Futala Lake Evaporation', contribution: 15, impact: 'positive' }
    ],
    rootCauses: [
      'Inland geographical location experiencing intense dry summer heat waves',
      'Gradual encroachment upon urban water bodies reducing natural evaporative cooling',
      'Heat island formation in Sitabuldi and Itwari dense commercial sectors'
    ],
    recommendations: [
      {
        id: 'nag-1',
        action: 'Rehabilitate Ambazari & Gorewada lake periphery with dense riparian vegetation',
        category: 'Water',
        expectedTempReduction: '1.6 - 2.3°C',
        costEstimate: '₹25 Crore',
        timeline: '15 Months',
        feasibilityScore: 89
      },
      {
        id: 'nag-2',
        action: 'Convert 35 km of central road medians into multi-layered green bioswales',
        category: 'Vegetation',
        expectedTempReduction: '1.2 - 1.9°C',
        costEstimate: '₹14 Crore',
        timeline: '10 Months',
        feasibilityScore: 92
      }
    ]
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    lat: 17.3850,
    lng: 78.4867,
    temperature: 41.9,
    heatIndex: 47.4,
    riskLevel: 'High',
    population: '11.0 Million',
    recommendedAction: 'IT Corridor Reflective Pavements & Lake Conservation',
    concretePercent: 71.3,
    treeCoverPercent: 16.5,
    trafficDensity: 'High (3,400 vehicles/hr)',
    humidity: 48,
    windSpeed: 10.4,
    heatScore: 81,
    lastSatellitePass: '2026-04-12 11:05 IST',
    satelliteSensor: 'ISRO RISAT-1A / EOS-04',
    shapFactors: [
      { factor: 'Deccan Plateau Rocky Granite Topography', contribution: 28, impact: 'negative' },
      { factor: 'Rapid IT Corridor Glass & Concrete Sprawl', contribution: 32, impact: 'negative' },
      { factor: 'Hussain Sagar & Osman Sagar Lakes', contribution: 14, impact: 'positive' }
    ],
    rootCauses: [
      'High proportion of heat-storing granite rock and concrete in HITEC City & Gachibowli',
      'Loss of traditional Cheruvu (lakes) due to real estate development',
      'Urban canyon effect trapping vehicular heat along Begumpet and LB Nagar roads'
    ],
    recommendations: [
      {
        id: 'hyd-1',
        action: 'Mandate 30% green roof garden coverage for all commercial IT park developments',
        category: 'Vegetation',
        expectedTempReduction: '1.9 - 2.8°C',
        costEstimate: '₹38 Crore',
        timeline: '12 Months',
        feasibilityScore: 90
      },
      {
        id: 'hyd-2',
        action: 'Install reflective porous asphalt on Cyberabad network roads to reduce surface heat',
        category: 'Infrastructure',
        expectedTempReduction: '1.4 - 2.1°C',
        costEstimate: '₹29 Crore',
        timeline: '9 Months',
        feasibilityScore: 86
      }
    ]
  },
  {
    id: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    lat: 13.0827,
    lng: 80.2707,
    temperature: 39.4,
    heatIndex: 50.6,
    riskLevel: 'High',
    population: '12.2 Million',
    recommendedAction: 'Coastal Wind Corridor Preservation & Urban Sponge Parks',
    concretePercent: 75.8,
    treeCoverPercent: 14.1,
    trafficDensity: 'High (3,600 vehicles/hr)',
    humidity: 76,
    windSpeed: 14.5,
    heatScore: 85,
    lastSatellitePass: '2026-04-12 11:18 IST',
    satelliteSensor: 'ISRO Bhuvan / Oceansat-3',
    shapFactors: [
      { factor: 'Extreme Relative Humidity (76%)', contribution: 40, impact: 'negative' },
      { factor: 'Coastal Sea Breeze Penetration', contribution: 22, impact: 'positive' },
      { factor: 'High Concrete Built-up (75.8%)', contribution: 28, impact: 'negative' }
    ],
    rootCauses: [
      'High coastal humidity causing extreme apparent Heat Index despite sub-40°C air temps',
      'High-rise coastal construction blocking natural sea breeze cooling penetration inland',
      'Loss of Pallikaranai marshland buffer reducing natural thermal dissipation'
    ],
    recommendations: [
      {
        id: 'che-1',
        action: 'Establish coastal ventilation corridors by regulating building heights near Marina & Besant Nagar',
        category: 'Infrastructure',
        expectedTempReduction: '1.5 - 2.3°C',
        costEstimate: '₹12 Crore',
        timeline: '6 Months',
        feasibilityScore: 84
      },
      {
        id: 'che-2',
        action: 'Construct 25 urban sponge parks with native wetland flora across flood-prone thermal hotspots',
        category: 'Water',
        expectedTempReduction: '1.7 - 2.4°C',
        costEstimate: '₹34 Crore',
        timeline: '16 Months',
        feasibilityScore: 93
      }
    ]
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    lat: 12.9716,
    lng: 77.5946,
    temperature: 37.8,
    heatIndex: 42.1,
    riskLevel: 'Moderate',
    population: '14.0 Million',
    recommendedAction: 'Restore Kalyani Lake Chain & Preserve Cubbon/Lalbagh Canopy',
    concretePercent: 69.2,
    treeCoverPercent: 22.6,
    trafficDensity: 'Very High (4,500 vehicles/hr)',
    humidity: 54,
    windSpeed: 12.0,
    heatScore: 71,
    lastSatellitePass: '2026-04-12 11:30 IST',
    satelliteSensor: 'Landsat 9 / Sentinel-2A Multispectral',
    shapFactors: [
      { factor: 'Elevated Plateau Altitude (900m ASL)', contribution: 30, impact: 'positive' },
      { factor: 'Rapid Tree Canopy Loss since 2010 (-42%)', contribution: 35, impact: 'negative' },
      { factor: 'Cubbon Park & Lalbagh Green Lungs', contribution: 18, impact: 'positive' },
      { factor: 'Severe Traffic Congestion Exhaust', contribution: 20, impact: 'negative' }
    ],
    rootCauses: [
      'Dramatic loss of historical urban tree canopy and lake networks over the last two decades',
      'High vehicular traffic congestion generating concentrated localized heat domes in Silk Board & Whitefield',
      'High-density glass facade corporate campuses reflecting heat into surrounding neighborhoods'
    ],
    recommendations: [
      {
        id: 'ben-1',
        action: 'Connect and restore 18 interconnected Bellandur & Varthur feeder lake ecological buffers',
        category: 'Water',
        expectedTempReduction: '2.0 - 2.7°C',
        costEstimate: '₹55 Crore',
        timeline: '24 Months',
        feasibilityScore: 87
      },
      {
        id: 'ben-2',
        action: 'Increase urban tree density by planting 1,00,000 Tabebuia and Rain trees along Metro lines',
        category: 'Vegetation',
        expectedTempReduction: '1.8 - 2.6°C',
        costEstimate: '₹30 Crore',
        timeline: '18 Months',
        feasibilityScore: 94
      }
    ]
  }
];

export const KPI_METRICS: KpiMetric[] = [
  {
    id: 'hotspots',
    title: 'Total Hotspots',
    value: 48,
    change: '+6 Zones vs 2025',
    isPositive: false,
    icon: 'FiAlertTriangle',
    description: 'Identified by ISRO Bhuvan Thermal Mapping across 32 urban agglomerations'
  },
  {
    id: 'avg-temp',
    title: 'Average Temperature',
    value: '41.8°C',
    change: '+2.4°C Anomaly',
    isPositive: false,
    icon: 'FiThermometer',
    description: 'Mean Land Surface Temperature (LST) across monitored urban centers'
  },
  {
    id: 'risk-zones',
    title: 'High Risk Zones',
    value: 19,
    change: '-3 Zones mitigated',
    isPositive: true,
    icon: 'FiShield',
    description: 'Sectors requiring immediate municipal intervention before peak May insolation'
  },
  {
    id: 'cooling-projects',
    title: 'Recommended Cooling Projects',
    value: 142,
    change: '24 Active AI Pilots',
    isPositive: true,
    icon: 'FiCheckCircle',
    description: 'AI-generated urban planning strategies optimized for maximum °C reduction'
  }
];

export const TEMPERATURE_TREND_DATA: TemperatureTrendPoint[] = [
  { year: '2019', avgTemp: 38.2, observed: 38.2, predicted: 38.0, heatIndex: 42.5, baseline: 37.0 },
  { year: '2020', avgTemp: 37.8, observed: 37.8, predicted: 37.9, heatIndex: 41.8, baseline: 37.0 },
  { year: '2021', avgTemp: 38.9, observed: 38.9, predicted: 38.8, heatIndex: 43.6, baseline: 37.0 },
  { year: '2022', avgTemp: 39.6, observed: 39.6, predicted: 39.7, heatIndex: 44.9, baseline: 37.0 },
  { year: '2023', avgTemp: 40.4, observed: 40.4, predicted: 40.5, heatIndex: 46.2, baseline: 37.0 },
  { year: '2024', avgTemp: 41.1, observed: 41.1, predicted: 41.2, heatIndex: 47.8, baseline: 37.0 },
  { year: '2025', avgTemp: 41.6, observed: 41.6, predicted: 41.7, heatIndex: 48.5, baseline: 37.0 },
  { year: '2026', avgTemp: 41.8, observed: 41.8, predicted: 41.9, heatIndex: 49.3, baseline: 37.0 }
];

export const RISK_DISTRIBUTION = [
  { name: 'Critical Risk', value: 18, color: '#EF4444' },
  { name: 'High Risk', value: 34, color: '#FF7A00' },
  { name: 'Moderate Risk', value: 32, color: '#F59E0B' },
  { name: 'Low / Mitigated', value: 16, color: '#10B981' }
];

export const MONTHLY_HEAT_INCREASE: MonthlyHeatPoint[] = [
  { month: 'Jan', delhi: 21.2, ahmedabad: 28.1, hyderabad: 29.5, chennai: 30.2, bengaluru: 27.8, nagpur: 28.4 },
  { month: 'Feb', delhi: 25.4, ahmedabad: 31.5, hyderabad: 33.1, chennai: 32.0, bengaluru: 30.4, nagpur: 32.2 },
  { month: 'Mar', delhi: 33.8, ahmedabad: 37.2, hyderabad: 37.8, chennai: 34.8, bengaluru: 34.2, nagpur: 37.9 },
  { month: 'Apr', delhi: 41.5, ahmedabad: 41.8, hyderabad: 40.5, chennai: 37.5, bengaluru: 36.5, nagpur: 41.8 },
  { month: 'May', delhi: 45.2, ahmedabad: 44.1, hyderabad: 42.4, chennai: 39.8, bengaluru: 38.1, nagpur: 44.5 },
  { month: 'Jun', delhi: 43.6, ahmedabad: 41.2, hyderabad: 38.6, chennai: 38.9, bengaluru: 34.5, nagpur: 40.2 },
  { month: 'Jul', delhi: 36.8, ahmedabad: 34.5, hyderabad: 32.4, chennai: 36.2, bengaluru: 29.8, nagpur: 32.8 },
  { month: 'Aug', delhi: 35.2, ahmedabad: 33.1, hyderabad: 31.8, chennai: 35.4, bengaluru: 29.1, nagpur: 31.5 },
  { month: 'Sep', delhi: 35.8, ahmedabad: 35.0, hyderabad: 32.5, chennai: 35.8, bengaluru: 29.6, nagpur: 33.1 },
  { month: 'Oct', delhi: 33.4, ahmedabad: 36.2, hyderabad: 32.8, chennai: 33.5, bengaluru: 29.4, nagpur: 34.0 },
  { month: 'Nov', delhi: 28.5, ahmedabad: 32.4, hyderabad: 30.1, chennai: 31.2, bengaluru: 28.2, nagpur: 30.5 },
  { month: 'Dec', delhi: 23.0, ahmedabad: 29.0, hyderabad: 28.5, chennai: 29.8, bengaluru: 26.9, nagpur: 28.1 }
];

export const CORRELATION_DATA: CorrelationPoint[] = [
  { city: 'Delhi', sector: 'Connaught Place', vegetationIndex: 0.12, surfaceTemp: 45.4, urbanDensity: 88, albedo: 0.14 },
  { city: 'Delhi', sector: 'Lodi Gardens', vegetationIndex: 0.68, surfaceTemp: 38.2, urbanDensity: 22, albedo: 0.32 },
  { city: 'Delhi', sector: 'Dwarka Sector 14', vegetationIndex: 0.28, surfaceTemp: 43.1, urbanDensity: 74, albedo: 0.22 },
  { city: 'Hyderabad', sector: 'HITEC City', vegetationIndex: 0.18, surfaceTemp: 42.8, urbanDensity: 82, albedo: 0.18 },
  { city: 'Hyderabad', sector: 'KBR National Park', vegetationIndex: 0.72, surfaceTemp: 36.5, urbanDensity: 15, albedo: 0.34 },
  { city: 'Ahmedabad', sector: 'Relief Road', vegetationIndex: 0.10, surfaceTemp: 45.1, urbanDensity: 91, albedo: 0.15 },
  { city: 'Ahmedabad', sector: 'Sabarmati Riverfront Park', vegetationIndex: 0.58, surfaceTemp: 39.4, urbanDensity: 35, albedo: 0.28 },
  { city: 'Bengaluru', sector: 'Cubbon Park', vegetationIndex: 0.75, surfaceTemp: 33.8, urbanDensity: 18, albedo: 0.35 },
  { city: 'Bengaluru', sector: 'Whitefield Tech Park', vegetationIndex: 0.20, surfaceTemp: 39.8, urbanDensity: 78, albedo: 0.19 },
  { city: 'Chennai', sector: 'T. Nagar', vegetationIndex: 0.14, surfaceTemp: 41.5, urbanDensity: 86, albedo: 0.16 },
  { city: 'Chennai', sector: 'Guindy National Park', vegetationIndex: 0.70, surfaceTemp: 35.8, urbanDensity: 20, albedo: 0.31 },
  { city: 'Nagpur', sector: 'Sitabuldi', vegetationIndex: 0.15, surfaceTemp: 44.5, urbanDensity: 85, albedo: 0.17 },
  { city: 'Nagpur', sector: 'Ambazari Biodiversity Park', vegetationIndex: 0.65, surfaceTemp: 38.6, urbanDensity: 25, albedo: 0.30 }
];

export const RECENT_AI_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    city: 'Delhi',
    title: 'Connaught Place & ITO Cool Roof Mandate',
    action: 'Apply reflective elastomeric white coating across 4.2 sq.km of commercial rooftops',
    impact: 'Predicted reduction: 2.8°C',
    status: 'High Priority',
    timeframe: 'Pre-Summer 2026'
  },
  {
    id: 'rec-2',
    city: 'Ahmedabad',
    title: 'Sabarmati East Bank Miyawaki Forest Corridor',
    action: 'Plant 80,000 native drought-resistant saplings along 12km urban buffer',
    impact: 'Predicted reduction: 2.3°C',
    status: 'In Progress',
    timeframe: 'Q3 2026'
  },
  {
    id: 'rec-3',
    city: 'Hyderabad',
    title: 'Gachibowli Porous Reflective Road Resurfacing',
    action: 'Replace dark asphalt with permeable high-albedo concrete aggregate',
    impact: 'Predicted reduction: 1.9°C',
    status: 'Under Review',
    timeframe: 'Q4 2026'
  },
  {
    id: 'rec-4',
    city: 'Chennai',
    title: 'Velachery Urban Sponge Wetland Restoration',
    action: 'De-silt feeder channels & create floating retention vegetative beds',
    impact: 'Predicted reduction: 2.1°C',
    status: 'High Priority',
    timeframe: 'Immediate'
  }
];

export const RECENT_ALERTS = [
  {
    id: 'alt-1',
    title: 'Extreme LST Thermal Surge',
    city: 'Delhi',
    severity: 'Critical' as const,
    time: '14 mins ago',
    description: 'Daytime surface thermal imaging registered localized 46.2°C anomaly in Central Sector.',
    category: 'Extreme Heat Alert' as const
  },
  {
    id: 'alt-2',
    title: 'Apparent Heat Index Warning',
    city: 'Ahmedabad',
    severity: 'Critical' as const,
    time: '32 mins ago',
    description: 'High solar insolation & low humidity causing severe apparent heat risk across commercial wards.',
    category: 'Heatwave Warning' as const
  },
  {
    id: 'alt-3',
    title: 'Cool Roof Mandate Pilot Deployed',
    city: 'Hyderabad',
    severity: 'Info' as const,
    time: '1 hour ago',
    description: 'Reflective elastomeric white coating completed on 1.4 sq. km IT Park rooftops.',
    category: 'Cooling Project Update' as const
  },
  {
    id: 'alt-4',
    title: 'High Coastal Moisture Trapping',
    city: 'Chennai',
    severity: 'Warning' as const,
    time: '2 hours ago',
    description: 'Humidity exceeding 78% trapping longwave radiation; nocturnal cooling deficit detected.',
    category: 'Heatwave Warning' as const
  }
];
