import enviData from './src/core/enviData'
import beginStatistic from './src/core/click'
import beginMonitor from './src/core/timeCalc'

const datag = {}
const $datag = {
  enviData,
  _private: {
    lastTimeStamp: 0,
    init: true,
    scrollData: []
  },
  scrollData: {},
  clickData: {
    byTime: [],
    byType: {}
  },
}
datag.install = function (Vue) {
  Vue.prototype.$datag = $datag
  Vue.directive('listen', {
    bind: function (el, binding) {
      let mainType = binding.arg
      el.dataset.glisten = `glisten_${mainType}`
      let direction = binding.value.direction
      let subType = binding.value.subType
      el.dataset.gtype = subType
      el.classList.add(`glisten_${binding.arg}`);
      beginMonitor(mainType, direction, Vue.prototype.$datag)
    }
  })
  beginStatistic(Vue.prototype.$datag.clickData)
  Vue.prototype.$datag.watchData = () => {
    return Vue.prototype.$datag._private.scrollData
  }
}

export default datag
