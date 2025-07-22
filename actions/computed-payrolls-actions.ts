"use server";

export async function getSpecialEarningsWherePeriod(values: {
  period_year: string;
  period_month: string;
}) {
  try {
    const { period_year, period_month } = values;

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/computed-payrolls/special_earnings`;
    const url = new URL(baseUrl);

    if (period_year && period_month) {
      url.searchParams.set("period_year", period_year);
      url.searchParams.set("period_month", period_month);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        body: null,
        error: `An error occurred while fetching data: ${response.statusText}`,
      };
    }

    const data = await response.json();

    return {
      body: data.body,
      error: data.error,
    };
  } catch (error) {
    return {
      body: null,
      error: "Server error. Please check the API connection.",
    };
  }
}
