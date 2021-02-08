const Mock = require('mockjs');

export function commodity() {
  const normaolPool =
    '苹果是蔷薇科苹果亚科苹果属植物，其树为落叶乔木。苹果营养价值很高，富含矿物质和维生素，含钙量丰富，有助于代谢掉体内多余盐分，苹果酸可代谢热量，防止下半身肥胖。'
  // const typePool = ['水果', '手机', '书籍', '电脑', '运动', '建筑', '地名']
  const data = []
  for (let i = 0; i < 62; ++i) {
    // console.log(i)
    let type = Mock.Random.region()
    data[i] = {
      id: i,
      imgSrc: Mock.Random.image('400x200', '#336666', 'SamPic' + type),
      name: Mock.Random.string(normaolPool, 4, 6),
      description: Mock.Random.string(normaolPool, 15, 20),
      type: type
    }
  }
  return data
}

export function userLogin(userInfo) {
  // console.log(userInfo);
  if (userInfo.name === 'admin' && userInfo.password === 'admin') {
    return true;
  }
  return false
}
