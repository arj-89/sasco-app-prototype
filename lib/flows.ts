export type ScreenId =
  | "home"
  | "qr-pay"
  | "tx-confirmed"
  | "wallet-monetary"
  | "topup"
  | "send"
  | "transfer"
  | "request"
  | "wallet-loyalty"
  | "network-map"
  | "selected-spot"
  | "garage"
  | "ai-chat"
  | "more";

export type OverlayKind = "animated-number" | "typed-response";
export type OverlayValue = "walletBalance" | "loyaltyPoints" | "txPoints";

export type Overlay = {
  id: string;
  kind: OverlayKind;
  // Coordinates in Figma's 430-wide logical px space
  x: number;
  y: number;
  w: number;
  h: number;
  value?: OverlayValue;
  templateKey?: string;
};

export type HotspotAction =
  | "navigate"
  | "open-sheet"
  | "replace-sheet"
  | "close-sheet"
  | "tab-switch"
  | "ai-template";

export type Hotspot = {
  x: number;
  y: number;
  w: number;
  h: number;
  target: ScreenId;
  action?: HotspotAction;
  label?: string;
  templateKey?: string;
};

export type Screen = {
  id: ScreenId;
  image: string;
  kind: "full" | "sheet";
  sheetHeight?: number;
  parent?: ScreenId;
  scrollable?: boolean;
  hotspots: Hotspot[];
  overlays?: Overlay[];
};

// Bottom tab hotspots shared across all full screens (y=857, h=75, split into 5 equal zones RTL)
const TABS: Hotspot[] = [
  { x: 344, y: 857, w: 86, h: 75, target: "home", action: "tab-switch", label: "الرئيسية" },
  { x: 258, y: 857, w: 86, h: 75, target: "wallet-monetary", action: "tab-switch", label: "المحفظة" },
  { x: 172, y: 857, w: 86, h: 75, target: "network-map", action: "tab-switch", label: "الخريطة" },
  { x: 86, y: 857, w: 86, h: 75, target: "garage", action: "tab-switch", label: "الكراج" },
  { x: 0, y: 857, w: 86, h: 75, target: "more", action: "tab-switch", label: "أكثر!" },
];

// AI Sticky Button position (appears on all non-home full screens)
const AI_STICKY: Hotspot = {
  x: 368, y: 795, w: 42, h: 42, target: "ai-chat", action: "navigate", label: "AI sticky",
};

