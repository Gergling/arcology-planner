function sortByF(node1, node2) {
  return node1.f < node2.f ? -1 : node1.f > node2.f ? 1 : 0;
}

function getAncestry(node, ancestry = []) {
  ancestry.push(node);
  if (node.parent) {
    getAncestry(node.parent, ancestry);
  } else {
    ancestry.reverse();
  }
  return ancestry;
}

export {
  sortByF,
  getAncestry
}