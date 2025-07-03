export default function validateDAG(nodes, edges) {
  if (nodes.length < 2) return { valid: false, message: 'Need ≥2 nodes' };
  const adj = {};
  nodes.forEach(n => adj[n.id] = []);
  edges.forEach(e => adj[e.source].push(e.target));
  const visited = {};
  const recStack = {};

  function dfs(u) {
    visited[u] = true;
    recStack[u] = true;
    for (const v of adj[u]) {
      if (!visited[v] && dfs(v)) return true;
      if (recStack[v]) return true;
    }
    recStack[u] = false;
    return false;
  }

  if (nodes.some(n => adj[n.id].length === 0 && !edges.some(e => e.target === n.id)))
    return { valid: false, message: 'All nodes need ≥1 connection' };

  for (const n of nodes) {
    if (!visited[n.id] && dfs(n.id)) return { valid: false, message: 'Cycle detected' };
  }

  return { valid: true, message: '' };
}
