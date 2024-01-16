# fast-graph

[![CircleCI](https://circleci.com/gh/diogofcunha/fast-graph.svg?style=svg)](https://circleci.com/gh/diogofcunha/fast-graph)
[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/fast-graph.png?style=flat-square
[npm]: https://www.npmjs.com/package/fast-graph

A robust and fast package for handling graph opperations and algorithms

## Description

🚀 Cutting-edge TypeScript library designed to empower developers with a high-performance solution for efficient graph operations and algorithms. With a focus on speed and reliability, this library simplifies the implementation of graph-related tasks, offering a comprehensive set of features for seamless integration into any real world case.

## Install

```bash
yarn add fast-graph
```

```bash
npm install fast-graph
```

## Real life usecases

- **Social Networks:** Identify influencers and communities effortlessly.
- **Software Dependencies:** Streamline module sequencing in large projects.
- **Route Optimization:** Efficient planning for maps and network routing.
- **Task Scheduling:** Smooth management of project tasks and dependencies.
- **Code Compilation:** Parallel execution for faster builds.
- **Recommendation Systems:** Personalized user insights for better recommendations.
- **Supply Chain Optimization:** Improve logistics by analyzing distribution networks.

## Usage

#### 1. **Node Class:**

The `Node` class represents a node in the graph, holding a unique identifier (`id`) and an associated value of generic type (`T`). The `incomingNeighbors` property tracks incoming edges to the node.

```typescript
import { Node } from "fast-graph";

// Example Usage:
const myNode = new Node<string>("uniqueId", "Node Value");
```

#### 2. **Graph Class:**

The `Graph` class is the core component for graph operations. It allows you to create, manipulate, and perform various algorithms on graphs.

```typescript
import { Node, Graph } from "fast-graph";

// Example Usage:
const myGraph = new Graph<string>();

// Adding Nodes
const nodeA = new Node<string>("A", "Node A");
const nodeB = new Node<string>("B", "Node B");
myGraph.addNode(nodeA);
myGraph.addNode(nodeB);

// Adding Edges
myGraph.addEdge(nodeA, nodeB);

// Removing Nodes
myGraph.removeNode(nodeA);

// Removing Edges
myGraph.removeEdge(nodeB, nodeA);

// Checking if the Graph is Empty
const isEmpty = myGraph.isEmpty();

// Getting Neighbors of a Node
const neighbors = myGraph.getNeighbors(nodeB);

// Kahn's Topological Sort
const topologicalOrder = myGraph.kahnTopologicalSort();
```

Note: Ensure that you handle errors appropriately, as the library throws an error if attempting operations on non-existing nodes or in the presence of cycles.

## Contributing

Contributions are welcome! Please submit a pull request with any improvements or bug fixes. Make sure to add tests for any new features and bug fixes, and ensure that the existing tests pass.

## License

This project is licensed under the MIT License.

## Contact

If you need help or have questions, feel free to open an issue in the GitHub repository.
