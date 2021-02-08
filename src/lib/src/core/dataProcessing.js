import {
  isUndefined
} from '../utils';

export function processScrollData(oldScrollData) {
  const data = {}
  if (Array.isArray(oldScrollData)) {
    for (let item of oldScrollData) {
      let timeGap = item.timeGap
      let temp = {}
      for (let once in item.vitalType) {
        if (isUndefined(temp[once])) {
          temp[once] = item.vitalType[once] * timeGap
        } else {
          temp[once] += (item.vitalType[once] * timeGap)
        }
      }
      for (let subType in temp) {
        if (isUndefined(data[subType])) {
          data[subType] = temp[subType]
        } else {
          data[subType] += temp[subType]
        }
      }
    }
  }
  return data
}
