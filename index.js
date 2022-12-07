let Tree = require('./tree_data_mock.js');
const {clearTree, doIncrement, findAncestors, findLeafs} = require('./lib.js')

function incValue(node_id, value_increment) {
  const clearedTree = clearTree(Tree)
  // And only now we change the STATE
  Tree = doIncrement(
    clearedTree,
    findAncestors(clearedTree, node_id),
    findLeafs(clearedTree, node_id),
    value_increment
  )
}

// Test cases
incValue(303, 303);
incValue(1701, -1701);
incValue(9000, 9000);

// Print-out the result
console.log(JSON.stringify(Tree, null, "\t"));

