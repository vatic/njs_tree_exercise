const Tree = require('./tree_data_mock.js');

const compose = (f, g) => (...args) => f(g(...args))

const doJob = (...fns) => fns.reduce(compose)

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
  const node = tree.find((e) => e.id === nodeId)
}

const incValueInNode = (tree) => (nodeId, valueInc = 0) => {
  if (!(typeof valueInc === 'number' && Number.isFinite(valueInc))) {
    valueInc = 0
  }
  valueInc = Math.floor(valueInc * 100) / 100
  const index = tree.findIndex((e) => e.id === nodeId)
  const newNode = Object.assign({}, tree[index], {value: tree[index].value + valueInc})
  return [...tree.slice(0, index), newNode, ...tree.slice(index + 1)]
}

console.log(Tree);
console.log(doJob(incValueInNode, clearTree)(Tree)(505, 22.333333));




