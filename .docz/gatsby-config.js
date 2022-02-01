const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Cv Builder',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/didem/projects/cv-builder/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Cv Builder',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/didem/projects/cv-builder',
          templates:
            '/Users/didem/projects/cv-builder/node_modules/docz-core/dist/templates',
          docz: '/Users/didem/projects/cv-builder/.docz',
          cache: '/Users/didem/projects/cv-builder/.docz/.cache',
          app: '/Users/didem/projects/cv-builder/.docz/app',
          appPackageJson: '/Users/didem/projects/cv-builder/package.json',
          appTsConfig: '/Users/didem/projects/cv-builder/tsconfig.json',
          gatsbyConfig: '/Users/didem/projects/cv-builder/gatsby-config.js',
          gatsbyBrowser: '/Users/didem/projects/cv-builder/gatsby-browser.js',
          gatsbyNode: '/Users/didem/projects/cv-builder/gatsby-node.js',
          gatsbySSR: '/Users/didem/projects/cv-builder/gatsby-ssr.js',
          importsJs: '/Users/didem/projects/cv-builder/.docz/app/imports.js',
          rootJs: '/Users/didem/projects/cv-builder/.docz/app/root.jsx',
          indexJs: '/Users/didem/projects/cv-builder/.docz/app/index.jsx',
          indexHtml: '/Users/didem/projects/cv-builder/.docz/app/index.html',
          db: '/Users/didem/projects/cv-builder/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
