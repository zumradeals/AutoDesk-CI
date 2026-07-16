import { useState } from 'react';
import { useStore } from '../store';
import { Save } from 'lucide-react';

const ADMIN_PASSWORD_KEY = 'autodesk_ci_admin_pwd';

export function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [newPwd, setNewPwd] = useState('');
  const [pwdSaved, setPwdSaved] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePwdChange = () => {
    if (newPwd.length < 6) return;
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPwd);
    setNewPwd('');
    setPwdSaved(true);
    setTimeout(() => setPwdSaved(false), 2000);
  };

  const inputCls = 'w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500';
  const labelCls = 'block text-xs font-medium text-gray-400 mb-1';

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>
        <p className="text-gray-400 text-sm mt-0.5">Configuration générale du site</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Contact et coordonnées</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Numéro WhatsApp (sans +)</label>
              <input value={form.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} className={inputCls} placeholder="2250718713781" />
            </div>
            <div>
              <label className={labelCls}>Téléphone (affiché)</label>
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
            <textarea
              value={form.whatsappDefaultMessage}
              onChange={(e) => set('whatsappDefaultMessage', e.target.value)}
              rows={3}
              className={inputCls + ' resize-none'}
            />
          </div>
        </section>

        {/* SEO */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">SEO global</h2>
          <div>
            <label className={labelCls}>Titre du site</label>
            <input value={form.seoSiteTitle} onChange={(e) => set('seoSiteTitle', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Description du site</label>
            <textarea
              value={form.seoSiteDescription}
              onChange={(e) => set('seoSiteDescription', e.target.value)}
              rows={3}
              className={inputCls + ' resize-none'}
            />
          </div>
          <div>
            <label className={labelCls}>Facebook Pixel ID</label>
            <input value={form.facebookPixelId || ''} onChange={(e) => set('facebookPixelId', e.target.value)} className={inputCls} />
          </div>
        </section>

        {/* Branding */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Marque</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nom du site</label>
              <input value={form.logoText} onChange={(e) => set('logoText', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tagline</label>
              <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} className={inputCls} />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Enregistré !' : 'Enregistrer les paramètres'}
        </button>
      </form>

      {/* Mot de passe */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Changer le mot de passe</h2>
        <div className="flex gap-3">
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="Nouveau mot de passe (min 6 caractères)"
            className={inputCls}
          />
          <button
            type="button"
            onClick={handlePwdChange}
            disabled={newPwd.length < 6}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {pwdSaved ? 'Modifié !' : 'Changer'}
          </button>
        </div>
      </div>
    </div>
  );
}
