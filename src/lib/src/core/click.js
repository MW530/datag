import {
  hasProperty,
  addOrPlus,
  selectNode
} from '../utils'

/**
* bind event to the target div
*
* @param { String, Object }  
* 
*/
function bindEvent(eventType, clickData) {
  document.addEventListener(eventType, (e) => {
    let node = selectNode(e)
    if (node === null) return
    const data = {
      eventType,
      srcNode: node,
      x: e.clientX,
      y: e.clientY,
      timeStamp: e.timeStamp,
      isTrusted: e.isTrusted
    }
    let mainType = data.srcNode.dataset.glisten.split('_')[1]
    let subType = data.srcNode.dataset.gtype
    data.mainType = mainType
    data.subType = subType
    clickData.byTime.push(data)
    // debugger
    if (eventType === 'click') {
      if (!hasProperty(clickData.byType, mainType)) {
        clickData.byType[mainType] = {};
      }
      addOrPlus(clickData.byType[mainType], subType)
    }
  })
}

/**
* Determine if a value is undefined
*
*sample: clickData : {
    byTime: [
        {
            {
                eventType: 'click',
                srcNode : e.target,
                x : e.clientX,
                y : e.clientY,
                timeStamp: e.timeStamp
            }
        }
    ],
    byType: {
        1 : {
            a: 1,
            b: 12
        }
    }
}
*
* @param { Object } : clicData 
* 
*/
export default function beginStatistic(clickData) {
  bindEvent('click', clickData)
  bindEvent('mousedown', clickData)
  document.addEventListener('keypress', (e) => {
      const data = {}
      data.eventType = e.type
      data.keyCode = e.charCode
      data.timeStamp = e.timeStamp
      data.isTrusted = e.isTrusted
      clickData.byTime.push(data)
  })
}
