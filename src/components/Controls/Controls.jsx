import React from 'react';
import './Controls.css';
import { FiPlusCircle, FiLayout } from 'react-icons/fi';
import { MdOutlineErrorOutline, MdOutlineCheckCircle } from 'react-icons/md';

const Controls = ({ addNode, autoLayout, isValid, error }) => {
  const handleAdd = () => {
    const label = prompt('Enter node label');
    if (label) addNode(label);
  };

  return (
    <div className="controls-panel">
      <button className="control-btn" onClick={handleAdd}>
        <FiPlusCircle /> Add Node
      </button>
      <button className="control-btn" onClick={autoLayout}>
        <FiLayout /> Auto-Layout
      </button>
      <div className={`dag-status ${isValid ? 'valid' : 'invalid'}`}>
        {isValid ? (
          <>
            <MdOutlineCheckCircle /> Valid DAG
          </>
        ) : (
          <>
            <MdOutlineErrorOutline /> Invalid: {error}
          </>
        )}
      </div>
    </div>
  );
};

export default Controls;
