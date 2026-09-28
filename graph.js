class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
    return this;
  }

  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }

    return this;
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);

    return this;
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);

    return this;
  }

  removeVertex(vertex) {
    for (let adjacentVertex of vertex.adjacent) {
      adjacentVertex.adjacent.delete(vertex);
    }

    vertex.adjacent.clear();
    this.nodes.delete(vertex);

    return this;
  }

  depthFirstSearch(start) {
  const result = [];
  const visited = new Set();

  function traverse(vertex) {
    if (!vertex) return;

    visited.add(vertex);
    result.push(vertex.value);

    for (let neighbor of vertex.adjacent) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  }

  traverse(start);

  return result;
}

  breadthFirstSearch(start) {
    const result = [];
    const visited = new Set([start]);
    const queue = [start];

    while (queue.length) {
      const vertex = queue.shift();

      result.push(vertex.value);

      for (let neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };