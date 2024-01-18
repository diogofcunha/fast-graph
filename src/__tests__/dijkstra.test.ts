import { Node, Graph, NodeDistance } from "..";

describe("Dijkstra's Algorithm", () => {
  test("should return empty for empty graph", () => {
    const graph = new Graph<number>({ weighted: true });

    const dijkstraResult: NodeDistance = graph.dijkstra(
      new Node<number>("A", 0)
    );

    expect(dijkstraResult).toEqual({});
  });

  test("should throw an error when provided node doesn't exist", () => {
    const graph = new Graph<number>({ weighted: true });

    const nodeA = new Node<number>("A", 0);
    const nodeB = new Node<number>("B", 0);
    const nodeC = new Node<number>("C", 0);

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);

    expect(() =>
      graph.dijkstra(new Node<number>("NonExistentNode", 0))
    ).toThrowErrorMatchingInlineSnapshot(`"Node NonExistentNode not found"`);
  });

  test("should return shortest path for simple graph", () => {
    const graph = new Graph<number>({ weighted: true });

    const nodeA = new Node<number>("A", 0);
    const nodeB = new Node<number>("B", 0);
    const nodeC = new Node<number>("C", 0);
    const nodeD = new Node<number>("D", 0);
    const nodeE = new Node<number>("E", 0);

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeA, nodeB, 1);
    graph.addEdge(nodeA, nodeC, 4);
    graph.addEdge(nodeB, nodeC, 2);
    graph.addEdge(nodeB, nodeD, 5);
    graph.addEdge(nodeC, nodeD, 1);
    graph.addEdge(nodeD, nodeE, 3);

    const dijkstraResult: NodeDistance = graph.dijkstra(nodeA);

    expect(dijkstraResult).toEqual({
      A: 0,
      B: 1,
      C: 3,
      D: 4,
      E: 7
    });
  });

  test("should return shortest path for negative weights (Bellman-Ford case)", () => {
    const graph = new Graph<number>({ weighted: true });

    const nodeA = new Node<number>("A", 0);
    const nodeB = new Node<number>("B", 0);
    const nodeC = new Node<number>("C", 0);
    const nodeD = new Node<number>("D", 0);
    const nodeE = new Node<number>("E", 0);

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeA, nodeB, 1);
    graph.addEdge(nodeA, nodeC, -3);
    graph.addEdge(nodeB, nodeD, 5);
    graph.addEdge(nodeC, nodeD, 1);
    graph.addEdge(nodeD, nodeE, 3);

    const dijkstraResult: NodeDistance = graph.dijkstra(nodeA);

    expect(dijkstraResult).toEqual({
      A: 0,
      B: 1,
      C: -3,
      D: -2,
      E: 1
    });
  });
});
