const findChild = (node, childrenMap, key) => {
  let result = Object.assign({}, node)
  if (Reflect.has(childrenMap, node[key])) {
    result.children = Reflect.get(childrenMap, node[key]).map(childNode => findChild(childNode, childrenMap))
  }
  return result
}

export function parseTree (nodes, options = { id: 'id', parent_id: 'parent_id' }) {
  let parentIds = new Set()
  let ids = []
  let childrenMap = {}

  nodes.forEach(item => {
    parentIds = parentIds.add(item[options.parent_id])
    ids.push(item[options.id])
    Reflect.has(childrenMap, item[options.parent_id]) || Reflect.set(childrenMap, item[options.parent_id], [])
    childrenMap[item[options.parent_id]].push(item)
  })
  const rootIds = [...parentIds].filter(item => !ids.includes(item))
  let arr = []
  rootIds.forEach(rootId => {
    childrenMap[rootId].forEach(rootNode => {
      arr.push(findChild(rootNode, childrenMap, options.id))
    })
  })
  return arr
}
