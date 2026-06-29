export type NavTab = 'dashboard' | 'heatmap' | 'analytics' | 'ai-recommendations' | 'scenario-simulator' | 'reports' | 'alerts' | 'settings';

export type RiskLevel = 'Critical' | 'High' | 'Moderate' | 'Low';

export interface AlertItem {
  id: string;
  title: string;
  city: string;
  severity: 'Critical' | 'Warning' | 'Info';
  time: string;
  description: string;
  category: 'Extreme Heat Alert' | 'Heatwave Warning' | 'Cooling Project Update';
}

export interface Hotspot {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  temperature: number; // °C
  heatIndex: number;
  riskLevel: RiskLevel;
  population: string;
  recommendedAction: string;
  concretePercent: number;
  treeCoverPercent: number;
  trafficDensity: string;
  humidity: number;
  windSpeed: number;
  heatScore: number; // 0-100
  lastSatellitePass: string;
  satelliteSensor: string; // e.g., "Landsat 9 TIRS-2"
  shapFactors: { factor: string; contribution: number; impact: 'positive' | 'negative' }[];
  rootCauses: string[];
  recommendations: {
    id: string;
    action: string;
    category: 'Vegetation' | 'Albedo' | 'Water' | 'Infrastructure';
    expectedTempReduction: string;
    costEstimate: string;
    timeline: string;
    feasibilityScore: number;
  }[];
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: string;
  description: string;
}

export interface TemperatureTrendPoint {
  year: string;
  avgTemp: number;
  observed?: number;
  predicted?: number;
  heatIndex: number;
  baseline: number;
}

export interface MonthlyHeatPoint {
  month: string;
  delhi: number;
  ahmedabad: number;
  hyderabad: number;
  chennai: number;
  bengaluru: number;
  nagpur: number;
}

export interface CorrelationPoint {
  city: string;
  sector: string;
  vegetationIndex: number; // NDVI 0.1 to 0.8
  surfaceTemp: number; // °C
  urbanDensity: number; // % built-up
  albedo: number; // 0.1 to 0.5
}

export interface ScenarioControls {
  treePlantation: number; // 0 - 50 %
  coolRoof: number; // 0 - 100 %
  waterBodies: number; // 0 - 30 %
  reflectiveRoads: number; // 0 - 100 %
}

export interface ScenarioResult {
  baselineTemp: number;
  predictedTemp: number;
  tempReduction: number;
  baselineHeatIndex: number;
  predictedHeatIndex: number;
  coolingEfficiency: number;
  energySavings: number; // MWh/year
  carbonMitigated: number; // Tons CO2
  monthlyForecast: { month: string; baseline: number; simulated: number }[];
}

export interface ReportConfig {
  id: string;
  cityId: string;
  cityName: string;
  generatedDate: string;
  heatScore: number;
  riskLevel: RiskLevel;
  predictedTemp: number;
  interventionsApplied: { name: string; target: string }[];
  estimatedReduction: string;
  author: string;
}

export interface AppSettings {
  theme: 'isro-dark' | 'high-contrast';
  notifications: boolean;
  satelliteAutoRefresh: boolean;
  language: 'English' | 'Hindi' | 'Telugu' | 'Tamil' | 'Kannada';
  temperatureUnit: 'Celsius' | 'Fahrenheit';
  profileName: string;
  teamName: string;
  hackathonId: string;
}
