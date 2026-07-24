// src/utils/export/csv.ts
export function escapeCsv(value: unknown): string {
  const text = value == null ? "" : String(value);

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n")
  ) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export function buildCsv(
  headers: string[],
  rows: unknown[][]
) {
  return [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.map(escapeCsv).join(",")
    )
    .join("\n");
}