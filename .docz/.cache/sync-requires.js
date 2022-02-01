

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": (preferDefault(require("/Users/didem/projects/cv-builder/.docz/.cache/dev-404-page.js"))),
  "component---cv-md": (preferDefault(require("/Users/didem/projects/cv-builder/cv.md"))),
  "component---readme-md": (preferDefault(require("/Users/didem/projects/cv-builder/README.md"))),
  "component---src-pages-404-js": (preferDefault(require("/Users/didem/projects/cv-builder/.docz/src/pages/404.js")))
}

