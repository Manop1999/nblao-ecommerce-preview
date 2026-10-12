import { createContext, useContext, useState, useCallback, ReactNode, createElement, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastCtx {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

const Ctx = createContext<ToastCtx | null>(null)

const NAVY = 'var(--nb-navy)'

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

const COLORS: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: '#fff', border: '#16a34a', icon: '#16a34a' },
  error:   { bg: '#fff', border: '#ef4444', icon: '#ef4444' },
  warning: { bg: '#fff', border: '#d97706', icon: '#d97706' },
  info:    { bg: '#fff', border: 'var(--nb-primary)', icon: 'var(--nb-primary)' },
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const c = COLORS[toast.type]

  useEffect(() => {
    const t = setTimeout(onRemove, 4000)
    return () => clearTimeout(t)
  }, [onRemove])

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 min-w-[260px] max-w-[340px] shadow-md"
      style={{ background: c.bg, borderLeft: `3px solid ${c.border}`, border: `1px solid var(--nb-border)`, borderLeftWidth: 3, borderLeftColor: c.border }}
    >
      <span className="font-display font-800 text-[13px] shrink-0 mt-[1px]" style={{ color: c.icon }}>
        {ICONS[toast.type]}
      </span>
      <span className="font-ui text-[13px] flex-1 leading-snug" style={{ color: NAVY }}>
        {toast.message}
      </span>
      <button
        onClick={onRemove}
        className="shrink-0 font-ui text-[11px] leading-none ml-1 hover:opacity-70 transition-opacity"
        style={{ color: '#94a3b8' }}
      >
        ✕
      </button>
    </div>
  )
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev.slice(-2), { id, type, message }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return createElement(
    Ctx.Provider,
    { value: { toasts, addToast, removeToast } },
    children,
    createElement(ToastContainer, { toasts, removeToast })
  )
}

export const useToast = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
