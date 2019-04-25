export function parseTree (nodes) {
  let parentIds = new Set(nodes.map(item => item.parent_id))
  // let parentKeys = []
  // let listObj = {}
  // nodes.forEach(item => {
  //   parentKeys.indexOf(item.parent_id) >= 0 || parentKeys.push(item.parent_id)
  //   Reflect.set(listObj, item.id, Object.assign({ children: [] }, item))
  // })
  let arr = []
  // Object.keys(listObj).map(key => {
  //   let item = listObj[key]
  //   if (parentKeys.indexOf(item.id) < 0) {
  //     delete item.children
  //   }
  //   if (Object.keys(listObj).indexOf(item.parent_id) >= 0) {
  //     listObj[item.parent_id].children.push(item)
  //   } else {
  //     arr.push(item)
  //   }
  // })

  return arr
}
