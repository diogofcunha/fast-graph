export class NodeNotFoundError extends Error {
  constructor(nodeId: string) {
    super(`Node ${nodeId} not found`);
  }
}
