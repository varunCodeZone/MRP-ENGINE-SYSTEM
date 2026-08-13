import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cpu, CheckCircle, AlertTriangle, Play, ShieldCheck } from 'lucide-react';

export default function RunMrp() {
  const [finishedGoods, setFinishedGoods] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [demandQty, setDemandQty] = useState(1);
  const [mrpResult, setMrpResult] = useState(null);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    fetchFinishedGoods();
    fetchOrders();
  }, []);

  const fetchFinishedGoods = async () => {
    const res = await axios.get('http://localhost:8080/api/items');
    setFinishedGoods(res.data.filter(i => i.type === 'FINISHED_GOOD'));
  };

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:8080/api/mrp/purchase-orders');
    setPurchaseOrders(res.data);
  };

  const executeExplosion = async () => {
    if(!selectedProduct) return alert("Select a product to trigger!");
    try {
      const res = await axios.post(`http://localhost:8080/api/mrp/explode?productId=${selectedProduct}&quantity=${demandQty}`);
      setMrpResult(res.data);
      fetchOrders();
    } catch (err) { console.error(err); }
  };

  const approveOrder = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/mrp/purchase-orders/${id}/approve`);
      //fetchOrders();
      window.location.reload(); // Quick refresh to reflect approval
    } catch(err) { console.error(err); }
  };

  // Node renderer for beautiful hierarchy rendering
  const renderBomTreeNode = (node) => (
    <div key={node.itemId} className="pl-6 border-l-2 border-slate-200 mt-3">
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-800">{node.itemName} <span className="text-xs font-normal text-slate-400">({node.itemType})</span></h4>
          <p className="text-xs text-slate-500 mt-1">Gross Req: <span className="font-semibold text-slate-700">{node.grossRequirement}</span> | Available Stock: <span className="font-semibold text-slate-700">{node.onHandQuantity}</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm font-extrabold text-slate-900">Net Needed: {node.netRequirement}</p>
          {node.needsPurchaseOrder ? (
            <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-md mt-1 animate-pulse"><AlertTriangle className="w-3 h-3"/> Shortage - PO Triggered</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-md mt-1"><CheckCircle className="w-3 h-3"/> Stock Sufficient</span>
          )}
        </div>
      </div>
      {node.children && node.children.map(child => renderBomTreeNode(child))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center space-x-3 mb-8">
        <Cpu className="w-8 h-8 text-emerald-600" />
        <h1 className="text-3xl font-extrabold text-slate-900">MRP Core Calculation & Supply Logs</h1>
      </div>

      {/* Explosion Control Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">Simulate Batch Production Demand</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">TARGET MANUFACTURED PRODUCT</label>
            <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none bg-white">
              <option value="">Choose Finished Good...</option>
              {finishedGoods.map(fg => <option key={fg.id} value={fg.id}>{fg.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">PRODUCTION RUN QUANTITY</label>
            <input type="number" min="1" value={demandQty} onChange={e => setDemandQty(parseFloat(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none" />
          </div>
          <button onClick={executeExplosion} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-white" /> Compute Requirements
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Explosion Hierarchy Output */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 min-h-[400px]">
            <h3 className="text-md font-bold text-slate-800 mb-4 border-b pb-2">Exploded Requirement Tree Analysis</h3>
            {mrpResult ? (
              <div>
                <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-400">Target Production</p>
                    <h3 className="text-lg font-bold">{mrpResult.productName}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Batch Qty</p>
                    <h3 className="text-xl font-black text-emerald-400">{mrpResult.targetQuantity} PCS</h3>
                  </div>
                </div>
                <div className="mt-4">{renderBomTreeNode(mrpResult.bomTree)}</div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-20 text-sm">No live calculation simulated yet. Select inputs above.</div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Purchase Logs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 h-full">
            <h3 className="text-md font-bold text-slate-800 mb-4 border-b pb-2">Procurement Fulfillment Logs</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {purchaseOrders.map(po => (
                <div key={po.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{po.itemName}</h4>
                      <p className="text-xs text-slate-500">Order Ref: #PO-{po.id}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${po.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {po.status}
                    </span>
                  </div>
                  <div className="border-t border-dashed my-2 pt-2 text-xs text-slate-600 grid grid-cols-2 gap-y-1">
                    <span>Vendor: <strong className="text-slate-800">{po.supplierName}</strong></span>
                    <span>Qty: <strong className="text-slate-800">{po.quantityOrdered}</strong></span>
                    <span className="col-span-2 text-sm text-slate-900 font-bold mt-1">Total Valuation: ${po.totalCost?.toLocaleString()}</span>
                  </div>
                  {po.status === 'PENDING' && (
                    <button onClick={() => approveOrder(po.id)} className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-1 shadow">
                      <ShieldCheck className="w-3.5 h-3.5" /> Approve Supply Entry
                    </button>
                  )}
                </div>
              ))}
              {purchaseOrders.length === 0 && <div className="text-center text-slate-400 py-10 text-xs">No active procurement orders.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}