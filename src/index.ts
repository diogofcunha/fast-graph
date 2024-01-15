export class Node<T> {
  public incomingNeighbors: string[] = [];
  constructor(public readonly id: string, public readonly value: T) {}
}

export class Graph<T> {
  private _nodes: Array<Node<T>> = [];
  private _nodesById = new Map<string, number>();
  private _edges = new Map<string, string[]>();

  private getNodeById(node: string | Node<T>) {
    const nodeId = typeof node === "string" ? node : node.id;
    const nodeIdx = this._nodesById.get(nodeId);

    if (nodeIdx === undefined) {
      throw new Error(`Node ${nodeId} not found`);
    }

    return this._nodes[nodeIdx];
  }

  addNode(value: Node<T>) {
    const length = this._nodes.push(value);
    this._nodesById.set(value.id, length - 1);
  }

  addEdge(node1: Node<T>, node2: Node<T>) {
    this.getNodeById(node1);
    const storedNode2 = this.getNodeById(node2);

    const edges = new Set(this._edges.get(node1.id) || []);

    edges.add(node2.id);

    this._edges.set(node1.id, [...edges]);

    const incomingNeighbors = new Set(storedNode2.incomingNeighbors);
    incomingNeighbors.add(node1.id);
    storedNode2.incomingNeighbors = [...incomingNeighbors];
  }

  removeNode(node: Node<T>) {
    const storedNode = this.getNodeById(node);
    const incoming = storedNode.incomingNeighbors.slice();

    for (const id of incoming) {
      const n = this.getNodeById(id);
      this.removeEdge(n, node);
    }

    const edges = (this._edges.get(node.id) || []).slice();

    for (const id of edges) {
      const n = this.getNodeById(id);
      this.removeEdge(node, n);
    }

    const nodeIndex = this._nodesById.get(node.id);

    if (nodeIndex === undefined) {
      throw new Error(`Node ${node.id} not found`);
    }

    this._nodes.splice(nodeIndex, 1);
    this._nodesById.delete(node.id);

    for (let i = Math.max(0, nodeIndex - 1); i < this._nodes.length; i++) {
      const n = this._nodes[i];
      this._nodesById.set(n.id, i);
    }

    this._edges.delete(node.id);
  }

  removeEdge(node1: Node<T>, node2: Node<T>) {
    this.getNodeById(node1);
    const storedNode2 = this.getNodeById(node2);

    const edges = this._edges.get(node1.id);

    if (edges) {
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];

        if (e === node2.id) {
          edges.splice(i, 1);
          break;
        }
      }
    }

    for (let i = 0; i < storedNode2.incomingNeighbors.length; i++) {
      const id = storedNode2.incomingNeighbors[i];

      if (id === node1.id) {
        storedNode2.incomingNeighbors.splice(i, 1);
        break;
      }
    }
  }

  isEmpty(): boolean {
    return this._nodes.length === 0;
  }

  getNeighbors(node: Node<T>): Array<Node<T>> {
    const storedNode = this.getNodeById(node.id);

    const visited = new Set<string>();
    const neighbors: Array<Node<T>> = [];

    for (const id of storedNode.incomingNeighbors) {
      if (!visited.has(id)) {
        const neighbor = this.getNodeById(id);
        neighbors.push(neighbor);
        visited.add(id);
      }
    }

    const outgoingNeighbors = this._edges.get(storedNode.id) || [];

    for (const id of outgoingNeighbors) {
      if (!visited.has(id)) {
        const neighbor = this.getNodeById(id);
        neighbors.push(neighbor);
        visited.add(id);
      }
    }

    return neighbors;
  }
}
