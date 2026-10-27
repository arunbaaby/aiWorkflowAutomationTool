const workflow = {
    nodes: [
        { id: "A", type: "input" },
        { id: "B", type: "llm" },
        { id: "C", type: "email" }
    ],

    edges: [
        { source: "A", target: "B" },
        { source: "B", target: "C" }
    ]
};

type WorkflowNode = {
    id: string;
    type: string;
}

type WorkflowEdge = {
    source: string;
    target: string;
}

function buildGraph(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
    const adjacencyList = new Map<string, string[]>([]);
    const inDegree = new Map<string, number>([]);

    for (const node of nodes) {
        adjacencyList.set(node.id, [])
        inDegree.set(node.id, 0)
    }

    for (const edge of edges) {
        const { source, target } = edge;

        adjacencyList.get(source)?.push(target);

        const currentIndegree = inDegree.get(target) || 0;
        inDegree.set(target, currentIndegree + 1);
    }
    return { adjacencyList, inDegree }
}

const { adjacencyList, inDegree } = buildGraph(workflow.nodes, workflow.edges);

console.log("Adjacency List:", adjacencyList);
console.log("Indegree:", inDegree);

function executeGraph(adjacencyList: Map<string, string[]>, inDegree: Map<string, number>) {
    const queue: string[] = [];
    const executionOrder: string[] = [];

    for (let [node, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(node);
        }
    }

    while (queue.length > 0) {
        let curr = queue.shift() as string;
        executionOrder.push(curr);

        for (let neighbor of adjacencyList.get(curr) || []) {
            const currentInDegree = inDegree.get(neighbor) || 0;
            inDegree.set(neighbor, currentInDegree - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    // cycle exists if order count doesn't match nodes count
    if (executionOrder.length !== workflow.nodes.length) {
        return "Cycle exists in the graph, cannot execute";
    }
    return executionOrder;
}

type ExecutionContext = Record<string, any>

async function executeNode(node: WorkflowNode, context: ExecutionContext) {
    switch (node.type) {
        case "input":
            console.log("processing input node");
            await new Promise(resolve => setTimeout(resolve, 100));
            return { rawInput: "summarise this article" }
        case "llm":
            console.log("processing llm node");
            console.log("LLM sees input: ", context["A"]);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { generatedText: "Here is the summary of the article" }
        case "email":
            console.log("processing email node");
            console.log("Email sees input: ", context["B"]);
            await new Promise(resolve => setTimeout(resolve, 500));
            return { status: "email sent" }
        default:
            console.log("Unknown node type");
            return null;
    }
}

async function runWorkflow() {
    const order = executeGraph(adjacencyList, inDegree);

    // execute graph can return string when there is cycle
    if (typeof order === "string") {
        console.log(order);
        return;
    }

    // CREATE the memory bank
    const context: ExecutionContext = {};

    for (let nodeId of order) {
        const node = workflow.nodes.find(node => node.id === nodeId)
        if (node) {
            const result = await executeNode(node, context);
            context[nodeId] = result;
        }
    }
    console.log(context);
}
runWorkflow()
