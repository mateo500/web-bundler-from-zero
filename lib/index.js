const { transform } = require("./transform");
const { generateDependencyGraph } = require("./generateDepsGraph");
const { emitBundle } = require("./emitBundle");

module.exports = { transform, generateDependencyGraph, emitBundle };
