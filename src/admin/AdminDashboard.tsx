import { useStore } from '../store';
import { Package, TrendingUp, MessageCircle, Eye, Star } from 'lucide-react';

export function AdminDashboard() {
  const { products, whatsappClicks } = useStore();

  const published = products.filter((p) => p.status === 'published');
  const promo = products.filter((p) => p.offers.some((o) => o.isPromo));
  const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalWaClicks = products.reduce((sum, p) => sum + (p.whatsappClicks || 0), 0);

  const topProducts = [...products]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const stats = [
    { label: 'Produits total', value: products.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Publiés', value: published.length, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'En promotion', value: promo.length, icon: Star, color: 'bg-amber-500' },
    { label: 'Clics WhatsApp', value: totalWaClicks, icon: MessageCircle, color: 'bg-[#25D366]' },
    { label: 'Vues produits', value: totalViews, icon: Eye, color: 'bg-violet-500' },
  ];

  const recentClicks = [...whatsappClicks]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="text-gray-400 text-sm mt-1">Aperçu général de votre plateforme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top produits */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Produits les plus consultés</h2>
          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm text-white">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.status === 'published' ? 'Publié' : 'Brouillon'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.views || 0}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{p.whatsappClicks || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Aucune donnée pour le moment.</p>
          )}
        </div>

        {/* Derniers clics WhatsApp */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Derniers clics WhatsApp</h2>
          {recentClicks.length > 0 ? (
            <div className="space-y-3">
              {recentClicks.map((click) => (
                <div key={click.id} className="flex items-center justify-between">
                  <div className="text-sm text-white">{click.productName}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(click.timestamp).toLocaleDateString('fr-FR', {
                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Aucun clic enregistré pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
