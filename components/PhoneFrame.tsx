"use client";

import type { ReactNode } from "react";

const SCREEN_W = 430;
const SCREEN_H = 932;
const FRAME_PAD = 14;
const FRAME_W = SCREEN_W + FRAME_PAD * 2;
const FRAME_H = SCREEN_H + FRAME_PAD * 2;
const ISLAND_W = 126;
const ISLAND_H = 37;
const ISLAND_TOP = 12;

type Props = {
  scale: number;
  children: ReactNode;
};

export default function PhoneFrame({ scale, children }: Props) {
  const S = scale;
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {/* Main frame body */}
      <div
        style={{
          width: FRAME_W * S,
          height: FRAME_H * S,
          borderRadius: 58 * S,
          background: "linear-gradient(160deg, #2a2a2a 0%, #111 40%, #0a0a0a 100%)",
          boxShadow: [
            `0 0 0 ${1 * S}px #3a3a3a`,           // thin outer rim
            `0 28px 80px rgba(0,0,0,0.5)`,          // deep ground shadow
            `0 8px 24px rgba(0,0,0,0.3)`,           // soft shadow
            `inset 0 1px 0 rgba(255,255,255,0.08)`, // top highlight
          ].join(", "),
          position: "relative",
        }}
      >
        {/* Screen area */}
        <div
          style={{
            position: "absolute",
            left: FRAME_PAD * S,
            top: FRAME_PAD * S,
            width: SCREEN_W * S,
            height: SCREEN_H * S,
            borderRadius: 47 * S,
            overflow: "hidden",
            background: "#000",
            // Inner screen edge
            boxShadow: `inset 0 0 0 ${1 * S}px rgba(0,0,0,0.8)`,
          }}
        >
          {children}
        </div>

        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            left: (FRAME_PAD + (SCREEN_W - ISLAND_W) / 2) * S,
            top: (FRAME_PAD + ISLAND_TOP) * S,
            width: ISLAND_W * S,
            height: ISLAND_H * S,
            borderRadius: 18.5 * S,
            background: "#000",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />

        {/* Right side buttons — power */}
        <div
          style={{
            position: "absolute",
            right: -3 * S,
            top: 180 * S,
            width: 4 * S,
            height: 80 * S,
            borderRadius: `0 ${3 * S}px ${3 * S}px 0`,
            background: "linear-gradient(90deg, #333, #222)",
            boxShadow: `${1 * S}px 0 0 rgba(255,255,255,0.06)`,
          }}
        />

        {/* Left side buttons — volume up */}
        <div
          style={{
            position: "absolute",
            left: -3 * S,
            top: 150 * S,
            width: 4 * S,
            height: 60 * S,
            borderRadius: `${3 * S}px 0 0 ${3 * S}px`,
            background: "linear-gradient(270deg, #333, #222)",
          }}
        />
        {/* Left — volume down */}
        <div
          style={{
            position: "absolute",
            left: -3 * S,
            top: 225 * S,
            width: 4 * S,
            height: 60 * S,
            borderRadius: `${3 * S}px 0 0 ${3 * S}px`,
            background: "linear-gradient(270deg, #333, #222)",
          }}
        />
        {/* Left — mute switch */}
        <div
          style={{
            position: "absolute",
            left: -3 * S,
            top: 110 * S,
            width: 4 * S,
            height: 34 * S,
            borderRadius: `${3 * S}px 0 0 ${3 * S}px`,
            background: "linear-gradient(270deg, #333, #222)",
          }}
        />
      </div>
    </div>
  );
}
