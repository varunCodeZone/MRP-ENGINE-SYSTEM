import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Network, Link2, Trash2 } from 'lucide-react';

export default function Bom() {
  const [items, setItems] = useState([]);
  const [bomLinks, setBomLinks] = useState([]);
  const [parentId, setParentId] = useState('');
  const [childId, setChildId] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => { fetchItems(); fetchBomLinks(); }, []);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:8080/api/items');
    setItems(res.data);
  };

  const fetchBomLinks = async () => {
    const res = await axios.get('http://localhost:8080/api/bom');
    setBomLinks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/bom', { parentId, childId, quantityRequired: qty });
      fetchBomLinks();
      setParentId(''); setChildId(''); setQty(1);
    } catch(err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bom/${id}`);
      fetchBomLinks();
    } catch(err) { console.error(err); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center space-x-3 mb-8">
        <Network className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-extrabold text-slate-900">Structure & Bill of Materials (BOM)</h1>
      </div>

      {/* Relation Configurator Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Link2 className="w-5 h-5 text-purple-500" /> Map Production Dependency</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">PARENT ITEM (Assembly/FG)</label>
            <select required value={parentId} onChange={e => setParentId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none bg-white">
              <option value="">Select Parent</option>
              {items.map(i => <option key={i.id} value={i.id}>{i.name} ({i.type})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">CHILD COMPONENT (Raw Material)</label>
            <select required value={childId} onChange={e => setChildId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none bg-white">
              <option value="">Select Child Component</option>
              {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">QUANTITY REQUIRED</label>
            <input type="number" min="1" required value={qty} onChange={e => setQty(parseFloat(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all text-sm">
            Link Hierarchy
          </button>
        </form>
      </div>

      {/* Hierarchy Log Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-200 font-semibold text-sm">
              <th className="p-4">Mapping Ref</th>
              <th className="p-4">Parent Product</th>
              <th className="p-4">Child Component</th>
              <th className="p-4">Multiplier Quantity</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {bomLinks.map(link => (
              <tr key={link.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-400">#BOM-{link.id}</td>
                <td className="p-4 font-semibold text-slate-900">{link.parentName || `ID: ${link.parentId}`}</td>
                <td className="p-4 text-slate-700 font-medium">{link.childName || `ID: ${link.childId}`}</td>
                <td className="p-4 font-bold text-purple-600">{link.quantityRequired} PCS</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(link.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
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