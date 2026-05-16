"use client";

import type { Screen } from "@/lib/flows";

type Props = {
  screen: Screen;
  scale: number;
  screenW: number;
  screenH: number;
};

export default function ScreenContent({ screen, scale, screenW, screenH }: Props) {
  if (screen.scrollable) {
    return (
      <div style={{ position: "relative", width: screenW * scale, height: screenH * scale, overflow: "hidden" }}>
        <div
          style={{ width: screenW * scale, height: screenH * scale, overflowY: "auto", overflowX: "hidden" }}
          className="noScrollbar"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screen.image}
            alt={screen.id}
            style={{ width: screenW * scale, height: "auto", display: "block" }}
          />
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={screen.image}
      alt={screen.id}
      width={screenW}
      height={screenH}
      style={{ width: screenW * scale, height: screenH * scale, display: "block" }}
      draggable={false}
    />
  );
}
