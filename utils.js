const convert = require("xml-js");
const _ = require("lodash");

function removeJsonTextAttribute(value, parentElement) {
    try {
      var keyNo = Object.keys(parentElement._parent).length;
      var keyName = Object.keys(parentElement._parent)[keyNo - 1];
      parentElement._parent[keyName] = value;
    } catch (e) {}
  }

const options = {
    compact: true,
    space: 4,
    elementNameFn: function (val) {
      if (val == "VehicleTypeId") {
        val = "typeId";
      }
      if (val == "VehicleTypeName") {
        val = "typeName";
      }
      return _.camelCase(val);
    },
    textFn: removeJsonTextAttribute,
  };

const parseXML = (xml) => {
    return convert.xml2js(xml, options);
}

module.exports = { parseXML };