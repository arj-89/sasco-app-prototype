export const SHEET_ENTER = [0.32, 0.72, 0, 1] as const;
export const SCREEN_SLIDE = [0.22, 1, 0.36, 1] as const;
export const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

export const slideVariants = {
  enter: { x: "-100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};
