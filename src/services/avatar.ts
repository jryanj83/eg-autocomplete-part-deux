/**
 * Fetches an avatar SVG from DiceBear API and converts it to a data URI
 * @param name - The name to use as a seed for the avatar
 * @returns A data URI containing the SVG avatar
 */
export const fetchAvatar = async (name: string) => {
  const seed = name.toLowerCase().replace(/\s+/g, '-');
  const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch avatar');
  }
  const svg = await response.text();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}; 