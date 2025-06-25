export function getAppointmentStatus(appointment_status_code: string) {
  if (appointment_status_code === "p") {
    return "Plantilla";
  } else if (appointment_status_code === "np") {
    return "Non-plantilla";
  } else {
    return "Unknown";
  }
}

export function getEarningsStatus(earnings_status_code: number) {
  if (earnings_status_code === 0) {
    return "Inactive";
  } else if (earnings_status_code === 1) {
    return "Active";
  } else {
    return "Unknown";
  }
}

export function formatPeriod(period: string): string {
  if (!/^\d{6}$/.test(period)) return "Invalid period";

  const year = period.slice(0, 4);
  const month = period.slice(4, 6);

  const monthNumber = parseInt(month, 10);
  if (monthNumber < 1 || monthNumber > 12) return "Invalid period";

  const date = new Date(Number(year), monthNumber - 1); // month is 0-indexed
  return `${date.toLocaleString("default", { month: "long" })} ${year}`;
}
