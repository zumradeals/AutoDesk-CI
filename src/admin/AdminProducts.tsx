import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, Copy } from 'lucide-react';
import { useStore } from '../store';
import type { Product } from '../types';

export function AdminProducts() {
  const { products, categories, deleteProduct, updateProduct, addProduct } = useStore();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || '—';

  const toggleStatus = (p: Product) => {
    updateProduct({
      ...p,
      status: p.status === 'published' ? 'draft' : 'published',
      updatedAt: new Date().toISOString(),
    });
  };

  const duplicate = (p: Product) => {
    const newId = `prod-${Date.now()}`;
    addProduct({
      ...p,
      id: newId,
      slug: `${p.slug}-copie`,
      name: `${p.name} (copie)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      whatsappClicks: 0,
    });
  };

  const confirmDelete = (id: string) => {
    deleteProduct(id);
    setDeleteId(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Produits</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} logiciels au catalogue</p>
        </div>
        <Link
          to="/admin/produits/nouveau"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau produit
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
      />

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-4 py-3 text-gray-400 font-medium">Produit</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Catégorie</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium hidden lg:table-cell">Statut</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium hidden lg:table-cell">Vues</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium hidden lg:table-cell">WhatsApp</th>
              <th className="px-4 py-3 text-gray-400 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{getCategoryName(p.categoryId)}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                    {p.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{p.views || 0}</td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{p.whatsappClicks || 0}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => toggleStatus(p)}
                      title={p.status === 'published' ? 'Dépublier' : 'Publier'}
                      className="p-1.5 text-gray-500 hover:text-white transition-colors rounded"
                    >
                      {p.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => duplicate(p)}
                      title="Dupliquer"
                      className="p-1.5 text-gray-500 hover:text-white transition-colors rounded"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/admin/produits/${p.id}`}
                      className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors rounded"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Confirmer la suppression</h3>
            <p className="text-gray-400 text-sm mb-6">Cette action est irréversible. Le produit sera définitivement supprimé.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => confirmDelete(deleteId)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
