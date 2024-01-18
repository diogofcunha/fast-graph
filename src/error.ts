export class NodeNotFoundError extends Error {
  constructor(nodeId: string) {
    super(`Node ${nodeId} not found`);
  }
}

export enum WeightedGraphEdgeErrorType {
  ShouldProvideWeight,
  ShouldNotProvideWeight
}

export class WeightedGraphEdgeError extends Error {
  constructor(type: WeightedGraphEdgeErrorType) {
    super(
      type === WeightedGraphEdgeErrorType.ShouldProvideWeight
        ? `Can't add an edge to a weighted graph without weight`
        : `Can't add an edge to an unweighted graph with weight`
    );
  }
}

export class GraphCycleError extends Error {
  constructor() {
    super(`Graph has a cycle`);
  }
}
