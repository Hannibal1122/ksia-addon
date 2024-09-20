const WebpackAssetsManifest = require("webpack-assets-manifest");
const WebpackParseManifestPlugin = require("./webpack-parse-manifest.plugin");

module.exports = {
    plugins: [
        new WebpackAssetsManifest({
            output: "manifest.json",
            publicPath: "/",
        }),
        new WebpackParseManifestPlugin(),
    ],
    optimization: {
        chunkIds: "named",
    },
    output: {
        filename: "[name].[contenthash].js",
        chunkFilename: (chunkData) => {
            const name = chunkData.chunk;
            return `widgets/[id].[contenthash].js`;
        },
    },
};
