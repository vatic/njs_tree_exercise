// This functions are pure and referential transparent.

function clearTree(tree) {
  return tree
    .filter((el) => 'id' in el)
    .map((el) => {
      if (typeof el.value === 'number' && Number.isFinite(el.value)) {
        return Object.assign({}, el, {value: Math.floor(el.value * 100) / 100})
      } else {
        return Object.assign({}, el, {value: 0})
      }
    })
}

function findAncestors(tree, nodeId) {
  const ids = [nodeId]
  return (function findA(tree, nodeId) {
    const parentId = tree.find((e) => e.id === nodeId)?.parent_id
    if (parentId) {
      ids.push(parentId)
      findA(tree, parentId)
    }
    return ids
  })(tree, nodeId)
}

function findLeafs(tree, nodeId) {
  const parentId = tree.find((e) => e.id === nodeId)?.parent_id
  return tree.filter((e) => e.parent_id === parentId && e.id !== nodeId)
}

function incValueInNode(tree, nodeId, valueInc = 0) {
  if (!(typeof valueInc === 'number' && Number.isFinite(valueInc))) {
    valueInc = 0
  }
  valueInc = Math.floor(valueInc * 100) / 100
  const index = tree.findIndex((e) => e.id === nodeId)
  const newNode = Object.assign({}, tree[index], {value: tree[index].value + valueInc})
  return [...tree.slice(0, index), newNode, ...tree.slice(index + 1)]
}

// Если у "брата" value = 0, то увеличиваем на valueInc/10
function doIncrement(tree, parendIds, leafs, valueInc) {
  let localTree = Array.from(tree)
  parendIds.forEach((id, index) => {
    localTree = incValueInNode(localTree, id, valueInc / (Math.pow(4, index)))
  })
  leafs.forEach((node) => {
    let value = valueInc / 10 > node.value && node.value !== 0 ? node.value : valueInc / 10
    localTree = incValueInNode(localTree, node.id, value)
  })

  return localTree
}

module.exports = {
  clearTree,
  doIncrement,
  findAncestors,
  findLeafs
}
