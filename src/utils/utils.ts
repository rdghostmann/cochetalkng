export function timeAgo(ts: number) {
  const diff = Date.now() - ts;

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `${hrs}h`;

  return `${Math.floor(hrs / 24)}d`;
}

export function formatPrice(price: number) {
  return `₦${price.toLocaleString()}`;
}