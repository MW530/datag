import { calcTopOffset, isUndefined, addOrPlus } from '../utils'
import { processScrollData } from './dataProcessing'

function countType(visibleItem){
    let data = {}
    for(let item of visibleItem){
        const subType = item.dataset.gtype
        addOrPlus(data, subType)
    }
    return data
}

/**
* monitor item visible and the time between last time on every status
*
*_private.scrollData = {
    mainType: {
        timeGap: 2000,
        vitalType: {
            '西南': 1,
            '东北': 3,
            '西北': 4
        }
    }
}
*
*
*
*
* @param { }  
* @returns { } 
*/

function monitor(mainType, direction, datag, e){
    let _private = datag._private
    // console.log(_private)
    // debugger
    const date = new Date()
    const timeStamp = isUndefined(e) ? date.getTime() : e.timeStamp
    const timeGap = timeStamp - _private.lastTimeStamp
    if(timeGap < 0.5) return
    const clientHeight = document.documentElement.clientHeight
    // const clientWidth = document.documentElement.clientWidth
    const itemGroup = document.getElementsByClassName(`glisten_${mainType}`)
    let visibleItem = []
    const partTop = {
        first: [
            direction === 'bottom' ? clientHeight * 0.4 : 0,
            direction === 'bottom' ? 0 : clientHeight * 0.6,
        ]
    }
    for(let item of itemGroup){
        // debugger
        let top = calcTopOffset(item)[0]
        let bottom = top + item.offsetHeight
        if(top < partTop.first[0] && bottom > partTop.first[1]){
            visibleItem.push(item)
            // console.log(item)
        }
    }
    if(_private.init){
        _private.lastTimeStamp = timeStamp
        _private.init = false
    }else{
        const vitalType = countType(visibleItem)
        if(isUndefined(_private.scrollData[mainType])){
            _private.scrollData[mainType] = []
        }
        _private.scrollData[mainType].push(
            {
                timeGap,
                vitalType
            }
        )
    }
    if(!isUndefined(_private.scrollData[mainType]) && _private.scrollData[mainType].length > 500) {
        const data = processScrollData(_private.scrollData[mainType])
        datag.scrollData = data
        _private.scrollData[mainType] = []
    }
}

export default function beginMonitor(mainType, direction, datag){
    document.addEventListener('scroll', (e) => {
        monitor(mainType, direction, datag, e)
    })
}
