import fetch from "isomorphic-fetch";

export async function lookupPostcode({ longitude, latitude }) {
  const result = await fetch(
    `http://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
  );
  if (!result.ok) {
    return null;
  }

  const { result: hits } = await result.json();
  return hits && Array.isArray(hits) && hits[0].postcode;
}

export async function lookupPostcodeFromUserLocation() {
  const coords = await getUserLocation();
  if (coords) {
    return lookupPostcode(coords);
  }

  return null;
}

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return resolve();
    }

    return navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      reject,
      { timeout: 10000 }
    );
  });
}
