"use client";

import "ol/ol.css";
import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Style, Icon, Stroke } from "ol/style";
import Overlay from "ol/Overlay";

import type { MapPin } from "@/lib/types";

interface OpenLayersMapInnerProps {
  pins: MapPin[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height: number;
}

const GOLD_PIN_SVG = encodeURIComponent(`
<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e8c878;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <path d="M14 2 C8 2 4 6 4 12 C4 20 14 26 14 26 C14 26 24 20 24 12 C24 6 20 2 14 2 Z" 
        fill="url(#grad)" 
        stroke="#fff" 
        stroke-width="2" 
        filter="url(#shadow)" />
</svg>
`);

export default function OpenLayersMapInner({
  pins,
  center,
  zoom = 8,
  height,
}: OpenLayersMapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [popupData, setPopupData] = useState<{ label: string; day?: number } | null>(null);

  useEffect(() => {
    if (mapRef.current) return;
    if (!mapContainerRef.current || !popupRef.current) return;

    // Calculate map center
    const mapCenter =
      center?.lat && center?.lng
        ? [center.lng, center.lat]
        : pins.length > 0
        ? [
            pins.reduce((s, p) => s + p.lng, 0) / pins.length,
            pins.reduce((s, p) => s + p.lat, 0) / pins.length,
          ]
        : [78.0, 32.2]; // Spiti Valley default [lng, lat]

    // Create Tile layer (Esri Dark Gray)
    const tileLayer = new TileLayer({
      source: new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        attributions:
          'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      }),
    });

    // Create Vector source and layer for pins and lines
    const vectorSource = new VectorSource();

    // ── Route polyline ─────────────────────────────────────────────────
    if (pins.length > 1) {
      const coords = pins
        .filter((p) => p.lat && p.lng)
        .map((p) => fromLonLat([p.lng, p.lat]));

      const lineFeature = new Feature({
        geometry: new LineString(coords),
      });

      lineFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: "#c9a84c",
            width: 2.5,
            lineDash: [8, 5],
          }),
        })
      );

      vectorSource.addFeature(lineFeature);
    }

    // ── Markers ────────────────────────────────────────────────────────
    const iconStyle = new Style({
      image: new Icon({
        src: `data:image/svg+xml;charset=utf-8,${GOLD_PIN_SVG}`,
        anchor: [0.5, 1], // Bottom center
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
      }),
    });

    pins.forEach((pin) => {
      if (!pin.lat || !pin.lng) return;

      const pointFeature = new Feature({
        geometry: new Point(fromLonLat([pin.lng, pin.lat])),
        pinData: pin, // Attach data for the popup
      });

      pointFeature.setStyle(iconStyle);
      vectorSource.addFeature(pointFeature);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // ── Popup Overlay ──────────────────────────────────────────────────
    const popupOverlay = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -32],
    });
    overlayRef.current = popupOverlay;

    // Initialize Map
    const map = new Map({
      target: mapContainerRef.current,
      layers: [tileLayer, vectorLayer],
      overlays: [popupOverlay],
      view: new View({
        center: fromLonLat(mapCenter),
        zoom: zoom,
      }),
    });

    // Handle clicks on markers
    map.on("click", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
      if (feature && feature.getGeometry()?.getType() === "Point") {
        const pinData = feature.get("pinData") as MapPin;
        setPopupData({ label: pinData.label, day: pinData.day });
        
        const coordinates = (feature.getGeometry() as Point).getCoordinates();
        popupOverlay.setPosition(coordinates);
      } else {
        popupOverlay.setPosition(undefined);
      }
    });
    
    // Change cursor on hover
    map.on("pointermove", (e) => {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel, {
        layerFilter: (layer) => layer === vectorLayer,
      });
      if (mapContainerRef.current) {
        mapContainerRef.current.style.cursor = hit ? "pointer" : "";
      }
    });

    mapRef.current = map;
    
    // Wait for the tile layer to load its initial tiles before hiding the skeleton
    tileLayer.getSource()?.on('tileloadend', () => {
        setLoaded(true);
    });
    
    // Fallback if tiles take too long or fail
    setTimeout(() => setLoaded(true), 1500);

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border)",
      }}
    >
      {!loaded && (
        <div
          className="skeleton"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            borderRadius: "var(--radius-md)",
          }}
        />
      )}
      
      <div
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div 
        ref={popupRef} 
        style={{ 
          display: popupData ? "block" : "none",
          position: "absolute",
        }}
        className="wc-popup-ol"
      >
        {popupData && (
          <div style={{
            background: "#1a1a26",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "10px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            color: "#f0ede8",
            padding: "8px 12px",
            minWidth: "110px",
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            textAlign: "center"
          }}>
            {popupData.day && (
              <div style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 600, marginBottom: "2px" }}>
                Day {popupData.day}
              </div>
            )}
            <strong>{popupData.label}</strong>
            <div style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #1a1a26"
            }} />
          </div>
        )}
      </div>
      
      <style>{`
        .ol-zoom {
          top: 10px;
          left: 10px;
        }
        .ol-control button {
          background-color: #1a1a26 !important;
          color: #a8a4a0 !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 4px;
        }
        .ol-control button:hover {
          background-color: #20202e !important;
          color: #c9a84c !important;
        }
        .ol-attribution {
          background: rgba(10,10,15,0.7) !important;
          color: #6b6870 !important;
          backdrop-filter: blur(4px);
          bottom: 0;
          right: 0;
          border-radius: 4px 0 0 0;
        }
        .ol-attribution a {
          color: #c9a84c !important;
        }
        .wc-popup-ol {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
