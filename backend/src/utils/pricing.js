import { addDays, eachDayOfInterval, isWithinInterval, parseISO } from "date-fns";

export function computeStayNights(checkIn, checkOut) {
  const start = parseISO(checkIn), end = parseISO(checkOut);
  return eachDayOfInterval({ start, end: addDays(end, -1) }).length;
}

export function computeRoomPrice(basePrice, seasonalPrices, checkIn, checkOut) {
  const days = eachDayOfInterval({ start: parseISO(checkIn), end: parseISO(checkOut) });
  let total = 0;
  for (let i=0;i<days.length-1;i++) {
    const d = days[i];
    const season = seasonalPrices.find(sp => isWithinInterval(d, { start: parseISO(sp.startDate), end: parseISO(sp.endDate) }));
    total += season ? season.price : basePrice;
  }
  return total;
}
