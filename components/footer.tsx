import { siteConfig } from "@/content/site"

// Wedding motif — align with hero, gallery, details
const palette = {
  deep: "#45301F",
  medium: "#875F2C",
  sage: "#A2976A",
  cream: "#F5D8B0",
  terracotta: "#8F553D",
} as const

export function Footer() {
  return (
    <footer
      className="mt-20 border-t"
      style={{
        backgroundColor: `${palette.cream}ee`,
        borderColor: `${palette.sage}40`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="font-serif font-bold text-lg mb-2"
              style={{ color: palette.deep }}
            >
              {siteConfig.couple.bride} & {siteConfig.couple.groom}
            </h3>
            <p className="text-sm" style={{ color: palette.medium }}>
              {siteConfig.wedding.date}
            </p>
          </div>
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: palette.deep }}
            >
              Ceremony
            </h4>
            <p className="text-sm" style={{ color: palette.medium }}>
              {siteConfig.ceremony.location}
            </p>
          </div>
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: palette.deep }}
            >
              Reception
            </h4>
            <p className="text-sm" style={{ color: palette.medium }}>
              {siteConfig.reception.location}
            </p>
          </div>
        </div>
        <div
          className="mt-8 pt-8 text-center text-sm border-t"
          style={{
            borderColor: `${palette.sage}40`,
            color: palette.medium,
          }}
        >
          <p>With love and gratitude • {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
