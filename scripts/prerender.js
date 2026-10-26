import fs from 'fs'
import path from 'path'
import process from 'process'
import { fileURLToPath } from 'url'
import { allProjects } from '../src/data/projects.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')

function escapeHtml(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function prerender() {
  console.log('--- Starting SEO Prerendering & Static Generation ---')

  const baseHtmlPath = path.resolve(distDir, 'index.html')
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('Error: dist/index.html not found. Run vite build first.')
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8')

  // Generate each case study route
  allProjects.forEach(project => {
    const slug = project.slug
    const routeDir = path.resolve(distDir, 'work', slug)
    fs.mkdirSync(routeDir, { recursive: true })

    const canonicalUrl = `https://www.mustafakota.site/work/${slug}/`
    const title = project.seoTitle || `${project.title} — Case Study | Mustafa Kota`
    const desc = project.seoDesc || project.desc
    const imageUrl = `https://www.mustafakota.site${project.image}`

    // 1. Build Route JSON-LD
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://www.mustafakota.site/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Work',
              'item': 'https://www.mustafakota.site/#projects'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': project.title,
              'item': canonicalUrl
            }
          ]
        },
        {
          '@type': 'CreativeWork',
          '@id': `${canonicalUrl}#project`,
          'name': project.title,
          'headline': title,
          'description': desc,
          'image': imageUrl,
          'url': canonicalUrl,
          'author': {
            '@type': 'Person',
            '@id': 'https://www.mustafakota.site/#person',
            'name': 'Mustafa Kota',
            'url': 'https://www.mustafakota.site/'
          }
        },
        {
          '@type': 'Person',
          '@id': 'https://www.mustafakota.site/#person',
          'name': 'Mustafa Kota',
          'url': 'https://www.mustafakota.site/',
          'jobTitle': 'Product Designer',
          'image': 'https://www.mustafakota.site/mustafa-portrait.webp',
          'sameAs': [
            'https://www.linkedin.com/in/mustafakota',
            'https://github.com/mustafakota'
          ]
        }
      ]
    }

    // 2. Generate Semantic Pre-rendered HTML for search crawlers
    const related = allProjects.filter(p => p.slug !== slug).slice(0, 2)
    const prerenderedBody = `
      <div class="case-study-root" style="background-color: #0d0d0e; color: #f5f5f5; min-height: 100vh;">
        <header style="position: sticky; top: 0; z-index: 900; background-color: rgba(13, 13, 14, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding: 16px 5vw;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
            <a href="/" style="font-family: 'Clash Display', sans-serif; font-size: 1.25rem; font-weight: 700; color: #f5f5f5; text-decoration: none;">MUSTAFA KOTA</a>
            <a href="/#projects" style="font-size: 0.875rem; font-weight: 500; padding: 8px 16px; border-radius: 999px; background-color: rgba(255, 255, 255, 0.08); color: #f5f5f5; text-decoration: none;">&larr; All Projects</a>
          </div>
        </header>

        <main style="max-width: 1200px; margin: 0 auto; padding: 40px 5vw 120px;">
          <nav aria-label="Breadcrumb" style="margin-bottom: 24px;">
            <ol style="display: flex; gap: 8px; list-style: none; padding: 0; margin: 0; font-size: 0.85rem; color: #b3b3b3;">
              <li><a href="/" style="color: #b3b3b3; text-decoration: none;">Home</a></li>
              <li>/</li>
              <li><a href="/#projects" style="color: #b3b3b3; text-decoration: none;">Work</a></li>
              <li>/</li>
              <li aria-current="page" style="color: #f5f5f5; font-weight: 600;">${escapeHtml(project.title)}</li>
            </ol>
          </nav>

          <header style="margin-bottom: 48px;">
            <div style="display: inline-block; padding: 6px 14px; border-radius: 100px; background-color: rgba(255, 255, 255, 0.06); font-size: 0.825rem; text-transform: uppercase; letter-spacing: 2px; color: #b3b3b3; margin-bottom: 16px;">
              ${escapeHtml(project.category || project.role)}
            </div>
            <h1 style="font-size: clamp(2.5rem, 6vw, 4.5rem); font-family: 'Clash Display', sans-serif; font-weight: 700; line-height: 1.1; margin-bottom: 20px;">
              ${escapeHtml(project.title)}
            </h1>
            <p style="font-size: clamp(1.1rem, 2vw, 1.35rem); color: #b3b3b3; line-height: 1.6; max-width: 850px; margin-bottom: 32px;">
              ${escapeHtml(project.desc)}
            </p>
          </header>

          <section aria-label="${escapeHtml(project.title)} Overview Screenshot" style="margin-bottom: 64px;">
            <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt || project.title)}" style="width: 100%; height: auto; border-radius: 20px; display: block;" />
          </section>

          <div style="max-width: 900px; margin: 0 auto;">
            <section style="margin-bottom: 56px;">
              <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-family: 'Clash Display', sans-serif; font-weight: 600; margin-bottom: 20px;">
                1. Project Overview &amp; Context
              </h2>
              <p style="font-size: 1.1rem; line-height: 1.7; color: #b3b3b3;">
                ${escapeHtml(project.intro)}
              </p>
            </section>

            ${project.problem ? `
            <section style="margin-bottom: 56px;">
              <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-family: 'Clash Display', sans-serif; font-weight: 600; margin-bottom: 20px;">
                2. The Problem &amp; Core Constraints
              </h2>
              <p style="font-size: 1.1rem; line-height: 1.7; color: #f5f5f5;">
                ${escapeHtml(project.problem)}
              </p>
            </section>` : ''}

            ${project.image1 ? `
            <section style="margin-bottom: 56px;">
              <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-family: 'Clash Display', sans-serif; font-weight: 600; margin-bottom: 20px;">
                3. Design Execution &amp; Workflow Architecture
              </h2>
              <p style="font-size: 1.1rem; line-height: 1.7; color: #b3b3b3; margin-bottom: 24px;">
                ${escapeHtml(project.solution || project.goal)}
              </p>
              <img src="${escapeHtml(project.image1)}" alt="${escapeHtml(project.image1Alt || project.title)}" loading="lazy" style="width: 100%; height: auto; border-radius: 16px; display: block;" />
            </section>` : ''}

            ${project.image2 ? `
            <section style="margin-bottom: 56px;">
              <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-family: 'Clash Display', sans-serif; font-weight: 600; margin-bottom: 20px;">
                4. Deep Dive Screens &amp; System Details
              </h2>
              <img src="${escapeHtml(project.image2)}" alt="${escapeHtml(project.image2Alt || project.title)}" loading="lazy" style="width: 100%; height: auto; border-radius: 16px; display: block;" />
            </section>` : ''}

            <section style="margin-bottom: 64px;">
              <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-family: 'Clash Display', sans-serif; font-weight: 600; margin-bottom: 20px;">
                5. Outcome &amp; Key Takeaways
              </h2>
              <p style="font-size: 1.1rem; line-height: 1.7; color: #b3b3b3;">
                ${escapeHtml(project.conclusion)}
              </p>
            </section>
          </div>

          <section style="margin-top: 80px; padding-top: 60px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <h2 style="font-size: 1.8rem; font-family: 'Clash Display', sans-serif; font-weight: 600; margin-bottom: 28px;">Explore More Work</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
              ${related.map(r => `
                <a href="/work/${r.slug}/" style="display: block; padding: 24px; border-radius: 16px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); text-decoration: none; color: inherit;">
                  <h3 style="font-size: 1.35rem; font-family: 'Clash Display', sans-serif; font-weight: 600; margin-bottom: 8px;">${escapeHtml(r.title)}</h3>
                  <p style="font-size: 0.9rem; color: #b3b3b3; line-height: 1.5;">${escapeHtml(r.desc)}</p>
                </a>
              `).join('')}
            </div>
          </section>
        </main>
      </div>
    `

    // 3. Inject into HTML template
    let pageHtml = baseHtml

    // Replace Title
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)

    // Replace Meta Description
    pageHtml = pageHtml.replace(/<meta\s+name="description"[\s\S]*?\/>/i, `<meta name="description" content="${escapeHtml(desc)}" />`)

    // Replace Canonical
    pageHtml = pageHtml.replace(/<link\s+rel="canonical"[\s\S]*?\/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)

    // Replace Open Graph Tags
    pageHtml = pageHtml.replace(/<meta\s+property="og:title"[\s\S]*?\/>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    pageHtml = pageHtml.replace(/<meta\s+property="og:description"[\s\S]*?\/>/i, `<meta property="og:description" content="${escapeHtml(desc)}" />`)
    pageHtml = pageHtml.replace(/<meta\s+property="og:url"[\s\S]*?\/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
    pageHtml = pageHtml.replace(/<meta\s+property="og:image"[\s\S]*?\/>/i, `<meta property="og:image" content="${imageUrl}" />`)

    // Replace Twitter Tags
    pageHtml = pageHtml.replace(/<meta\s+name="twitter:title"[\s\S]*?\/>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    pageHtml = pageHtml.replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/i, `<meta name="twitter:description" content="${escapeHtml(desc)}" />`)
    pageHtml = pageHtml.replace(/<meta\s+name="twitter:url"[\s\S]*?\/>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    pageHtml = pageHtml.replace(/<meta\s+name="twitter:image"[\s\S]*?\/>/i, `<meta name="twitter:image" content="${imageUrl}" />`)

    // Strip template's base JSON-LD to ensure exactly one non-duplicate schema block per route
    pageHtml = pageHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, '')

    // Inject Route JSON-LD
    const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`
    pageHtml = pageHtml.replace(/<\/head>/i, `  ${jsonLdTag}\n</head>`)

    // Inject Prerendered Semantic Body into #root
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${prerenderedBody}</div>`)

    fs.writeFileSync(path.resolve(routeDir, 'index.html'), pageHtml, 'utf8')
    console.log(`Generated route: /work/${slug}/index.html (${pageHtml.length} bytes)`)
  })

  // Create 404.html fallback
  const notFoundHtml = baseHtml
    .replace(/<title>.*?<\/title>/i, '<title>Page Not Found — Mustafa Kota</title>')
    .replace('<div id="root"></div>', '<div id="root"><div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; color: #fff; background: #0d0d0e; font-family: sans-serif;"><h1>404 — Page Not Found</h1><p><a href="/" style="color: #fff; text-decoration: underline;">Return to Home</a></p></div></div>')
  fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundHtml, 'utf8')
  console.log('Generated fallback: /404.html')

  console.log('--- Prerendering Complete! ---\n')
}

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerender()
}
