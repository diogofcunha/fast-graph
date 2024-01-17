import { Node, Graph } from "..";

describe("Graph", () => {
  test("should fail when adding edges without weight to weighted graph", () => {
    const graph = new Graph<number>({ weighted: true });
    const node1 = new Node("1", 10);
    const node2 = new Node("2", 20);

    graph.addNode(node1);
    graph.addNode(node2);

    expect(() =>
      graph.addEdge(node1, node2)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Can't add an edge to a weighted graph without weight"`
    );
  });

  test("should fail when adding edges with weight to unweighted graph", () => {
    const graph = new Graph<number>();
    const node1 = new Node("1", 10);
    const node2 = new Node("2", 20);

    graph.addNode(node1);
    graph.addNode(node2);

    expect(() =>
      graph.addEdge(node1, node2, 4)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Can't add an edge to a unweighted graph with weight"`
    );
  });

  test("should handle adding and removing multiple nodes and edges", () => {
    const graph = new Graph<number>();
    const node1 = new Node("1", 10);
    const node2 = new Node("2", 20);
    const node3 = new Node("3", 30);

    graph.addNode(node1);
    graph.addNode(node2);
    graph.addNode(node3);

    graph.addEdge(node1, node2);
    graph.addEdge(node1, node3);

    expect(graph.getNeighbors(node1)).toEqual([node2, node3]);
    expect(graph.getNeighbors(node2)).toEqual([node1]);
    expect(graph.getNeighbors(node3)).toEqual([node1]);

    graph.removeEdge(node1, node2);

    expect(graph.getNeighbors(node1)).toEqual([node3]);
    expect(graph.getNeighbors(node2)).toEqual([]);
    expect(graph.getNeighbors(node3)).toEqual([node1]);
  });

  test("should handle adding and removing duplicate edges", () => {
    const graph = new Graph<number>();
    const node1 = new Node("1", 10);
    const node2 = new Node("2", 20);

    graph.addNode(node1);
    graph.addNode(node2);

    graph.addEdge(node1, node2);
    graph.addEdge(node1, node2); // Adding a duplicate edge

    expect(graph.getNeighbors(node1)).toEqual([node2]);
    expect(graph.getNeighbors(node2)).toEqual([node1]);

    graph.removeEdge(node1, node2);

    expect(graph.getNeighbors(node1)).toEqual([]);
    expect(graph.getNeighbors(node2)).toEqual([]);
  });

  test("should handle removing non-existent nodes and edges", () => {
    const graph = new Graph<number>();
    const node1 = new Node("1", 10);
    const node2 = new Node("2", 20);
    const node3 = new Node("3", 20);

    graph.addNode(node1);

    // Removing a non-existent node
    expect(() => graph.removeNode(node2)).toThrow();

    graph.addNode(node2);

    // Removing a non-existent edge
    expect(() => graph.removeEdge(node1, node3)).toThrow();
  });

  test("should handle empty graph correctly", () => {
    const graph = new Graph<number>();

    expect(graph.isEmpty()).toBe(true);

    // Attempting operations on an empty graph
    expect(() => graph.getNeighbors(new Node("1", 10))).toThrow();
    expect(() => graph.removeNode(new Node("1", 10))).toThrow();
    expect(() =>
      graph.removeEdge(new Node("1", 10), new Node("2", 20))
    ).toThrow();
  });

  describe("Graph Khan's Topological Sort", () => {
    test("Topological sort for a simple DAG", () => {
      const node1 = new Node<string>("A", "Node A");
      const node2 = new Node<string>("B", "Node B");
      const node3 = new Node<string>("C", "Node C");

      const graph = new Graph<string>();

      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);

      graph.addEdge(node1, node2);
      graph.addEdge(node2, node3);

      const sortedNodes = graph.kahnTopologicalSort();
      expect(sortedNodes.map(node => node.value)).toEqual([
        "Node A",
        "Node B",
        "Node C"
      ]);
    });

    test("Topological sort for a graph with a cycle", () => {
      const node1 = new Node<string>("A", "Node A");
      const node2 = new Node<string>("B", "Node B");
      const node3 = new Node<string>("C", "Node C");

      const graph = new Graph<string>();

      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);

      graph.addEdge(node1, node2);
      graph.addEdge(node2, node3);
      graph.addEdge(node3, node1); // Introducing a cycle

      expect(() => graph.kahnTopologicalSort()).toThrow("Graph has a cycle");
    });

    test("Topological sort for an empty graph", () => {
      const graph = new Graph<string>();

      expect(() => graph.kahnTopologicalSort()).not.toThrow();
      expect(graph.kahnTopologicalSort()).toEqual([]);
    });

    test("Topological sort for a graph with disconnected components", () => {
      const node1 = new Node<string>("A", "Node A");
      const node2 = new Node<string>("B", "Node B");
      const node3 = new Node<string>("C", "Node C");
      const node4 = new Node<string>("D", "Node D");
      const node5 = new Node<string>("E", "Node E");

      const graph = new Graph<string>();

      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);
      graph.addNode(node4);
      graph.addNode(node5);

      graph.addEdge(node1, node2);
      graph.addEdge(node3, node4);

      const sortedNodes = graph.kahnTopologicalSort();
      const expectedOrder = ["Node A", "Node C", "Node E", "Node B", "Node D"];

      expect(sortedNodes.map(node => node.value)).toEqual(expectedOrder);
    });

    test("Topological sort for a graph with nodes having no incoming neighbors", () => {
      const node1 = new Node<string>("A", "Node A");
      const node2 = new Node<string>("B", "Node B");
      const node3 = new Node<string>("C", "Node C");

      const graph = new Graph<string>();

      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);

      const sortedNodes = graph.kahnTopologicalSort();
      const expectedOrder = ["Node A", "Node B", "Node C"];

      expect(sortedNodes.map(node => node.value)).toEqual(expectedOrder);
    });

    test("Topological sort for a graph with nodes having multiple incoming neighbors", () => {
      const node1 = new Node<string>("A", "Node A");
      const node2 = new Node<string>("B", "Node B");
      const node3 = new Node<string>("C", "Node C");
      const node4 = new Node<string>("D", "Node D");

      const graph = new Graph<string>();

      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);
      graph.addNode(node4);

      graph.addEdge(node1, node3);
      graph.addEdge(node2, node3);
      graph.addEdge(node4, node3);

      const sortedNodes = graph.kahnTopologicalSort();
      const expectedOrder = ["Node A", "Node B", "Node D", "Node C"];

      expect(sortedNodes.map(node => node.value)).toEqual(expectedOrder);
    });
  });
});
