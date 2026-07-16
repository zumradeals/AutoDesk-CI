import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { useStore } from '../store';
import type { Testimonial } from '../types';

function generateId() { return `test-${Date.now()}`; }

const COLORS = ['bg-blue-600', 'bg-teal-600', 'bg-violet-600', 'bg-orange-600', 'bg-rose-600', 'bg-emerald-600'];

export function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useStore();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saved, setSaved] = useState(false);

  const startNew = () => setEditing({
    id: generateId(), name: '', role: '', city: '', text: '', rating: 5,
    status: 'published', sortOrder: testimonials.length + 1, initials: '', color: COLORS[0],
  });

  const handleSave = () => {
    if (!editing) return;
    const initials = editing.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const t = { ...editing, initials: initials || 'XX' };
    if (testimonials.find((x) => x.id === t.id)) updateTestimonial(t);
    else addTestimonial(t);
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditing(null); }, 1000);
  };

  const inputCls = 'w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Témoignages</h1>
          <p className="text-gray-400 text-sm mt-0.5">{testimonials.length} témoignages</p>
        </div>
        <button onClick={startNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors">
          <Plus className="w-4 h-4" /> Nouveau
        </button>
      </div>

      {editing && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-white font-semibold">{editing.name || 'Nouveau témoignage'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nom</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Fonction / Métier</label>
              <input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Ville / Pays</label>
              <input value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Note (1-5)</label>
              <input type="number" min="1" max="5" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Témoignage</label>
            <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={3} className={inputCls + ' resize-none'} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors">
              <Save className="w-4 h-4" />{saved ? 'Enregistré !' : 'Enregistrer'}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-800 transition-colors">Annuler</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(t)} className="p-1 text-gray-500 hover:text-blue-400 transition-colors">
                  <Save className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteTestimonial(t.id)} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-xs line-clamp-3">"{t.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
