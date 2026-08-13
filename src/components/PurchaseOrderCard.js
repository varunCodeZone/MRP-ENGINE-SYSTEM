import React from 'react';
import { approvePO } from '../api/api';

export default function PurchaseOrderCard({ po, onApproved }) {
  const handleApprove = async () => {
    await approvePO(po.id);
    onApproved();
  };

  return (
    <div style={{
      border: '1px solid #ddd', borderRadius: '8px', padding: '14px',
      marginBottom: '10px', background: po.status === 'APPROVED' ? '#e8f5e9' : '#fff8e1'
    }}>
      <strong>{po.itemName}</strong>
      <div style={{ fontSize: 13, marginTop: 4 }}>
        Qty: {po.quantityOrdered} | Unit Cost: ${po.unitCost?.toFixed(2)} |
        Total: <b>${po.totalCost?.toFixed(2)}</b> | Supplier: {po.supplierName || 'N/A'}
      </div>
      <div style={{ marginTop: 6 }}>
        Status: <b style={{ color: po.status === 'APPROVED' ? 'green' : 'orange' }}>{po.status}</b>
        {po.status === 'PENDING' && (
          <button onClick={handleApprove}
            style={{ marginLeft: 12, background: '#1a237e', color: 'white',
              border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>
            Approve
          </button>
        )}
      </div>
    </div>
  );
}