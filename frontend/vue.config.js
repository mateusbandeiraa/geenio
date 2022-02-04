module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8880",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // Change build paths to make them Maven compatible
  // see https://cli.vuejs.org/config/
  outputDir: "target/dist",
  assetsDir: "static",
};
