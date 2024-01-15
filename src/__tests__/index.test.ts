import { Node, Graph } from "..";

describe("Graph", () => {
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
});
