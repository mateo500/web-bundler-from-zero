const { generateDependencyGraph, transform, emitBundle } = require("./lib");

const generateBundle = (entryPoint, output) => {
  const depsGraph = generateDependencyGraph(entryPoint);

  const transformedBundle = transform(depsGraph);

  //specify your output folder
  emitBundle(output, transformedBundle);
};

//specify your entry point and output folder
generateBundle("main.js", "dist");
