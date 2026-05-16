"use client";

import { useCallback, useEffect } from "react";
import { screens, type ScreenId } from "@/lib/flows";
import { usePrototype } from "@/lib/state";
import TapZone from "./TapZone";
import BottomSheet from "./BottomSheet";
import AnimatedNumber from "./AnimatedNumber";
import TypedResponse from "./TypedResponse";
import ScreenContent from "./ScreenContent";

const SCREEN_W = 430;
const SCREEN_H = 932;

type Props = {
  screenId: ScreenId;
  scale: number;
};

export default function Screen({ screenId, scale }: Props) {
  const screen = screens[screenId];
  const {
    currentSheet,
    navigate,
    openSheet,
    replaceSheet,
    closeSheet,
    recordTransaction,
    walletBalance,
    loyaltyPoints,
    aiTemplate,
    setAiTemplate,
    transactionDone,
  } = usePrototype();

  // Fire transaction when tx-confirmed mounts
  useEffect(() => {
    if (currentSheet === "tx-confirmed") {
      recordTransaction();
    }
  }, [currentSheet, recordTransaction]);

  const handleHotspot = useCallback(
    (target: ScreenId, action: string, templateKey?: string) => {
      switch (action) {
        case "navigate":
        case "tab-switch":
          navigate(target);
          break;
        case "open-sheet":
          openSheet(target);
          break;
        case "replace-sheet":
          replaceSheet(target);
          break;
        case "close-sheet":
          closeSheet();
          break;
        case "ai-template":
          setAiTemplate(templateKey ?? null);
          break;
        default:
          navigate(target);
      }
    },
    [navigate, openSheet, replaceSheet, closeSheet, setAiTemplate]
  );

  const renderOverlay = (ov: NonNullable<typeof screen.overlays>[number]) => {
    if (ov.kind === "animated-number") {
      let value = 0;
      let fmt: ((n: number) => string) | undefined;
      // Only show balance/points overlays AFTER a transaction — before that the PNG already shows correct values
      const showWalletOverlay = transactionDone;

      if (ov.value === "walletBalance") {
        if (!showWalletOverlay) return null;
        value = walletBalance;
        fmt = (n) => n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else if (ov.value === "loyaltyPoints") {
        if (!showWalletOverlay) return null;
        value = loyaltyPoints;
        fmt = (n) => Math.round(n).toLocaleString("en");
      } else if (ov.value === "txPoints") {
        // Always show on tx-confirmed; animates 0→102 on mount
        value = transactionDone ? 102 : 0;
        fmt = (n) => String(Math.round(n));
      }

      return (
        <div
          key={ov.id}
          style={{
            position: "absolute",
            left: ov.x * scale,
            top: ov.y * scale,
            width: ov.w * scale,
            height: ov.h * scale,
            zIndex: 5,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "visible",
          }}
        >
          <AnimatedNumber
            value={value}
            format={fmt}
            duration={ov.value === "txPoints" ? 800 : 320}
            className="overlayNumber"
          />
        </div>
      );
    }

    if (ov.kind === "typed-response") {
      return (
        <div
          key={ov.id}
          style={{
            position: "absolute",
            left: ov.x * scale,
            top: ov.y * scale,
            width: ov.w * scale,
            height: ov.h * scale,
            zIndex: 5,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <TypedResponse templateKey={aiTemplate} />
        </div>
      );
    }
    return null;
  };

  const sheetScreenDef = currentSheet ? screens[currentSheet] : null;

  return (
    <div style={{ position: "relative", width: SCREEN_W * scale, height: SCREEN_H * scale }}>
      {/* Parent screen PNG */}
      <ScreenContent
        screen={screen}
        scale={scale}
        screenW={SCREEN_W}
        screenH={SCREEN_H}
      />

      {/* Overlays on the main screen */}
      {screen.overlays?.map(renderOverlay)}

      {/* Tap zones on the main screen (only when no sheet is open) */}
      {!currentSheet &&
        screen.hotspots.map((hs, i) => (
          <TapZone
            key={i}
            x={hs.x}
            y={hs.y}
            w={hs.w}
            h={hs.h}
            scale={scale}
            label={hs.label}
            onClick={() => handleHotspot(hs.target, hs.action ?? "navigate", hs.templateKey)}
          />
        ))}

      {/* Bottom sheet */}
      {sheetScreenDef && sheetScreenDef.kind === "sheet" && (
        <BottomSheet
          open={!!currentSheet}
          onDismiss={closeSheet}
          sheetHeight={sheetScreenDef.sheetHeight ?? 500}
          scale={scale}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sheetScreenDef.image}
              alt={sheetScreenDef.id}
              style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }}
              draggable={false}
            />
            {/* Sheet overlays */}
            {sheetScreenDef.overlays?.map(renderOverlay)}
            {/* Sheet tap zones */}
            {sheetScreenDef.hotspots.map((hs, i) => (
              <TapZone
                key={i}
                x={hs.x}
                y={hs.y}
                w={hs.w}
                h={hs.h}
                scale={scale}
                label={hs.label}
                onClick={() => handleHotspot(hs.target, hs.action ?? "navigate", hs.templateKey)}
              />
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
