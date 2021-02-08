import {
  pieceContain,
  isIE,
  isNumber,
  mixAsync,
  isUndefined,
  error
} from '../utils'

/**
 * return basedata about user environment
 *
 * @param {Object}  navigator: navigator Object
 * @returns {Array} data : imfomrtion searched
 * obj : {
 *  engine,
 *  os,
 *  platfrom,
 *  device,
 *  lang,
 *  network,
 *  onLine
 * }
 */
function baseData() {
  // 信息map
  const data = {}

  const infoMap = {
    engines: ['WebKit', 'Trident', 'Gecko', 'Presto'],
    browsers: ['Chrome', 'Safari', 'Edge', 'Firefox', 'Firefox Focus', 'Chromium',
      'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle',
      'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE',
      'UC', 'QQBrowser', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER',
      '2345Explorer',
      'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', 'WechatWork', 'Taobao', 'Alipay',
      'Weibo', 'Douban', 'Suning', 'iQiYi'
    ],
    oss: ['Android', 'iOS',
      'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Windows', 'Linux', 'Mac OS',
      'Ubuntu', 'Chrome OS', 'WebOS', 'FreeBSD', 'Debian'
    ],
    platfroms: ['Mobile', 'PC'],
    devices: {
      'MI PAD': '小米平板',
      MI: '小米',
      HUAWEI: '华为',
      HuaweiMediaPad: '华为平板',
      HONOR: '荣耀',
      SM: '三星',
      OPPO: 'OPPO',
      Redmi: '红米',
      vivo: 'vivo',
      iPhone: 'iPhone',
      iPad: 'ipad',
      MIX: '小米MIX',
      CoolPad: '酷派'
    }
  }
  const useragent = navigator.userAgent
  data.engine = pieceContain(infoMap.engines, useragent) === '' ? '未知引擎' : pieceContain(infoMap
    .engines, useragent)
  const IEV = isIE()
  if (IEV !== -1) {
    data.browser = `IE ${IEV}`
  } else {
    data.browser = pieceContain(infoMap.browsers, useragent) === '' ? '未知浏览器' : pieceContain(
      infoMap.browsers, useragent)
  }
  data.device = pieceContain(infoMap.devices, useragent) === '' ? '未知设备' : pieceContain(infoMap
    .devices, useragent)
  data.os = pieceContain(infoMap.oss, useragent) === '' ? '未知设备' : pieceContain(infoMap
    .oss, useragent)
  if (infoMap.oss.slice(0, 6).includes(data.os)) {
    data.platfrom = infoMap.platfroms[0]
  } else if (infoMap.oss.slice(6, 15).includes(data.os)) {
    data.platfrom = infoMap.platfroms[1]
  } else {
    data.platfrom = '未知平台'
  }
  data.lang = (isUndefined(navigator.language) ? '未知语言' : navigator.language)
  data.network = navigator.connection.effectiveType
  data.onLine = navigator.onLine
  data.date = new Date().getTime()
  return data
}

/**
 * return a Promise about other advanced data about the user enviroment
 *
 * @param {Object}navigator: navigator
 * @returns { Object }  obj: advanced data
 */
async function advancedData() {
  const data = {}
  const IE = isIE() === -1 ? false : true
  if (!IE) {
    if (isUndefined(navigator.bluetooth)) {
      data.bluetooth = '无法检测'
    } else {
      navigator.bluetooth.getAvailability().then((res) => {
        data.bluetooth = res
      })
    }

    if (isUndefined(navigator.geolocation)) {
      data.positon = '无法检测'
    } else {
      navigator.geolocation.getCurrentPosition((
        pos) => {
        data.positon = pos
        console.log(pos)
      }, (err) => {
        console.log(err)
      })
    }
  } else {
    data.bluetooth = 'IE浏览器下无法检测'
    data.location = 'IE浏览器下无法检测'
  }
  data.isTouch = 'ontouchen' in document ? true : false;
  data.screenHeight = screen.availHeight
  data.screenWidth = screen.availWidth
  data.colorDepth = screen.colorDepth
  data.screenType = screen.orientation.type
  return data
}

/**
* Determine what kind data to return 
*
* @param { Number } type: the data type return  
* @returns { Object } data: return data
*/
export default function enviData(type) {
  if (type === undefined) type = 0
  if (isNumber(type)) {
    switch (type) {
      case 0:                               // 基础数据
        return baseData()
      case 1:                               // 高级数据
        return advancedData()
      case 2:                               //混合数据
        return mixAsync(advancedData(), baseData())
      default:
        return baseData()
    }
  } else {
    error('enviData接收一个数字！')
    return -1
  }
}
