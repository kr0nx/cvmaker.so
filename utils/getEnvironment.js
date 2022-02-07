const isProduction = process.env.NODE_ENV === 'production'

const getEnvironment = () => {
  let baseUrl = 'localhost:3000'

  baseUrl = isProduction ? 'https://cv-builder-steel.vercel.app' : 'http://localhost:3000'

  return {
    baseUrl,
    isProduction
  }
}

export { getEnvironment }
