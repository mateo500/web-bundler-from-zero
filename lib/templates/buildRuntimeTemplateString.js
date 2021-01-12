const buildRuntimeTemplateString = (allModules) => `
(function(modules) {
  // Define runtime.
  const installedModules = {}; // id/index + exports
  function _our_require_(moduleId) {

    // Module in cache?
    if (installedModules[moduleId]) {
        // return function exported in module
       return installedModules[moduleId].exports
    }

    // Build module, store exports against this ref.
    const module = {
       i: moduleId,
       exports: {},
    }
    
    // Execute module template function. Add exports to ref.
    modules[moduleId](module, _our_require_);

    // cache exports of module
    const exports = module.exports;
    installedModules[moduleId] = exports
    
    // Return exports of module
    return exports;
  }
  // Load entry module via id + return exports
  return _our_require_(0);
})
/* Dep tree */
([
 ${allModules}
]); 
`;

module.exports = { buildRuntimeTemplateString };
