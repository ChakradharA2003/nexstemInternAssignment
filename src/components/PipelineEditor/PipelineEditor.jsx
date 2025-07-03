// import React, { useCallback, useState, useEffect } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   useReactFlow,
// } from 'reactflow';
// import dagre from 'dagre';
// import { useStoreApi } from 'reactflow';


// import 'reactflow/dist/style.css';
// import './PipelineEditor.css';
// import NodeComponent from '../NodeComponent/NodeComponent';
// import Controls from '../Controls/Controls';
// import validateDAG from '../ValidationService';

// // ✅ MOVE nodeTypes outside the component to fix error#002
// const nodeTypes = { custom: NodeComponent };

// function PipelineEditorWrapper() {
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);
//   const [isValid, setIsValid] = useState(false);
//   const [error, setError] = useState('');

//   const store = useStoreApi();

// useEffect(() => {
//   const handleKeyDown = (event) => {
//     if (event.key === 'Delete') {
//       const { getNodes, getEdges, getSelectedNodes, getSelectedEdges } = store.getState();

//       const selectedNodeIds = new Set(getSelectedNodes().map((n) => n.id));
//       const selectedEdgeIds = new Set(getSelectedEdges().map((e) => e.id));

//       // Filter out deleted nodes
//       setNodes((nds) => nds.filter((n) => !selectedNodeIds.has(n.id)));

//       // Filter out deleted edges or edges linked to deleted nodes
//       setEdges((eds) =>
//         eds.filter(
//           (e) =>
//             !selectedEdgeIds.has(e.id) &&
//             !selectedNodeIds.has(e.source) &&
//             !selectedNodeIds.has(e.target)
//         )
//       );
//     }
//   };

//   window.addEventListener('keydown', handleKeyDown);
//   return () => window.removeEventListener('keydown', handleKeyDown);
// }, [store]);


