import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';

const ADMIN_EMAIL = 'admin@autodesk-ci.com';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (await login(ADMIN_EMAIL, password)) {
        navigate('/admin');
      } else {
        setError('Identifiants incorrects ou accès non autorisé.');
      }
    } catch {
      setError('Connexion indisponible. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06111f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Espace sécurisé</h1>
          <p className="text-slate-400 text-sm mt-2">Administration Autodesk CI</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-7 shadow-2xl shadow-black/30 space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Compte administrateur
            </label>
            <div className="px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-300">
              {ADMIN_EMAIL}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError('');
                }}
                className="w-full pl-11 pr-12 py-3.5 bg-slate-950/60 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre mot de passe Supabase"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-500 disabled:opacity-60 transition-colors"
          >
            {loading ? 'Connexion sécurisée…' : 'Se connecter'}
          </button>
        </form>
        <p className="text-center text-slate-600 text-xs mt-5">
          Authentification protégée par Supabase
        </p>
      </div>
    </div>
  );
}
