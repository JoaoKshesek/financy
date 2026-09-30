const MONTH = new Intl.DateTimeFormat("pt-BR", { month: "long" })

export function formatPeriod(period: string) {
  const [year, month] = period.split("-")
  const name = MONTH.format(new Date(Number(year), Number(month) - 1, 1))

  return `${name.charAt(0).toUpperCase()}${name.slice(1)} / ${year}`
}

export function toPeriod(iso: string) {
  const date = new Date(iso)
  const month = String(date.getMonth() + 1).padStart(2, "0")

  return `${date.getFullYear()}-${month}`
}

const SHORT_DATE = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
})

export function formatShortDate(iso: string) {
  return SHORT_DATE.format(new Date(iso))
}
