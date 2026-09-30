export function getInitials(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? []

  return parts
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .map((part) => part[0])
    .join("")
}
