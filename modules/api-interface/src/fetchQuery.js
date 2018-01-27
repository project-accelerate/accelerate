import fetch from "isomorphic-fetch";

export function fetchQuery({ backendUrl }) {
  return (operation, variables) =>
    fetch(backendUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => response.json());
}
