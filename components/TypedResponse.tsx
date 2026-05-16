"use client";

import { useEffect, useRef, useState } from "react";
import { AI_RESPONSES } from "@/lib/flows";

type Props = {
  templateKey: string | null;
  onDone?: () => void;
};

export default function TypedResponse({ templateKey, onDone }: Props) {
  const [typed, setTyped] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!templateKey) {
      setTyped("");
      setUserMsg("");
      setActive(false);
      return;
    }
    const response = AI_RESPONSES[templateKey] ?? "";
    setUserMsg(templateKey);
    setTyped("");
    setActive(true);

    let i = 0;
    const type = () => {
      if (i <= response.length) {
        setTyped(response.slice(0, i));
        i++;
        timerRef.current = setTimeout(type, 30);
      } else {
        onDone?.();
      }
    };
    timerRef.current = setTimeout(type, 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [templateKey, onDone]);

  if (!active) return null;

  return (
    <div className="aiConversation">
      {userMsg && (
        <div className="aiBubbleUser">
          <span>✨ {userMsg}</span>
        </div>
      )}
      {typed && (
        <div className="aiBubbleAi">
          <span>{typed}</span>
          {typed.length < (AI_RESPONSES[templateKey ?? ""] ?? "").length && (
            <span className="aiCursor">▌</span>
          )}
        </div>
      )}
    </div>
  );
}
