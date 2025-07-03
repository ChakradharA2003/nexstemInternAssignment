// import React from 'react';
// import { Handle, Position } from 'reactflow';
// import './NodeComponent.css';

// function NodeComponent({ data }) {
//   return (
//     <div className="custom-node">
//       <Handle type="target" position={Position.Left} />
//       <div className="label">{data.label}</div>
//       <Handle type="source" position={Position.Right} />
//     </div>
//   );
// }

// export default NodeComponent;

// import { Handle, Position, useStoreApi } from 'reactflow';
// import './NodeComponent.css';
// import { FaTrash } from 'react-icons/fa';

// function NodeComponent({ data, id }) {
//   const store = useStoreApi();

//   const handleDelete = (e) => {
//     e.stopPropagation(); // prevent triggering selection
//     const { getNodes, setNodes, getEdges, setEdges } = store.getState();

//     setNodes(getNodes().filter((node) => node.id !== id));
//     setEdges(getEdges().filter((edge) => edge.source !== id && edge.target !== id));

//     // Optional: custom event or state to trigger toast
//     window.dispatchEvent(new CustomEvent('nodeDeleted', { detail: { id } }));
//   };

//   return (
//     <div className="custom-node">
//       <Handle type="target" position={Position.Left} />
//       <div className="label">
//         {data.label}
//         <button className="delete-btn" onClick={handleDelete}>
//           <FaTrash size={12} />
//         </button>
//       </div>
//       <Handle type="source" position={Position.Right} />
//     </div>
//   );
// }

// export default NodeComponent;

import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeComponent.css';
import { FaTrash } from 'react-icons/fa';

function NodeComponent({ data, id, selected }) {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent selection

    // Dispatch a custom event — actual delete is handled in PipelineEditor
    window.dispatchEvent(new CustomEvent('deleteNodeById', { detail: { id,data } }));
  };

  return (
    <div className={`custom-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="label">
        {data.label}
        <button className="delete-btn" onClick={handleDelete}>
          <FaTrash size={12} />
        </button>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NodeComponent;
