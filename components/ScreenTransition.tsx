"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { SCREEN_SLIDE } from "@/lib/easings";

const variants = {
  enter: { x: "-100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

type Props = {
  screenKey: string;
  children: ReactNode;
};

export default function ScreenTransition({ screenKey, children }: Props) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={screenKey}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.32, ease: SCREEN_SLIDE }}
        style={{ position: "absolute", inset: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
