"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 320;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

type Props = {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
};

export default function AnimatedNumber({ value, format, duration = DURATION, className }: Props) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const raf = useRef<number>(0);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(from + (to - from) * easeOutQuart(t));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        prev.current = to;
        setDisplay(to);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  const formatted = format
    ? format(display)
    : display.toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  return <span className={className}>{formatted}</span>;
}
