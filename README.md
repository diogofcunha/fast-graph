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

// Use BFS to visit all nodes in the graph
myGraph.bfs(node => {
  console.log(`Visiting Node ${node.id} with value ${node.value}`);
  return SearchAlgorithmNodeBehavior.continue;
});

// Use BFS to find a node
myGraph.bfs(node => {
  console.log(`Visiting Node ${node.id} with value ${node.value}`);
  return node.id === "id_your_looking_for"
    ? SearchAlgorithmNodeBehavior.break
    : SearchAlgorithmNodeBehavior.continue;
});

// Use BFS to visit all nodes in the graph async
await myGraph.bfsAsync(async node => {
  await yourExternalApiCall(node);

  return SearchAlgorithmNodeBehavior.continue;
});

// Use DFS to visit all nodes in the graph
myGraph.dfs(node => {
  console.log(`Visiting Node ${node.id} with value ${node.value}`);
  return SearchAlgorithmNodeBehavior.continue;
});

// Use DFS to find a node
myGraph.dfs(node => {
  console.log(`Visiting Node ${node.id} with value ${node.value}`);
  return node.id === "id_your_looking_for"
    ? SearchAlgorithmNodeBehavior.break
    : SearchAlgorithmNodeBehavior.continue;
});

// Use DFS to visit all nodes in the graph async
await myGraph.dfsAsync(async node => {
  await yourExternalApiCall(node);

  return SearchAlgorithmNodeBehavior.continue;
});

// Use Dijkstra's algorithm to discover shortest path from a node to all other nodes.
const dijkstraResult: NodeDistance = graph.dijkstra(nodeA);
```

Note: Ensure that you handle errors appropriately, as the library throws an error if attempting operations on non-existing nodes or in the presence of cycles.

### Depth-First Search (DFS):

1. **Traversal:**
   - DFS is commonly used for traversing or searching through a graph or tree data structure.
   - It explores as far as possible along each branch before backtracking.
2. **Connected Components:**
   - DFS is used to identify connected components in an undirected graph.
3. **Cycle Detection:**
   - DFS can be employed to detect cycles in a graph. If during the traversal, you encounter an already visited node, it indicates the presence of a cycle.
4. **Pathfinding:**
   - DFS can help find paths between two nodes in a graph.
5. **Maze Solving:**
   - DFS is useful for solving mazes and exploring possible paths.
6. **Backtracking:**
   - It's a fundamental algorithm for backtracking problems.

### Breadth-First Search (BFS):

1. **Shortest Path:**
   - BFS is commonly used to find the shortest path between two nodes in an unweighted graph.
2. **Connected Components:**
   - Similar to DFS, BFS can identify connected components in an undirected graph.
3. **Level Order Traversal:**
   - BFS is effective for performing level-order traversal of a tree or graph.
4. **Maze Solving:**
   - BFS can be used for maze-solving algorithms.
5. **Network Routing:**
   - BFS is applied in network routing protocols to discover the shortest path.

### Dijkstra's Algorithm:

1. **Shortest Paths:**
   - Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes in a graph with non-negative edge weights.
2. **Non-Negative Weights:**
   - It is particularly suited for graphs with non-negative weights, providing accurate shortest paths.
3. **Applications:**
   - Widely used in network routing, transportation systems, and any scenario where finding the shortest path is crucial.
4. **Priority Queue:**
   - Dijkstra's algorithm utilizes a priority queue to efficiently select the next node with the smallest tentative distance.

### Kahn's Topological Sort:

1. **Directed Acyclic Graph (DAG):**
   - Kahn's algorithm is used for topological sorting of nodes in a Directed Acyclic Graph (DAG).
2. **Dependency Resolution:**
   - In project management and build systems, Kahn's algorithm helps resolve dependencies between tasks or components.
3. **Course Scheduling:**
   - In academic settings, Kahn's algorithm can be used for scheduling courses, ensuring prerequisites are met.
4. **Task Execution Order:**
   - Kahn's algorithm is useful for determining the order of task execution when tasks have dependencies.
5. **Compiler Dependency Analysis:**
   - In compilers, Kahn's algorithm aids in analyzing and resolving dependencies between modules.

### General Considerations:

- **Use DFS for...**
  - Exploring all possible paths in a graph.
  - Cycle detection.
  - Backtracking problems.
- **Use BFS for...**
  - Finding the shortest path in an unweighted graph.
  - Level order traversal.
  - Maze solving.
- **Use Dijkstra's Algorithm for...**
  - Finding the shortest paths in graphs with non-negative weights.
  - Applications requiring accurate shortest paths.
- **Use Kahn's Algorithm for...**
  - Topological sorting in Directed Acyclic Graphs.
  - Dependency resolution in various applications.
  - Task scheduling and execution order determination.

Each algorithm has its strengths and is well-suited for specific types of problems. The choice depends on the nature of the problem you're solving and the characteristics of your data.

## Contributing

Contributions are welcome! Please submit a pull request with any improvements or bug fixes. Make sure to add tests for any new features and bug fixes, and ensure that the existing tests pass.

## License

This project is licensed under the MIT License.

## Contact

If you need help or have questions, feel free to open an issue in the GitHub repository.
