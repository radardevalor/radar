export function fmtNum(value: number, decimals: number): string {
  return value.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}
