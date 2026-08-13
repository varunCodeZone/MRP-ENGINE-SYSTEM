import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Network, Cpu, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const cards = [
    {
      title: "Manage Items",
      desc: "Add and monitor finished goods, sub-assemblies, and purchased raw materials.",
      link: "/items",
      icon: Layers,
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-500/10"
    },
    {
      title: "Bill of Materials (BOM)",
      desc: "Define multi-level hierarchical structure and quantitative dependencies for production.",
      link: "/bom",
      icon: Network,
      color: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-500/10"
    },
    {
      title: "Run MRP Engine",
      desc: "Trigger live explosion to auto-calculate gross/net requirements and generate POs.",
      link: "/mrp",
      icon: Cpu,
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/10"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Welcome */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          Material Requirements Planning Engine
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Welcome to the next-generation enterprise resource planning platform. Execute core production scheduling, track multi-tier inventory status, and auto-approve smart supply logs instantly.
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border border-slate-100 shadow-xl ${card.shadow} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
            >
              <div className="p-8">
                {/* Icon Wrapper */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-6 shadow-md shadow-slate-200`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
              
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
                <Link to={card.link} className="inline-flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}