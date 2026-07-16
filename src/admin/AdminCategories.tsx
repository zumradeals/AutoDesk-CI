import { useState } from 'react';
import { Plus, Trash2, Save, Edit2 } from 'lucide-react';
import { useStore } from '../store';
import type { Category } from '../types';

function generateId() { return `cat-${Date.now()}`; }

const ICON_OPTIONS = ['building', 'image', 'settings', 'file-text', 'layers', 'cpu', 'pen-tool'];

export function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const [editing, setEditing] = useState<Category | null>(null);
  const [saved, setSaved] = useState(false);

  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  const startNew = () => setEditing({
    id: generateId(), slug: '', name: '', description: '', icon: 'building',
    status: 'active', sortOrder: categories.length + 1,
  });

  const handleSave = () => {
    if (!editing) return;
    if (categories.find((c) => c.id === editing.id)) updateCategory(editing);
    else addCategory(editing);
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditing(null); }, 1000);
  };

  const inputCls = 'w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Catégories</h1>
          <p className="text-gray-400 text-sm mt-0.5">{categories.length} catégories</p>
        </div>
        <button onClick={startNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors">
          <Plus className="w-4 h-4" /> Nouvelle catégorie
        </button>
      </div>

      {editing && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-white font-semibold">{editing.name || 'Nouvelle catégorie'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nom</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Slug</label>
              <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Icône</label>
              <select value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className={inputCls + ' bg-gray-800'}>
                {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Statut</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as any })} className={inputCls + ' bg-gray-800'}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Description</label>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className={inputCls + ' resize-none'} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors">
              <Save className="w-4 h-4" />{saved ? 'Enregistré !' : 'Enregistrer'}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-800 transition-colors">Annuler</button>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-4 py-3 text-gray-400 font-medium">Catégorie</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Slug</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Statut</th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-3 text-white font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{cat.slug}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cat.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                    {cat.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditing(cat)} className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
