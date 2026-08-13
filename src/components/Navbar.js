import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Layers, Network, Cpu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Items', path: '/items', icon: Layers },
    { name: 'BOM', path: '/bom', icon: Network },
    { name: 'Run MRP', path: '/mrp', icon: Cpu },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-md">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <span className="font-bold text-xl tracking-wider">
              vMRP <span className="text-blue-500 text-sm font-semibold">Engine</span>
            </span>
          </div>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}