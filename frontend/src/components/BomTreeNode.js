import React, { useState } from 'react';

export default function BomTreeNode({ node, level = 0 }) {
  const [expanded, setExpanded] = useState(true);
  const indent = level * 24;
  const color = node.netRequirement > 0 ? '#c62828' : '#2e7d32';

  return (
    <div style={{ marginLeft: indent, marginBottom: '6px' }}>
      <div style={{
        border: '1px solid #ddd', borderRadius: '6px', padding: '10px',
        background: node.needsPurchaseOrder ? '#fff3e0' : '#f9f9f9',
        cursor: node.children?.length ? 'pointer' : 'default'
      }} onClick={() => setExpanded(!expanded)}>
        <strong>{node.itemName}</strong>
        <span style={{ marginLeft: 8, fontSize: 12, color: '#666' }}>({node.itemType})</span>
        <div style={{ fontSize: 13, marginTop: 4 }}>
          Gross: <b>{node.grossRequirement}</b> |
          On-Hand: <b>{node.onHandQuantity}</b> |
          Net: <b style={{ color }}>{node.netRequirement}</b> {node.unitOfMeasure}
          {node.needsPurchaseOrder && <span style={{ color: '#e65100', marginLeft: 8 }}>⚠ PO Required</span>}
        </div>
      </div>
      {expanded && node.children?.map((child, i) => (
        <BomTreeNode key={i} node={child} level={level + 1} />
      ))}
    </div>
  );
}
