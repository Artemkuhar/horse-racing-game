const { defineConfig } = require('@vue/cli-service');

const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath,
});
