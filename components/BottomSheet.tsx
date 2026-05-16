"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { SHEET_ENTER } from "@/lib/easings";

type Props = {
  open: boolean;
  onDismiss: () => void;
  children: ReactNode;
  sheetHeight: number;
  scale: number;
};

export default function BottomSheet({ open, onDismiss, children, sheetHeight, scale }: Props) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onDismiss(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onDismiss]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "linear" }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 30,
            }}
            onPointerDown={onDismiss}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.36, ease: SHEET_ENTER }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: sheetHeight * scale,
              zIndex: 40,
              overflow: "hidden",
              borderTopLeftRadius: 24 * scale,
              borderTopRightRadius: 24 * scale,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
