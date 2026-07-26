import { useState } from 'react';
import { useStore } from '../store';
import { Save, ShieldCheck } from 'lucide-react';

export function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("L'enregistrement a échoué. Réessayez.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500';
  const labelCls = 'block text-xs font-medium text-gray-400 mb-1';

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>
        <p className="text-gray-400 text-sm mt-0.5">
          Configuration synchronisée avec Supabase
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Contact et coordonnées</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Numéro WhatsApp (sans +)</label>
              <input value={form.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Téléphone affiché</label>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Adresse</label>
              <input value={form.address} onChange={(e) => set('address', e.target.value)} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Horaires</label>
              <input value={form.hours} onChange={(e) => set('hours', e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Message WhatsApp par défaut</label>
            <textarea value={form.whatsappDefaultMessage} onChange={(e) => set('whatsappDefaultMessage', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
          </div>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">SEO global</h2>
          <div>
            <label className={labelCls}>Titre du site</label>
            <input value={form.seoSiteTitle} onChange={(e) => set('seoSiteTitle', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Description du site</label>
            <textarea value={form.seoSiteDescription} onChange={(e) => set('seoSiteDescription', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className={labelCls}>Facebook Pixel ID</label>
            <input value={form.facebookPixelId || ''} onChange={(e) => set('facebookPixelId', e.target.value)} className={inputCls} />
          </div>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Marque</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nom du site</label>
              <input value={form.logoText} onChange={(e) => set('logoText', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Signature</label>
              <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} className={inputCls} />
            </div>
          </div>
        </section>

        <section className="bg-blue-500/5 border border-blue-400/20 rounded-xl p-5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h2 className="text-white text-sm font-semibold">Compte sécurisé</h2>
            <p className="text-gray-400 text-sm mt-1">
              Le mot de passe est désormais géré dans Supabase Auth et n'est plus stocké dans le navigateur.
            </p>
          </div>
        </section>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 disabled:opacity-60 transition-colors">
          <Save className="w-4 h-4" />
          {saving ? 'Enregistrement…' : saved ? 'Enregistré !' : 'Enregistrer les paramètres'}
        </button>
      </form>
    </div>
  );
}
