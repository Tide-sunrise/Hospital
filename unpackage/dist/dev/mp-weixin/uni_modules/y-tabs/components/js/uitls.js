"use strict";
function isNull(val) {
  if (typeof val == "boolean") {
    return false;
  }
  if (typeof val == "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0)
      return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}")
      return true;
  } else {
    if (val == "null" || val == null || val == "undefined" || val == void 0 || val == "")
      return true;
    return false;
  }
  return false;
}
function isDef(val) {
  return val !== void 0 && val !== null;
}
function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function noop() {
}
function isFunction(val) {
  return typeof val === "function";
}
function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function addUnit(value) {
  if (!isDef(value)) {
    return void 0;
  }
  value = String(value);
  return isNumeric(value) ? `${value}px` : value;
}
function callInterceptor(options) {
  const {
    interceptor,
    args,
    done
  } = options;
  if (interceptor) {
    const returnVal = interceptor(...args);
    if (isPromise(returnVal)) {
      returnVal.then((value) => {
        if (value)
          done();
      }).catch(noop);
    } else if (returnVal) {
      done();
    }
  } else {
    done();
  }
}
const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;
const getColor = function(colorStr) {
  const matches = colorStr.match(rgbaRegex);
  if (matches && matches.length === 5) {
    return [
      matches[1],
      matches[2],
      matches[3],
      matches[4]
    ];
  }
  return [];
};
function toClass(classObj, ...classArray) {
  const arr = Object.keys(classObj || {}).filter((key) => classObj[key]);
  arr.push(...classArray);
  return arr.join(" ");
}
function getDirection(x, y) {
  if (x > y)
    return "horizontal";
  if (y > x)
    return "vertical";
  return "";
}
function easingFunction(time, duration, type = "linear") {
  let pos = time / duration;
  let value = 0;
  switch (type) {
    case "easeOutCubic":
      value = Math.pow(pos - 1, 3) + 1;
      break;
    case "easeInOutCubic":
      if ((pos /= 0.5) < 1)
        value = 0.5 * Math.pow(pos, 3);
      else
        value = 0.5 * (Math.pow(pos - 2, 3) + 2);
      break;
    default:
      value = pos;
      break;
  }
  return value;
}
function progress(time, begin, end, duration, type) {
  return begin + (end - begin) * easingFunction(time, duration, type);
}
let uid = 0;
function getUid() {
  return uid++;
}
const now = Date.now || function() {
  return +/* @__PURE__ */ new Date();
};
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function deepClone(obj) {
  if ([null, void 0, NaN, false].includes(obj))
    return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    return obj;
  }
  const o = array(obj) ? [] : {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}
exports.addUnit = addUnit;
exports.callInterceptor = callInterceptor;
exports.deepClone = deepClone;
exports.getColor = getColor;
exports.getDirection = getDirection;
exports.getUid = getUid;
exports.isDef = isDef;
exports.isNull = isNull;
exports.now = now;
exports.progress = progress;
exports.toClass = toClass;
