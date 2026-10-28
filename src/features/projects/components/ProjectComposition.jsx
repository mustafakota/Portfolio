import BrowserWindow from './BrowserWindow'

export default function ProjectComposition({ project, onOpen }) {
  const { primary, secondary } = project.composition || {
    primary: { image: project.image, url: project.windowUrl, isSecure: false, alt: project.title },
    secondary: null
  }

  return (
    <div
      className="project-composition-wrap"
      onClick={onOpen}
      title="Click to view case study"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen?.()
        }
      }}
    >
      {/* Primary Browser Window */}
      <BrowserWindow windowData={primary} isPrimary={true} />

      {/* Secondary Overlapping Browser Window */}
      {secondary && (
        <BrowserWindow windowData={secondary} isPrimary={false} />
      )}
    </div>
  )
}
