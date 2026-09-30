const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatCurrency(value: number) {
  return BRL.format(value)
}

export function formatSignedCurrency(value: number, type: "INCOME" | "EXPENSE") {
  const sign = type === "INCOME" ? "+" : "-"
  return `${sign} ${formatCurrency(Math.abs(value))}`
}
