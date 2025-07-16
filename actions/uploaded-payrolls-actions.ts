"use server";

export async function getSequenceNumbers(values: {
  payroll_file: File;
  period_year: string;
  period_month: string;
  transaction_type: string;
}) {
  try {
    const { payroll_file, period_year, period_month, transaction_type } =
      values;

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/uploaded-payrolls/sequence-numbers`;
    const url = new URL(baseUrl);

    // Create FormData to send file and form data
    const formData = new FormData();
    formData.append("payroll_file", payroll_file);
    formData.append("period_year", period_year);
    formData.append("period_month", period_month);
    formData.append("transaction_type", transaction_type);

    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return {
        body: null,
        error: `An error occurred while fetching sequence numbers: ${response.statusText}`,
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
