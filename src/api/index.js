import axios from 'axios'

const mockBase = 'https://www.fastmock.site/mock/166244967e029cc27113797debcfdab5/'

export const test = axios.get(`${mockBase}test`).then((res) => {
  console.log(res)
  return res
})
