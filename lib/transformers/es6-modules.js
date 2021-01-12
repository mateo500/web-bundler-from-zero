const path = require("path");

const getImport = (item, allDeps) => {
  // get variable we import into
  const importFunctionName = item.specifiers[0].imported.name;

  // get files full path and find index in deps array.
  const fullFile = path.resolve("./src/", item.source.value);
  const itemId = allDeps.findIndex((item) => item.name === fullFile);

  return {
    type: "VariableDeclaration",
    kind: "const",
    declarations: [
      {
        type: "VariableDeclarator",
        init: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "_ourRequire",
          },
          arguments: [
            {
              type: "Literal",
              value: itemId,
            },
          ],
        },
        id: {
          type: "Identifier",
          name: importFunctionName,
        },
      },
    ],
  };
};

/*
 * Replacing ESM export with our function.
 * `module.exports = someFunction;`
 */
const getExport = (item) => {
  // get export functions name
  const moduleName = item.specifiers[0].exported.name;
  return {
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      left: {
        type: "MemberExpression",
        object: { type: "Identifier", name: "module" },
        computed: false,
        property: { type: "Identifier", name: "exports" },
      },
      operator: "=",
      right: { type: "Identifier", name: moduleName },
    },
  };
};

module.exports = { getExport, getImport };
