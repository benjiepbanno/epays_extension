"use server";

export async function getOffices() {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/external-databases/offices`;
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

export async function getWorkstations() {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/external-databases/workstations`;
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

export async function getEarningsCodes() {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/external-databases/earnings-codes`;
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

export async function getPersonnel(values: { personnel_id: string }) {
  try {
    const { personnel_id } = values;

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
    const baseUrl = `${API_BASE_URL}/epays-extension/external-databases/personnel/${personnel_id}`;
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
