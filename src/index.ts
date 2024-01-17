export class Node<T> {
  public incomingNeighbors: string[] = [];
  constructor(public readonly id: string, public readonly value: T) {}
}

export enum SearchAlgorithmNodeBehavior {
  continue = 0,
  break = 1
}

export type OnNodeFn<T> = (
  node: Node<T>,
  cost?: number
) => SearchAlgorithmNodeBehavior;
export type OnNodeFnAsync<T> = (
  node: Node<T>,
  cost?: number
) => Promise<SearchAlgorithmNodeBehavior>;

interface EdgeConnection {
  id: string;
  weight?: number;
}

interface Transition<T> {
  node: Node<T>;
  cost?: number;
}

export interface Options {
  weighted?: boolean;
}

export class Graph<T> {
  private _nodes: Array<Node<T>> = [];
  private _nodesById = new Map<string, number>();
  private _edges = new Map<string, Array<EdgeConnection>>();
  public readonly weighted: boolean;

  constructor({ weighted = false }: Options = {}) {
    this.weighted = weighted;
  }

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

  addEdge(node1: Node<T>, node2: Node<T>, weight?: boolean) {
    if (this.weighted && weight === undefined) {
      throw new Error(`Can't add an edge to a weighted graph without weight`);
    }

    if (!this.weighted && weight !== undefined) {
      throw new Error(`Can't add an edge to a unweighted graph with weight`);
    }

    this.getNodeById(node1);
    const storedNode2 = this.getNodeById(node2);
    const edgesFromNode1 = this._edges.get(node1.id) || [];

    const existingEdge = edgesFromNode1.find(e => e.id === node2.id);

    if (existingEdge) {
      return;
    }

    this._edges.set(node1.id, edgesFromNode1.concat([node2]));

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

    for (const { id } of edges) {
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

        if (e.id === node2.id) {
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

    for (const { id } of outgoingNeighbors) {
      if (!visited.has(id)) {
        const neighbor = this.getNodeById(id);
        neighbors.push(neighbor);
        visited.add(id);
      }
    }

    return neighbors;
  }

  kahnTopologicalSort(): Array<Node<T>> {
    const queue: Node<T>[] = [];
    const left: Node<T>[] = [];
    const result: Node<T>[] = [];

    this._nodes.forEach(node => {
      if (node.incomingNeighbors.length === 0) {
        queue.push(node);
      } else {
        left.push({
          ...node,
          incomingNeighbors: node.incomingNeighbors.slice(0)
        });
      }
    });

    while (queue.length > 0) {
      const currentNode = queue.shift() as Node<T>;
      result.push(currentNode);

      const outgoingNeighbors = this._edges.get(currentNode.id) || [];

      for (const { id } of outgoingNeighbors) {
        const neighborNode = left.find(l => l.id === id);

        if (!neighborNode) {
          continue;
        }

        neighborNode.incomingNeighbors = neighborNode.incomingNeighbors.filter(
          n => {
            return n !== currentNode.id;
          }
        );

        if (neighborNode.incomingNeighbors.length === 0) {
          queue.push(neighborNode);
        }
      }
    }

    if (result.length !== this._nodes.length) {
      throw new Error("Graph has a cycle");
    }

    return result;
  }

  bfs(onNode: OnNodeFn<T>): void {
    const queue: Array<Transition<T>> = [];
    const nodesToProcess = this._nodes.slice(0);

    if (!nodesToProcess.length) {
      return;
    }

    queue.push({
      node: nodesToProcess.shift() as Node<T>,
      cost: this.weighted ? 0 : undefined
    });

    const visited = new Set();
    visited.add(queue[0]?.node.id);

    while (queue.length > 0) {
      const { node: currentNode, cost } = queue.shift() as Transition<T>;

      const nodeBehavior = onNode(currentNode, cost);

      if (nodeBehavior === SearchAlgorithmNodeBehavior.break) {
        break;
      }

      const connections = this._edges.get(currentNode.id) || [];
      const neighbors = connections.map(c => {
        return {
          node: this.getNodeById(c.id),
          cost: this.weighted ? c.weight : undefined
        };
      });

      for (const n of neighbors) {
        if (!visited.has(n.node.id)) {
          queue.push(n);
          visited.add(n.node.id);
        }
      }
    }
  }

  async bfsAsync(onNode: OnNodeFnAsync<T>): Promise<void> {
    const queue: Array<Transition<T>> = [];
    const nodesToProcess = this._nodes.slice(0);

    if (!nodesToProcess.length) {
      return;
    }

    queue.push({
      node: nodesToProcess.shift() as Node<T>,
      cost: this.weighted ? 0 : undefined
    });

    const visited = new Set();
    visited.add(queue[0]?.node.id);

    while (queue.length > 0) {
      const { node: currentNode, cost } = queue.shift() as Transition<T>;

      const nodeBehavior = await onNode(currentNode, cost);

      if (nodeBehavior === SearchAlgorithmNodeBehavior.break) {
        break;
      }

      const connections = this._edges.get(currentNode.id) || [];
      const neighbors = connections.map(c => {
        return {
          node: this.getNodeById(c.id),
          cost: this.weighted ? c.weight : undefined
        };
      });

      for (const n of neighbors) {
        if (!visited.has(n.node.id)) {
          queue.push(n);
          visited.add(n.node.id);
        }
      }
    }
  }

  dfs(onNode: OnNodeFn<T>): void {
    const stack: Array<Transition<T>> = [];

    if (!this._nodes.length) {
      return;
    }

    stack.push({ node: this._nodes[0], cost: this.weighted ? 0 : undefined });
    const visited = new Set();
    visited.add(stack[0]?.node.id);

    while (stack.length > 0) {
      const { node: currentNode } = stack.pop() as Transition<T>;

      const nodeBehavior = onNode(currentNode);

      if (nodeBehavior === SearchAlgorithmNodeBehavior.break) {
        break;
      }

      const connections = this._edges.get(currentNode.id) || [];
      const neighbors: Array<Transition<T>> = connections.map(c => {
        return {
          node: this.getNodeById(c.id),
          cost: this.weighted ? c.weight : undefined
        };
      });

      for (const n of neighbors) {
        if (!visited.has(n.node.id)) {
          stack.push(n);
          visited.add(n.node.id);
        }
      }
    }
  }

  async dfsAsync(onNode: OnNodeFnAsync<T>): Promise<void> {
    const stack: Array<Transition<T>> = [];

    if (!this._nodes.length) {
      return;
    }

    stack.push({ node: this._nodes[0], cost: this.weighted ? 0 : undefined });
    const visited = new Set();
    visited.add(stack[0]?.node.id);

    while (stack.length > 0) {
      const { node: currentNode } = stack.pop() as Transition<T>;

      const nodeBehavior = await onNode(currentNode);

      if (nodeBehavior === SearchAlgorithmNodeBehavior.break) {
        break;
      }

      const connections = this._edges.get(currentNode.id) || [];
      const neighbors: Array<Transition<T>> = connections.map(c => {
        return {
          node: this.getNodeById(c.id),
          cost: this.weighted ? c.weight : undefined
        };
      });

      for (const n of neighbors) {
        if (!visited.has(n.node.id)) {
          stack.push(n);
          visited.add(n.node.id);
        }
      }
    }
  }
}
