export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
}) {
  const variants = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
    dark: 'bg-slate-800 hover:bg-slate-700 text-white shadow-sm',
    amber: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2.5 rounded-xl',
    lg: 'text-base px-6 py-3 rounded-xl',
    xl: 'text-lg px-8 py-4 rounded-xl',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold transition-all
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
