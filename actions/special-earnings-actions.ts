"use server";

import { revalidatePath } from "next/cache";

export async function getAllSpecialEarnings() {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/special-earnings/`;
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

export async function postSpecialEarnings(values: {
  employee_number: string;
  appointment_status_code: string;
  earnings_status_code: string;
  earnings_code: string;
  amount: number;
  year_from: string;
  month_from: string;
  year_to: string;
  month_to: string;
}) {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/special-earnings/`;
    const url = new URL(baseUrl);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      return {
        body: null,
        error: `An error occurred while fetching data: ${response.statusText}`,
      };
    }

    const data = await response.json();

    revalidatePath("/posts");

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

export async function getEmployee(values: { employee_number: string }) {
  try {
    const { employee_number } = values;

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/special-earnings/employees/${employee_number}`;
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
