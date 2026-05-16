"use client";

import { useCallback, useRef } from "react";

type Props = {
  x: number;
  y: number;
  w: number;
  h: number;
  // Scale factor: logical px → rendered px (e.g. 0.8 if phone is scaled to 80%)
  scale: number;
  onClick: () => void;
  label?: string;
};

export default function TapZone({ x, y, w, h, scale, onClick, label }: Props) {
  const flashRef = useRef<HTMLDivElement>(null);

  const handlePress = useCallback(() => {
    const el = flashRef.current;
    if (el) {
      el.style.opacity = "1";
      setTimeout(() => { if (el) el.style.opacity = "0"; }, 120);
    }
    onClick();
  }, [onClick]);

  return (
    <div
      role="button"
      aria-label={label}
      style={{
        position: "absolute",
        left: x * scale,
        top: y * scale,
        width: w * scale,
        height: h * scale,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        zIndex: 10,
      }}
      onPointerDown={handlePress}
    >
      {/* Press flash overlay */}
      <div
        ref={flashRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.12)",
          borderRadius: 8,
          opacity: 0,
          transition: "opacity 120ms",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
