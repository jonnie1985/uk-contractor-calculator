/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://uk-contractor-calculator.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: '.next',
}
