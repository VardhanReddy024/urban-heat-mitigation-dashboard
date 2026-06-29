import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Hotspot } from '../../types';
import { HOTSPOTS } from '../../data/sampleData';
import { FiMaximize2, FiRadio } from 'react-icons/fi';

interface IndiaMapProps {
  hotspots?: Hotspot[];
  onSelectHotspot?: (hotspot: Hotspot) => void;
  selectedHotspotId?: string;
  height?: string;
  showControls?: boolean;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  hotspots = HOTSPOTS,
  onSelectHotspot,
  selectedHotspotId,
  height = '480px',
  showControls = true
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<'thermal' | 'ndvi' | 'albedo'>('thermal');
  const markersRef = useRef<{ [key: string]: L.CircleMarker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [21.7679, 78.8718],
        zoom: 5,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Dark Matter tile layer for deep space satellite look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd',
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapRef.current = map;

      // Ensure correct sizing inside flex/grid layouts
      setTimeout(() => {
        try { map.invalidateSize(); } catch (e) { /* noop */ }
      }, 250);
    }

    const map = mapRef.current;

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    hotspots.forEach((hotspot) => {
      let color = '#4DA3FF'; // ISRO blue
      let radius = 10;
      
      if (hotspot.riskLevel === 'Critical') {
        color = '#FF4D4F'; // ISRO danger red
        radius = 16;
      } else if (hotspot.riskLevel === 'High') {
        color = '#FF8A00'; // ISRO orange
        radius = 14;
      } else if (hotspot.riskLevel === 'Moderate') {
        color = '#F59E0B'; // amber
        radius = 12;
      }

      // Glowing outer halo
      const halo = L.circleMarker([hotspot.lat, hotspot.lng], {
        radius: radius + 10,
        fillColor: color,
        fillOpacity: 0.2,
        color: color,
        weight: 1.5,
        opacity: 0.5
      }).addTo(map);

      const marker = L.circleMarker([hotspot.lat, hotspot.lng], {
        radius: radius,
        fillColor: color,
        fillOpacity: activeLayer === 'thermal' ? 0.9 : 0.7,
        color: '#FFFFFF',
        weight: selectedHotspotId === hotspot.id ? 3 : 1.5,
        opacity: 1
      }).addTo(map);

      const popupContent = `
        <div style="min-width: 230px; font-family: 'Inter', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: ${color}; box-shadow: 0 0 8px ${color};"></span>
              <h4 style="font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 16px; margin: 0; color: #fff; letter-spacing: -0.5px;">
                ${hotspot.city}
              </h4>
            </div>
            <span style="background: ${color}; color: ${hotspot.riskLevel === 'Low' ? '#000' : '#fff'}; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; font-family: 'Space Grotesk', sans-serif;">
              ${hotspot.riskLevel}
            </span>
          </div>
          <div style="font-size: 12px; color: #cbd5e1; margin-bottom: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div style="background: rgba(255,255,255,0.05); padding: 6px 8px; border-radius: 8px;">
              <span style="font-size: 9px; color: #94a3b8; text-transform: uppercase; display: block;">Temperature</span>
              <span style="color: #FF8A00; font-weight: 800; font-size: 15px; font-family: 'Space Grotesk', sans-serif;">${hotspot.temperature}°C</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 6px 8px; border-radius: 8px;">
              <span style="font-size: 9px; color: #94a3b8; text-transform: uppercase; display: block;">Heat Index</span>
              <span style="color: #FF4D4F; font-weight: 800; font-size: 15px; font-family: 'Space Grotesk', sans-serif;">${hotspot.heatIndex}°C</span>
            </div>
          </div>
          <div style="background: rgba(255,138,0,0.12); border-left: 3px solid #FF8A00; padding: 8px; border-radius: 6px; font-size: 11px; color: #fff;">
            <strong style="color: #FF8A00; font-size: 10px; text-transform: uppercase; display: block; margin-bottom: 2px;">AI Recommended Action</strong>
            ${hotspot.recommendedAction}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectHotspot) {
          onSelectHotspot(hotspot);
        }
      });

      markersRef.current[hotspot.id] = marker;
      markersRef.current[`halo-${hotspot.id}`] = halo;
    });

  }, [hotspots, onSelectHotspot, selectedHotspotId, activeLayer]);

  useEffect(() => {
    if (selectedHotspotId && mapRef.current && markersRef.current[selectedHotspotId]) {
      const hotspot = hotspots.find((h) => h.id === selectedHotspotId);
      if (hotspot) {
        mapRef.current.setView([hotspot.lat, hotspot.lng], 9, { animate: true, duration: 1 });
        markersRef.current[selectedHotspotId].openPopup();
      }
    }
  }, [selectedHotspotId, hotspots]);

  // Clean up the Leaflet instance on unmount to avoid "Map container already initialized"
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        try { mapRef.current.remove(); } catch (e) { /* noop */ }
        mapRef.current = null;
        markersRef.current = {};
      }
    };
  }, []);

  const handleZoomReset = () => {
    if (mapRef.current) {
      mapRef.current.setView([21.7679, 78.8718], 5, { animate: true });
    }
  };

  return (
    <div className="relative rounded-[18px] overflow-hidden border border-white/10 hover:border-[#FF8A00]/40 transition-all duration-300 shadow-2xl group bg-[#081528] flex flex-col h-full">
      {showControls && (
        <div className="absolute top-4 left-4 z-[400] flex flex-wrap items-center gap-2">
          <div className="glass-panel px-3.5 py-2 rounded-xl text-xs font-space font-bold flex items-center space-x-2 border border-white/15 shadow-xl bg-[#07111F]/90 text-white">
            <FiRadio className="text-[#FF8A00] animate-pulse" />
            <span className="text-slate-300">Satellite Layer:</span>
            <select
              value={activeLayer}
              onChange={(e) => setActiveLayer(e.target.value as any)}
              className="bg-white/10 text-white rounded-lg px-2 py-0.5 text-xs outline-none border border-white/10 focus:border-[#FF8A00] font-bold cursor-pointer"
            >
              <option value="thermal" className="bg-[#07111F]">INSAT-3DR LST Thermal Heat</option>
              <option value="ndvi" className="bg-[#07111F]">Sentinel-2 NDVI Canopy</option>
              <option value="albedo" className="bg-[#07111F]">Landsat-8 Albedo Reflectivity</option>
            </select>
          </div>

          <button
            onClick={handleZoomReset}
            className="glass-panel px-3.5 py-2 rounded-xl text-xs font-space font-bold hover:bg-white/15 transition flex items-center border border-white/15 shadow-xl text-white bg-[#07111F]/90"
            title="Reset Map View to All India"
          >
            <FiMaximize2 className="mr-1.5 text-[#FF8A00]" /> Reset View
          </button>
        </div>
      )}

      {/* Quick city jump list */}
      {showControls && (
        <div className="absolute top-4 right-4 z-[400] hidden sm:flex flex-col gap-1 glass-panel p-2.5 rounded-xl border border-white/15 max-h-[340px] overflow-y-auto bg-[#07111F]/90 shadow-2xl min-w-[150px]">
          <span className="text-[10px] font-space uppercase tracking-wider text-[#FF8A00] font-black px-2 pb-1 border-b border-white/10">
            Critical Hotspots
          </span>
          {hotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.setView([h.lat, h.lng], 9);
                  if (markersRef.current[h.id]) markersRef.current[h.id].openPopup();
                  if (onSelectHotspot) onSelectHotspot(h);
                }
              }}
              className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-space transition flex items-center justify-between ${
                selectedHotspotId === h.id ? 'bg-[#FF8A00] text-[#07111F] font-black shadow-md' : 'hover:bg-white/10 text-slate-200 font-bold'
              }`}
            >
              <span>{h.city}</span>
              <span className={`w-2 h-2 rounded-full ml-2 ${
                h.riskLevel === 'Critical' ? 'bg-[#FF4D4F] animate-pulse' :
                h.riskLevel === 'High' ? 'bg-[#FF8A00]' : 'bg-[#F59E0B]'
              }`} />
            </button>
          ))}
        </div>
      )}

      {/* The Map */}
      <div ref={mapContainerRef} style={{ height, width: '100%', minHeight: '380px' }} className="w-full" />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400] glass-panel px-4 py-2.5 rounded-xl text-xs font-space flex flex-wrap items-center gap-4 border border-white/15 shadow-xl bg-[#07111F]/90 text-white backdrop-blur-xl">
        <span className="text-[#FF8A00] font-black uppercase tracking-wider text-[10px]">LST Risk Overlay:</span>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF4D4F] animate-pulse shadow-[0_0_8px_#FF4D4F]" />
          <span className="font-bold text-slate-200">Critical (&gt;43°C)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF8A00] shadow-[0_0_8px_#FF8A00]" />
          <span className="font-bold text-slate-200">High (39-43°C)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-[#4DA3FF] shadow-[0_0_8px_#4DA3FF]" />
          <span className="font-bold text-slate-200">Moderate (&lt;39°C)</span>
        </div>
      </div>
    </div>
  );
};
