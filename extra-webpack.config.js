const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = {
    plugins: [
        new WebpackAssetsManifest({
            output: "manifest.json",
            publicPath: "/",
        }),
    ],
};
