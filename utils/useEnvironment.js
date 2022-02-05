const isProduction = process.env.NODE_ENV === 'production'

const useEnvironment = () => {
  let baseUrl = 'localhost:3000'

  baseUrl = isProduction ? 'https://cvmaker-so.vercel.app' : 'http://localhost:3000'

  return {
    baseUrl,
    isProduction
  }
}

export { useEnvironment }
