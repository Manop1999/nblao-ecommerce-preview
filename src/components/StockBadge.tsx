interface StockBadgeProps {
  stock: number
  stockLabel?: string
  size?: 'sm' | 'md'
}

export function StockBadge({ stock, stockLabel, size = 'sm' }: StockBadgeProps) {
  let label: string
  let bg: string
  let color: string

  if (stock === 0) {
    label = stockLabel || 'Out of Stock'
    bg = '#fef2f2'
    color = '#ef4444'
  } else if (stock <= 3) {
    label = 'Low Stock'
    bg = '#fef9ec'
    color = '#d97706'
  } else if (stock <= 20) {
    label = stockLabel || 'Limited Availability'
    bg = '#fef9ec'
    color = '#d97706'
  } else {
    label = stockLabel || 'In Stock'
    bg = '#ecfdf5'
    color = '#16a34a'
  }

  const px = size === 'md' ? 'px-3 py-1' : 'px-2 py-0.5'
  const fs = size === 'md' ? 'text-[12px]' : 'text-[11px]'

  return (
    <span className={`font-ui ${fs} font-600 ${px} inline-block`} style={{ background: bg, color }}>
      {label}
    </span>
  )
}
