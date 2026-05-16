"use client";

import Image from "next/image";
import type { Screen } from "@/lib/flows";

type Props = {
  screen: Screen;
  scale: number;
  screenW: number;
  screenH: number;
};

export default function ScreenContent({ screen, scale, screenW, screenH }: Props) {
  if (screen.scrollable) {
    // "more" screen: PNG scrolls, tabs stay fixed
    return (
      <div style={{ position: "relative", width: screenW * scale, height: screenH * scale, overflow: "hidden" }}>
        <div
          style={{
            width: screenW * scale,
            height: screenH * scale,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            // leave 75px at bottom for tabs (not part of scrollable area)
          }}
          className="noScrollbar"
        >
          <Image
            src={screen.image}
            alt={screen.id}
            width={430}
            height={2837}
            style={{ width: screenW * scale, height: "auto", display: "block" }}
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={screen.image}
      alt={screen.id}
      width={screenW}
      height={screenH}
      style={{ width: screenW * scale, height: screenH * scale, display: "block", objectFit: "cover" }}
      priority
    />
  );
}
