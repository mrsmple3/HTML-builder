const fs = require("fs");
const path = require("path");
const folderPath = "./03-files-in-folder/secret-folder";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log(err);
        } else if (stats.isFile()) {
          const ext = path.extname(file);
          const size = stats.size;
          console.log(`${file}-${ext}-${size}`);
        }
      });
    });
  }
});