export const screens: Record<ScreenId, Screen> = {
  home: {
    id: "home",
    image: "/screens/01-home.png",
    kind: "full",
    hotspots: [
      // Big QR / wallet button at bottom-right
      { x: 286, y: 758, w: 124, h: 79, target: "qr-pay", action: "open-sheet", label: "qr-trigger" },
      // AI button inside hero card ("اتكلم معايا")
      { x: 20, y: 328, w: 124, h: 32, target: "ai-chat", action: "navigate", label: "ai-home" },
      // Services row → map
      { x: 0, y: 380, w: 430, h: 114, target: "network-map", action: "tab-switch", label: "services" },
      ...TABS,
    ],
    overlays: [
      { id: "home-balance", kind: "animated-number", x: 96, y: 220, w: 50, h: 12, value: "walletBalance" },
      { id: "home-points", kind: "animated-number", x: 197, y: 227, w: 73, h: 12, value: "loyaltyPoints" },
    ],
  },

  "qr-pay": {
    id: "qr-pay",
    image: "/screens/02-qr-pay.png",
    kind: "sheet",
    sheetHeight: 596,
    parent: "home",
    hotspots: [
      // إغلاق button
      { x: 20, y: 448, w: 390, h: 54, target: "home", action: "close-sheet", label: "close" },
      // تم button → tx-confirmed
      { x: 20, y: 514, w: 390, h: 34, target: "tx-confirmed", action: "replace-sheet", label: "confirm" },
    ],
  },

  "tx-confirmed": {
    id: "tx-confirmed",
    image: "/screens/03-tx-confirmed.png",
    kind: "sheet",
    sheetHeight: 492,
    parent: "home",
    hotspots: [
      // العودة للرئيسية
      { x: 20, y: 400, w: 390, h: 34, target: "home", action: "close-sheet", label: "return-home" },
    ],
    overlays: [
      // "102" points awarded — animates from 0 on mount
      { id: "tx-points", kind: "animated-number", x: 178, y: 280, w: 40, h: 24, value: "txPoints" },
    ],
  },

  "wallet-monetary": {
    id: "wallet-monetary",
    image: "/screens/05-wallet-monetary.png",
    kind: "full",
    hotspots: [
      // Action buttons row (y≈158, each 80×34)
      { x: 310, y: 158, w: 80, h: 34, target: "topup", action: "open-sheet", label: "اشحن" },
      { x: 130, y: 158, w: 80, h: 34, target: "send", action: "open-sheet", label: "أرسل" },
      { x: 220, y: 158, w: 80, h: 34, target: "transfer", action: "open-sheet", label: "وزِّع" },
      { x: 40, y: 158, w: 80, h: 34, target: "request", action: "open-sheet", label: "اطلب" },
      // QR محفظة button
      { x: 20, y: 216, w: 390, h: 31, target: "qr-pay", action: "open-sheet", label: "qr-wallet" },
      // Switch to loyalty wallet (tap "نقاطك" label area)
      { x: 100, y: 295, w: 140, h: 60, target: "wallet-loyalty", action: "navigate", label: "to-loyalty" },
      AI_STICKY,
      ...TABS,
    ],
    overlays: [
      { id: "wallet-balance", kind: "animated-number", x: 148, y: 88, w: 169, h: 60, value: "walletBalance" },
    ],
  },

  topup: {
    id: "topup",
    image: "/screens/06-topup.png",
    kind: "sheet",
    sheetHeight: 574,
    parent: "wallet-monetary",
    hotspots: [
      { x: 20, y: 480, w: 390, h: 54, target: "wallet-monetary", action: "close-sheet", label: "close" },
    ],
  },

  send: {
    id: "send",
    image: "/screens/07-send.png",
    kind: "sheet",
    sheetHeight: 434,
    parent: "wallet-monetary",
    hotspots: [
      { x: 20, y: 360, w: 390, h: 54, target: "wallet-monetary", action: "close-sheet", label: "close" },
    ],
  },

  transfer: {
    id: "transfer",
    image: "/screens/08-transfer.png",
    kind: "sheet",
    sheetHeight: 365,
    parent: "wallet-monetary",
    hotspots: [
      { x: 20, y: 290, w: 390, h: 54, target: "wallet-monetary", action: "close-sheet", label: "close" },
    ],
  },

  request: {
    id: "request",
    image: "/screens/09-request.png",
    kind: "sheet",
    sheetHeight: 434,
    parent: "wallet-monetary",
    hotspots: [
      { x: 20, y: 360, w: 390, h: 54, target: "wallet-monetary", action: "close-sheet", label: "close" },
    ],
  },

  "wallet-loyalty": {
    id: "wallet-loyalty",
    image: "/screens/10-wallet-loyalty.png",
    kind: "full",
    hotspots: [
      // Switch back to monetary
      { x: 250, y: 295, w: 160, h: 60, target: "wallet-monetary", action: "navigate", label: "to-monetary" },
      AI_STICKY,
      ...TABS,
    ],
  },

  "network-map": {
    id: "network-map",
    image: "/screens/11-network-map.png",
    kind: "full",
    hotspots: [
      // Tap anywhere on the map area to open selected spot
      { x: 0, y: 100, w: 430, h: 700, target: "selected-spot", action: "open-sheet", label: "map-pin" },
      AI_STICKY,
      ...TABS,
    ],
  },

  "selected-spot": {
    id: "selected-spot",
    image: "/screens/04-selected-spot.png",
    kind: "sheet",
    sheetHeight: 493,
    parent: "network-map",
    hotspots: [
      // "خذني عليها" and close both dismiss
      { x: 20, y: 410, w: 390, h: 55, target: "network-map", action: "close-sheet", label: "navigate-close" },
      { x: 20, y: 20, w: 60, h: 44, target: "network-map", action: "close-sheet", label: "close" },
    ],
  },

  garage: {
    id: "garage",
    image: "/screens/12-garage.png",
    kind: "full",
    hotspots: [
      // Car rows → home (no detail screen exists)
      { x: 0, y: 140, w: 430, h: 220, target: "home", action: "tab-switch", label: "car-row" },
      AI_STICKY,
      ...TABS,
    ],
  },

  "ai-chat": {
    id: "ai-chat",
    image: "/screens/13-ai-chat.png",
    kind: "full",
    hotspots: [
      // Back/close button in header
      { x: 10, y: 44, w: 44, h: 44, target: "home", action: "navigate", label: "back" },
      // Template buttons
      { x: 20, y: 272, w: 155, h: 69, target: "ai-chat", action: "ai-template", label: "tpl-1", templateKey: "مشترياتك، واسجلها" },
      { x: 185, y: 272, w: 99, h: 69, target: "ai-chat", action: "ai-template", label: "tpl-2", templateKey: "أداء السيارة" },
      { x: 295, y: 272, w: 115, h: 69, target: "ai-chat", action: "ai-template", label: "tpl-3", templateKey: "الحال والأحوال" },
    ],
    overlays: [
      { id: "ai-response", kind: "typed-response", x: 0, y: 390, w: 430, h: 380 },
    ],
  },

  more: {
    id: "more",
    image: "/screens/14-more.png",
    kind: "full",
    scrollable: true,
    hotspots: [
      // Tabs are rendered as fixed overlay for this scrollable screen
      AI_STICKY,
      ...TABS,
    ],
  },
};

export const AI_RESPONSES: Record<string, string> = {
  "مشترياتك، واسجلها": "تمام! اعرض عليّ صورة الفاتورة وأنا أحفظها لك في سجل السيارة. وإذا تبي، أصنّفها تلقائياً (وقود، صيانة، غسيل، ...).",
  "أداء السيارة": "الباجيرو في وضع ممتاز 👌. آخر فحص قبل 12 يوم، الكفاءة 9 لتر/100كم، والإطارات على ضغطها الطبيعي. تبيني أحجز لك صيانة دورية؟",
  "الحال والأحوال": "الحمدلله بخير 🌙. الطقس صحو الليلة، 22°. تبيني أقترح لك أقرب مقهى مفتوح؟ أو أحجز لك قهوتك المفضلة قبل ما توصل؟",
};
