const buildModuleTemplateString = (moduleCode, index) => `
/* index/id ${index} */
(function(module, _ourRequire) {
 "use strict";
 ${moduleCode}
})
`;

module.exports = { buildModuleTemplateString };
