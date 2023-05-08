const fs = require("fs");
const path = require("path");

async function buildPage(src, dest) {
  try {
    await fs.promises.mkdir(dest, { recursive: true });

    const template = await fs.promises.readFile(
      path.join(src, "template.html"),
      "utf8"
    );

    const components = await fs.promises.readdir(path.join(src, "components"), {
      withFileTypes: true,
    });

    let html = template;
    for (let component of components) {
      if (component.isFile() && path.extname(component.name) === ".html") {
        const componentName = path.basename(component.name, ".html");
        const componentContent = await fs.promises.readFile(
          path.join(src, "components", component.name),
          "utf8"
        );
        html = html.replace(
          new RegExp(`{{${componentName}}}`, "g"),
          componentContent
        );
      }
    }

    await fs.promises.writeFile(path.join(dest, "index.html"), html);

    const styles = await fs.promises.readdir(path.join(src, "styles"), {
      withFileTypes: true,
    });
    let css = "";
    for (let style of styles) {
      if (style.isFile() && path.extname(style.name) === ".css") {
        css += await fs.promises.readFile(
          path.join(src, "styles", style.name),
          "utf8"
        );
      }
    }

    await fs.promises.writeFile(path.join(dest, "style.css"), css);

    await copyDir(path.join(src, "assets"), path.join(dest, "assets"));
  } catch (error) {
    console.log(error);
  }
}

async function copyDir(src, dest) {
  try {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

buildPage("./06-build-page", "./project-dist");
