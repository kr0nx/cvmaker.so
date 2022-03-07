export default {
  defaultTitle: 'Dev Resume',
  description:
    "Dev Resume, a simple way to create a resume in markdown. It's a free resume builder for developers.",
  additionalMetaTags: [
    {
      property: 'keywords',
      content: 'cv, resume, drag, drop, easiest, create, markdown'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/icon-96x96.png',
      sizes: '96x96'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devresume.so',
    title: 'devresume.so',
    site_name: 'devresume.so',
    description: 'A simple way to create a resume in markdown.',
    images: [
      {
        url: 'https://devresume.so/devresume.png',
        width: 375,
        height: 375,
        alt: 'devresume.so'
      }
    ]
  },
  twitter: {
    handle: '@codingwithdidem',
    cardType: 'summary'
  }
}
