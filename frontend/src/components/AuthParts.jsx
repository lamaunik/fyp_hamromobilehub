export function AuthInput({ label, type = "text", value, onChange, placeholder, icon, rightElement }) {
  return (
    <div>
      {label && (
        <label className="block text-blue-200/70 text-xs font-bold tracking-wide uppercase mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/60">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white/5 border border-white/10 focus:border-blue-500/60 focus:bg-white/10 outline-none text-white placeholder-blue-200/30 text-sm rounded-2xl py-3.5 transition-all duration-200 ${icon ? "pl-11" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"}`}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

export function AuthButton({ onClick, loading, loadingText, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {loadingText || "Loading..."}
        </>
      ) : children}
    </button>
  );
}

export function AuthError({ message }) {
  if (!message) return null;
  return (
    <div className="mb-5 flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-300 text-sm font-semibold px-4 py-3 rounded-2xl">
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {message}
    </div>
  );
}