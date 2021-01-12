const { transform } = require("./transform");
const { depsGraph } = require("./generateDepsGraph");
const { emitBundle } = require("./emitBundle");

module.exports = { transform, depsGraph, emitBundle };
