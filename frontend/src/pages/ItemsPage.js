import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layers, Plus, Trash2 } from 'lucide-react';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '', description: '', type: 'RAW_MATERIAL',
    unitOfMeasure: 'PCS', onHandQuantity: 0, reorderPoint: 0,
    supplierName: '', unitCost: 0
  });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/items');
      setItems(res.data);
    } catch (err) { console.error("Error fetching items", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/items', formData);
      fetchItems();
      setFormData({ name: '', description: '', type: 'RAW_MATERIAL', unitOfMeasure: 'PCS', onHandQuantity: 0, reorderPoint: 0, supplierName: '', unitCost: 0 });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this asset?")) {
      try {
        await axios.delete(`http://localhost:8080/api/items/${id}`);
        fetchItems();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center space-x-3 mb-8">
        <Layers className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-extrabold text-slate-900">Items Management</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-blue-500" /> Register New Material Asset</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Item Name*" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          <input type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none bg-white">
            <option value="FINISHED_GOOD">Finished Good</option>
            <option value="RAW_MATERIAL">Raw Material</option>
            <option value="SUB_ASSEMBLY">Sub Assembly</option>
          </select>
          <input type="text" placeholder="Unit (e.g. PCS)*" required value={formData.unitOfMeasure} onChange={e => setFormData({...formData, unitOfMeasure: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none" />
          <input type="number" placeholder="On Hand Stock" value={formData.onHandQuantity} onChange={e => setFormData({...formData, onHandQuantity: parseFloat(e.target.value) || 0})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none" />
          <input type="number" placeholder="Unit Cost ($)" value={formData.unitCost} onChange={e => setFormData({...formData, unitCost: parseFloat(e.target.value) || 0})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none" />
          <input type="text" placeholder="Supplier Name" value={formData.supplierName} onChange={e => setFormData({...formData, supplierName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none col-span-1 md:col-span-2" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-all text-sm">
            Add Asset
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-200 font-semibold text-sm">
              <th className="p-4">ID</th>
              <th className="p-4">Material Name</th>
              <th className="p-4">Classification</th>
              <th className="p-4">Unit</th>
              <th className="p-4">Stock Level</th>
              <th className="p-4">Unit Cost</th>
              <th className="p-4">Supplier</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-400">#{item.id}</td>
                <td className="p-4 font-semibold text-slate-900">{item.name}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${item.type === 'FINISHED_GOOD' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.type}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{item.unitOfMeasure}</td>
                <td className="p-4 font-bold text-slate-800">{item.onHandQuantity}</td>
                <td className="p-4 font-semibold text-slate-900">${item.unitCost?.toLocaleString()}</td>
                <td className="p-4 text-slate-500">{item.supplierName || '—'}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}