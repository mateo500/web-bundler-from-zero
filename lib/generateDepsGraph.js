const path = require("path");
const fs = require("fs");
const { parse } = require("abstract-syntax-tree");

const depsArray = [];

const generateDependencyGraph = (entryPoint) => {
  const fullPath = path.resolve("./src/", entryPoint);
  //this base path is hardcoded, we can change this for a better implementation

  // return if exists
  if (!!depsArray.find((item) => item.name === fullPath)) return;

  // create the module object with the AST
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const source = parse(fileContents);
  const module = {
    name: fullPath,
    source,
  };

  // Add module to deps array
  depsArray.push(module);

  // recursive call to process deps
  source.body.map((node) => {
    if (node.type === "ImportDeclaration") {
      // process module for each import declaration(new node)
      generateDependencyGraph(node.source.value);
    }
  });

  return depsArray;
};

module.exports = { generateDependencyGraph };
