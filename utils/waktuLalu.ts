export function waktuLalu(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.round((now.getTime() - past.getTime()) / 1000);

  const intervals: Record<string, number> = {
    tahun: 31536000,
    bulan: 2592000,
    minggu: 604800,
    hari: 86400,
    jam: 3600,
    menit: 60,
    detik: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    if (seconds >= secondsInUnit || unit === "detik") {
      const value = Math.floor(seconds / secondsInUnit);
      return new Intl.RelativeTimeFormat("id", { numeric: "auto" }).format(
        -value,
        unit as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return "Baru saja";
}