//   const { fitView } = useReactFlow();

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback((params) => {
//     if (params.source === params.target) {
//       alert('Self-loops are not allowed!');
//       return;
//     }
//     setEdges((eds) =>
//       addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds)
//     );
//   }, []);

//   useEffect(() => {
//     const { valid, message } = validateDAG(nodes, edges);
//     setIsValid(valid);
//     setError(message);
//   }, [nodes, edges]);

//   const autoLayout = () => {
//     const g = new dagre.graphlib.Graph();
//     g.setDefaultEdgeLabel(() => ({}));
//     g.setGraph({ rankdir: 'LR' });

//     nodes.forEach((node) => {
//       g.setNode(node.id, { width: 172, height: 36 });
//     });

//     edges.forEach((edge) => {
//       g.setEdge(edge.source, edge.target);
//     });

//     dagre.layout(g);

//     const updatedNodes = nodes.map((node) => {
//       const pos = g.node(node.id);
//       return {
//         ...node,
//         position: { x: pos.x - 86, y: pos.y - 18 },
//       };
//     });

//     setNodes(updatedNodes);
//     fitView();
//   };

//   const handleAddNode = (label) => {
//     const newNode = {
//       id: Date.now().toString(),
//       type: 'custom',
//       data: { label },
//       position: {
//         x: Math.random() * 300 + 100,
//         y: Math.random() * 200 + 100,
//       },
//     };
//     setNodes((nds) => [...nds, newNode]);
//     setTimeout(() => fitView({ duration: 300 }), 100);
//   };

//   return (
//     <div className="pipeline-editor">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         deleteKeyCode={46}
//         fitView
//         fitViewOptions={{ padding: 0.3 }}
//         proOptions={{ hideAttribution: true }}
//       />
//       <Controls
//         addNode={handleAddNode}
//         autoLayout={autoLayout}
//         isValid={isValid}
//         error={error}
//       />
//     </div>
//   );
// }

// export default function PipelineEditor() {
//   return (
//     <ReactFlowProvider>
//       <PipelineEditorWrapper />
//     </ReactFlowProvider>
//   );
// }
// import  { useCallback, useState, useEffect } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   useReactFlow,
//   useStoreApi,
// } from 'reactflow';
// import dagre from 'dagre';

// import 'reactflow/dist/style.css';
// import './PipelineEditor.css';

// import NodeComponent from '../NodeComponent/NodeComponent';
// import Controls from '../Controls/Controls';
// import validateDAG from '../ValidationService';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // ✅ Define once outside component
// const nodeTypes = { custom: NodeComponent };

// function PipelineEditorWrapper() {
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);
//   const [isValid, setIsValid] = useState(false);
//   const [error, setError] = useState('');

//   const store = useStoreApi();
//   const { fitView } = useReactFlow();

//   useEffect(() => {
//   const handleKeyDown = (event) => {
//     if (event.key === 'Delete') {
//       const { getSelectedNodes, getSelectedEdges, getNodes, getEdges } = store.getState();

//       const selectedNodeIds = new Set(getSelectedNodes().map((n) => n.id));
//       const selectedEdgeIds = new Set(getSelectedEdges().map((e) => e.id));

//       const remainingNodes = getNodes().filter((n) => !selectedNodeIds.has(n.id));
//       const remainingEdges = getEdges().filter(
//         (e) =>
//           !selectedEdgeIds.has(e.id) &&
//           !selectedNodeIds.has(e.source) &&
//           !selectedNodeIds.has(e.target)
//       );

//       setNodes(remainingNodes);
//       setEdges(remainingEdges);

//       // 🧠 Sync internal store state too
//       store.setState({
//         nodes: remainingNodes,
//         edges: remainingEdges,
//       });

//       if (selectedNodeIds.size > 0) toast.success('Node(s) deleted');
//       if (selectedEdgeIds.size > 0) toast.success('Edge(s) deleted');
//     }
//   };

//   window.addEventListener('keydown', handleKeyDown);
//   return () => window.removeEventListener('keydown', handleKeyDown);
// }, [store]);


//   // ✅ Toast from trash button on node
//   useEffect(() => {
//     const onNodeDelete = (e) => {
//       toast.info(`Node "${e.detail.id}" deleted`);
//     };

//     window.addEventListener('nodeDeleted', onNodeDelete);
//     return () => window.removeEventListener('nodeDeleted', onNodeDelete);
//   }, []);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback((params) => {
//     if (params.source === params.target) {
//       alert('Self-loops are not allowed!');
//       return;
//     }

//     setEdges((eds) =>
//       addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds)
//     );
//   }, []);

//   useEffect(() => {
//     const { valid, message } = validateDAG(nodes, edges);
//     setIsValid(valid);
//     setError(message);
//   }, [nodes, edges]);

//   const autoLayout = () => {
//   const g = new dagre.graphlib.Graph();
//   g.setDefaultEdgeLabel(() => ({}));
//   g.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 80 }); // spacing config

//   nodes.forEach((node) => {
//     g.setNode(node.id, { width: 172, height: 36 });
//   });

//   edges.forEach((edge) => {
//     g.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(g);

//   const updatedNodes = nodes.map((node) => {
//     const pos = g.node(node.id);
//     return {
//       ...node,
//       position: { x: pos.x - 86, y: pos.y - 18 },
//       positionAbsolute: undefined, // reset any cached absolute positions
//       dragging: false,
//     };
//   });

//   setNodes(updatedNodes);

//   // Delay fitView to allow layout to apply
//   setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 50);
// };

//   const handleAddNode = (label) => {
//     const newNode = {
//       id: Date.now().toString(),
//       type: 'custom',
//       data: { label },
//       position: {
//         x: Math.random() * 300 + 100,
//         y: Math.random() * 200 + 100,
//       },
//     };
//     setNodes((nds) => [...nds, newNode]);
//     setTimeout(() => fitView({ duration: 300 }), 100);
//   };

//   return (
//     <div className="pipeline-editor">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         deleteKeyCode={46}
//         fitView
//         fitViewOptions={{ padding: 0.3 }}
//         proOptions={{ hideAttribution: true }}
//       />
//       <Controls
//         addNode={handleAddNode}
//         autoLayout={autoLayout}
//         isValid={isValid}
//         error={error}
//       />
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// }

// export default function PipelineEditor() {
//   return (
//     <ReactFlowProvider>
//       <PipelineEditorWrapper />
//     </ReactFlowProvider>
//   );
// }

import { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';
import './PipelineEditor.css';

import NodeComponent from '../NodeComponent/NodeComponent';
import Controls from '../Controls/Controls';
import validateDAG from '../ValidationService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nodeTypes = { custom: NodeComponent };

function PipelineEditorWrapper() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  const { fitView } = useReactFlow();

  // 🔥 Handle delete via keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        setNodes((nds) => {
          const selectedNodeIds = nds.filter((n) => n.selected).map((n) => n.id);
          if (selectedNodeIds.length) toast.success('Node(s) deleted');

          return nds.filter((n) => !selectedNodeIds.includes(n.id));
        });

        setEdges((eds) => {
          const selectedEdgeIds = eds.filter((e) => e.selected).map((e) => e.id);
          const connectedToDeletedNode = new Set(
            nodes.filter((n) => n.selected).map((n) => n.id)
          );

          if (selectedEdgeIds.length || connectedToDeletedNode.size) {
            toast.success('Edge(s) deleted');
          }

          return eds.filter(
            (e) =>
              !selectedEdgeIds.includes(e.id) &&
              !connectedToDeletedNode.has(e.source) &&
              !connectedToDeletedNode.has(e.target)
          );
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes]);

  // 🔥 Handle custom delete event from trash button
  useEffect(() => {
    const onNodeDelete = (e) => {
      const nodeId = e.detail.id;
      const nodeData = e.detail.data.label;
      setNodes((prev) => prev.filter((n) => n.id !== nodeId));
      setEdges((prev) =>
        prev.filter((e) => e.source !== nodeId && e.target !== nodeId)
      );

      toast.info(`Node "${nodeData}" deleted`);
    };

    window.addEventListener('deleteNodeById', onNodeDelete);
    return () => window.removeEventListener('deleteNodeById', onNodeDelete);
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    if (params.source === params.target) {
      alert('Self-loops are not allowed!');
      return;
    }

    setEdges((eds) =>
      addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds)
    );
  }, []);

  useEffect(() => {
    const { valid, message } = validateDAG(nodes, edges);
    setIsValid(valid);
    setError(message);
  }, [nodes, edges]);

  const autoLayout = () => {
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 80 });

    nodes.forEach((node) => {
      g.setNode(node.id, { width: 172, height: 36 });
    });

    edges.forEach((edge) => {
      g.setEdge(edge.source, edge.target);
    });

    dagre.layout(g);

    const updatedNodes = nodes.map((node) => {
      const pos = g.node(node.id);
      return {
        ...node,
        position: { x: pos.x - 86, y: pos.y - 18 },
        positionAbsolute: undefined,
        dragging: false,
      };
    });

    setNodes(updatedNodes);
    setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 50);
  };

  const handleAddNode = (label) => {
    const newNode = {
      id: Date.now().toString(),
      type: 'custom',
      data: { label },
      position: {
        x: Math.random() * 300 + 100,
        y: Math.random() * 200 + 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setTimeout(() => fitView({ duration: 300 }), 100);
  };

  return (
    <div className="pipeline-editor">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={46}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
      />
      <Controls
        addNode={handleAddNode}
        autoLayout={autoLayout}
        isValid={isValid}
        error={error}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default function PipelineEditor() {
  return (
    <ReactFlowProvider>
      <PipelineEditorWrapper />
    </ReactFlowProvider>
  );
}

