/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s.gravatar.com', 'lh3.googleusercontent.com', 'oaidalleapiprodscus.blob.core.windows.net']
      },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    }
}

module.exports = nextConfig
