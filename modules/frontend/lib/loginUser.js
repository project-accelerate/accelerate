import fetch from "isomorphic-fetch";

export async function loginUser({ username, password }) {
  try {
    const result = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    });

    if (result.status === 401) {
      return { succeeded: false, reason: E_INVALID_CREDENTIALS };
    }

    if (!result.ok) {
      return { succeeded: false, reason: E_UNEXPECTED_ERROR };
    }

    return { succeeded: true };
  } catch (error) {
    return { succeeded: false, reason: E_NETWORK_ERROR };
  }
}

export const E_INVALID_CREDENTIALS = "invalid credentials";
export const E_UNEXPECTED_ERROR = "unexpected error";
export const E_NETWORK_ERROR = "network error";
