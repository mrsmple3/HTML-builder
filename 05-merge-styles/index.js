const fs = require("fs");
const path = require("path");

async function mergeStyles(src, dest) {
  try {
    const entries = await fs.promises.readdir(src, { withFileTypes: true });
    let content = "";

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);

      if (entry.isFile() && path.extname(entry.name) === ".css") {
        content += await fs.promises.readFile(srcPath, "utf8");
      }
    }

    await fs.promises.writeFile(dest, content);
  } catch (error) {
    console.log(error);
  }
}

mergeStyles("./styles", "./project-dist/bundle.css");
