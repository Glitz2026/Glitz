import { format, parseISO } from "date-fns";
import { it } from "date-fns/locale";

export function formatEventDate(iso: string): string {
  try {
    return format(parseISO(iso), "EEE d MMM · HH:mm", { locale: it }).toUpperCase();
  } catch {
    return iso;
  }
}

export function formatDay(iso: string): string {
  try {
    return format(parseISO(iso), "d MMM", { locale: it }).toUpperCase();
  } catch {
    return iso;
  }
}
