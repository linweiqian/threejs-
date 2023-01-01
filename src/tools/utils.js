/**
 * 一个值如果是null或者''返回-
 * @param value 需要处理的值
 * @param length 需要截取的字符的长度的值,未指定的时候返回全部
 * @returns {*} 处理过的值
 */
export function replaceNull(value, length) {
  //判断截取的值是否为空
  if (value == null || value == undefined || value == "" || value == "undefined") {
    return "-";
  }
  //判断长度是否为空
  if (length == null || length == "") {
    return value;
  }
  return value.toString().substr(0, length);
}

/**
 * JS判断是否为空
 * @param val
 * @returns {boolean}
 */
export function isNull(val) {
  if (
    val == undefined ||
    val == null ||
    val == "" ||
    val == "" ||
    val == "undefined" ||
    val == "null" ||
    val == "NULL"
  ) {
    return true;
  }
  return false;
}

/**
 * JS获取地址栏参数的值
 * @param name 对应的参数
 * @param search location.search || location.hash
 * @returns {*} 如果有，则返回参数值，没有则返回null
 */
export function getUrlParam(name, search) {
  search = search || window.location.search.substr(1) || window.location.hash.split("?")[1];
  if (!search) {
    return null;
  }
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = search.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}