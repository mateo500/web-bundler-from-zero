const buildModuleTemplateString = (moduleCode, index) => `
/* id in deps collection ${index} */
(function(module, _ourRequire) {
 "use strict";
 ${moduleCode}
})
`;

module.exports = { buildModuleTemplateString };
