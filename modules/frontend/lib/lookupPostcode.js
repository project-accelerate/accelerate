import fetch from "isomorphic-fetch";

export async function lookupPostcode(longitude, latitude) {
  const result = await fetch(
    `http://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
  );
  if (!result.ok) {
    return null;
  }

  const { result: [hit] } = await result.json();
  return hit;
}
