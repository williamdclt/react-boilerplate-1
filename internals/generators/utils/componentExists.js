/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const config = require('../../config.js');
const fs = require('fs');

const pageComponents = fs.readdirSync(`${config.appPath}/components`);

const components = pageComponents;

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
