"use server";

export async function fetchEmployee(values: { employee_number: string }) {
  try {
    const { employee_number } = values;

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/special-earnings/plantilla-employees/${employee_number}`;
    const url = new URL(baseUrl);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        body: null,
        error: "An error occurred while fetching data",
      };
    }

    const data = await response.json();
    console.log("Actions Employee Search Result:", data);

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
