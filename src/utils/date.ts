const WEEKDAY_SHORT = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

/** Monday = 0 ... Sunday = 6 */
export function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export function weekdayLabel(index: number): string {
  return WEEKDAY_SHORT[index];
}

export function todayLabel(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${weekdayFull(date)}`;
}

const WEEKDAY_FULL = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

function weekdayFull(date: Date): string {
  return WEEKDAY_FULL[mondayIndex(date)];
}

/** The 7 calendar-day numbers (Mon..Sun) for the week containing `date`. */
export function currentWeekDayNumbers(date: Date): number[] {
  const monday = new Date(date);
  monday.setDate(date.getDate() - mondayIndex(date));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
}
