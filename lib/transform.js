const { generate } = require("abstract-syntax-tree");
const {
  buildModuleTemplateString,
  buildRuntimeTemplateString,
} = require("./templates");
const { getExport, getImport } = require("./transformers");

const transform = (depsArray) => {
  const updatedModules = depsArray.reduce((acc, dependency, index) => {
    const updatedAst = dependency.source.body.map((item) => {
      if (item.type === "ImportDeclaration") {
        // replace module imports with ours
        item = getImport(item, depsArray);
      }
      if (item.type === "ExportNamedDeclaration") {
        // replaces function name with real exported function
        item = getExport(item);
      }
      return item;
    });

    //we update the AST with the updated exports-imports(ES6)
    dependency.source.body = updatedAst;

    // Turn the AST back into string
    const updatedSource = generate(dependency.source);


    // Bind module source to module template
    const updatedTemplate = buildModuleTemplateString(updatedSource, index);

    acc.push(updatedTemplate);

    return acc;
  }, []);

  // Add all modules to bundle
  const bundlestring = buildRuntimeTemplateString(
    updatedModules.join(","),
    depsArray.length - 1 // index location
  );

  return bundlestring;
};

module.exports = { transform };
