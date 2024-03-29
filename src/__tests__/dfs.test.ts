import { Node, Graph, SearchAlgorithmNodeBehavior } from "..";

describe("DFS Implementation unweighted graphs", () => {
  test("DFS should visit all nodes in the correct order", () => {
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
    graph.dfs(node => {
      visitedOrder.push(node.id);
      return SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeC.id, nodeD.id, nodeE.id, nodeB.id];

    expect(visitedOrder).toEqual(expectedOrder);
  });

  test("DFS should visit all connected nodes in the correct order if initial is supplied", () => {
    const graph = new Graph<number>();

    const nodeA = new Node<number>("A", 1);
    const nodeB = new Node<number>("B", 2);
    const nodeC = new Node<number>("C", 3);
    const nodeD = new Node<number>("D", 4);
    const nodeE = new Node<number>("E", 5);
    const nodeF = new Node<number>("F", 5);
    const nodeG = new Node<number>("G", 5);

    graph.addNode(nodeF);
    graph.addNode(nodeG);
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeF, nodeG);
    graph.addEdge(nodeG, nodeA);
    graph.addEdge(nodeA, nodeB);
    graph.addEdge(nodeA, nodeC);
    graph.addEdge(nodeB, nodeD);
    graph.addEdge(nodeC, nodeD);
    graph.addEdge(nodeD, nodeE);

    const visitedOrder: Array<string> = [];
    graph.dfs(node => {
      visitedOrder.push(node.id);
      return SearchAlgorithmNodeBehavior.continue;
    }, nodeA);

    const expectedOrder = [nodeA.id, nodeC.id, nodeD.id, nodeE.id, nodeB.id];

    expect(visitedOrder).toEqual(expectedOrder);
  });

  test("DFS should stop when break is returned", () => {
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
    graph.dfs(node => {
      visitedOrder.push(node.id);

      return node.value === 3
        ? SearchAlgorithmNodeBehavior.break
        : SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeC.id];

    expect(visitedOrder).toEqual(expectedOrder);
  });

  test("DFS on an empty graph should do nothing", () => {
    const graph = new Graph<number>();

    const visitedOrder: Array<string> = [];
    graph.dfs(node => {
      visitedOrder.push(node.id);
      return SearchAlgorithmNodeBehavior.continue;
    });

    expect(visitedOrder).toEqual([]);
  });
});

describe("DFS Implementation weighted graphs", () => {
  test("DFS should visit all nodes in the correct order", () => {
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
    graph.dfs((node, cost) => {
      visitedOrder.push(node.id);
      costOrder.push(cost);
      return SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeC.id, nodeD.id, nodeE.id, nodeB.id];

    expect(visitedOrder).toEqual(expectedOrder);
    expect(costOrder).toEqual([0, 2, 4, 5, 1]);
  });

  test("DFS should visit all connected nodes in the correct order if initial is supplied", () => {
    const graph = new Graph<number>({ weighted: true });

    const nodeA = new Node<number>("A", 1);
    const nodeB = new Node<number>("B", 2);
    const nodeC = new Node<number>("C", 3);
    const nodeD = new Node<number>("D", 4);
    const nodeE = new Node<number>("E", 5);
    const nodeF = new Node<number>("F", 5);
    const nodeG = new Node<number>("G", 5);

    graph.addNode(nodeF);
    graph.addNode(nodeG);
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addNode(nodeE);

    graph.addEdge(nodeF, nodeG, 1);
    graph.addEdge(nodeG, nodeA, 1);
    graph.addEdge(nodeA, nodeB, 1);
    graph.addEdge(nodeA, nodeC, 2);
    graph.addEdge(nodeB, nodeD, 3);
    graph.addEdge(nodeC, nodeD, 4);
    graph.addEdge(nodeD, nodeE, 5);

    const visitedOrder: Array<string> = [];
    const costOrder: Array<number | undefined> = [];
    graph.dfs((node, cost) => {
      visitedOrder.push(node.id);
      costOrder.push(cost);
      return SearchAlgorithmNodeBehavior.continue;
    }, nodeA);

    const expectedOrder = [nodeA.id, nodeC.id, nodeD.id, nodeE.id, nodeB.id];

    expect(visitedOrder).toEqual(expectedOrder);
    expect(costOrder).toEqual([0, 2, 4, 5, 1]);
  });

  test("DFS should stop when break is returned", () => {
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

    graph.dfs((node, cost) => {
      visitedOrder.push(node.id);
      costOrder.push(cost);

      return node.value === 3
        ? SearchAlgorithmNodeBehavior.break
        : SearchAlgorithmNodeBehavior.continue;
    });

    const expectedOrder = [nodeA.id, nodeC.id];

    expect(visitedOrder).toEqual(expectedOrder);
    expect(costOrder).toEqual([0, 2]);
  });

  test("DFS on an empty graph should do nothing", () => {
    const graph = new Graph<number>({ weighted: true });

    const visitedOrder: Array<string> = [];
    const costOrder: Array<number | undefined> = [];

    graph.dfs((node, cost) => {
      visitedOrder.push(node.id);
      costOrder.push(cost);
      return SearchAlgorithmNodeBehavior.continue;
    });

    expect(visitedOrder).toEqual([]);
    expect(costOrder).toEqual([]);
  });
});
