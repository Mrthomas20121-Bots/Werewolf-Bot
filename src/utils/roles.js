const Config = require("void-config");
const List = require("void-list");

/**
 * @type {List<string>}
 */
let roles = List.fromJson(require('./roles.json'));