"use client";

import { useEffect, useRef, useState } from "react";
import { usePrototype } from "@/lib/state";
import PhoneFrame from "@/components/PhoneFrame";
import Screen from "@/components/Screen";
import ScreenTransition from "@/components/ScreenTransition";

const SCREEN_W = 430;
const SCREEN_H = 932;
const FRAME_PAD = 15;
const FRAME_H = SCREEN_H + FRAME_PAD * 2;

function useScale() {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const calc = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setScale(window.innerWidth / SCREEN_W);
      } else {
        const maxH = window.innerHeight * 0.9;
        const byH = maxH / FRAME_H;
        const byW = (window.innerWidth * 0.9) / (SCREEN_W + FRAME_PAD * 2);
        setScale(Math.min(byH, byW, 1));
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return { scale, isMobile };
}

export default function Page() {
  const { currentScreen } = usePrototype();
  const { scale, isMobile } = useScale();

  const content = (
    <ScreenTransition screenKey={currentScreen}>
      <Screen screenId={currentScreen} scale={scale} />
    </ScreenTransition>
  );

  if (isMobile) {
    return (
      <div
        style={{
          width: SCREEN_W * scale,
          height: SCREEN_H * scale,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="phonePage">
      <PhoneFrame scale={scale}>
        <div
          style={{
            width: SCREEN_W * scale,
            height: SCREEN_H * scale,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {content}
        </div>
      </PhoneFrame>
      <p className="phoneLabel">prototype · v0.1 · ساسكو</p>
    </div>
  );
}
