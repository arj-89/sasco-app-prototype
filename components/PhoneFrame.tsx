"use client";

import type { ReactNode } from "react";

// Logical iPhone 16 Plus dimensions
const SCREEN_W = 430;
const SCREEN_H = 932;
const FRAME_PAD = 15;
const FRAME_W = SCREEN_W + FRAME_PAD * 2;
const FRAME_H = SCREEN_H + FRAME_PAD * 2;
const ISLAND_W = 126;
const ISLAND_H = 37;
const ISLAND_TOP = 11;

type Props = {
  scale: number;
  children: ReactNode;
};

export default function PhoneFrame({ scale, children }: Props) {
  return (
    <div
      className="phoneOuter"
      style={{
        width: FRAME_W * scale,
        height: FRAME_H * scale,
        borderRadius: 60 * scale,
        background: "#0A0A0A",
        boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Screen area */}
      <div
        style={{
          position: "absolute",
          left: FRAME_PAD * scale,
          top: FRAME_PAD * scale,
          width: SCREEN_W * scale,
          height: SCREEN_H * scale,
          borderRadius: 50 * scale,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {children}
      </div>

      {/* Dynamic Island */}
      <div
        style={{
          position: "absolute",
          left: (FRAME_PAD + (SCREEN_W - ISLAND_W) / 2) * scale,
          top: (FRAME_PAD + ISLAND_TOP) * scale,
          width: ISLAND_W * scale,
          height: ISLAND_H * scale,
          borderRadius: 18.5 * scale,
          background: "#000",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
