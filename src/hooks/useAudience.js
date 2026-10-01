import { useState } from "react";

const PARAM = "for";
const VALID = ["client", "recruiter"];

const readAudience = () => {
  if (typeof window === "undefined") return "client";
  const v = new URLSearchParams(window.location.search).get(PARAM);
  return VALID.includes(v) ? v : "client";
};

// Visitor type ("client" | "recruiter"), kept in the URL (?for=recruiter) so it can be shared.
export function useAudience() {
  const [audience, setAudienceState] = useState(readAudience);
  const setAudience = (v) => {
    setAudienceState(v);
    const url = new URL(window.location.href);
    if (v === "client") url.searchParams.delete(PARAM); else url.searchParams.set(PARAM, v);
    window.history.replaceState(null, "", url);
  };
  return [audience, setAudience];
}
