const fs = require("fs");

class WebpackParseManifestPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap("WebpackAssetsManifest", async (compilation) => {
            const manifestPath = `${compilation.outputOptions.path}/manifest.json`;
            const manifest = fs.readFileSync(manifestPath, "utf8");
            const filesToParse = JSON.parse(manifest);

            const map = new Map();
            Object.keys(filesToParse).forEach((file) => {
                const filePath = filesToParse[file];
                if (filePath.indexOf("/widgets/") === -1) return;
                const name = filePath.replace("_component_ts", "").split("_");
                const originalName = name[name.length - 1].split(".")[0] + ".component.ts";
                map.set(originalName, file);
            });

            const files = await findTSFiles(`src/app`);
            for (const path of files) {
                const name = path.split("/").pop();
                if (map.has(name)) {
                    const fileContent = await fs.readFileSync(`src/app/${path}`, "utf8");
                    const parsedData = parseFile(fileContent);
                    fs.writeFileSync(
                        `${compilation.outputOptions.path}/widgets/${map.get(name)}.json`,
                        JSON.stringify(parsedData, null, 4),
                    );
                }
            }
        });
    }
}

module.exports = WebpackParseManifestPlugin;

const parseFile = (fileContent) => {
    const json = {};
    json.name = /selector: "([^"]+)"/g.exec(fileContent)[1];
    json.inputs = {};

    const regex = /inputs: ({[^}]+})/g;
    const match = regex.exec(fileContent);
    if (match) {
        const inputProps = match[1].trim();
        const quotedString =
            inputProps
                .replace(/\s+/g, "")
                .replace(/\b(\w+)\b/g, '"$1"')
                .split(";")
                .slice(0, -1)
                .join(",") + "}";
        json.inputs = JSON.parse(quotedString);
    }
    return json;
};

function findTSFiles(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, { recursive: true }, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const jsFiles = files.filter((file) => file.endsWith(".ts"));
                resolve(jsFiles);
            }
        });
    });
}
