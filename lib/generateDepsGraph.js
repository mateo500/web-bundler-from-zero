const path = require("path");
const fs = require("fs");
const { parse } = require("abstract-syntax-tree");

const depsArray = [];

const depsGraph = (entryPoint) => {
  const fullPath = path.resolve("./src/", entryPoint);

  // return early if exists
  if (!!depsArray.find((item) => item.name === fullPath)) return;

  // store path + parsed source as module
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const source = parse(fileContents);
  const module = {
    name: fullPath,
    source,
  };

  // Add module to deps array
  depsArray.push(module);

  // recursive call to process deps
  source.body.map((current) => {
    if (current.type === "ImportDeclaration") {
      // process module for each dep.
      depsGraph(current.source.value);
    }
  });

  return depsArray;
};

module.exports = { depsGraph };
