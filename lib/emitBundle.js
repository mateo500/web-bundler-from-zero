const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const emitBundle = (output, bundleCode) => {
  const sum = crypto.createHmac("sha256", "230664ae53cbe5a29");

  sum.update(bundleCode);

  const hash = sum.digest("hex");

  fs.mkdirSync(path.join(process.cwd(), output));

  fs.writeFileSync(
    `${process.cwd()}/${output}/bundle-${hash}.js`,
    bundleCode,
    "utf8"
  );

  fs.writeFileSync(
    `${process.cwd()}/${output}/manifest.json`,
    `{"bundle": "bundle-${hash}.js"}`,
    "utf8"
  );
};

module.exports = { emitBundle };
