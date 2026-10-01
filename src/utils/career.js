import { JOBS } from "../data/content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const nowYM = () => { const d = new Date(); return [d.getFullYear(), d.getMonth()]; };
export const monthIndex = ([y, m]) => y * 12 + m;
export const CAREER_START = Math.min(...JOBS.map((j) => monthIndex(j.start)));

export const jobSpan = (job) => {
  const [y, m] = job.start;
  const s = monthIndex(job.start);
  const e = monthIndex(job.end || nowYM());
  return {
    s,
    months: e - s + 1,
    current: !job.end,
    from: `${MONTHS[m]} ${y}`,
    to: job.end ? `${MONTHS[job.end[1]]} ${job.end[0]}` : "Present",
  };
};

export const tenure = (n) => {
  const y = Math.floor(n / 12), m = n % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
};
