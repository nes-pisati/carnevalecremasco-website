const GOOGLE_MAPS_SEARCH = "https://www.google.com/maps/search/?api=1&query=";

export function googleMapsSearchUrl(query: string): string {
  return `${GOOGLE_MAPS_SEARCH}${encodeURIComponent(query)}`;
}
