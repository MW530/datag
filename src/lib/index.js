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
      el.dataset.glisten = `glisten_${binding.arg}`
      el.dataset.gtype = binding.value
      el.classList.add(`glisten_${binding.arg}`); 
      beginMonitor(binding.arg, 'bottom', Vue.prototype.$datag)
    }
  })
  beginStatistic(Vue.prototype.$datag.clickData)
  Vue.prototype.$datag.watchData = () => {
    return Vue.prototype.$datag._private.scrollData
  }
}

export default datag
