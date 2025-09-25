import { isBefore, isAfter, parseISO } from "date-fns";

export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  const A1 = parseISO(aStart), A2 = parseISO(aEnd);
  const B1 = parseISO(bStart), B2 = parseISO(bEnd);
  return isBefore(A1, B2) && isAfter(A2, B1);
}
