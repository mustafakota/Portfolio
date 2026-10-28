function LockIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.7, flexShrink: 0 }}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export default function BrowserWindow({ windowData, isPrimary = true }) {
  if (!windowData) return null

  return (
    <div className={isPrimary ? 'mac-window-primary' : 'mac-window-secondary'}>
      {/* macOS Top Bar */}
      <div className={`mac-top-bar ${isPrimary ? 'primary-bar' : 'secondary-bar'}`}>
        <div className={isPrimary ? 'mac-traffic-lights' : 'mac-traffic-lights-sm'}>
          <span className={`${isPrimary ? 'mac-dot' : 'mac-dot-sm'} red`} />
          <span className={`${isPrimary ? 'mac-dot' : 'mac-dot-sm'} yellow`} />
          <span className={`${isPrimary ? 'mac-dot' : 'mac-dot-sm'} green`} />
        </div>

        <div className="mac-pill-container">
          <div className={isPrimary ? 'mac-address-pill' : 'mac-address-pill-sm'}>
            {windowData.isSecure && <LockIcon />}
            <span className={isPrimary ? 'mac-address-text' : 'mac-address-text-sm'}>
              {windowData.url}
            </span>
          </div>
        </div>
      </div>

      {/* Viewport - Strict Zero Cropping */}
      <div className="mac-viewport">
        <img
          src={windowData.image}
          alt={windowData.alt || 'Project Interface'}
          loading="lazy"
          decoding="async"
          className="mac-screenshot"
        />
      </div>
    </div>
  )
}
