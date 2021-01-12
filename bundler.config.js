const { depsGraph, transform, emitBundle } = require("./lib");

const generateBundle = (entryPoint) => {
  const generateDepsGraph = depsGraph(entryPoint);

  const transformedBundle = transform(generateDepsGraph);

  //specify your output folder
  emitBundle("dist", transformedBundle);
};

//specify your entry point
generateBundle("main.js");
