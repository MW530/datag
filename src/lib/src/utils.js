const toString = Object.prototype.toString

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

/**
 * check whether a value is a String 
 *
 * @param {any}  value: the value to check
 * @returns { Boolean} res: true means is a String,false means not a String 
 */
export function isString(value) {
  const type = typeof value
  return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) &&
    getTag(value) === '[object String]')
}

/**
 * check whether a string is contained in another string
 *
 * @param {String, bundleRenderer.renderToString}  target:  The string was searching, row: the searching pool string
 * @returns { Boolean } res: isContain
 */
export function isContain(target, row) {
  if (isString(row) && isString(target)) {
    return row.indexOf(target) > -1 ? true : false
  }
  return false
}

/**
 * check whether items in arr is contained in the row string
 *
 * @param { Array }arr: all strings to be checked, row: the searching pool string
 * @returns { } 
 */
export function pieceContain(arr, row) {
  if (Array.isArray(arr) && isString(row)) {
    for (let i = 0; i < arr.length; i++) {
      if (isContain(arr[i], row)) {
        return arr[i]
      }
    }
  }
  return ''
}

/**
 * check whether a value is a Number 
 *
 * @param {any}  value: the value to check
 * @returns { Boolean} res: true means is a Number,false means not a Number 
 */
export function isNumber(value) {
  return typeof value === 'number' ||
    (getTag(value) === '[object Number]')
}

/**
 * check whether a value is a undefined 
 *
 * @param {any}  value: the value to check
 * @returns { Boolean} res: true means is undefined,false means not undefined 
 */
export function isUndefined(value) {
  return value === undefined
}

/**
 * check whether a value is a promise 
 *
 * @param {any}  value: the value to check
 * @returns { Boolean} res: true means is promise,false means not promise 
 */
export function isPromise(value) {
  return (value instanceof Promise)
}

/**
 * check whether a value is a object 
 *
 * @param {any}  value: the value to check
 * @returns { Boolean} res: true means is object,false means not object 
 */
function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * check whether current browser is IE
 *
 * 
 * @returns { Number } res: -1 means is not IE, else means IE version
 */
export function isIE() {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  let IE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器  
  let isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器  
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (IE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) {
      return 7;
    } else if (fIEVersion === 8) {
      return 8;
    } else if (fIEVersion === 9) {
      return 9;
    } else if (fIEVersion === 10) {
      return 10;
    }
    return 6; //IE版本<=7
  } else if (isEdge) {
    return 'edge'; //edge
  } else if (isIE11) {
    return 11; //IE11  
  }
  return -1; //不是ie浏览器
}

/**
 * Throw a error
 *
 * @param {String}  message:error message
 * @returns {none} 
 */
export function error(message) {
  if (process.env.NODE_ENV !== 'production') {
    typeof console !== 'undefined' && console.error(`[datag] ${message}`)
  }
}

/**
 * shallowly merge two object 
 *
 * @param { Object, Object }base: source object, src: object been added  
 * @returns { } 
 */
export function merge(base, src) {
  return Object.assign(base, src)
}

/**
 * add the obj to the proimse and return a new Promise
 *
 * @param { Promose, Object }  promise: the source promise, obj: the obj been added
 * @returns { } 
 */
export async function mixAsync(promise, obj) {
  if (isPromise(promise) && isObject(obj)) {
    const nweP = new Promise((resolve, reject) => {
      promise.then((res) => {
        resolve(merge(res, obj))
      }, (err) => {
        reject(err)
      })
    })
    return nweP
  }
  return undefined
}

/**
 * check whether browser support Proxy
 *
 * @param { }  
 * @returns { } 
 */

export function supProxy() {
  let flag = false
  try {
    flag = Proxy instanceof Function
  } catch {
    flag = false
  }
  return flag
}

/**
* check whether taget in src
*
* @param {Object, any}  
* @returns { Boolean } 
*/
export function hasProperty(src, target){
  return Object.hasOwnProperty.call(src, target)
}

/**
* add the property and plus 1 or just plus 1 if the property has exist
*
* @param { Object, any }  
* @returns { none } 
*/
export function addOrPlus(obj, prop){
  if(hasProperty(obj, prop)){
    obj[prop]++
  }else{
    obj[prop] = 1;
  }
}

/**
* select datag Node
*
* @param { Event }  
* 
*/
export function selectNode(e){
  let node = e.target
  while (node !== null && isUndefined(node.dataset.glisten)) {
    node = node.parentElement
  }
  return node
}

/**
* calculate node top and left offset
*
* @param { HTMLElement }  
* @returns { Number } 
*/
export function calcTopOffset(node){
  let t = node.getBoundingClientRect().top
  let l = node.getBoundingClientRect().left
  return [t, l]
}

/**
 * defien a Proxy for a object
 *
 * @param {  }  
 * @returns { } 
 */
export function setProxy(hiddenObj, perSet, parentObj, childName) {
  if (!isObject(hiddenObj) || !isObject(parentObj)) return
  if (supProxy()) {
    let p = new Proxy({}, {
      get: (target, propKey) => {
        return Object.hasOwnProperty.call(hiddenObj, propKey) ? hiddenObj[propKey] : undefined
      },
      set: (target, propKey, value) => {
        perSet ? error('这个属性只读') : hiddenObj[propKey] = value
      }
    })
    parentObj[childName] = p
  } else {
    Object.defineProperty(parentObj, childName, {
      get: () => {
        return hiddenObj
      },
      set: (value) => {
        if (perSet) {
          parentObj[childName] = value
        }
      }
    })
  }
}
