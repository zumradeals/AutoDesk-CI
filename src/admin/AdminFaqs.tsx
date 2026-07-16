import { useState } from 'react';
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store';
import type { FaqItem } from '../types';

function generateId() { return `faq-${Date.now()}`; }

export function AdminFaqs() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useStore();
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [saved, setSaved] = useState(false);

  const generalFaqs = faqs.filter((f) => !f.productId).sort((a, b) => a.sortOrder - b.sortOrder);

  const startNew = () => setEditing({
    id: generateId(), question: '', answer: '', categoryLabel: 'Général',
    sortOrder: faqs.length + 1, status: 'published',
  });

  const handleSave = () => {
    if (!editing) return;
    if (faqs.find((f) => f.id === editing.id)) updateFaq(editing);
    else addFaq(editing);
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditing(null); }, 1000);
  };

  const move = (faq: FaqItem, dir: 'up' | 'down') => {
    updateFaq({ ...faq, sortOrder: faq.sortOrder + (dir === 'up' ? -1.5 : 1.5) });
  };

  const inputCls = 'w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQ générale</h1>
          <p className="text-gray-400 text-sm mt-0.5">{generalFaqs.length} questions</p>
        </div>
        <button onClick={startNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors">
          <Plus className="w-4 h-4" /> Nouvelle question
        </button>
      </div>

      {editing && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-white font-semibold">Éditer la question</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Catégorie</label>
              <input value={editing.categoryLabel || ''} onChange={(e) => setEditing({ ...editing, categoryLabel: e.target.value })} className={inputCls} placeholder="ex: Activation, Paiement..." />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Statut</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as any })} className={inputCls + ' bg-gray-800'}>
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Question</label>
            <input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Réponse</label>
            <textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={4} className={inputCls + ' resize-none'} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors">
              <Save className="w-4 h-4" />{saved ? 'Enregistré !' : 'Enregistrer'}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-800 transition-colors">Annuler</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {generalFaqs.map((faq) => (
          <div key={faq.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {faq.categoryLabel && (
                  <span className="text-xs text-blue-400 font-medium uppercase tracking-wide block mb-1">{faq.categoryLabel}</span>
                )}
                <div className="text-white text-sm font-medium mb-1">{faq.question}</div>
                <div className="text-gray-500 text-xs line-clamp-2">{faq.answer}</div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => move(faq, 'up')} className="p-1 text-gray-500 hover:text-white transition-colors">
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => move(faq, 'down')} className="p-1 text-gray-500 hover:text-white transition-colors">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setEditing(faq)} className="p-1 text-gray-500 hover:text-blue-400 transition-colors">
                  <Save className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteFaq(faq.id)} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
