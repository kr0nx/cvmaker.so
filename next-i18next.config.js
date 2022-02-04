const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    localePath: path.resolve('./public/locales')
    // Use only in dev mode if you want your translations to be reloaded if any changes happen
    // reloadOnPrerender: true
  }
}
