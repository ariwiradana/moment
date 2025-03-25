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
      "/samaya/index",
      "/samaya/login",
      "/samaya/pembayaran",
      "/samaya/tamu",
      "/samaya/testimoni",
      "/aruna/index",
      "/aruna/login",
      "/aruna/pembayaran",
      "/aruna/tamu",
      "/aruna/testimoni",
      "/nirvaya/index",
      "/nirvaya/login",
      "/nirvaya/pembayaran",
      "/nirvaya/tamu",
      "/nirvaya/testimoni",
      "/form/pernikahan",
      "/form/mepandes",
      "/form/pernikahan-mepandes",
      "/tema",
      "/fitur",
    ];

    return dynamicRoutes.map((route) => ({
      loc: route,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }));
  },
};
