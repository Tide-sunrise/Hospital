"use strict";
const common_vendor = require("../../../../common/vendor.js");
function addUnit(num) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`;
}
function isObj(value) {
  return Object.prototype.toString.call(value) === "[object Object]" || typeof value === "object";
}
function getType(target) {
  const typeStr = Object.prototype.toString.call(target);
  const match = typeStr.match(/\[object (\w+)\]/);
  const type = match && match.length ? match[1].toLowerCase() : "";
  return type;
}
const isDef = (value) => value !== void 0 && value !== null;
function getRect(selector, all, scope) {
  return new Promise((resolve, reject) => {
    let query = null;
    if (scope) {
      query = common_vendor.index.createSelectorQuery().in(scope);
    } else {
      query = common_vendor.index.createSelectorQuery();
    }
    query[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
      if (all && isArray(rect) && rect.length > 0) {
        resolve(rect);
      } else if (!all && rect) {
        resolve(rect);
      } else {
        reject(new Error("No nodes found"));
      }
    }).exec();
  });
}
function kebabCase(word) {
  const newWord = word.replace(/[A-Z]/g, function(match) {
    return "-" + match;
  }).toLowerCase();
  return newWord;
}
function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function isString(value) {
  return getType(value) === "string";
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function objToStyle(styles) {
  if (isArray(styles)) {
    return styles.filter(function(item) {
      return item != null && item !== "";
    }).map(function(item) {
      return objToStyle(item);
    }).join(";");
  }
  if (isString(styles)) {
    return styles;
  }
  if (isObj(styles)) {
    return Object.keys(styles).filter(function(key) {
      return styles[key] != null && styles[key] !== "";
    }).map(function(key) {
      return [kebabCase(key), styles[key]].join(":");
    }).join(";");
  }
  return "";
}
function deepClone(obj, cache = /* @__PURE__ */ new Map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (isDate(obj)) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  if (obj instanceof Error) {
    const errorCopy = new Error(obj.message);
    errorCopy.stack = obj.stack;
    return errorCopy;
  }
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  const copy = Array.isArray(obj) ? [] : {};
  cache.set(obj, copy);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key], cache);
    }
  }
  return copy;
}
function deepAssign(target, source) {
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const newObjValue = source[key];
    if (isObj(targetValue) && isObj(newObjValue)) {
      deepAssign(targetValue, newObjValue);
    } else {
      target[key] = newObjValue;
    }
  });
  return target;
}
const isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
function isImageUrl(url) {
  const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i;
  return imageRegex.test(url);
}
function omitBy(obj, predicate) {
  const newObj = deepClone(obj);
  Object.keys(newObj).forEach((key) => predicate(newObj[key], key) && delete newObj[key]);
  return newObj;
}
exports.addUnit = addUnit;
exports.deepAssign = deepAssign;
exports.getRect = getRect;
exports.isDef = isDef;
exports.isImageUrl = isImageUrl;
exports.isObj = isObj;
exports.isUndefined = isUndefined;
exports.objToStyle = objToStyle;
exports.omitBy = omitBy;
