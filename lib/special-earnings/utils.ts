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
