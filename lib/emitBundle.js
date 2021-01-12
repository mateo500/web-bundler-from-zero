const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const emitBundle = (output, bundleCode) => {
  const sum = crypto.createHmac("sha256", "230664ae53cbe5a29");

  sum.update(bundleCode);

  const hash = sum.digest("hex");

  fs.mkdirSync(path.join(process.cwd(), output));

  //we create the file with the bundled code
  fs.writeFileSync(
    `${process.cwd()}/${output}/bundle-${hash}.js`,
    bundleCode,
    "utf8"
  );

  //we also create a manifest file to keep track of our builds
  fs.writeFileSync(
    `${process.cwd()}/${output}/manifest.json`,
    `{"bundle": "bundle-${hash}.js", "timestamp": "${new Date().toISOString()}"}`,
    "utf8"
  );
};

module.exports = { emitBundle };
