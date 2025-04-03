module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.momentinvitation.com",
  generateRobotsTxt: true, // Generates robots.txt file
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/login", "/404"], // Optionally exclude pages
  // Custom transformation for the sitemap
  transform: async (config, path) => {
    return {
      loc: path, // The full URL for the page
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    };
  },
  additionalPaths: async (config) => {
    const dynamicRoutes = [
      "/",
      "/form/pernikahan",
      "/form/mepandes",
    ];

    return dynamicRoutes.map((route) => ({
      loc: route,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }));
  },
};
