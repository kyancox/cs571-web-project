"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { Category } from "@/lib/activities";

// Matches the category accent tokens in globals.css.
const PIN_COLORS: Record<Category, string> = {
  Food: "#d9480f",
  Outdoors: "#2b8a3e",
  Campus: "#c5050c",
  Entertainment: "#7048e8",
  Attractions: "#1971c2",
};

type Props = {
  name: string;
  category: Category;
  coords: [number, number];
  mapsUrl: string;
};

/**
 * Interactive OpenStreetMap embed (Leaflet). Leaflet touches `window`, so it's
 * imported inside the effect to keep it out of the server render.
 */
export function ActivityMap({ name, category, coords, mapsUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [lat, lng] = coords;

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 16,
        // Don't hijack page scrolling until the user engages with the map.
        scrollWheelZoom: false,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const color = PIN_COLORS[category];
      const icon = L.divIcon({
        className: "",
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -38],
        html: `<svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.2 0 0 7.1 0 15.9 0 27.8 16 42 16 42s16-14.2 16-26.1C32 7.1 24.8 0 16 0z" fill="${color}" stroke="#fff" stroke-width="2"/>
          <circle cx="16" cy="16" r="6" fill="#fff"/>
        </svg>`,
      });

      const popup = document.createElement("strong");
      popup.textContent = name;
      L.marker([lat, lng], { icon, title: name }).addTo(map).bindPopup(popup);

      map.on("click focus", () => {
        map?.scrollWheelZoom.enable();
        setActive(true);
      });
      map.on("mouseout blur", () => {
        map?.scrollWheelZoom.disable();
        setActive(false);
      });
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lat, lng, name, category]);

  return (
    <div className="relative isolate h-[320px] overflow-hidden rounded-[10px] border border-line bg-lake-soft sm:h-[400px]">
      <div
        ref={containerRef}
        className="size-full"
        role="region"
        aria-label={`Map showing ${name}`}
      />
      {!active && (
        <span className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-md bg-surface/90 px-2.5 py-1 text-xs text-muted shadow-card">
          Click the map to zoom with scroll
        </span>
      )}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 z-[1000] inline-flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5 text-sm font-medium text-lake shadow-card hover:underline"
      >
        Open in Google Maps <ExternalLink size={14} aria-hidden />
      </a>
    </div>
  );
}
