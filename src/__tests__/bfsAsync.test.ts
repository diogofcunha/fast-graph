import { Node, Graph, SearchAlgorithmNodeBehavior } from "..";

describe("BFS Async Implementation unweighted graph", () => {
  test("BFS should visit all nodes in the correct order", async () => {
    const graph = new Graph<number>();

    const nodeA = new Node<number>("A", 1);
    const nodeB = new Node<number>("B", 2);
    const nodeC = new Node<number>("C", 3);
    const nodeD = new Node<number>("D", 4);
    const nodeE = new Node<number>("E", 5);

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeA, nodeB);
    graph.addEdge(nodeA, nodeC);
    graph.addEdge(nodeB, nodeD);
    graph.addEdge(nodeC, nodeD);
    graph.addEdge(nodeD, nodeE);

    const visitedOrder: Array<string> = [];
    await graph.bfsAsync(async node => {
      visitedOrder.push(node.id);
      return SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeB.id, nodeC.id, nodeD.id, nodeE.id];

    expect(visitedOrder).toEqual(expectedOrder);
  });

  test("BFS should stop when break is returned", async () => {
    const graph = new Graph<number>();

    const nodeA = new Node<number>("A", 1);
    const nodeB = new Node<number>("B", 2);
    const nodeC = new Node<number>("C", 3);
    const nodeD = new Node<number>("D", 4);
    const nodeE = new Node<number>("E", 5);

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeA, nodeB);
    graph.addEdge(nodeA, nodeC);
    graph.addEdge(nodeB, nodeD);
    graph.addEdge(nodeC, nodeD);
    graph.addEdge(nodeD, nodeE);

    const visitedOrder: Array<string> = [];
    await graph.bfsAsync(async node => {
      visitedOrder.push(node.id);

      return node.value === 3
        ? SearchAlgorithmNodeBehavior.break
        : SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeB.id, nodeC.id];

    expect(visitedOrder).toEqual(expectedOrder);
  });

  test("BFS on an empty graph should do nothing", async () => {
    const graph = new Graph<number>();

    const visitedOrder: Node<number>[] = [];
    await graph.bfsAsync(async node => {
      visitedOrder.push(node);
      return SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder: Node<number>[] = [];

    expect(visitedOrder).toEqual(expectedOrder);
  });
});

describe("BFS Async Implementation weighted graph", () => {
  test("BFS should visit all nodes in the correct order", async () => {
    const graph = new Graph<number>({ weighted: true });

    const nodeA = new Node<number>("A", 1);
    const nodeB = new Node<number>("B", 2);
    const nodeC = new Node<number>("C", 3);
    const nodeD = new Node<number>("D", 4);
    const nodeE = new Node<number>("E", 5);

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeA, nodeB, 1);
    graph.addEdge(nodeA, nodeC, 2);
    graph.addEdge(nodeB, nodeD, 3);
    graph.addEdge(nodeC, nodeD, 4);
    graph.addEdge(nodeD, nodeE, 5);

    const visitedOrder: Array<string> = [];
    const costOrder: Array<number | undefined> = [];

    await graph.bfsAsync(async (node, cost) => {
      visitedOrder.push(node.id);
      costOrder.push(cost);

      return SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeB.id, nodeC.id, nodeD.id, nodeE.id];

    expect(visitedOrder).toEqual(expectedOrder);
    expect(costOrder).toEqual([0, 1, 2, 3, 5]);
  });

  test("BFS should stop when break is returned", async () => {
    const graph = new Graph<number>({ weighted: true });

    const nodeA = new Node<number>("A", 1);
    const nodeB = new Node<number>("B", 2);
    const nodeC = new Node<number>("C", 3);
    const nodeD = new Node<number>("D", 4);
    const nodeE = new Node<number>("E", 5);

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeA, nodeB, 1);
    graph.addEdge(nodeA, nodeC, 2);
    graph.addEdge(nodeB, nodeD, 3);
    graph.addEdge(nodeC, nodeD, 4);
    graph.addEdge(nodeD, nodeE, 5);

    const visitedOrder: Array<string> = [];
    const costOrder: Array<number | undefined> = [];

    await graph.bfsAsync(async (node, cost) => {
      visitedOrder.push(node.id);
      costOrder.push(cost);

      return node.value === 3
        ? SearchAlgorithmNodeBehavior.break
        : SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeB.id, nodeC.id];

    expect(visitedOrder).toEqual(expectedOrder);
    expect(costOrder).toEqual([0, 1, 2]);
  });

  test("BFS on an empty graph should do nothing", async () => {
    const graph = new Graph<number>({ weighted: true });

    const visitedOrder: Node<number>[] = [];
    const costOrder: Array<number | undefined> = [];

    await graph.bfsAsync(async (node, cost) => {
      visitedOrder.push(node);
      costOrder.push(cost);

      return SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder: Node<number>[] = [];

    expect(visitedOrder).toEqual(expectedOrder);
    expect(costOrder).toEqual([]);
  });
});
